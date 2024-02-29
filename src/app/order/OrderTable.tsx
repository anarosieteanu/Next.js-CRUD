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
export default async function OrderTable() {
  const comenzi = await sql({
    query:
      'SELECT id_comanda, nume, prenume, denumire, status FROM companie.comanda JOIN client USING(id_client) JOIN produs USING(id_produs);',
  })
  return (
    <div className="mx-10 font-semibold">
      <div className="flex w-full items-center justify-between rounded-t-lg bg-teal-600/80 p-5">
        <h2>Comenzi</h2>
      </div>
      <div className="h-0.5 border-t-0 bg-white"></div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id_comanda</TableHead>
            <TableHead>Nume</TableHead>
            <TableHead>Prenume</TableHead>
            <TableHead>Denumire</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comenzi.map((comanda: any) => (
            <TableRow key={comanda.id_comanda} className="relative">
              <TableCell>{comanda.id_comanda}</TableCell>
              <TableCell>{comanda.nume}</TableCell>
              <TableCell>{comanda.prenume}</TableCell>
              <TableCell>{comanda.denumire}</TableCell>
              <TableCell>{comanda.status}</TableCell>
              <TableCell>
                <EditButton href={`/order/${comanda.id_comanda}`} />
                <DeleteButton rowId={comanda.id_comanda} urlPath="order" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
