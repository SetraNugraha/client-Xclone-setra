import { AiOutlineThunderbolt } from "react-icons/ai"
import { FiSearch } from "react-icons/fi"
import { IoNotificationsOutline, IoBookmarkOutline } from "react-icons/io5"
import { LuMail } from "react-icons/lu"
import { IoIosSquareOutline } from "react-icons/io"
import { BsPeople } from "react-icons/bs"
import { RiTwitterXLine } from "react-icons/ri"
import { CiCircleMore } from "react-icons/ci"
import { SlOptions } from "react-icons/sl"

// Icons Clear
import { GoHome, GoHomeFill } from "react-icons/go"
import { IoPersonOutline, IoPersonSharp } from "react-icons/io5"

import { Link, useLocation, useNavigate } from "react-router-dom"
import { trendings } from "../dummyData/trending"
import { formatNumberToK } from "../utils/footerPostNumber"
import { useState } from "react"
import { useAuth } from "../Auth/useAuth"

type SidebarProps = {
  children: React.ReactNode
}

type MenuLeftBar = {
  path: string
  title: string
  iconOutline: JSX.Element
  iconFilled: JSX.Element
}

export const Sidebar = ({ children }: SidebarProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [buttonLogout, setButtonLogout] = useState<boolean>(false)
  const menuLeftBar: MenuLeftBar[] = [
    {
      path: "/",
      title: "Home",
      iconOutline: <GoHome />,
      iconFilled: <GoHomeFill />,
    },
    {
      path: "#",
      title: "Explore",
      iconOutline: <FiSearch />,
      iconFilled: <FiSearch />,
    },
    {
      path: "#",
      title: "Notification",
      iconOutline: <IoNotificationsOutline />,
      iconFilled: <IoNotificationsOutline />,
    },
    {
      path: "#",
      title: "Message",
      iconOutline: <LuMail />,
      iconFilled: <LuMail />,
    },
    {
      path: "#",
      title: "Grok",
      iconOutline: <IoIosSquareOutline />,
      iconFilled: <IoIosSquareOutline />,
    },
    {
      path: "#",
      title: "Bookmark",
      iconOutline: <IoBookmarkOutline />,
      iconFilled: <IoBookmarkOutline />,
    },
    {
      path: "#",
      title: "Communities",
      iconOutline: <BsPeople />,
      iconFilled: <BsPeople />,
    },
    {
      path: "#",
      title: "Premium",
      iconOutline: <RiTwitterXLine />,
      iconFilled: <RiTwitterXLine />,
    },
    {
      path: "#",
      title: "Verified Orgs",
      iconOutline: <AiOutlineThunderbolt />,
      iconFilled: <AiOutlineThunderbolt />,
    },
    {
      path: "/profile",
      title: "Profile",
      iconOutline: <IoPersonOutline />,
      iconFilled: <IoPersonSharp />,
    },
    {
      path: "#",
      title: "More",
      iconOutline: <CiCircleMore />,
      iconFilled: <CiCircleMore />,
    },
  ]

  const name = user?.name.split(" ")
  const normalizeName = !name ? "Undefined Name" : name[0] + " " + name[1]

  const handleLogout = async () => {
    const isConfirmLogout: boolean = confirm("Are you sure want to logout ?")

    if (isConfirmLogout) {
      try {
        await logout()
        navigate("/auth")
        alert("Logout success")
      } catch (error) {
        console.error("handleLogout error: ", error)
      }
    }
  }

  return (
    <section className="bg-black h-screen overflow-hidden">
      <div className="flex h-full mx-80 ">
        {/* Left Bar */}
        <div className="mt-2 w-1/5 h-screen overflow-hidden flex flex-col justify-between">
          {/* Logo */}
          <Link to={"/"} className="absolute">
            <RiTwitterXLine size={40} className="filter invert ml-2" />
          </Link>

          {/* Menu */}
          <div className="mt-12 flex flex-col gap-y-3 mr-10">
            {menuLeftBar.map((menu, index) => {
              const isActive: boolean = location.pathname === menu.path
              return (
                <Link
                  key={index}
                  to={menu.path}
                  className="relative group text-white flex items-center gap-x-5 px-3 py-2">
                  {/* Hover Background */}
                  <span className="absolute bg-slate-100/20 rounded-3xl inset-0 opacity-0 group-hover:opacity-100"></span>

                  {/* Icon */}
                  <i className="text-[25px] z-10">{isActive ? menu.iconFilled : menu.iconOutline}</i>

                  {/* Title */}
                  <span
                    className={`text-xl z-10 tracking-wide ${
                      isActive ? "font-bold text-white" : "font-normal text-slate-300"
                    }`}>
                    {menu.title}
                  </span>
                </Link>
              )
            })}

            <button className="bg-white p-3 rounded-3xl font-bold tracking-wider mt-3 hover:opacity-70">Post</button>
          </div>

          {/* Profile */}
          <button
            onClick={() => setButtonLogout(!buttonLogout)}
            className="relative group mb-10 py-2 pr-5 mr-2 flex items-center justify-between">
            {/* Hover background */}
            <span className=" absolute w-full h-full rounded-[3rem] group-hover:bg-slate-700/40"></span>

            {/* Image & Username */}
            <div className="z-10 flex items-center gap-x-3 pl-2">
              {/* Image */}
              <div>
                <img
                  src={user?.profileImage ? user.profileImage : "assets/img/blank-profile.png"}
                  alt="profile-image"
                  className="size-10 rounded-full"
                />
              </div>

              {/* Name & Username */}
              <div className="text-start">
                <p className="text-white font-bold text-sm pl-1">{normalizeName}</p>
                <p className="text-slate-500 text-sm">@{user?.username}</p>
              </div>
            </div>

            {/* Button Option */}
            <div className="text-white z-10">
              <SlOptions />
            </div>
          </button>
        </div>

        {/* Logout Section */}
        {buttonLogout && (
          <section className="absolute top-[44.2rem] left-[19rem] w-[18rem]">
            <div className="border border-slate-500/30 shadow-lg rounded-xl shadow-slate-700/50 py-3 bg-black">
              <button className="text-white font-bold w-full hover:bg-slate-400/20 text-start px-3 py-2">
                Add an existing account
              </button>
              <button
                onClick={handleLogout}
                className="text-white font-bold w-full hover:bg-slate-400/20 text-start px-3 py-2">
                Logout {user?.username}
              </button>
            </div>
          </section>
        )}

        {/* Main / Center */}
        <main className="w-1/2 overflow-y-scroll scrollbar-hide border-x border-slate-800">{children}</main>

        {/* Right Bar */}
        <div className="w-1/4 mt-2 h-screen overflow-y-scroll scrollbar-hide mx-5 mb-5">
          {/* Input Search */}
          <div className="relative m-2">
            <FiSearch size={20} className="absolute top-1/2 -translate-y-1/2 left-8 text-slate-400" />
            <input
              type="text"
              placeholder="Search"
              className="py-3 px-16 bg-slate-800 text-slate-400 rounded-[3rem] w-full focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Card Subscribe Premium */}
          <div className="text-white ring-1 ring-slate-600 mx-2 px-3 py-3 rounded-2xl mt-5 flex flex-col gap-y-3">
            <h1 className="font-bold text-xl">Subscribe to Premium</h1>
            <p className="text-sm">Subscribe to unlock new features and if eligible, receive a share of revenue.</p>
            <button className="bg-sky-500 px-5 py-1 font-semibold tracking-wider rounded-[3rem] self-start hover:opacity-70">
              Subscribe
            </button>
          </div>

          {/* News */}
          <div className="text-white ring-1 ring-slate-600 mx-2 p-5 rounded-2xl mt-5 flex flex-col gap-y-3">
            <h1 className="font-bold text-xl">What's Happening</h1>

            <div className="flex items-start gap-x-5 w-[90%]">
              <img src="assets/img/snorlax.png" alt="news-image" className="rounded-[14px] size-20" />
              <div>
                <h1 className="font-bold uppercase">snorlax is still sleeping</h1>
                <p className="text-slate-500 text-sm">December 5, 2024</p>
              </div>
            </div>

            {/* Trendings */}
            {trendings.map((trending, index) => (
              <div key={index} className="flex items-start justify-between mt-2">
                {/* Text */}
                <div>
                  <p className="text-slate-500 text-sm">Trending in {trending.location}</p>
                  <Link to={"#"} className="font-bold text-lg tracking-wider hover:opacity-70">
                    {trending.title}
                  </Link>
                  <p className="text-slate-500 text-sm">{formatNumberToK(trending.totalPosts)} posts</p>
                </div>

                {/* Button Option */}
                <Link to={"#"} className="mt-2">
                  <SlOptions size={20} className="text-slate-500" />
                </Link>
              </div>
            ))}

            {/* Button Show More */}
            <a href="#" className="text-blue-500 mt-3 hover:underline">
              Show more
            </a>
          </div>

          {/* Recommend to Follow */}
          <div className="ring-1 ring-slate-600 rounded-2xl mx-2 mt-5 mb-7">
            <h1 className="font-bold text-xl text-white mb-2 px-5 pt-5">Who to follow</h1>

            {/* Wrapper Account */}
            <div className="flex flex-col gap-y-3">
              {/* Account 1 */}
              <Link to={"#"} className="relative flex items-center justify-between group py-2">
                {/* Hover Background */}
                <span className="absolute group-hover:bg-slate-700/20 w-full h-full"></span>
                <div className="flex items-center gap-x-2 px-5 z-10">
                  {/* Profile Image */}
                  <Link to={"#"}>
                    <img
                      src="assets/img/snorlax.png"
                      alt="profile-image"
                      className="size-9 rounded-full hover:opacity-80"
                    />
                  </Link>

                  {/* Name & Username */}
                  <Link to={"#"} className="flex flex-col items-start">
                    <p className="font-bold text-white hover:underline">Snorlax</p>
                    <p className="text-slate-500 text-sm">@snorlaxxx22</p>
                  </Link>
                </div>

                {/* Button Follow */}
                <div className="pr-5 z-10">
                  <button className="px-2 py-1 text-sm font-bold rounded-[2rem] bg-white hover:opacity-80">
                    Follow
                  </button>
                </div>
              </Link>

              {/* Account 2 */}
              <Link to={"#"} className="relative flex items-center justify-between group py-2">
                {/* Hover Background */}
                <span className="absolute group-hover:bg-slate-700/20 w-full h-full"></span>
                <div className="flex items-center gap-x-2 px-5 z-10">
                  {/* Profile Image */}
                  <Link to={"#"}>
                    <img
                      src="assets/img/download.jpeg"
                      alt="profile-image"
                      className="size-9 rounded-full hover:opacity-80"
                    />
                  </Link>

                  {/* Name & Username */}
                  <Link to={"#"} className="flex flex-col items-start">
                    <p className="font-bold text-white hover:underline">Budiono Siregar</p>
                    <p className="text-slate-500 text-sm">@kapalbudiono66212</p>
                  </Link>
                </div>

                {/* Button Follow */}
                <div className="pr-5 z-10">
                  <button className="px-2 py-1 text-sm font-bold rounded-[2rem] bg-white hover:opacity-80">
                    Follow
                  </button>
                </div>
              </Link>

              {/* Account 3 */}
              <Link to={"#"} className="relative flex items-center justify-between group py-2">
                {/* Hover Background */}
                <span className="absolute group-hover:bg-slate-700/20 w-full h-full"></span>
                <div className="flex items-center gap-x-2 px-5 z-10">
                  {/* Profile Image */}
                  <Link to={"#"}>
                    <img
                      src="assets/img/example-post-img.jpg"
                      alt="profile-image"
                      className="size-9 rounded-full hover:opacity-80"
                    />
                  </Link>

                  {/* Name & Username */}
                  <Link to={"#"} className="flex flex-col items-start">
                    <p className="font-bold text-white hover:underline">Rusli Hadi</p>
                    <p className="text-slate-500 text-sm">@hadirusli2212</p>
                  </Link>
                </div>

                {/* Button Follow */}
                <div className="pr-5 z-10">
                  <button className="px-2 py-1 text-sm font-bold rounded-[2rem] bg-white hover:opacity-80">
                    Follow
                  </button>
                </div>
              </Link>
            </div>

            {/* Button Show More */}
            <div>
              <button className="text-blue-500 hover:underline mt-5 px-5 pb-5 ">Show more</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
