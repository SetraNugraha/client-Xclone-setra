import ModalRegister from "../components/ModalRegister";
import ModalLogin from "../components/ModalLogin";
import { OtherLogin } from "../components/OtherLogin";
import { useState } from "react";

type Footer = {
  path: string;
  name: string;
};

export default function Auth() {
  const [modalLogin, setModalLogin] = useState<boolean>(false);
  const [modalRegister, setModalRegister] = useState<boolean>(false);

  const footerMenu: Footer[] = [
    { path: "#", name: "About" },
    { path: "#", name: "Download the X app" },
    { path: "#", name: "Help Center" },
    { path: "#", name: "Terms of Service" },
    { path: "#", name: "Privacy Policy" },
    { path: "#", name: "Cookie Policy" },
    { path: "#", name: "Acessibility" },
    { path: "#", name: "Ads Info" },
    { path: "#", name: "Careers" },
    { path: "#", name: "Brand Resources" },
    { path: "#", name: "Adversiting" },
    { path: "#", name: "Marketing" },
    { path: "#", name: "X for Bussiness" },
    { path: "#", name: "Developers" },
    { path: "#", name: "Directory" },
    { path: "#", name: "Settings" },
    { path: "#", name: "2024 X Corp" },
  ];

  return (
    <section className="bg-black h-screen relative">
      <div className="h-full flex items-center justify-center">
        {/* Left */}
        <div className="h-full w-full">
          {/* Logo */}
          <div className="h-full w-full flex items-center justify-center">
            <img
              src="assets/img/x-logo.png"
              alt="logo"
              className="size-80 filter invert"
            />
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
              <p className="text-[2rem] font-bold text-white mt-10 mb-3">
                Join today.
              </p>

              {/* Other Login */}
              <OtherLogin />

              {/* Create Account */}
              <button
                onClick={() => setModalRegister(true)}
                className="flex items-center justify-center gap-x-3 py-2 font-bold text-white bg-sky-500 rounded-3xl text-lg hover:opacity-90"
              >
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
                <p className="text-white font-semibold">
                  Already have an account?
                </p>
                <button
                  onClick={() => setModalLogin(true)}
                  className="py-2 font-bold text-center bg-black rounded-3xl text-sky-500 ring-1 hover:opacity-90"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-3 flex gap-x-5">
          {footerMenu.map((footer, index) => (
            <a
              key={index}
              href={footer.path}
              className="text-gray-500 hover:text-white hover:underline"
            >
              {footer.name}
            </a>
          ))}
        </div>
      </div>

      {/* Modal Login */}
      {modalLogin && <ModalLogin onClose={() => setModalLogin(false)} />}

      {/* Modal Register */}
      {modalRegister && (
        <ModalRegister onClose={() => setModalRegister(false)} />
      )}
    </section>
  );
}
