'use client'

import { Button } from '@/components/Button'
import Input from '@/components/Input'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

export type Product = {
  denumire: string
  pret: number
  stoc: number
  data_primire?: string
}

type ClientFormProps = {
  type: 'Adauga' | 'Editeaza'
  onSubmit: SubmitHandler<Product>
  defaultValues?: Product
}

export default function ProductForm({
  onSubmit,
  type,
  defaultValues,
}: ClientFormProps) {
  const methods = useForm<Product>({
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
          label="Denumire"
          name="denumire"
          placeholder="masa"
          registerOptions={{ required: 'Introduceti denumirea' }}
        />
        <Input
          label="Pret"
          name="pret"
          inputMode="numeric"
          placeholder="100 (lei)"
          registerOptions={{
            required: 'Introduceti un pret',
            valueAsNumber: true,
          }}
        />
        <Input
          label="Stoc"
          name="stoc"
          inputMode="numeric"
          placeholder="20 (buc)"
          registerOptions={{
            required: 'Stoc trebuie pus',
            valueAsNumber: true,
          }}
        />

        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={type === 'Editeaza' && !isDirty}>
          {type} Produs
        </Button>
      </form>
    </FormProvider>
  )
}
