import Link from 'next/link'
import ProductTable from './ProductTable'
import { Button } from '@/components/Button'
import AddProductForm from './AddProductForm'

export default function ProductPage() {
  return (
    <main className="flex flex-col gap-9 bg-gray-300">
      <Button asChild className="w-min self-center">
        <Link href="/">Home</Link>
      </Button>
      <ProductTable />
      <AddProductForm />
    </main>
  )
}
