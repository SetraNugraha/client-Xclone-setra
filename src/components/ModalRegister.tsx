import { useCallback, useState } from "react"
import { FormInput } from "../UI/FormInput"

// Icons
import { FaXTwitter } from "react-icons/fa6"
import { IoCloseSharp } from "react-icons/io5"
import { IoIosArrowDown } from "react-icons/io"
import { useAuth } from "../Auth/useAuth"

interface ModalRegisterProps {
  onClose: () => void
}

export default function ModalRegister({ onClose }: ModalRegisterProps) {
  const { register, registerState, setRegisterState } = useAuth()
  const months = [
    "January",
    "February",
    "March",
    "April",
    "Mei",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    day: "",
    month: "",
    year: "",
  })

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement
    setForm((prevState) => ({ ...prevState, [name]: value }))
  }, [])

  const handleCloseModalRegister = () => {
    setRegisterState((prevState) => ({ ...prevState, hasError: { path: "", message: "" } }))
    onClose()
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const result = await register(form)
      if (result?.success) {
        alert("Register success")
        onClose()
        setRegisterState((prevState) => ({ ...prevState, hasError: { path: "", message: "" } }))
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert("Unexpected error occured, Please try again later.")
      }
    }
  }

  return (
    <section className="fixed inset-0 bg-slate-200/20">
      {/* Container Modal */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-black w-[40rem] rounded-2xl">
        {/* Header  */}
        <div className="flex items-center justify-between px-5 pt-3">
          <button onClick={handleCloseModalRegister} className="p-2 rounded-full hover:bg-slate-400/20">
            <IoCloseSharp className="size-7 text-white " />
          </button>
          <FaXTwitter className="size-9 text-white" />
          <span></span>
        </div>

        {/* Form Signup */}
        <div className="px-20 mt-10">
          <h1 className="font-bold text-3xl text-white">Create your account</h1>
          <form onSubmit={handleRegister} className="mt-5 pb-10 flex flex-col gap-y-5">
            {/* Input Name */}
            <FormInput
              label="Name"
              type="name"
              name="name"
              id="name"
              maxLength={25}
              spanInfo={`Max: ${form.name.length}/25`}
              value={form.name}
              hasError={registerState.hasError}
              onChange={handleChange}
            />

            {/* Input Email */}
            <FormInput
              label="Email"
              type="email"
              name="email"
              id="email"
              value={form.email}
              hasError={registerState.hasError}
              onChange={handleChange}
            />

            {/* Input Password */}
            <FormInput
              label="Password"
              type="password"
              name="password"
              id="password"
              spanInfo="Min: 6"
              value={form.password}
              hasError={registerState.hasError}
              onChange={handleChange}
            />

            {/* Input Confirm Password */}
            <FormInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              spanInfo="Min: 6"
              value={form.confirmPassword}
              hasError={registerState.hasError}
              onChange={handleChange}
            />

            {/* Date of Birth Text */}
            <div className="flex flex-col gap-y-2">
              <h1 className="text-white font-bold">Date of birth</h1>
              <p className="text-sm text-slate-600">
                This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or
                something else.
              </p>
            </div>

            {/* Date of birth Option */}
            <div className="flex items-center justify-between gap-2">
              {/* Month */}
              <div className="w-1/2 relative group">
                <label
                  htmlFor="month"
                  className="text-slate-500 absolute text-sm left-2 top-1 group-focus-within:text-sky-600">
                  Month
                </label>
                <select
                  name="month"
                  id="month"
                  onChange={handleChange}
                  className="bg-black w-full h-14 cursor-pointer border border-slate-600 rounded-sm focus:outline-none focus:border-2 focus:border-sky-600 group text-white appearance-none pt-4 pl-2 font-semibold">
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <IoIosArrowDown className="size-6 absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-600 pointer-events-none" />
              </div>

              {/* Day */}
              <div className="w-1/4 relative group">
                <label
                  htmlFor="day"
                  className="text-slate-500 absolute text-sm left-2 top-1 group-focus-within:text-sky-600">
                  Day
                </label>
                <select
                  name="day"
                  id="day"
                  onChange={handleChange}
                  className="bg-black w-full h-14 cursor-pointer border border-slate-600 rounded-sm focus:outline-none focus:border-2 focus:border-sky-600 group text-white appearance-none pt-4 pl-2 font-semibold">
                  {Array.from({ length: 31 }, (_, day) => (
                    <option key={day + 1} value={day + 1}>
                      {day + 1}
                    </option>
                  ))}
                </select>
                <IoIosArrowDown className="size-6 absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-600 pointer-events-none" />
              </div>

              {/* Year */}
              <div className="w-1/3 relative group">
                <label
                  htmlFor="year"
                  className="text-slate-500 absolute text-sm left-2 top-1 group-focus-within:text-sky-600">
                  Year
                </label>
                <select
                  name="year"
                  id="year"
                  onChange={handleChange}
                  className="bg-black w-full h-14 cursor-pointer border border-slate-600 rounded-sm focus:outline-none focus:border-2 focus:border-sky-600 group text-white appearance-none pt-4 pl-2 font-semibold">
                  {Array.from({ length: 55 }, (_, i) => {
                    const year = new Date().getFullYear() - i
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    )
                  })}
                </select>
                <IoIosArrowDown className="size-6 absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-600 pointer-events-none" />
              </div>
            </div>

            {/* Button Next Flow */}
            <button
              disabled={Object.values(form).some((value) => !value) || registerState.isLoading}
              className="p-3 disabled:bg-slate-100/30 bg-blue-500 text-white rounded-3xl hover:bg-blue-500/70 font-bold tracking-wider mt-10">
              {registerState.isLoading ? "Loading ..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
