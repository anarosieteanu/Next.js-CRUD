import { notFound } from 'next/navigation'
import EditClientForm from './EditClientForm'
import { sql } from '@/db'
import { Client } from '../ClientForm'

type PageProps = {
  params: { id: string }
}

export default async function EditPage({ params: { id } }: PageProps) {
  const clientId = Number(id)
  if (!clientId) notFound()

  const [client] = (await sql({
    query:
      'SELECT nume, prenume, nr_telefon, email FROM client WHERE id_client = ?;',
    values: [clientId],
  })) as unknown as Client[]

  return <EditClientForm client={client!} clientId={clientId} />
}
