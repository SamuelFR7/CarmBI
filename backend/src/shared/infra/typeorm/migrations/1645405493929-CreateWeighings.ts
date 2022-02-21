import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateWeighings1645405493929 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'weighings',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                    },
                    {
                        name: 'code',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'depositor',
                        type: 'varchar',
                    },
                    {
                        name: 'lot',
                        type: 'varchar',
                    },
                    {
                        name: 'product',
                        type: 'varchar',
                    },
                    {
                        name: 'input',
                        type: 'int',
                    },
                    {
                        name: 'output',
                        type: 'int',
                    },
                    {
                        name: 'sync',
                        type: 'varchar',
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('weighings')
    }
}
