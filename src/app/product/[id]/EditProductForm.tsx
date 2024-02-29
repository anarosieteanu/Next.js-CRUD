'use client'

import { Button } from '@/components/Button'
import { SERVER } from '@/utils/constants'
import { revalidatePathAction } from '@/utils/revalidateAction'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type SubmitHandler } from 'react-hook-form'
import ProductForm, { Product } from '../ProductForm'

type EditFormProps = {
  product: Product
  productId: number
}

export default function EditProductForm({ product, productId }: EditFormProps) {
  const router = useRouter()
  const onSubmit: SubmitHandler<Product> = async product => {
    try {
      await fetch(`${SERVER}/api/product`, {
        body: JSON.stringify({ product, productId }),
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      await revalidatePathAction('/product')
      router.push('/product')
    } catch (e) {
      const error = e as Error
      console.log(error.message)
    }
  }
  return (
    <main className="mx-auto flex flex-col gap-5 rounded-md border bg-blue-400 p-5 pb-10 shadow-lg transition-colors ease-out sm:w-[600px]">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Editeaza Produs</h1>
        <Button variant="ghost" asChild>
          <Link href="/product">
            <ArrowLeft className="h-auto w-7" />
            Back
          </Link>
        </Button>
      </div>
      <ProductForm
        type="Editeaza"
        onSubmit={onSubmit}
        defaultValues={product}
      />
    </main>
  )
}
