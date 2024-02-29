'use client'
import { cn } from '@/lib/cn'
import { useId } from 'react'
import { useController } from 'react-hook-form'
import Select from 'react-select'
import InputError from './InputError'

export type SelectOption = {
  value: string | number | Record<string, unknown> | undefined
  label: string | number | undefined
}

type SelectProps = {
  options: SelectOption[] | undefined
  name: string
  label: string
  errorMessage: string
  defaultValue?: SelectOption
  placeholder?: string
}

export default function SelectInput({
  options,
  name,
  label,
  errorMessage,
  placeholder,
  defaultValue,
  ...props
}: SelectProps) {
  const {
    field: { onChange: hookFormOnChange },
    fieldState: { error },
  } = useController({ name, rules: { required: errorMessage } })
  const instanceId = useId()

  return (
    <div className="relative space-y-2">
      <label htmlFor={name}>
        <p className="pl-1 text-sm font-medium">{label}</p>
      </label>
      <Select
        name={name}
        inputId={name}
        aria-invalid={!!error}
        placeholder={placeholder}
        options={options}
        instanceId={instanceId}
        classNames={{
          control: state =>
            cn(
              '!outline-0 !border',
              error && '!border-red-600',
              state.isFocused && error && '!ring-red-600'
            ),
        }}
        defaultValue={defaultValue}
        className={`react-select-container`}
        classNamePrefix="react-select"
        onChange={selected => hookFormOnChange(selected?.value)}
        {...props}
      />
      <InputError message={error?.message} />
    </div>
  )
}
