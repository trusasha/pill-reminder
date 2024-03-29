import { DB_NAME, STORAGE_KEYS } from '6-shared/constants/sql';
import { Storage, logger } from '6-shared';

class MedicationsStorage extends Storage {
  constructor(dbName: string) {
    super(dbName);
    this.init();
  }

  async init() {
    await this.executeSql(`
        CREATE TABLE IF NOT EXISTS ${STORAGE_KEYS.medications} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            description TEXT,
            initialCount INTEGER DEFAULT 0,
            currentCount INTEGER DEFAULT 0,
            destinationCount INTEGER,
            createdAt TEXT NOT NULL,
            updatedAt TEXT NOT NULL
        );
    `);
    logger.log('Medications table initialized.');
  }

  async addMedication(
    data: Omit<Entities.Medication, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Entities.Medication> {
    const { name, description, initialCount, currentCount, destinationCount } = data;
    const currentDateISO = new Date().toISOString();

    const sqlStatement = `
      INSERT INTO medications (name, description, initialCount, currentCount, destinationCount, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    try {
      const insertId = await this.insert(sqlStatement, [
        name,
        description,
        initialCount,
        currentCount,
        destinationCount,
        currentDateISO,
        currentDateISO,
      ]);
      logger.log(`Medication added with ID: ${insertId}`);

      return {
        id: insertId.toString(),
        name,
        description: description || '',
        initialCount,
        currentCount,
        destinationCount,
        createdAt: currentDateISO,
        updatedAt: currentDateISO,
      };
    } catch (error) {
      logger.error('Failed to add medication:', error);
      throw error;
    }
  }

  async getAllMedications() {
    const sqlStatement = `SELECT * FROM ${STORAGE_KEYS.medications} ORDER BY name`;
    try {
      const medications = await this.query(sqlStatement);
      return medications;
    } catch (error) {
      logger.error('Failed to retrieve medications:', error);
      throw error;
    }
  }

  async getMedication({ id }: Pick<Entities.Medication, 'id'>): Promise<Entities.Medication> {
    const sqlStatement = `SELECT * FROM ${STORAGE_KEYS.medications} WHERE id = ?`;

    try {
      const medications = await this.query(sqlStatement, [id]);
      if (medications.length === 0) {
        throw new Error(`Medication with the given ID (${id}) was not found.`);
      }

      const medication = medications[0];
      return {
        ...medication,
        id: medication.id.toString(),
        description: medication.description || '',
      };
    } catch (error) {
      logger.error('Failed to retrieve medication:', error);
      throw error;
    }
  }

  async incrementMedication({ id }: Pick<Entities.Medication, 'id'>): Promise<Entities.Medication> {
    try {
      await this.executeSql(
        `UPDATE ${STORAGE_KEYS.medications} SET currentCount = currentCount + 1 WHERE id = ?`,
        [id],
      );
      return this.getMedication({ id });
    } catch (error) {
      logger.error('Failed to increment medication count:', error);
      throw error;
    }
  }

  async decrementMedication({ id }: Pick<Entities.Medication, 'id'>): Promise<Entities.Medication> {
    try {
      await this.executeSql(
        `UPDATE ${STORAGE_KEYS.medications} SET currentCount = CASE WHEN currentCount > 0 THEN currentCount - 1 ELSE 0 END WHERE id = ?`,
        [id],
      );
      return this.getMedication({ id });
    } catch (error) {
      logger.error('Failed to decrement medication count:', error);
      throw error;
    }
  }

  async deleteMedication({ id }: Pick<Entities.Medication, 'id'>): Promise<boolean> {
    try {
      const result = await this.executeSql(`DELETE FROM ${STORAGE_KEYS.medications} WHERE id = ?`, [id]);
      return result !== null; // Если результат выполнения не null, значит операция успешна
    } catch (error) {
      logger.error(`Failed to delete medication with ID ${id}:`, error);
      throw error;
    }
  }

  async updateMedication(
    data: Pick<Entities.Medication, 'id'> & Partial<Omit<Entities.Medication, 'id'>>,
  ): Promise<Entities.Medication> {
    const { id, ...fieldsToUpdate } = data;
    const fields = Object.keys(fieldsToUpdate)
      .map(key => `${key} = ?`)
      .join(', ');
    const values = Object.values(fieldsToUpdate);

    try {
      await this.executeSql(
        `UPDATE ${STORAGE_KEYS.medications} SET ${fields}, updatedAt = ? WHERE id = ?`,
        [...values, new Date().toISOString(), id],
      );
      return this.getMedication({ id });
    } catch (error) {
      logger.error(`Failed to update medication with ID ${id}:`, error);
      throw error;
    }
  }
}

const medicationsStorage = new MedicationsStorage(DB_NAME);

export default medicationsStorage;
