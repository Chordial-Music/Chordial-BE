import pool from '../utils/pool.js';

export default class Sequences {
  id;
  userId;
  sequence;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.sequence = row.sequence;
  }

  static async create({ userId, sequence }) {
    const { rows } = await pool.query(`
      INSERT INTO sequences (user_id, sequence) VALUES ($1, $2) RETURNING *`
      , [userId, sequence])

    return new Sequences(rows[0])
  }

  static async findAll() {
    const { rows } = await pool.query(`
    SELECT  s.id, sequence, user_id AS "userId"
    FROM sequences s
    JOIN users u
    ON s.user_id = u.id;
    `,);

    return rows.map(row => new Sequences(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(`
    SELECT * FROM sequences WHERE id = $1`, [id]);
    return new Sequences(rows[0]);
  }

  static async update(sequence, id) {
    const { rows } = await pool.query(`
    UPDATE sequences
    SET sequence = $1,
        user_id = $2
    WHERE id = $3
    RETURNING *`,
    [sequence.userId, sequence.sequence, id]
    );
  return new Sequences(rows[0])
}

  static async delete(id) {
    const { rows } = await pool.query(`
      DELETE FROM sequences
      WHERE id = $1
      RETURNING *`,
      [id]
    );
    return new Sequences(rows[0]);
  }
}