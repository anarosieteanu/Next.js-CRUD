import { Order } from '@/app/order/OrderForm'
import { SelectOption } from '@/components/Select'
import { sql } from '@/db'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const order: Order = await req.json()
    const query =
      'INSERT INTO comanda(id_client, id_produs, status) VALUES(?, ?, ?)'
    const values = [
      order.client.id_client,
      order.produs.id_produs,
      order.status,
      ,
    ]
    await sql({ query, values })

    return Response.json({ message: 'Comanda adaugata' }, { status: 201 })
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
    const body: { order: Order; orderId: number } = await req.json()
    const updateOrderValues = {
      id_client: body.order.client.id_client,
      id_produs: body.order.produs.id_produs,
      status: body.order.status,
      id_comanda: body.orderId,
    }

    await sql({
      query:
        'UPDATE comanda SET id_client = ?, id_produs = ?, status = ? WHERE id_comanda = ?;',
      values: Object.values(updateOrderValues),
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
      query: 'DELETE FROM comanda WHERE id_comanda = ?',
      values: [body.rowId],
    })

    return Response.json({ message: 'Comanda stearsa' }, { status: 200 })
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

export async function GET() {
  try {
    const clients = await sql({
      query: 'SELECT id_client, nume, prenume FROM client;',
    })
    const clientOptions = getClientOptions(clients)

    const products = await sql({
      query: 'SELECT id_produs, denumire FROM produs;',
    })
    const productOptions = getProductOptions(products)

    return Response.json(
      { payload: { clientOptions, productOptions } },
      { status: 200 }
    )
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

function getClientOptions(clients: any): SelectOption[] {
  return clients.map((client: any) => ({
    value: {
      nume: client.nume,
      prenume: client.prenume,
      id_client: client.id_client,
    },
    label: client.nume + ' ' + client.prenume,
  }))
}

function getProductOptions(products: any): SelectOption[] {
  return products.map((product: any) => ({
    value: {
      denumire: product.denumire,
      id_produs: product.id_produs,
    },
    label: product.denumire,
  }))
}
