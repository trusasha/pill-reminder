import * as SQLite from 'expo-sqlite';
import logger from 'utils/logger';

/**
 * Base storage class to handle SQLite operations.
 * This class provides protected methods to execute SQL queries including insert, update, delete, and query operations.
 */
class Storage {
  /**
   * Database instance.
   * @protected
   */
  protected db: SQLite.SQLiteDatabase;

  /**
   * Creates an instance of the storage class.
   * @param {string} dbName The name of the database.
   */
  constructor(dbName: string) {
    this.db = SQLite.openDatabase(dbName, undefined, undefined, undefined, db => {
      logger.deep('Database: ', db);
    });
  }

  /**
   * Executes a SQL statement without returning any result.
   * This method is suitable for `CREATE`, `DROP`, `ALTER`, and other SQL statements
   * that do not return rows.
   *
   * @protected
   * @param {string} sqlStatement The SQL statement to execute.
   * @param {any[]} [args=[]] Arguments for the SQL statement.
   * @returns {Promise<void>} A promise that resolves when the execution is complete.
   */
  protected executeSql(sqlStatement: string, args: any[] = []): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          sqlStatement,
          args,
          () => {
            resolve();
          },
          (_, error) => {
            logger.error('Error executing SQL:', error);
            reject(error);
            return true;
          },
        );
      });
    });
  }

  /**
   * Executes a SQL query and returns the result set.
   * This method is suitable for `SELECT` statements or others that return data.
   *
   * @protected
   * @param {string} sqlStatement The SQL query to execute.
   * @param {any[]} [args=[]] Arguments for the SQL query.
   * @returns {Promise<any[]>} A promise that resolves with the query result array.
   */
  protected query(sqlStatement: string, args: any[] = []): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          sqlStatement,
          args,
          (_, resultSet) => {
            resolve(resultSet.rows._array);
          },
          (_, error) => {
            logger.error('Error querying SQL:', error);
            reject(error);
            return true;
          },
        );
      });
    });
  }

  /**
   * Inserts data into the database and returns the ID of the inserted row.
   *
   * @protected
   * @param {string} sqlStatement The SQL insert statement.
   * @param {any[]} args Arguments for the insert statement.
   * @returns {Promise<number>} A promise that resolves with the ID of the inserted row.
   */
  protected insert(sqlStatement: string, args: any[]): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          sqlStatement,
          args,
          (_, result) => {
            result.insertId && resolve(result.insertId);
          },
          (_, error) => {
            logger.error('Error inserting SQL:', error);
            reject(error);
            return true;
          },
        );
      });
    });
  }

  /**
   * Updates data in the database and returns the number of rows affected.
   *
   * @protected
   * @param {string} sqlStatement The SQL update statement.
   * @param {any[]} args Arguments for the update statement.
   * @returns {Promise<number>} A promise that resolves with the number of rows affected.
   */
  protected update(sqlStatement: string, args: any[]): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.transaction(tx => {
        tx.executeSql(
          sqlStatement,
          args,
          (_, result) => {
            resolve(result.rowsAffected);
          },
          (_, error) => {
            logger.error('Error updating SQL:', error);
            reject(error);
            return true;
          },
        );
      });
    });
  }

  /**
   * Deletes data from the database and returns the number of rows affected.
   * This method utilizes the `update` method for the delete operation, since they share the same signature.
   *
   * @protected
   * @param {string} sqlStatement The SQL delete statement.
   * @param {any[]} args Arguments for the delete statement.
   * @returns {Promise<number>} A promise that resolves with the number of rows affected.
   */
  protected delete(sqlStatement: string, args: any[]): Promise<number> {
    return this.update(sqlStatement, args);
  }
}

export default Storage;
