import { FilePenLine } from 'lucide-react'
import { Button } from './Button'
import Link from 'next/link'

type EditButtonProps = {
  href: string
}
export default function EditButton({ href }: EditButtonProps) {
  return (
    <Button
      asChild
      variant="ghost"
      title="Editeaza"
      className="absolute left-11 top-2 rounded-full border-0 p-2 hover:bg-orange-400 hover:text-black focus-visible:text-orange-400 focus-visible:ring-0">
      <Link href={href}>
        <FilePenLine className="h-auto w-5" strokeWidth={2.5} />
      </Link>
    </Button>
  )
}
