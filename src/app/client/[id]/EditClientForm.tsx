'use client'

import { Button } from '@/components/Button'
import { SERVER } from '@/utils/constants'
import { revalidatePathAction } from '@/utils/revalidateAction'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type SubmitHandler } from 'react-hook-form'
import ClientForm, { Client } from '../ClientForm'

type EditFormProps = {
  client: Client
  clientId: number
}

export default function EditClientForm({ client, clientId }: EditFormProps) {
  const router = useRouter()
  const onSubmit: SubmitHandler<Client> = async client => {
    try {
      await fetch(`${SERVER}/api/client`, {
        body: JSON.stringify({ client, clientId }),
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      await revalidatePathAction('/client')
      router.push('/client')
    } catch (e) {
      const error = e as Error
      console.log(error.message)
    }
  }
  return (
    <main className="mx-auto flex flex-col gap-5 rounded-md border bg-blue-400 p-5 pb-10 shadow-lg transition-colors ease-out sm:w-[600px]">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Editeaza Client</h1>
        <Button variant="ghost" asChild>
          <Link href="/client">
            <ArrowLeft className="h-auto w-7" />
            Back
          </Link>
        </Button>
      </div>
      <ClientForm type="Editeaza" onSubmit={onSubmit} defaultValues={client} />
    </main>
  )
}
