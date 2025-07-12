import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET(request) {
  try {
    const { rows } = await pool.query('SELECT * FROM inventory ORDER BY id ASC');
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, quantity } = await request.json();

    if (!name || quantity === undefined) {
      return NextResponse.json({ error: 'Name and quantity are required.' }, { status: 400 });
    }

    const result = await pool.query(
      'INSERT INTO inventory (name, quantity) VALUES ($1, $2) RETURNING *',
      [name, quantity]
    );

    return NextResponse.json(result.rows[0], { status: 201 });

  } catch (error) {
    if (error.code === '23505') {
      return NextResponse.json(
        { error: `An item with the name '${error.constraint.split('_')[2]}' already exists.` },
        { status: 409 }
      );
    }
    
    console.error('Error inserting item:', error);
    return NextResponse.json({ error: 'Failed to insert item due to a server error.' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, quantity } = await request.json();

    if (id === undefined || quantity === undefined) {
      return NextResponse.json({ error: 'Item ID and quantity are required.' }, { status: 400 });
    }

    const result = await pool.query(
      'UPDATE inventory SET quantity = $1 WHERE id = $2 RETURNING *',
      [quantity, id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });

  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json({ error: 'Failed to update item due to a server error.' }, { status: 500 });
  }
}
