// @ts-nocheck
import DeleteButton from '@/components/DeleteButton'
import EditButton from '@/components/EditButton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Table'
import { sql } from '@/db'
export default async function ClientTable() {
  const clienti = await sql({
    query: 'SELECT * FROM client ORDER BY id_client DESC;',
  })
  return (
    <div className="mx-10 rounded-lg border font-semibold">
      <div className="flex w-full items-center justify-between rounded-t-lg bg-teal-600/80 p-5">
        <h2>Clienti</h2>
      </div>
      <div className="h-0.5 border-t-0 bg-white"></div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id_client</TableHead>
            <TableHead>Nume</TableHead>
            <TableHead>Prenume</TableHead>
            <TableHead>Nr_Telefon</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clienti.map((client: any) => (
            <TableRow key={client.id_client} className="relative">
              <TableCell>{client.id_client}</TableCell>
              <TableCell>{client.nume}</TableCell>
              <TableCell>{client.prenume}</TableCell>
              <TableCell>{client.nr_telefon}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>
                <EditButton href={`/client/${client.id_client}`} />
                <DeleteButton rowId={client.id_client} urlPath="client" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
