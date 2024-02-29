'use client'

import { Button } from '@/components/Button'
import Input from '@/components/Input'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

export type Client = {
  nume: string
  prenume: string
  nr_telefon: string
  email: string
}

type ClientFormProps = {
  type: 'Adauga' | 'Editeaza'
  onSubmit: SubmitHandler<Client>
  defaultValues?: Client
}

export default function ClientForm({
  onSubmit,
  type,
  defaultValues,
}: ClientFormProps) {
  const methods = useForm<Client>({
    defaultValues,
  })
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods

  return (
    <FormProvider {...methods}>
      <form
        className="mx-auto flex flex-col gap-5 rounded-md border bg-gray-100 p-5 sm:w-3/4"
        onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nume"
          name="nume"
          placeholder="Blake"
          registerOptions={{ required: 'Introduceti un nume' }}
        />
        <Input
          label="Prenume"
          name="prenume"
          placeholder="Carter"
          registerOptions={{ required: 'Introduceti un prenume' }}
        />
        <Input
          label="Telefon"
          name="nr_telefon"
          placeholder="07"
          registerOptions={{ required: 'Nr de telefon invalid' }}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="blakecart@bc.com"
          registerOptions={{ required: 'Introduceti un email' }}
        />

        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={type === 'Editeaza' && !isDirty}>
          {type} Client
        </Button>
      </form>
    </FormProvider>
  )
}
