export default {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
    entities: ['./src/modules/**/entities/*.ts'],
    cli: {
        migrationsDir: './src/shared/infra/typeorm/migrations',
    },
}
