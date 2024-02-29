import { Product } from '@/app/product/ProductForm'
import { sql } from '@/db'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const product: Product = await req.json()
    const query =
      'INSERT INTO produs(denumire, pret, stoc, data_primire) VALUES (?, ?, ?, ?)'
    await sql({ query, values: [...Object.values(product), new Date()] })

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
    const body: { product: Product; productId: number } = await req.json()

    await sql({
      query:
        'UPDATE produs SET denumire = ?, pret = ?, stoc = ? WHERE id_produs = ?;',
      values: [...Object.values(body.product), body.productId],
    })

    return Response.json({ message: 'Produs editat' }, { status: 200 })
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
      query: 'DELETE FROM produs WHERE id_produs = ?',
      values: [body.rowId],
    })

    return Response.json({ message: 'Produs sters' }, { status: 200 })
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
