import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET(request) {
  try {
    // UPDATED: Query the 'inventory' table
    const { rows } = await pool.query('SELECT * FROM inventory ORDER BY item_id ASC');
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { item_name, quantity } = await request.json();
    // UPDATED: Insert into the 'inventory' table
    const result = await pool.query(
      'INSERT INTO inventory (item_id, item_name, quantity) VALUES (DEFAULT, $1, $2) RETURNING *',
      [item_name, quantity]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error inserting item:', error);
    return NextResponse.json({ error: 'Failed to insert item' }, { status: 500 });
  }
}