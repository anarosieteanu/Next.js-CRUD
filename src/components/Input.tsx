import { cn } from "@/lib/cn"
import { InputHTMLAttributes, ReactNode } from "react"
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form"
import InputError from "./InputError"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  registerOptions?: RegisterOptions<FieldValues, string> | undefined
  children?: ReactNode
}

export default function Input({
  name,
  label,
  registerOptions,
  children,
  ...props
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const error = errors[name]

  return (
    <div className="relative space-y-2">
      <label htmlFor={name}>
        <p className="pl-1 text-sm font-semibold">{label}</p>
      </label>
      <input
        id={name}
        aria-invalid={!!error}
        className={cn(
          "flex w-full rounded-lg border bg-white px-3 py-2 text-sm outline-0 transition-colors duration-500 ease-out focus-visible:ring-1",
          error
            ? "border-red-600 focus-visible:border-red-600 focus-visible:ring-red-600"
            : "focus-visible:ring-black ",
        )}
        {...register(name, registerOptions)}
        {...props}
      />
      {children}
      <InputError message={error?.message as string} />
    </div>
  )
}
