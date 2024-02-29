export default function InputError({
  message,
}: {
  message: string | undefined
}) {
  return (
    <span className="block pl-1 font-semibold text-red-600 dark:font-medium">
      {message}
    </span>
  )
}
