import { useState } from "react"

interface InputFormProps {
  label: string
  type: string
  id?: string
  name: string
  value: string
  spanInfo?: string
  onBlur?: () => void
  onFocus?: () => void
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

export const FormInput = ({
  label,
  type = "text",
  id,
  name,
  value,
  spanInfo,
  onBlur,
  onFocus,
  onChange,
}: InputFormProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false)
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        className="w-full text-white text-md px-3 pt-3 h-16 bg-black border border-slate-700 rounded-md focus:outline-none focus:border-2 focus:border-sky-500 transition-colors peer"
        onFocus={() => {
          setIsFocus(true)
          onFocus?.()
        }}
        onBlur={() => {
          setIsFocus(false)
          onBlur?.()
        }}
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor="email"
        className={`absolute transition-all peer-focus:text-sm peer-focus:left-3 peer-focus:to peer-focus:text-sky-500 ${
          value.length > 0
            ? "top-1 left-3 text-slate-500 text-sm"
            : "left-3 top-1/2 -translate-y-1/2 text-xl text-slate-500 peer-focus:top-3.5"
        }`}>
        {label}
      </label>

      {/* Password length */}
      {isFocus && <span className={`text-sm absolute top-1 right-3 text-slate-500`}>{spanInfo}</span>}
    </div>
  )
}
