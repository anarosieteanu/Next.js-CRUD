'use client'

import { revalidatePathAction } from '@/utils/revalidateAction'
import { SubmitHandler } from 'react-hook-form'
import { SERVER } from '@/utils/constants'
import ProductForm, { Product } from './ProductForm'

export default function AddProductForm() {
  const onSubmit: SubmitHandler<Product> = async product => {
    try {
      // Trimitem catre api produs nou
      await fetch(`${SERVER}/api/product`, {
        body: JSON.stringify(product),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      // Revalidam pagina
      await revalidatePathAction('/product')
    } catch (e) {
      const error = e as Error
      console.log(error.message)
    }
  }

  return <ProductForm type="Adauga" onSubmit={onSubmit} />
}
