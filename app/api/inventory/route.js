import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET(request) {
  try {
    // UPDATED: Query the 'inventory' table
    const { rows } = await pool.query('SELECT * FROM inventory ORDER BY id ASC');
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 });
  }
}

// ... (keep the GET function as is) ...

export async function POST(request) {
  try {
    const { name, quantity } = await request.json();
    const result = await pool.query(
      'INSERT INTO inventory (name, quantity) VALUES ($1, $2) RETURNING *',
      [name, quantity]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error inserting item:', error);
    return NextResponse.json({ error: 'Failed to insert item' }, { status: 500 });
  }
}