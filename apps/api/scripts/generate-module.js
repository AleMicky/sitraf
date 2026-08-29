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

const kebabName = toKebabCase(moduleNameRaw);
const pascalName = toPascalCase(moduleNameRaw);
const camelName = toCamelCase(moduleNameRaw);

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

// 2. Archivo del módulo NestJS principal
const moduleContent = `import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class ${pascalName}Module {}
`;

fs.writeFileSync(path.join(baseDir, `${kebabName}.module.ts`), moduleContent, 'utf-8');

// 3. Crear archivos .gitkeep opcionales en subcarpetas para conservar directorios
folders.forEach((folder) => {
  const gitkeepPath = path.join(baseDir, folder, '.gitkeep');
  fs.writeFileSync(gitkeepPath, '', 'utf-8');
});

console.log('\x1b[32m%s\x1b[0m', `✨ ¡Módulo "${kebabName}" creado exitosamente!`);
console.log(`📁 Ubicación: src/modules/${kebabName}`);
console.log('Estructura generada:');
console.log(`├── ${kebabName}.module.ts`);
folders.forEach((f) => console.log(`├── ${f}/`));

///npm run g:module vehiculos