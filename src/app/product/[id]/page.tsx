import { notFound } from 'next/navigation'

import { sql } from '@/db'
import EditProductForm from './EditProductForm'
import { Product } from '../ProductForm'

type PageProps = {
  params: { id: string }
}

export default async function EditPage({ params: { id } }: PageProps) {
  const productId = Number(id)
  if (!productId) notFound()

  const [product] = (await sql({
    query: 'SELECT denumire, pret, stoc FROM produs WHERE id_produs = ?;',
    values: [productId],
  })) as unknown as Product[]

  return <EditProductForm product={product!} productId={productId} />
}
