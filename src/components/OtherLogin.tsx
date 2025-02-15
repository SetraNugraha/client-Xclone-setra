export const OtherLogin = () => {
  return (
    <>
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
    </>
  )
}
