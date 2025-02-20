import { useCallback, useState } from "react"
import { Sidebar } from "../components/Sidebar"
import { MdOutlineGifBox } from "react-icons/md"
import { CardPost } from "../components/CardPost"
import { usePosts } from "../hooks/usePosts"
import { useAuth } from "../Auth/useAuth"

import { VscSettings } from "react-icons/vsc"
import { BsEmojiSmile } from "react-icons/bs"
import { RiCalendarScheduleLine } from "react-icons/ri"
import { BiMap } from "react-icons/bi"
import { LuImage } from "react-icons/lu"
import { GiEarthAmerica } from "react-icons/gi"

interface PostCategory {
  id: string
  label: string
}

const postCategories: PostCategory[] = [
  { id: "forYou", label: "For you" },
  { id: "following", label: "Following" },
]

export default function Homepage() {
  const { user } = useAuth()
  const { data: posts, isLoading, createPost } = usePosts()
  const [activeCategory, setActiveCategory] = useState<string>("forYou")
  const [isFocusBodyPost, setIsFocusBodyPost] = useState<boolean>(false)

  const [formPost, setFormPost] = useState<{ body: string; postImage: File | null }>({
    body: "",
    postImage: null,
  })

  const handleInputBodyPost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()

    e.target.style.height = "auto"
    e.target.style.height = `${e.target.scrollHeight}px`
    setFormPost((prevState) => ({ ...prevState, body: e.target.value }))
  }

  const handleInputPostImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormPost((prevState) => ({ ...prevState, postImage: file }))
    }
  }

  const handleCreateNewPost = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        createPost.mutate(formPost, {
          onSuccess: () => {
            setFormPost({ body: "", postImage: null })
            alert("Success Create Post")
          },
          onError: (error) => {
            console.error("error create post mutate: ", error)
            alert("Unexpected error, Please try again later.")
          },
        })
      } catch (error) {
        console.error("handle create new post error", error)
        alert("Unexpected error, Please try again later.")
      }
    },
    [createPost, formPost],
  )

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
              <img
                src={user?.profileImage ? user.profileImage : "/assets/img/blank-profile.png"}
                alt="profile-image"
                className="rounded-full size-12 mx-1"
              />
            </div>

            {/* Input Text Post */}
            <div className="w-full flex flex-col">
              {/* Input Text Post */}
              <div className="relative">
                <textarea
                  name="body"
                  id="post"
                  placeholder="What is happening?!"
                  maxLength={1000}
                  className={`bg-black text-white w-full p-2 placeholder:text-xl resize-none focus:outline-none scrollbar-hide ${
                    isFocusBodyPost && "pb-12 border-b border-slate-600"
                  }`}
                  value={formPost.body}
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

              {/* Displat Image Name */}
              {formPost.postImage && (
                <span className="text-slate-500 ml-2 text-sm flex items-center gap-x-2">
                  {formPost.postImage?.name}
                  <button
                    className="text-sm font-bold text-red-500/70 mt-1"
                    onClick={() => setFormPost((prevState) => ({ ...prevState, postImage: null }))}>
                    X
                  </button>
                </span>
              )}

              {/* Addons & Button Create Post */}
              <div className="mt-5 ml-2 flex items-center justify-between ">
                {/* Addons */}
                <div className="flex items-center gap-x-5">
                  {/* Upload Image */}
                  <div>
                    <label htmlFor="upload-image" className="hover:cursor-pointer hover:opacity-70">
                      <LuImage size={23} className="text-blue-500" />
                    </label>
                    <input hidden type="file" name="postImage" id="upload-image" onChange={handleInputPostImage} />
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
                <form onSubmit={handleCreateNewPost}>
                  <button
                    disabled={
                      formPost.body === "" ||
                      formPost.body === null ||
                      formPost.body === undefined ||
                      createPost.isPending
                    }
                    className="py-2 px-4 rounded-[3rem] font-bold tracking-wider bg-blue-500 text-white disabled:bg-slate-400 disabled:text-black hover:opacity-70">
                    {createPost.isPending ? "Loading ..." : "Post"}
                  </button>
                </form>
              </div>
            </div>
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
      </div>
    </Sidebar>
  )
}
