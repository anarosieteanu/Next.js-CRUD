import { Button } from '@/components/Button'
import { getSelectOptions } from '@/utils/getSelectOptions'
import Link from 'next/link'
import AddOrderForm from './AddOrderForm'
import OrderTable from './OrderTable'

export default async function OrderPage() {
  const selectOptions = await getSelectOptions()
  return (
    <main className="flex flex-col gap-9 bg-gray-300">
      <Button asChild className="w-min self-center">
        <Link href="/">Home</Link>
      </Button>
      <OrderTable />
      <AddOrderForm options={selectOptions.payload} />
    </main>
  )
}
