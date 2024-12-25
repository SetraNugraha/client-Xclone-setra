import { Link } from "react-router-dom"
import ModalRegister from "../components/ModalRegister"
import { useState } from "react"

type Footer = {
  path: string
  name: string
}

export default function Auth() {
  const [modalRegister, setModalRegister] = useState<boolean>(false)

  const footerMenu: Footer[] = [
    {
      path: "/about",
      name: "About",
    },
    {
      path: "/download",
      name: "Download the X app",
    },
    {
      path: "/help",
      name: "Help Center",
    },
    {
      path: "/terms",
      name: "Terms of Service",
    },
    {
      path: "/privacy",
      name: "Privacy Policy",
    },
    {
      path: "/cookie",
      name: "Cookie Policy",
    },
    {
      path: "/accessibility",
      name: "Acessibility",
    },
    {
      path: "/ads",
      name: "Ads Info",
    },
    {
      path: "/careers",
      name: "Careers",
    },
    {
      path: "/brand",
      name: "Brand Resources",
    },
    {
      path: "/adversiting",
      name: "Adversiting",
    },
    {
      path: "/marketing",
      name: "Marketing",
    },
    {
      path: "/bussiness",
      name: "X for Bussiness",
    },
    {
      path: "/developers",
      name: "Developers",
    },
    {
      path: "/directory",
      name: "Directory",
    },
    {
      path: "/settings",
      name: "Settings",
    },
    {
      path: "/company",
      name: "2024 X Corp",
    },
  ]
  return (
    <section className="bg-black h-screen relative">
      <div className="h-full flex items-center justify-center">
        {/* Left */}
        <div className="h-full w-full">
          {/* Logo */}
          <div className="h-full w-full flex items-center justify-center">
            <img src="assets/img/x-logo.png" alt="logo" className="size-80 filter invert" />
          </div>
        </div>

        {/* Right */}
        <div className="h-full w-full">
          {/* Form Login */}
          <div className="mt-36">
            {/* Title Text */}
            <div className=" text-white">
              <h1 className="text-[4.5rem] font-bold">Happening now</h1>
            </div>

            {/* Button Login */}
            <div className="relative flex flex-col gap-y-3 w-[350px]">
              <p className="text-[2rem] font-bold text-white mt-10 mb-3">Join today.</p>

              {/* Login Google */}
              <button className="flex items-center justify-center gap-x-3 py-2 font-semibold bg-white rounded-3xl hover:opacity-90">
                <img src="assets/img/google-logo.png" alt="logo-google" className="size-5" />
                Sign up with Google
              </button>

              {/* Login Apple */}
              <button className="flex items-center justify-center gap-x-3 py-2 font-bold bg-white rounded-3xl hover:opacity-90">
                <img src="assets/img/apple-logo.png" alt="logo-google" className="size-5" />
                Sign up with Apple
              </button>

              {/* Or */}
              <div className="flex items-center justify-center text-white">
                <span className="w-full">
                  <hr />
                </span>
                <p className="mx-2 mb-2 text-xl">or</p>
                <span className="w-full">
                  <hr />
                </span>
              </div>

              {/* Create Account */}
              <button
                onClick={() => setModalRegister(true)}
                className="flex items-center justify-center gap-x-3 py-2 font-bold text-white bg-sky-500 rounded-3xl text-lg hover:opacity-90">
                Create account
              </button>

              {/* Term */}
              <div>
                <p className="text-slate-500 text-sm">
                  By signing up, you agree to the{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    Privacy Policy
                  </a>
                  , Including{" "}
                  <a href="#" className="text-blue-500 hover:underline">
                    Cookie Use.
                  </a>
                </p>
              </div>

              {/* Sign in */}
              <div className="flex flex-col gap-y-2 absolute -bottom-32 w-full">
                <p className="text-white font-semibold">Already have an account?</p>
                <Link
                  to={"/"}
                  className="py-2 font-bold text-center bg-black rounded-3xl text-sky-500 ring-1 hover:opacity-90">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-3 flex gap-x-5">
          {footerMenu.map((footer, index) => (
            <a key={index} href={footer.path} className="text-gray-500 hover:text-white hover:underline">
              {footer.name}
            </a>
          ))}
        </div>
      </div>

      {/* Modal Section */}
      {modalRegister && <ModalRegister onClose={() => setModalRegister(false)} />}
    </section>
  )
}
