import { promises as fs } from 'fs';
import { resolve } from 'path';

export default class DataReader {
  static async readJson<T>(relativePath: string): Promise<T> {
    const p = resolve(process.cwd(), relativePath);
    const raw = await fs.readFile(p, 'utf-8');
    return JSON.parse(raw) as T;
  }

  static async readCsv(relativePath: string): Promise<string[][]> {
    const p = resolve(process.cwd(), relativePath);
    const raw = await fs.readFile(p, 'utf-8');
    const lines = raw.split(/\r?\n/).filter(Boolean);
    return lines.map(line => line.split(',').map(cell => cell.trim()));
  }
}
