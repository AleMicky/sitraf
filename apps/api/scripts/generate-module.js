#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const moduleNameRaw = process.argv[2];

if (!moduleNameRaw) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Error: Debes especificar el nombre del módulo.');
  console.log('Uso: npm run g:module <nombre-modulo>');
  console.log('Ejemplo: npm run g:module vehiculos');
  process.exit(1);
}

// Helpers para formatos de nombres
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function toPascalCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
    .replace(/[\s-_]+/g, '');
}

function toCamelCase(str) {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function toSnakeCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

function toConstantCase(str) {
  return toSnakeCase(str).toUpperCase();
}

// Helper básico para singular (maneja casos comunes en español)
function toSingular(str) {
  if (str.endsWith('es') && !str.endsWith('tes') && !str.endsWith('ses')) {
    return str.slice(0, -2);
  }
  if (str.endsWith('s') && !str.endsWith('is') && !str.endsWith('us')) {
    return str.slice(0, -1);
  }
  return str;
}

const kebabName = toKebabCase(moduleNameRaw);
const pascalName = toPascalCase(moduleNameRaw);
const camelName = toCamelCase(moduleNameRaw);

// Versiones en singular para la entidad y use cases individuales
const singularKebab = toSingular(kebabName);
const singularPascal = toSingular(pascalName);
const singularCamel = toSingular(camelName);
const repoToken = `${toConstantCase(singularKebab)}_REPOSITORY`;

const baseDir = path.resolve(__dirname, '../src/modules', kebabName);

if (fs.existsSync(baseDir)) {
  console.error('\x1b[31m%s\x1b[0m', `❌ Error: El módulo "${kebabName}" ya existe en ${baseDir}`);
  process.exit(1);
}

// Estructura de carpetas Hexagonal / Clean Architecture
const folders = [
  'domain/entities',
  'domain/repositories',
  'application/use-cases',
  'application/dto',
  'infrastructure/persistence/repositories',
  'presentation/controllers',
];

// 1. Crear carpetas
folders.forEach((folder) => {
  const targetDir = path.join(baseDir, folder);
  fs.mkdirSync(targetDir, { recursive: true });
});

// 2. Generar Plantillas Base de Archivos (Estructura limpia sin campos de negocio prefijados)

// Entity
const entityContent = `import { Entity } from 'typeorm';
import { BaseEntity } from '../../../../shared/domain/entities/base.entity';

@Entity({ name: 't${kebabName.replace(/-/g, '_')}', schema: 'ope' })
export class ${singularPascal}Entity extends BaseEntity {}
`;

// Repository Interface
const repoInterfaceContent = `import { ${singularPascal}Entity } from '../entities/${singularKebab}.entity';
import { PaginationQueryDto } from '../../../../shared/application/dto/pagination-query.dto';
import { PaginatedResultDto } from '../../../../shared/application/dto/paginated-result.dto';

export const ${repoToken} = Symbol('${repoToken}');

export interface ${singularPascal}Repository {
  create(entity: Partial<${singularPascal}Entity>): Promise<${singularPascal}Entity>;
  findAll(
    query: PaginationQueryDto,
  ): Promise<PaginatedResultDto<${singularPascal}Entity>>;
  findById(id: string): Promise<${singularPascal}Entity | null>;
  save(entity: ${singularPascal}Entity): Promise<${singularPascal}Entity>;
}
`;

// Create DTO
const createDtoContent = `export class Create${singularPascal}Dto {}
`;

// Update DTO
const updateDtoContent = `import { PartialType } from '@nestjs/swagger';
import { Create${singularPascal}Dto } from './create-${singularKebab}.dto';

export class Update${singularPascal}Dto extends PartialType(Create${singularPascal}Dto) {}
`;

// Create Use Case
const createUseCaseContent = `import { Inject, Injectable } from '@nestjs/common';
import { Create${singularPascal}Dto } from '../dto/create-${singularKebab}.dto';
import { ${singularPascal}Entity } from '../../domain/entities/${singularKebab}.entity';
import {
  ${repoToken},
  type ${singularPascal}Repository,
} from '../../domain/repositories/${singularKebab}.repository';

@Injectable()
export class Create${singularPascal}UseCase {
  constructor(
    @Inject(${repoToken})
    private readonly ${singularCamel}Repository: ${singularPascal}Repository,
  ) {}

  async execute(dto: Create${singularPascal}Dto): Promise<${singularPascal}Entity> {
    return await this.${singularCamel}Repository.create(dto);
  }
}
`;

// List Use Case
const listUseCaseContent = `import { Inject, Injectable } from '@nestjs/common';
import { ${singularPascal}Entity } from '../../domain/entities/${singularKebab}.entity';
import {
  ${repoToken},
  type ${singularPascal}Repository,
} from '../../domain/repositories/${singularKebab}.repository';
import { PaginationQueryDto } from '../../../../shared/application/dto/pagination-query.dto';
import { PaginatedResultDto } from '../../../../shared/application/dto/paginated-result.dto';

@Injectable()
export class List${pascalName}UseCase {
  constructor(
    @Inject(${repoToken})
    private readonly ${singularCamel}Repository: ${singularPascal}Repository,
  ) {}

  async execute(
    query: PaginationQueryDto,
  ): Promise<PaginatedResultDto<${singularPascal}Entity>> {
    return await this.${singularCamel}Repository.findAll(query);
  }
}
`;

// Update Use Case
const updateUseCaseContent = `import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Update${singularPascal}Dto } from '../dto/update-${singularKebab}.dto';
import { ${singularPascal}Entity } from '../../domain/entities/${singularKebab}.entity';
import {
  ${repoToken},
  type ${singularPascal}Repository,
} from '../../domain/repositories/${singularKebab}.repository';

@Injectable()
export class Update${singularPascal}UseCase {
  constructor(
    @Inject(${repoToken})
    private readonly ${singularCamel}Repository: ${singularPascal}Repository,
  ) {}

  async execute(id: string, dto: Update${singularPascal}Dto): Promise<${singularPascal}Entity> {
    const entity = await this.${singularCamel}Repository.findById(id);

    if (!entity) {
      throw new NotFoundException('Registro no encontrado');
    }

    Object.assign(entity, dto);

    return await this.${singularCamel}Repository.save(entity);
  }
}
`;

// TypeORM Repository Implementation
const typeOrmRepoContent = `import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ${singularPascal}Entity } from '../../../domain/entities/${singularKebab}.entity';
import { ${singularPascal}Repository } from '../../../domain/repositories/${singularKebab}.repository';
import { PaginationQueryDto } from '../../../../../shared/application/dto/pagination-query.dto';
import { PaginatedResultDto } from '../../../../../shared/application/dto/paginated-result.dto';
import { paginate } from '../../../../../shared/infrastructure/persistence/pagination.helper';

@Injectable()
export class TypeOrm${singularPascal}Repository implements ${singularPascal}Repository {
  constructor(
    @InjectRepository(${singularPascal}Entity)
    private readonly repository: Repository<${singularPascal}Entity>,
  ) {}

  async create(entity: Partial<${singularPascal}Entity>): Promise<${singularPascal}Entity> {
    const newEntity = this.repository.create(entity);
    return await this.repository.save(newEntity);
  }

  async findAll(
    query: PaginationQueryDto,
  ): Promise<PaginatedResultDto<${singularPascal}Entity>> {
    const qb = this.repository.createQueryBuilder('${singularCamel}');
    return paginate(qb, query);
  }

  async findById(id: string): Promise<${singularPascal}Entity | null> {
    return await this.repository.findOne({
      where: {
        id,
      } as any,
    });
  }

  async save(entity: ${singularPascal}Entity): Promise<${singularPascal}Entity> {
    return await this.repository.save(entity);
  }
}
`;

// Controller
const controllerContent = `import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Create${singularPascal}Dto } from '../../application/dto/create-${singularKebab}.dto';
import { Update${singularPascal}Dto } from '../../application/dto/update-${singularKebab}.dto';
import { Create${singularPascal}UseCase } from '../../application/use-cases/create-${singularKebab}.use-case';
import { List${pascalName}UseCase } from '../../application/use-cases/list-${kebabName}.use-case';
import { Update${singularPascal}UseCase } from '../../application/use-cases/update-${singularKebab}.use-case';
import { PaginationQueryDto } from '../../../../shared/application/dto/pagination-query.dto';

@ApiTags('${pascalName}')
@Controller('${kebabName}')
export class ${pascalName}Controller {
  constructor(
    private readonly create${singularPascal}UseCase: Create${singularPascal}UseCase,
    private readonly list${pascalName}UseCase: List${pascalName}UseCase,
    private readonly update${singularPascal}UseCase: Update${singularPascal}UseCase,
  ) {}

  @Post()
  create(@Body() dto: Create${singularPascal}Dto) {
    return this.create${singularPascal}UseCase.execute(dto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.list${pascalName}UseCase.execute(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Update${singularPascal}Dto) {
    return this.update${singularPascal}UseCase.execute(id, dto);
  }
}
`;

// Module
const moduleContent = `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${singularPascal}Entity } from './domain/entities/${singularKebab}.entity';
import { ${pascalName}Controller } from './presentation/controllers/${kebabName}.controller';
import { Create${singularPascal}UseCase } from './application/use-cases/create-${singularKebab}.use-case';
import { List${pascalName}UseCase } from './application/use-cases/list-${kebabName}.use-case';
import { Update${singularPascal}UseCase } from './application/use-cases/update-${singularKebab}.use-case';
import { ${repoToken} } from './domain/repositories/${singularKebab}.repository';
import { TypeOrm${singularPascal}Repository } from './infrastructure/persistence/repositories/typeorm-${singularKebab}.repository';

@Module({
  imports: [TypeOrmModule.forFeature([${singularPascal}Entity])],
  controllers: [${pascalName}Controller],
  providers: [
    Create${singularPascal}UseCase,
    List${pascalName}UseCase,
    Update${singularPascal}UseCase,
    {
      provide: ${repoToken},
      useClass: TypeOrm${singularPascal}Repository,
    },
  ],
  exports: [${repoToken}],
})
export class ${pascalName}Module {}
`;

// Escribir todos los archivos base
const filesToCreate = [
  { file: path.join(baseDir, `${kebabName}.module.ts`), content: moduleContent },
  { file: path.join(baseDir, `domain/entities/${singularKebab}.entity.ts`), content: entityContent },
  { file: path.join(baseDir, `domain/repositories/${singularKebab}.repository.ts`), content: repoInterfaceContent },
  { file: path.join(baseDir, `application/dto/create-${singularKebab}.dto.ts`), content: createDtoContent },
  { file: path.join(baseDir, `application/dto/update-${singularKebab}.dto.ts`), content: updateDtoContent },
  { file: path.join(baseDir, `application/use-cases/create-${singularKebab}.use-case.ts`), content: createUseCaseContent },
  { file: path.join(baseDir, `application/use-cases/list-${kebabName}.use-case.ts`), content: listUseCaseContent },
  { file: path.join(baseDir, `application/use-cases/update-${singularKebab}.use-case.ts`), content: updateUseCaseContent },
  { file: path.join(baseDir, `infrastructure/persistence/repositories/typeorm-${singularKebab}.repository.ts`), content: typeOrmRepoContent },
  { file: path.join(baseDir, `presentation/controllers/${kebabName}.controller.ts`), content: controllerContent },
];

filesToCreate.forEach(({ file, content }) => {
  fs.writeFileSync(file, content, 'utf-8');
});

console.log('\x1b[32m%s\x1b[0m', `✨ ¡Módulo "${kebabName}" y sus archivos base creados exitosamente!`);
console.log(`📁 Ubicación: src/modules/${kebabName}`);
console.log('Archivos generados:');
filesToCreate.forEach(({ file }) => {
  console.log(`  ├── ${path.relative(baseDir, file)}`);
});