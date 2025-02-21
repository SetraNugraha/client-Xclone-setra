/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom"

export const HandleError = ({ isError, message, component }: any) => {
  if (isError) {
    console.error(component, message)
    return (
      <div className="text-white bg-black h-dvh text-lg font-semibold text-center pt-10">
        <p className="mb-5">Unexpected error occured, Try to refresh page or </p>
        <Link to={"/"} className="p-2 bg-red-500 text-white font-semibold text-center rounded-lg hover:bg-red-700">
          Go to homepage
        </Link>
      </div>
    )
  }
}
