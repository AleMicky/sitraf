#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

const migrationName = process.argv[2];

if (!migrationName) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Error: Debes especificar el nombre de la migración.');
  console.log('Uso: npm run migration:create <NombreMigracion>');
  console.log('Ejemplo: npm run migration:create CreateVehiculos');
  process.exit(1);
}

function toPascalCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
    .replace(/[\s-_]+/g, '');
}

const formattedName = toPascalCase(migrationName);
const targetPath = `src/shared/infrastructure/persistence/migrations/${formattedName}`;

try {
  execSync(`npm run typeorm -- migration:create ${targetPath}`, {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..'),
  });
} catch {
  process.exit(1);
}
