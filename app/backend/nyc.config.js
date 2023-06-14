module.exports = {
  all: true,
  extends: "@istanbuljs/nyc-config-typescript",
  exclude: [
    'src/tests',
    'src/database/config',
    'src/database/migrations',
    'src/database/seeders',
    'src/database/models',
    'src/server.ts',
    'src/app.ts',
    'src/routes.ts',
    'src/types',
    'src/utils',
    'src/Interfaces'
  ],
  include: ['src/**/*.ts']
};
