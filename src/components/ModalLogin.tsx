import { useCallback, useState } from "react"
import { OtherLogin } from "./OtherLogin"
import ModalRegister from "./ModalRegister"
import { FaXTwitter } from "react-icons/fa6"
import { IoCloseSharp } from "react-icons/io5"
import { useAuth } from "../Auth/useAuth"
import { useNavigate } from "react-router-dom"
import { FormInput } from "../UI/FormInput"

interface ModalLoginProps {
  onClose: () => void
}

export default function ModalLogin({ onClose }: ModalLoginProps) {
  const navigate = useNavigate()
  const { login, loginState, setLoginState } = useAuth()
  const [modalRegister, setModalRegister] = useState<boolean>(false)

  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  })

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement

    setForm((prevState) => ({ ...prevState, [name]: value }))
  }, [])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const result = await login(form)

      if (result && result.userId) {
        setForm({
          email: "",
          password: "",
        })

        navigate("/")
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert("Login Error!, Please try again later.")
      }
    }
  }

  const handleCloseModalLogin = () => {
    setLoginState({ ...loginState, hasError: { path: "", message: "" } })
    onClose()
  }

  return (
    <section className="fixed inset-0 bg-slate-200/20">
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-black w-[35rem] rounded-2xl">
        {/* Header  */}
        <div className="flex items-center justify-between px-5 pt-3">
          <button onClick={handleCloseModalLogin} className="p-2 rounded-full hover:bg-slate-400/20">
            <IoCloseSharp className="size-7 text-white " />
          </button>
          <FaXTwitter className="size-9 text-white" />
          <span></span>
        </div>

        {/* Form Signup */}
        <div className="px-20 mt-10">
          <form onSubmit={handleLogin} className="mt-5 pb-10 flex flex-col gap-y-5 px-10">
            <h1 className="font-bold text-3xl text-white">Sign in to X</h1>
            {/* Other Login */}
            <OtherLogin />

            {/* Input Email */}
            <FormInput
              label="Email"
              type="email"
              name="email"
              id="email"
              value={form.email}
              hasError={loginState.hasError}
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
              hasError={loginState.hasError}
              onChange={handleChange}
            />

            {/* Button Next Flow */}
            <button
              disabled={!form.email || !form.password || loginState.isLoading}
              className="p-3 disabled:bg-slate-100/30 bg-blue-500 text-white hover:bg-blue-500/70 rounded-3xl font-bold tracking-wider mt-3">
              {loginState.isLoading ? "Loading ..." : "Login"}
            </button>
          </form>

          <p className="text-slate-100/30 text-center mb-14 -mt-5">
            Dont't have an account ?{" "}
            <span>
              <button onClick={() => setModalRegister(true)} className="text-blue-500 hover:underline">
                Sign up
              </button>
            </span>
          </p>
        </div>
      </div>

      {modalRegister && <ModalRegister onClose={() => setModalRegister(false)} />}
    </section>
  )
}
