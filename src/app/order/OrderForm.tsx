'use client'
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'
import { Button } from '@/components/Button'
import Select, { type SelectOption } from '@/components/Select'

export type Order = {
  client: {
    id_client: number
    nume: string
    prenume: string
  }
  produs: {
    id_produs: number
    denumire: string
  }
  status: string
}

type OrderFormProps = {
  type: 'Adauga' | 'Editeaza'
  onSubmit: SubmitHandler<Order>
  options: {
    clientOptions: SelectOption[]
    productOptions: SelectOption[]
  }
  defaultValues?: Order
}

export default function OrderForm({
  type,
  onSubmit,
  options,
  defaultValues,
}: OrderFormProps) {
  const methods = useForm<Order>({
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
        <Select
          name="client"
          label="Client"
          errorMessage="Alegeti un client"
          options={options?.clientOptions}
          defaultValue={defaultClient(
            options.clientOptions,
            defaultValues?.client
          )}
        />
        <Select
          name="produs"
          label="Produs"
          errorMessage="Alegeti un produs"
          options={options?.productOptions}
          defaultValue={defaultProduct(
            options.productOptions,
            defaultValues?.produs
          )}
        />
        <Select
          name="status"
          label="Status"
          errorMessage="Status trebuie pus"
          options={stateOptions}
          defaultValue={defaultStatus(defaultValues?.status)}
        />

        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={type === 'Editeaza' && !isDirty}>
          {type} Comanda
        </Button>
      </form>
    </FormProvider>
  )
}

function defaultClient(options: SelectOption[], defaultValue?: any) {
  if (!defaultValue) return
  return options.find(
    // @ts-expect-error e ok
    option => option?.value?.id_client === defaultValue.id_client
  )
}

function defaultProduct(options: SelectOption[], defaultValue: any) {
  if (!defaultValue) return
  return options.find(
    // @ts-expect-error e ok
    option => option?.value.id_produs === defaultValue.id_produs
  )
}

function defaultStatus(defaultValue: any) {
  if (!defaultValue) return
  return stateOptions.find(option => option.value === defaultValue)
}

const stateOptions: SelectOption[] = [
  {
    value: 'In procesare',
    label: 'In procesare',
  },
  {
    value: 'Preluata',
    label: 'Preluata',
  },
  {
    value: 'In curs de livrare',
    label: 'In curs de livrare',
  },
  {
    value: 'Livrata',
    label: 'Livrata',
  },
]
