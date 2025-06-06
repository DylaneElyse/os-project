// app/api/inventory/route.js
import pool from '@/lib/db'; // Corrected import path
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM inventory');
    const inventory = result.rows;
    client.release(); // Release the client back to the pool
    return NextResponse.json({ inventory });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return NextResponse.json({ error: 'Failed to fetch inventory' }, { status: 500 });
  }
}

// --- POST Function (add this) ---
export async function POST(request) {
  let client;
  try {
    // 1. Get the form data from the request body
    const { item_name, quantity } = await request.json();

    // 2. Basic validation
    if (!item_name || !quantity) {
      return NextResponse.json(
        { error: 'Item name and quantity are required.' },
        { status: 400 }
      );
    }

    // 3. Connect to the database
    client = await pool.connect();

    // 4. Use a parameterized query to prevent SQL injection
    const query = 'INSERT INTO inventory (item_name, quantity) VALUES ($1, $2) RETURNING *';
    const values = [item_name, quantity];

    const result = await client.query(query, values);

    // 5. Send back the newly created item
    return NextResponse.json(
      { newItem: result.rows[0] },
      { status: 201 } // 201 means "Created"
    );

  } catch (error) {
    console.error('Error inserting item:', error);
    return NextResponse.json(
      { error: 'Failed to insert item into inventory.' },
      { status: 500 }
    );
  } finally {
    // 6. Make sure to release the client back to the pool
    if (client) {
      client.release();
    }
  }
}