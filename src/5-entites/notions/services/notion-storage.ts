import { DB_NAME } from '6-shared/constants/sql';
import { Storage, logger } from '6-shared';

class NotionsStorage extends Storage {
  constructor(dbName: string) {
    super(dbName);
    this.init();
  }

  async init() {
    await this.executeSql(`
        CREATE TABLE IF NOT EXISTS notions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            medicationId INTEGER NOT NULL,
            createdAt TEXT NOT NULL,
            FOREIGN KEY (medicationId) REFERENCES medications(id) ON DELETE CASCADE
        );
    `);
    logger.log('Notions table initialized.');
  }

  /**
   * Adds a new notion to the database.
   * @param {Pick<Entities.Notion, 'text' | 'medicationId'>} data Data for the new notion.
   * @returns {Promise<Entities.Notion>} The newly created notion.
   */
  async addNotion(data: Pick<Entities.Notion, 'text' | 'medicationId'>): Promise<Entities.Notion> {
    const sqlStatement = `INSERT INTO notions (text, medicationId, createdAt) VALUES (?, ?, ?)`;
    const currentDateISO = new Date().toISOString();
    const args = [data.text, data.medicationId, currentDateISO];
    try {
      const insertId = await this.insert(sqlStatement, args);
      logger.log(`Notion added with ID: ${insertId}`);
      return {
        id: String(insertId),
        text: data.text,
        medicationId: data.medicationId,
        createdAt: currentDateISO,
      };
    } catch (error) {
      logger.error('Failed to add notion:', error);
      throw error;
    }
  }

  /**
   * Retrieves all notions associated with a specific medication.
   * @param {Pick<Entities.Medication, 'id'>} data Identifying information of the medication.
   * @returns {Promise<Entities.Notion[]>} A list of notions for the medication.
   */
  async getMedicationNotions(data: Pick<Entities.Medication, 'id'>): Promise<Entities.Notion[]> {
    const sqlStatement = `SELECT * FROM notions WHERE medicationId = ? ORDER BY createdAt DESC`;
    try {
      const notions = await this.query(sqlStatement, [data.id]);
      logger.log(`Found ${notions.length} notions for medication ID: ${data.id}`);
      return notions;
    } catch (error) {
      logger.error('Failed to retrieve notions:', error);
      throw error;
    }
  }

  /**
   * Retrieves notices grouped by medication sections.
   * This method fetches all notions and groups them by the medication they are associated with.
   * @returns {Promise<Entities.NoticeSection[]>} A promise that resolves to an array of notice sections.
   */
  async getMedicationSectionNotices(): Promise<Entities.NoticeSection[]> {
    const sqlStatement = `
          SELECT m.id as medicationId, m.name, n.text, n.createdAt 
          FROM notions n
          JOIN medications m ON m.id = n.medicationId
          ORDER BY n.createdAt DESC`;
    try {
      const rows = await this.query(sqlStatement);
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
      logger.log(`Found ${noticeSections.length} medication sections with notices.`);
      return noticeSections;
    } catch (error) {
      logger.error('Failed to retrieve medication section notices:', error);
      throw error;
    }
  }
}

const notionsStorage = new NotionsStorage(DB_NAME);

export default notionsStorage;
