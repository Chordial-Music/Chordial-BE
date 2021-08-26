import pool from '../utils/pool.js';

export default class Sequences {
  id;
  userId;
  sequence;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.results = row.results;
  }

  static async create({ userId, sequence }) {
    const { rows } = await pool.query(`
      INSERT INTO sequence (user_id, sequence) VALUES ($1, $2) RETURNING *`
      , [userId, sequence])

    return new Sequences(rows[0])
  }
}