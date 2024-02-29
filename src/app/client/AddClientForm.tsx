'use client'

import { revalidatePathAction } from '@/utils/revalidateAction'
import ClientForm, { Client } from './ClientForm'
import { SubmitHandler } from 'react-hook-form'
import { SERVER } from '@/utils/constants'

export default function AddClientForm() {
  const onSubmit: SubmitHandler<Client> = async client => {
    try {
      // Trimitem catre api clientul nou
      await fetch(`${SERVER}/api/client`, {
        body: JSON.stringify(client),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      // Revalidam pagina
      await revalidatePathAction('/client')
    } catch (e) {
      const error = e as Error
      console.log(error.message)
    }
  }

  return <ClientForm type="Adauga" onSubmit={onSubmit} />
}
