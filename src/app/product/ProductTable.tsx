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
export default async function ProductTable() {
  const produse = await sql({
    query: 'SELECT * FROM produs ORDER BY id_produs DESC;',
  })
  return (
    <div className="mx-10 rounded-lg border bg-teal-600/50 font-semibold">
      <div className="flex w-full items-center justify-between rounded-t-lg bg-teal-600/80 p-5">
        <h2>Produse</h2>
      </div>
      <div className="h-0.5 border-t-0 bg-white"></div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id_produs</TableHead>
            <TableHead>Denumire</TableHead>
            <TableHead>Pret</TableHead>
            <TableHead>Stoc</TableHead>
            <TableHead>Data_primire</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {produse.map((produs: any) => (
            <TableRow key={produs.id_produs} className="relative">
              <TableCell>{produs.id_produs}</TableCell>
              <TableCell>{produs.denumire}</TableCell>
              <TableCell>{produs.pret}</TableCell>
              <TableCell>{produs.stoc}</TableCell>
              <TableCell>{produs.data_primire.toDateString()}</TableCell>
              <TableCell>
                <EditButton href={`/product/${produs.id_produs}`} />
                <DeleteButton rowId={produs.id_produs} urlPath="product" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
