import { SQLiteDatabase } from "expo-sqlite";

export const DATABASE_NAME = 'app.db';
export const TB_CITIES_NAME = 'cities'
const DATABASE_VERSION = 1;

// SQL cria as tabelas
const CREATE_TB_CITIES = `
    CREATE TABLE IF NOT EXISTS ${TB_CITIES_NAME} (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        country TEXT NOT NULL,
        updated_at DATE NOT NULL
    );`;
export const INSERT_TB_CITIES = `INSERT INTO ${TB_CITIES_NAME} (
    name, country, updated_at
) VALUES (?, ?, ?)`;
export const SELECT_ALL_CITIES = `SELECT name, country FROM ${TB_CITIES_NAME}`;


export async function migrateDb(db: SQLiteDatabase) {
    try {
        let response = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
        let { user_version: dbVersion } = response ?? { user_version: 0 };
        if (dbVersion >= DATABASE_VERSION) return;
        if (dbVersion === 0) {
            await db.execAsync(`${CREATE_TB_CITIES}`);
        }
        /* if (dbVersion < DATABASE_VERSION) { 
            // migracao
        } */
        await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    } catch (error) {
        const err = error as { message: string };
        console.log(err.message);
    }
}