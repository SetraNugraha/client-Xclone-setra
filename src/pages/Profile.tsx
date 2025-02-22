import { useParams, useNavigate } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { TiArrowLeft } from "react-icons/ti"
import { LuCalendarDays } from "react-icons/lu"
import { useState } from "react"
import { CardPost } from "../components/CardPost"
import { usePosts } from "../hooks/usePosts"
import { useUsers } from "../hooks/useUsers"
import { useAuth } from "../Auth/useAuth"
import { HandleError } from "../components/HandleError"
import { IoCloseSharp } from "react-icons/io5"
import { BsTrash3Fill } from "react-icons/bs"

export default function Profile() {
  const navigate = useNavigate()
  const { user: AuthUser } = useAuth()
  const { userId } = useParams()
  const { data: user } = useUsers(userId)
  const { data: posts, isLoading, isError, error } = usePosts(undefined, userId)
  const [modalProfileImage, setModalProfileImage] = useState<boolean>(false)

  const [activeMenu, setActiveMenu] = useState<string>("Posts")
  const menuProfile = [
    {
      id: "Posts",
      title: "Posts",
    },
    {
      id: "Replies",
      title: "Replies",
    },
    {
      id: "Highlights",
      title: "Highlights",
    },
    {
      id: "Articles",
      title: "Articles",
    },
    {
      id: "Media",
      title: "Media",
    },
    {
      id: "Likes",
      title: "Likes",
    },
  ]

  if (isError) {
    return <HandleError isError={isError} message={error?.message} component={"Profile page error: "} />
  }

  if (!posts) return

  return (
    <Sidebar>
      <section>
        {/* Header */}
        <div className="flex items-center gap-x-5 py-1 px-5 border-b border-slate-600">
          {/* Button Back */}
          <button onClick={() => navigate(-1)} className="hover:opacity-70">
            <TiArrowLeft className="size-7 text-white" />
          </button>

          {/* Name & Total Posts */}
          <div className="">
            <h1 className="font-bold text-lg text-white">{user?.name}</h1>
            <p className="text-sm text-slate-500 -mt-1">{posts.length} posts</p>
          </div>
        </div>

        {/* Banner Image */}
        <div className="bg-gray-700 h-48 border-b border-slate-600">
          <img src="/assets/img/download.jpeg" alt="banner-image" className="w-full h-full object-cover" />
        </div>

        {/* Detail Profile */}
        <div className="mx-5">
          {/* Profile Image & Button Edit Profile*/}
          <div className="relative w-full">
            {/* PROFILE IMAGE */}
            <img onClick={() => setModalProfileImage(true)} src={user?.profileImage ? user.profileImage : "/assets/img/blank-profile.png"} alt="profile-image" className="size-28 rounded-full ring-[3px] ring-black absolute -top-16 hover:brightness-75 cursor-pointer" />

            {/* EDIT PROFILE BUTTON */}
            {AuthUser?.userId === userId && <button className="px-3 py-1 border border-slate-400 font-bold text-white text-sm rounded-[3rem] absolute right-0 top-2">Edit Profile</button>}
          </div>

          {/* Name */}
          <div className="flex flex-col gap-y-3 pt-16">
            <div>
              <h1 className="text-lg text-white font-bold">{user?.name}</h1>
              <p className="text-slate-500 text-sm">@{user?.username}</p>
            </div>
            <p className="flex items-center gap-x-2 text-slate-500 text-sm">
              <LuCalendarDays /> Joined December 2024
            </p>
          </div>

          {/* Total Follower & Following */}
          <div className="flex items-center gap-x-5 mt-2 text-sm">
            <p className="font-bold text-white">
              0 <span className="text-slate-500 font-normal">Following</span>
            </p>
            <p className="font-bold text-white">
              0 <span className="text-slate-500 font-normal">Follower</span>
            </p>
          </div>

          {/* Menu  */}
          <div className="flex items-center justify-between mt-7 border-b border-slate-600 -mx-5">
            {menuProfile.map((menu, index) => {
              const isActive: boolean = menu.id === activeMenu
              return (
                <button key={index} className={`${isActive ? "text-white font-bold" : "text-slate-500"} relative hover:bg-slate-700/30 p-3 px-5`} onClick={() => setActiveMenu(menu.id)}>
                  {menu.title}
                  {isActive && <span className="absolute bottom-0 left-0 w-full border-2 border-blue-500"></span>}
                </button>
              )
            })}
          </div>
        </div>

        {/* Reder Posts */}
        {isLoading ? (
          <div className="text-white text-lg font-semibold text-center mt-10">Loading ....</div>
        ) : !posts || posts.length === 0 ? (
          <div className="text-white text-center font-semibold mt-2">No Posts</div>
        ) : (
          posts.map((post, index) => {
            return <CardPost key={index} post={post} />
          })
        )}
      </section>

      {/* MODAL UPDATE PROFILE IMAGE */}
      {modalProfileImage && (
        <section className="fixed inset-0 bg-slate-200/20 z-50">
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-black w-[22rem] rounded-2xl px-5 pb-3">
            {/* Header  */}
            <div className="py-2 flex items-center justify-between">
              <button onClick={() => setModalProfileImage(false)} className="p-2 rounded-full hover:bg-slate-400/20 ">
                <IoCloseSharp className="size-7 text-white " />
              </button>
              <button className="text-white bg-red-500 p-2 rounded-lg font-semibold hover:bg-red-700">
                <BsTrash3Fill size={18} />
              </button>
            </div>

            {/* PROFILE IMAGE */}
            <div className="my-2 flex flex-col items-center gap-y-3">
              <div className="relative">
                <label htmlFor="update-profile-image" className="cursor-pointer hover:brightness-75">
                  <img src="/assets/img/snorlax.png" alt="profile-image" className="size-64 rounded-full" />
                </label>
                <input hidden type="file" name="profileImage" id="update-profile-image" />
              </div>
              <p className="text-white font-semibold max-w-56 flex flex-col items-center">
                New File : <span className="font-normal">Snorlax.png</span>
              </p>
            </div>

            {/* BUTTON SUBMIT */}
            <div className="place-self-center my-5">
              <button className="text-white bg-blue-500 px-3 py-2 font-semibold rounded-lg hover:bg-blue-700">Update Profile</button>
            </div>
          </div>
        </section>
      )}
    </Sidebar>
  )
}
