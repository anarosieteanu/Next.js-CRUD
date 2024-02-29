'use client'

import { Button } from '@/components/Button'
import { SERVER } from '@/utils/constants'
import { revalidatePathAction } from '@/utils/revalidateAction'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type SubmitHandler } from 'react-hook-form'
import OrderForm, { Order } from '../OrderForm'
import { SelectOption } from '@/components/Select'

type EditFormProps = {
  order: Order
  orderId: number
  options: {
    clientOptions: SelectOption[]
    productOptions: SelectOption[]
  }
}

export default function EditOrderForm({
  order,
  orderId,
  options,
}: EditFormProps) {
  const router = useRouter()
  const onSubmit: SubmitHandler<Order> = async order => {
    try {
      await fetch(`${SERVER}/api/order`, {
        body: JSON.stringify({ order, orderId }),
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      await revalidatePathAction('/oredr')
      router.push('/order')
    } catch (e) {
      const error = e as Error
      console.log(error.message)
    }
  }
  return (
    <main className="mx-auto flex flex-col gap-5 rounded-md border bg-blue-400 p-5 pb-10 shadow-lg transition-colors ease-out sm:w-[600px]">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Editeaza Comanda</h1>
        <Button variant="ghost" asChild>
          <Link href="/order">
            <ArrowLeft className="h-auto w-7" />
            Back
          </Link>
        </Button>
      </div>
      <OrderForm
        type="Editeaza"
        onSubmit={onSubmit}
        defaultValues={order}
        options={options}
      />
    </main>
  )
}
