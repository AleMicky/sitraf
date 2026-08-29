#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

const migrationName = process.argv[2];

if (!migrationName) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Error: Debes especificar el nombre de la migración.');
  console.log('Uso: npm run migration:generate <NombreMigracion>');
  console.log('Ejemplo: npm run migration:generate CreateVehiculos');
  process.exit(1);
}

function toPascalCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
    .replace(/[\s-_]+/g, '');
}

const formattedName = toPascalCase(migrationName);
const targetPath = `src/shared/infrastructure/persistence/migrations/${formattedName}`;
const datasourcePath = 'src/shared/infrastructure/persistence/typeorm.datasource.ts';

try {
  execSync(`npm run typeorm -- migration:generate ${targetPath} -d ${datasourcePath}`, {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..'),
  });
} catch {
  process.exit(1);
}
