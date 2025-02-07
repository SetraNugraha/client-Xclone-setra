import { useEffect, useState } from "react"

// Icons
import { FaXTwitter } from "react-icons/fa6"
import { IoCloseSharp } from "react-icons/io5"
import { IoIosArrowDown } from "react-icons/io"

interface ModalRegisterProps {
  onClose: () => void
}

interface InputFocus {
  name: boolean
  email: boolean
  password: boolean
  confirmPassword: boolean
}

interface Birthday {
  month: string
  day: string
  year: string
}

export default function ModalRegister({ onClose }: ModalRegisterProps) {
  const [inputFocus, setInputFocus] = useState<InputFocus>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  })

  const [birthdayForm, setBirthdayForm] = useState<Birthday>({
    day: "",
    month: "",
    year: "",
  })

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    birthday: "",
    confirmPassword: "",
  })

  useEffect(() => {
    setForm((prevState) => ({
      ...prevState,
      birthday: `${birthdayForm.day}-${birthdayForm.month}-${birthdayForm.year}`,
    }))
  }, [birthdayForm])

  const handleFocus = (field: keyof InputFocus) => {
    setInputFocus((prevState) => ({ ...prevState, [field]: true }))
  }

  const handleBlur = (field: keyof InputFocus) => {
    setInputFocus((prevState) => ({ ...prevState, [field]: false }))
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement

    if (["day", "month", "year"].includes(name)) {
      setBirthdayForm((prevState) => ({ ...prevState, [name]: value }))
    } else {
      setForm((prevState) => ({ ...prevState, [name]: value }))
    }
  }

  useEffect(() => {
    console.log("form: ", form)
  }, [form])

  return (
    <section className="fixed inset-0 bg-slate-200/20">
      {/* Container Modal */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-black w-[40rem] rounded-2xl">
        {/* Header  */}
        <div className="flex items-center justify-between px-5 pt-3">
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-400/20">
            <IoCloseSharp className="size-7 text-white " />
          </button>
          <FaXTwitter className="size-9 text-white" />
          <span></span>
        </div>

        {/* Form Signup */}
        <div className="px-20 mt-10">
          <h1 className="font-bold text-3xl text-white">Create your account</h1>
          <form action="" className="mt-5 pb-10 flex flex-col gap-y-5">
            {/* Input Name */}
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                className="w-full text-white px-3 pt-3 h-16 bg-black border border-slate-700 rounded-md focus:outline-none focus:border-2 focus:border-sky-500 transition-colors peer"
                onFocus={() => handleFocus("name")}
                onBlur={() => handleBlur("name")}
                value={form.name}
                onChange={handleChange}
              />
              <label
                htmlFor="name"
                className={`absolute transition-all peer-focus:text-sm peer-focus:left-3 peer-focus:text-sky-500 ${
                  form.name.length > 0 && !inputFocus.name
                    ? "top-1 left-3 text-slate-500 text-sm"
                    : "left-3 top-1/2 -translate-y-1/2 text-xl text-slate-500 peer-focus:top-4"
                }`}>
                Name
              </label>
              {/* Name length */}
              {inputFocus.name && (
                <span className={`text-sm absolute top-1.5 right-3 text-slate-500`}>{form.name.length} / 50</span>
              )}
            </div>

            {/* Input Email */}
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                className="w-full text-white px-3 pt-3 h-16 bg-black border border-slate-700 rounded-md focus:outline-none focus:border-2 focus:border-sky-500 transition-colors peer"
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
                value={form.email}
                onChange={handleChange}
              />
              <label
                htmlFor="email"
                className={`absolute transition-all peer-focus:text-sm peer-focus:left-3 peer-focus:text-sky-500 ${
                  form.email.length > 0 && !inputFocus.email
                    ? "top-1 left-3 text-slate-500 text-sm"
                    : "left-3 top-1/2 -translate-y-1/2 text-xl text-slate-500 peer-focus:top-4"
                }`}>
                Email
              </label>
            </div>

            {/* Input Password */}
            <div className="relative">
              <input
                type="text"
                id="password"
                name="password"
                className="w-full text-white px-3 pt-3 h-16 bg-black border border-slate-700 rounded-md focus:outline-none focus:border-2 focus:border-sky-500 transition-colors peer"
                onFocus={() => handleFocus("password")}
                onBlur={() => handleBlur("password")}
                value={form.password}
                onChange={handleChange}
              />
              <label
                htmlFor="password"
                className={`absolute transition-all peer-focus:text-sm peer-focus:left-3 peer-focus:text-sky-500 ${
                  form.password.length > 0 && !inputFocus.password
                    ? "top-1 left-3 text-slate-500 text-sm"
                    : "left-3 top-1/2 -translate-y-1/2 text-xl text-slate-500 peer-focus:top-4"
                }`}>
                Password
              </label>
              {/* Password length */}
              {inputFocus.password && <span className={`text-sm absolute top-1.5 right-3 text-slate-500`}>Min: 6</span>}
            </div>

            {/* Input Confirm Password */}
            <div className="relative">
              <input
                type="text"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full text-white px-3 pt-3 h-16 bg-black border border-slate-700 rounded-md focus:outline-none focus:border-2 focus:border-sky-500 transition-colors peer"
                onFocus={() => handleFocus("confirmPassword")}
                onBlur={() => handleBlur("confirmPassword")}
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <label
                htmlFor="confirmPassword"
                className={`absolute transition-all peer-focus:text-sm peer-focus:left-3 peer-focus:text-sky-500 ${
                  form.confirmPassword.length > 0 && !inputFocus.confirmPassword
                    ? "top-1 left-3 text-slate-500 text-sm"
                    : "left-3 top-1/2 -translate-y-1/2 text-xl text-slate-500 peer-focus:top-4"
                }`}>
                Confirm Password
              </label>
            </div>

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
                  {[
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
                  ].map((month, index) => (
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
            <button disabled={true} className="p-3 disabled:bg-slate-100/30 rounded-3xl font-bold tracking-wider mt-10">
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
