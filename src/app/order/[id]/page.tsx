import { notFound } from 'next/navigation'
import { sql } from '@/db'
import { getSelectOptions } from '@/utils/getSelectOptions'
import EditOrderForm from './EditOrderForm'
import { Order } from '../OrderForm'

type PageProps = {
  params: { id: string }
}

export default async function EditPage({ params: { id } }: PageProps) {
  const orderId = Number(id)
  const selectOptions = await getSelectOptions()
  if (!orderId) notFound()

  const [orderFlat] = (await sql({
    query:
      'SELECT id_client, nume, prenume, id_produs, denumire, status FROM comanda JOIN client USING(id_client) JOIN produs USING(id_produs) WHERE id_comanda = ?;',
    values: [orderId],
  })) as unknown as any[]

  const order: Order = {
    client: {
      id_client: orderFlat.id_client,
      nume: orderFlat.nume,
      prenume: orderFlat.prenume,
    },
    produs: {
      id_produs: orderFlat.id_produs,
      denumire: orderFlat.denumire,
    },
    status: orderFlat.status,
  }

  return (
    <EditOrderForm
      order={order}
      orderId={orderId}
      options={selectOptions.payload}
    />
  )
}
