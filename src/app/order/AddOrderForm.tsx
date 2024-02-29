'use client'

import { revalidatePathAction } from '@/utils/revalidateAction'
import { SubmitHandler } from 'react-hook-form'
import { SERVER } from '@/utils/constants'
import OrderForm, { Order } from './OrderForm'
import { SelectOption } from '@/components/Select'

export default function AddOrderForm({
  options,
}: {
  options: {
    clientOptions: SelectOption[]
    productOptions: SelectOption[]
  }
}) {
  const onSubmit: SubmitHandler<Order> = async order => {
    try {
      await fetch(`${SERVER}/api/order`, {
        body: JSON.stringify(order),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      await revalidatePathAction('/order')
    } catch (e) {
      const error = e as Error
      console.log(error.message)
    }
  }

  return <OrderForm type="Adauga" onSubmit={onSubmit} options={options} />
}
