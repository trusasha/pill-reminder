import { Medication } from 'entities/medication';
import SQLite from 'react-native-sqlite-storage';
import logger from 'utils/logger';

export interface DatabaseContract {
  getAllMedications(): Promise<Entities.Medication[]>;
  addMedication(
    data: Omit<Entities.Medication, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Entities.Medication>;
  incrementMedication(data: Pick<Entities.Medication, 'id'>): Promise<Entities.Medication>;
  decrementMedication(data: Pick<Entities.Medication, 'id'>): Promise<Entities.Medication>;
  isReady: boolean;
}

const STORAGE_KEYS = {
  medications: 'medications',
};

export class StorageService implements DatabaseContract {
  private db: SQLite.SQLiteDatabase;

  public isReady = false;

  constructor() {
    this.db = SQLite.openDatabase(
      {
        name: 'db.sqlite',
        location: 'Documents',
      },
      () => {
        logger.log('sQlite database connect');

        this.init();
      },
      err => {
        logger.error('sQlite database error', err);
      },
    );
  }

  private async init() {
    await this.db.executeSql(`
      CREATE TABLE IF NOT EXISTS ${STORAGE_KEYS.medications} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) UNIQUE,
        description TEXT,
        initialCount INT DEFAULT 0,
        currentCount INT DEFAULT 0,
        destinationCount INT,
        createdAt TEXT,
        updatedAt TEXT,
        color TEXT,
      );
    `);

    this.isReady = true;
  }

  public getAllMedications(): ReturnType<DatabaseContract['getAllMedications']> {
    const medications: Entities.Medication[] = [];

    return new Promise((res, rej) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM ${STORAGE_KEYS.medications} ORDER BY name`,
          [],
          (_, results) => {
            for (let i = 0; i < results.rows.length; i += 1) {
              const row = results.rows.item(i);

              medications.push(row);
            }

            res(medications);
          },
          (_, error) => {
            rej(error);
          },
        );
      });
    });
  }

  public async addMedication({
    name,
    description,
    initialCount,
    destinationCount,
    currentCount,
    color,
  }: Parameters<DatabaseContract['addMedication']>[0]): ReturnType<DatabaseContract['addMedication']> {
    const currentDateISO = new Date().toISOString();

    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO ${STORAGE_KEYS.medications} (name, description, initialCount, currentCount, destinationCount, createdAt, updatedAt, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            name,
            description,
            initialCount,
            currentCount,
            destinationCount,
            currentDateISO,
            currentDateISO,
            color,
          ],
          (_, results) => {
            const insertedId = results.insertId;
            resolve({
              id: insertedId.toString(),
              name,
              description,
              initialCount,
              currentCount,
              destinationCount,
              createdAt: currentDateISO,
              updatedAt: currentDateISO,
              color,
            });
          },
          (_, error) => {
            reject(error);
          },
        );
      });
    });
  }

  public async incrementMedication({
    id,
  }: Parameters<DatabaseContract['incrementMedication']>[0]): ReturnType<
    DatabaseContract['incrementMedication']
  > {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM ${STORAGE_KEYS.medications} WHERE id = ?`,
          [id],
          (innerTx, results) => {
            if (results.rows.length > 0) {
              const medication = results.rows.item(0);
              const updatedCurrentCount = medication.currentCount + 1;
              const updatedAt = new Date().toISOString();

              innerTx.executeSql(
                `UPDATE ${STORAGE_KEYS.medications} SET currentCount = ?, updatedAt = ? WHERE id = ?`,
                [updatedCurrentCount, updatedAt, id],
                () => {
                  resolve({
                    ...medication,
                    currentCount: updatedCurrentCount,
                    updatedAt,
                  });
                },
                (_, error) => reject(error),
              );
            } else {
              reject(new Error('Medication with the given ID was not found.'));
            }
          },
          (_, error) => reject(error),
        );
      });
    });
  }

  public async decrementMedication({
    id,
  }: Parameters<DatabaseContract['incrementMedication']>[0]): ReturnType<
    DatabaseContract['incrementMedication']
  > {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM ${STORAGE_KEYS.medications} WHERE id = ?`,
          [id],
          (innerTx, results) => {
            if (results.rows.length > 0) {
              const medication = results.rows.item(0);

              if (medication.currentCount === 0) {
                reject(new Error('The counter cannot be below zero'));
              }

              const updatedCurrentCount = medication.currentCount - 1;
              const updatedAt = new Date().toISOString();

              innerTx.executeSql(
                `UPDATE ${STORAGE_KEYS.medications} SET currentCount = ?, updatedAt = ? WHERE id = ?`,
                [updatedCurrentCount, updatedAt, id],
                () => {
                  resolve({
                    ...medication,
                    currentCount: updatedCurrentCount,
                    updatedAt,
                  });
                },
                (_, error) => reject(error),
              );
            } else {
              reject(new Error('Medication with the given ID was not found.'));
            }
          },
          (_, error) => reject(error),
        );
      });
    });
  }
}
