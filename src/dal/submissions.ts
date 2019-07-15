import {pool} from './connection';

async function getCount(): Promise<number> {
  const [rows] = await pool.query('SELECT count(*) as count FROM submissions');
  return rows[0].count;
}

export {getCount};
