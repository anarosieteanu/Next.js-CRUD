'use client'
import { SERVER } from '@/utils/constants'
import { revalidatePathAction } from '@/utils/revalidateAction'
import { X } from 'lucide-react'
import { Button } from './Button'

type DeleteButtonProps = {
  rowId: number
  urlPath: string
}

export default function DeleteButton({ rowId, urlPath }: DeleteButtonProps) {
  async function DeleteRow() {
    try {
      await fetch(`${SERVER}/api/${urlPath}`, {
        body: JSON.stringify({ rowId }),
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      await revalidatePathAction('/')
    } catch (e) {
      const error = e as Error
      console.log(error.message)
    }
  }

  return (
    <form onSubmit={DeleteRow}>
      <Button
        variant="ghost"
        title="Sterge"
        className="absolute right-2 top-2 rounded-full border-0 p-2 hover:bg-red-500 hover:text-black focus-visible:bg-red-500 focus-visible:text-black focus-visible:ring-0">
        <X className="h-auto w-5" strokeWidth={2.5} />
      </Button>
    </form>
  )
}
