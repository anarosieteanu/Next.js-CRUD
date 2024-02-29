import { Client } from '@/app/client/ClientForm'
import { sql } from '@/db'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const client: Client = await req.json()
    const query =
      'INSERT INTO client(nume, prenume, nr_telefon, email) VALUES (?, ?, ?, ?)'
    await sql({ query, values: Object.values(client) })

    return Response.json({ message: 'Client nou adaugat' }, { status: 201 })
  } catch (error) {
    return Response.json(
      {
        message: 'Eroare',
        error,
      },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body: { client: Client; clientId: number } = await req.json()

    await sql({
      query:
        'UPDATE client SET nume = ?, prenume = ?, nr_telefon = ?, email = ? WHERE id_client = ?;',
      values: [...Object.values(body.client), body.clientId],
    })

    return Response.json({ message: 'Client editat' }, { status: 200 })
  } catch (error) {
    return Response.json(
      {
        message: 'Eroare',
        error,
      },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body: { rowId: number } = await req.json()

    await sql({
      query: 'DELETE FROM client WHERE id_client = ?',
      values: [body.rowId],
    })

    return Response.json({ message: 'Client sters' }, { status: 200 })
  } catch (error) {
    return Response.json(
      {
        message: 'Eroare',
        error,
      },
      { status: 500 }
    )
  }
}
