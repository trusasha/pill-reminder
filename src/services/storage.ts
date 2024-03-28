import logger from 'utils/logger';
import * as SQLite from 'expo-sqlite';

export interface DatabaseContract {
  isReady: boolean;

  getAllMedications(): Promise<Entities.Medication[]>;
  getMedication(data: Pick<Entities.Medication, 'id'>): Promise<Entities.Medication>;
  addMedication(
    data: Omit<Entities.Medication, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Entities.Medication>;
  incrementMedication(data: Pick<Entities.Medication, 'id'>): Promise<Entities.Medication>;
  decrementMedication(data: Pick<Entities.Medication, 'id'>): Promise<Entities.Medication>;
  deleteMedication(data: Pick<Entities.Medication, 'id'>): Promise<boolean>;
  updateMedication(
    data: Pick<Entities.Medication, 'id'> &
      Partial<Pick<Entities.Medication, 'name' | 'description' | 'currentCount' | 'destinationCount'>>,
  ): Promise<Entities.Medication>;

  addNotion(data: Pick<Entities.Notion, 'text' | 'medicationId'>): Promise<Entities.Notion>;
  getMedicationNotions(data: Pick<Entities.Medication, 'id'>): Promise<Entities.Notion[]>;
  getMedicationSectionNotices(): Promise<Entities.NoticeSection[]>;
}

const STORAGE_KEYS = {
  medications: 'medications',
  notions: 'notions',
};

class StorageService implements DatabaseContract {
  private db: SQLite.SQLiteDatabase;

  public isReady = false;

  constructor() {
    this.db = SQLite.openDatabase('db.sqlite', undefined, undefined, undefined, db => {
      logger.deep('Date base: ', db);

      this.init();
    });
  }

