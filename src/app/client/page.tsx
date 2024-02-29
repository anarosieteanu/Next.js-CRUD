import Link from 'next/link'
import ClientTable from './ClientTable'
import { Button } from '@/components/Button'
import AddClientForm from './AddClientForm'

export default function ClientPage() {
  return (
    <main className="flex flex-col gap-9 bg-gray-300">
      <Button asChild className="w-min self-center">
        <Link href="/">Home</Link>
      </Button>
      <ClientTable />
      <AddClientForm />
    </main>
  )
}
