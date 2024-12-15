import { useState } from "react"
import { Sidebar } from "../components/Sidebar"
import { MdOutlineGifBox } from "react-icons/md"

import { VscSettings } from "react-icons/vsc"
import { BsEmojiSmile } from "react-icons/bs"
import { RiCalendarScheduleLine } from "react-icons/ri"
import { BiMap } from "react-icons/bi"
import { LuImage } from "react-icons/lu"
import { GiEarthAmerica } from "react-icons/gi"

// CardPost
import { posts } from "../dummyData/data"
import { CardPost } from "../components/CardPost"

interface PostCategory {
  id: string
  label: string
}

const postCategories: PostCategory[] = [
  { id: "forYou", label: "For you" },
  { id: "following", label: "Following" },
]

export default function Homepage() {
  const [activeCategory, setActiveCategory] = useState<string>("forYou")
  const [isFocusBodyPost, setIsFocusBodyPost] = useState<boolean>(false)
  const [hasBodyPost, setHasBodyPost] = useState<string>("")

  const handleInputBodyPost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto"
    e.target.style.height = `${e.target.scrollHeight}px`
    setHasBodyPost(e.target.value)
  }

  return (
    <Sidebar>
      {/* Container Homepage */}
      <div className="mb-20">
        {/* Button For you / Following */}
        <div className="text-white border-b border-slate-800 flex items-center justify-around px-5 py-3 sticky top-0 z-50 bg-black">
          {postCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category.id)}
              className={`relative ${activeCategory === category.id ? "font-bold" : "text-slate-500"} flex flex-col`}>
              {category.label}
              {activeCategory === category.id && (
                <span className="absolute -bottom-3 border-b-4 border-blue-500 rounded-xl w-full"></span>
              )}
            </button>
          ))}
        </div>

        {/* Create Post */}
        <div className="border-b border-slate-800 flex flex-col">
          {/* Profile Image & Input Post*/}
          <div className="flex items-start gap-x-3 m-5">
            <div className="">
              <img src="assets/img/snorlax.png" alt="profile-image" className="rounded-full size-12 mx-1" />
            </div>

            {/* Input Text Post */}
            <div className="w-full flex flex-col">
              {/* Input Text Post */}
              <div className="relative">
                <textarea
                  name="post"
                  id="post"
                  placeholder="What is happening?!"
                  maxLength={1000}
                  className={`bg-black text-white w-full p-2 placeholder:text-xl resize-none focus:outline-none scrollbar-hide ${
                    isFocusBodyPost && "pb-12 border-b border-slate-600"
                  }`}
                  value={hasBodyPost}
                  rows={1}
                  onFocus={() => setIsFocusBodyPost(true)}
                  onChange={handleInputBodyPost}></textarea>

                {isFocusBodyPost && (
                  <button className="absolute bottom-2 text-blue-500 flex items-center gap-x-2 ml-2 hover:opacity-70">
                    <i>
                      <GiEarthAmerica />
                    </i>
                    <p className="font-semibold">Everyone can reply</p>
                  </button>
                )}
              </div>

              {/* Addons & Button Create Post */}
              <div className="mt-5 ml-2 flex items-center justify-between ">
                {/* Addons */}
                <div className="flex items-center gap-x-5">
                  {/* Upload Image */}
                  <div>
                    <label htmlFor="upload-image" className="hover:cursor-pointer hover:opacity-70">
                      <LuImage size={23} className="text-blue-500" />
                    </label>
                    <input hidden type="file" name="upload-image" id="upload-image" />
                  </div>

                  {/* GIF */}
                  <div>
                    <label htmlFor="" className="hover:cursor-pointer hover:opacity-70">
                      <MdOutlineGifBox size={23} className="text-blue-500" />
                    </label>
                    {/* <input hidden type="file" name="upload-image" id="upload-image" /> */}
                  </div>

                  {/* Setting */}
                  <div>
                    <label htmlFor="" className="hover:cursor-pointer hover:opacity-70">
                      <VscSettings size={23} className="text-blue-500" />
                    </label>
                    {/* <input hidden type="file" name="upload-image" id="upload-image" /> */}
                  </div>

                  {/* Emoticons */}
                  <div>
                    <label htmlFor="" className="hover:cursor-pointer hover:opacity-70">
                      <BsEmojiSmile size={23} className="text-blue-500" />
                    </label>
                    {/* <input hidden type="file" name="upload-image" id="upload-image" /> */}
                  </div>

                  {/* Schedule */}
                  <div>
                    <label htmlFor="" className="hover:cursor-pointer hover:opacity-70">
                      <RiCalendarScheduleLine size={23} className="text-blue-500" />
                    </label>
                    {/* <input hidden type="file" name="upload-image" id="upload-image" /> */}
                  </div>

                  {/* Map */}
                  <div>
                    <label htmlFor="" className="hover:cursor-pointer hover:opacity-70">
                      <BiMap size={25} className="text-blue-500 opacity-50" />
                    </label>
                    {/* <input hidden type="file" name="upload-image" id="upload-image" /> */}
                  </div>
                </div>

                {/* Button Create Post */}
                <form action="">
                  <button
                    disabled={hasBodyPost === "" || hasBodyPost === null || hasBodyPost === undefined}
                    className="py-2 px-4 rounded-[3rem] font-bold tracking-wider bg-blue-500 text-white disabled:bg-slate-400 disabled:text-black hover:opacity-70">
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Render Card Post */}
        {posts.map((post, index) => {
          return <CardPost key={index} data={post} />
        })}
      </div>
    </Sidebar>
  )
}