  private init() {
    this.db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${STORAGE_KEYS.medications} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(255) UNIQUE,
          description TEXT,
          initialCount INT DEFAULT 0,
          currentCount INT DEFAULT 0,
          destinationCount INT,
          createdAt TEXT,
          updatedAt TEXT
        );`,
        [],
        () => {
          logger.log('Database initialized');
          this.isReady = true;
        },
        (_, error) => {
          logger.error('Database initialization error:', error);
          return true;
        },
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${STORAGE_KEYS.notions} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          text TEXT,
          createdAt TEXT,
          medicationId INTEGER,
          FOREIGN KEY(medicationId) REFERENCES ${STORAGE_KEYS.medications}(id) ON DELETE CASCADE
        );`,
        [],
        () => {
          logger.log('Table notions initialized');
          this.isReady = true;
        },
        (_, error) => {
          logger.error('Error initializing table notions:', error);
          return true;
        },
      );
    });
  }

  public async getAllMedications(): Promise<Entities.Medication[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM ${STORAGE_KEYS.medications} ORDER BY name`,
          [],
          (_, { rows: { _array } }) => {
            resolve(_array);
          },
          (_, error) => {
            reject(error);
            return true;
          },
        );
      });
    });
  }

  public async getMedication({ id }: Pick<Entities.Medication, 'id'>): Promise<Entities.Medication> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM ${STORAGE_KEYS.medications} WHERE id = ?`,
          [id],
          (_, { rows }) => {
            if (rows.length === 0) {
              reject(new Error(`Medication with the given ID (${id}) was not found.`));
              return;
            }

            const medication = rows._array[0];
            resolve(medication);
          },
          (_, error) => {
            reject(error);
            return true;
          },
        );
      });
    });
  }

  public async addMedication(
    data: Omit<Entities.Medication, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Entities.Medication> {
    const currentDateISO = new Date().toISOString();

    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO ${STORAGE_KEYS.medications} (name, description, initialCount, currentCount, destinationCount, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            data.name,
            data.description || null,
            data.initialCount,
            data.currentCount,
            data.destinationCount,
            currentDateISO,
            currentDateISO,
          ],
          (_, results) => {
            const insertedId = results.insertId;

            if (insertedId) {
              const newMedication: Entities.Medication = {
                id: insertedId.toString(),
                createdAt: currentDateISO,
                updatedAt: currentDateISO,
                ...data,
              };
              resolve(newMedication);
            } else {
              reject(new Error('Unexpected error'));
            }
          },
          (_, error) => {
            reject(error);
            return true;
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
          (_, { rows }) => {
            if (rows.length === 0) {
              reject(new Error('Medication with the given ID was not found.'));
              return;
            }

            const medication = rows._array[0];
            const updatedCurrentCount = medication.currentCount + 1;
            const updatedAt = new Date().toISOString();

            tx.executeSql(
              `UPDATE ${STORAGE_KEYS.medications} SET currentCount = ?, updatedAt = ? WHERE id = ?`,
              [updatedCurrentCount, updatedAt, id],
              () => {
                resolve({
                  ...medication,
                  currentCount: updatedCurrentCount,
                  updatedAt,
                });
              },
              (_, error) => {
                reject(error);
                return true;
              },
            );
          },
          (_, error) => {
            reject(error);
            return true;
          },
        );
      });
    });
  }

  public async decrementMedication({
    id,
  }: Parameters<DatabaseContract['decrementMedication']>[0]): ReturnType<
    DatabaseContract['decrementMedication']
  > {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM ${STORAGE_KEYS.medications} WHERE id = ?`,
          [id],
          (_, { rows }) => {
            if (rows.length === 0) {
              reject(new Error('Medication with the given ID was not found.'));
              return;
            }

            const medication = rows._array[0];
            const updatedCurrentCount = Math.max(0, medication.currentCount - 1);
            const updatedAt = new Date().toISOString();

            tx.executeSql(
              `UPDATE ${STORAGE_KEYS.medications} SET currentCount = ?, updatedAt = ? WHERE id = ?`,
              [updatedCurrentCount, updatedAt, id],
              () => {
                resolve({
                  ...medication,
                  currentCount: updatedCurrentCount,
                  updatedAt,
                });
              },
              (_, error) => {
                reject(error);
                return true;
              },
            );
          },
          (_, error) => {
            reject(error);
            return true;
          },
        );
      });
    });
  }

  public async deleteMedication({ id }: Pick<Entities.Medication, 'id'>): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `DELETE FROM ${STORAGE_KEYS.medications} WHERE id = ?`,
          [id],
          (_, result) => {
            if (result.rowsAffected === 0) {
              reject(new Error(`Medication with the given ID (${id}) does not exist.`));
            } else {
              resolve(true);
            }
          },
          (_, error) => {
            reject(error);
            return true;
          },
        );
      });
    });
  }

  public async getMedicationSectionNotices(): Promise<Entities.NoticeSection[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `SELECT m.id as medicationId, m.name, n.text, n.createdAt 
           FROM ${STORAGE_KEYS.medications} m
           JOIN ${STORAGE_KEYS.notions} n ON m.id = n.medicationId
           ORDER BY n.createdAt DESC`,
          [],
          (_, result) => {
            const rows = result.rows._array;
            const noticeSectionsMap = new Map();

            rows.forEach(row => {
              if (!noticeSectionsMap.has(row.medicationId)) {
                noticeSectionsMap.set(row.medicationId, {
                  title: row.name,
                  data: [],
                  medicationId: row.medicationId,
                });
              }
              const section = noticeSectionsMap.get(row.medicationId);
              section.data.push({
                text: row.text,
                createdAt: row.createdAt,
              });
            });

            const noticeSections = Array.from(noticeSectionsMap.values());
            resolve(noticeSections);
          },
          (_, error) => {
            reject(error);
            return true;
          },
        );
      });
    });
  }

  public async addNotion(
    data: Pick<Entities.Notion, 'text' | 'medicationId'>,
  ): Promise<Entities.Notion> {
    const currentDateISO = new Date().toISOString();

    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO ${STORAGE_KEYS.notions} (text, createdAt, medicationId) VALUES (?, ?, ?)`,
          [data.text, currentDateISO, data.medicationId],
          (_, results) => {
            const insertedId = results.insertId;
            if (insertedId) {
              const newNotion: Entities.Notion = {
                id: insertedId.toString(),
                text: data.text,
                createdAt: currentDateISO,
                medicationId: data.medicationId,
              };
              resolve(newNotion);
            } else {
              reject(new Error('Failed to add notion'));
            }
          },
          (_, error) => {
            reject(error);
            return true;
          },
        );
      });
    });
  }

  public async updateMedication(
    data: Pick<Entities.Medication, 'id'> &
      Partial<Pick<Entities.Medication, 'name' | 'description' | 'currentCount' | 'destinationCount'>>,
  ): Promise<Entities.Medication> {
    const { id, ...fieldsToUpdate } = data;
    const currentDateISO = new Date().toISOString();

    let fields = Object.keys(fieldsToUpdate)
      .map(field => `${field} = ?`)
      .join(', ');
    const values = Object.values(fieldsToUpdate);

    if (fields) {
      fields += ', updatedAt = ?';
      values.push(currentDateISO);
    } else {
      fields = 'updatedAt = ?';
      values.push(currentDateISO);
    }

    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `UPDATE ${STORAGE_KEYS.medications} SET ${fields} WHERE id = ?`,
          [...values, id],
          () => {
            tx.executeSql(
              `SELECT * FROM ${STORAGE_KEYS.medications} WHERE id = ?`,
              [id],
              (_, { rows: { _array } }) => {
                if (_array.length > 0) {
                  resolve(_array[0]);
                } else {
                  reject(new Error(`Medication with ID ${id} not found`));
                }
              },
              (_, error) => {
                reject(error);
                return true;
              },
            );
          },
          (_, error) => {
            reject(error);
            return true;
          },
        );
      });
    });
  }

  public async getMedicationNotions({
    id,
  }: Pick<Entities.Medication, 'id'>): Promise<Entities.Notion[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          `SELECT * FROM ${STORAGE_KEYS.notions} WHERE medicationId = ? ORDER BY createdAt DESC`,
          [id],
          (_, { rows: { _array } }) => {
            resolve(_array);
          },
          (_, error) => {
            reject(error);
            return true;
          },
        );
      });
    });
  }
}

const storage = new StorageService();

export default storage;
