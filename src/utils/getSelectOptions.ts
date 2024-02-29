import { SelectOption } from '@/components/Select'
import { SERVER } from './constants'

export type OptionsResponse = {
  payload: {
    clientOptions: SelectOption[]
    productOptions: SelectOption[]
  }
}

export async function getSelectOptions(): Promise<OptionsResponse> {
  return await fetch(`${SERVER}/api/order`, {
    cache: 'no-store',
  }).then(res => res.json())
}
