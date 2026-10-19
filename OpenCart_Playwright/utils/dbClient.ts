type QueryResult = any;

export default class DbClient {
  private connected = false;
  private conn: any = null;
  private mysqlLib: any = null;

  /**
   * Connect to MySQL using `mysql2/promise` if available.
   * Accepts an optional config object (host, port, user, password, database).
   */
  async connect(config?: { host?: string; port?: number; user?: string; password?: string; database?: string }): Promise<void> {
    try {
      // dynamic import so the project doesn't fail if mysql2 isn't installed
      this.mysqlLib = await import('mysql2/promise');
    } catch (err) {
      // mysql2 not installed — keep stub behavior but surface a clear error on query
      this.connected = true; // allow lifecycle methods to run but mark no real connection
      this.conn = null;
      return;
    }

    const cfg = Object.assign({ host: 'localhost', port: 3306, user: 'root', password: '', database: 'openshop' }, config || {});
    this.conn = await this.mysqlLib.createConnection({ host: cfg.host, port: cfg.port, user: cfg.user, password: cfg.password, database: cfg.database });
    this.connected = true;
  }

  async disconnect(): Promise<void> {
    if (this.conn && typeof this.conn.end === 'function') {
      await this.conn.end();
    }
    this.connected = false;
    this.conn = null;
  }

  async query(sql: string, params: any[] = []): Promise<QueryResult> {
    if (!this.connected) {
      throw new Error('DbClient not connected. Call connect() first.');
    }

    if (!this.conn) {
      throw new Error('mysql2 is not installed or connection not established. Install mysql2 and provide DB config to use real DB queries.');
    }

    // using execute to get [rows, fields]
    const [rows] = await this.conn.execute(sql, params);
    return rows;
  }
}
