import { Button } from '@/components/Button'
import { sql } from '@/db'
import Link from 'next/link'

export default async function HomePage() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-5">
      <h1 className="text-4xl font-bold">PIBD</h1>
      <h2 className="text-2xl font-bold">Selectati Tabela</h2>
      <div className="flex gap-5">
        <Button asChild size="lg">
          <Link href="/client">Clienti</Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/product">Produse</Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/order">Comenzi</Link>
        </Button>
      </div>
    </main>
  )
}
