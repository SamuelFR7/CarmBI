export default {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrations: ['./src/infra/database/typeorm/migrations/*.ts'],
    entities: ['./src/domain/entities/*.ts'],
    cli: {
        migrationsDir: './src/infra/database/typeorm/migrations',
    },
}
