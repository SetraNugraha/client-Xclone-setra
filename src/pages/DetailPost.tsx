import { Link, useParams, useNavigate } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { useCallback, useState } from "react"
import { FooterCardPost } from "../components/FooterCardPost"
import { usePosts } from "../hooks/usePosts"
import { formatDate } from "../utils/formatDate"
import { TiArrowLeft } from "react-icons/ti"
import { BsThreeDots } from "react-icons/bs"
import { BsEmojiSmile } from "react-icons/bs"
import { BiMap } from "react-icons/bi"
import { LuImage } from "react-icons/lu"
import { MdOutlineGifBox } from "react-icons/md"
import { HandleError } from "../components/HandleError"
import { useAuth } from "../Auth/useAuth"
import { CardComment } from "../components/CardComment"

export default function DetailPost() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { postId } = useParams()
  const POSTS_IMAGE_URL = import.meta.env.VITE_POSTS_IMAGE_URL
  const { data: post, handleToggleLike, createNewComment, isLoading, isError, error, deletePost } = usePosts(postId)
  const [optionButton, setOptionButton] = useState<boolean>(false)

  const [isCommentFocus, setIsCommentFocus] = useState<boolean>(false)
  const [commentBody, setCommentBody] = useState<string>("")
  const handleInputComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto"
    e.target.style.height = `${e.target.scrollHeight}px`
    setCommentBody(e.target.value)
  }

  const handleCreateNewComment = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      createNewComment.mutate(commentBody, {
        onSuccess: () => {
          setCommentBody("")
        },
      })
    },
    [createNewComment, commentBody],
  )

  const handleDeletePost = () => {
    const isConfirm: boolean = confirm("Are you sure want to delete post ?")

    if (isConfirm) {
      deletePost.mutate(post![0].id)
      setOptionButton(false)
      navigate(-1)
    } else {
      alert("Delete post cancceled")
      setOptionButton(false)
    }
  }

  if (isError) {
    return <HandleError isError={isError} message={error?.message} component={"Detail Post Error: "} />
  }

  if (!post) return

  return (
    <Sidebar>
      {isLoading ? (
        <div className="text-white text-lg font-semibold text-center mt-10">Loading ....</div>
      ) : (
        <section>
          {/* Header */}
          <div className="flex items-center gap-x-7 py-3 px-5">
            {/* Button Back */}
            <button onClick={() => navigate(-1)} className="hover:opacity-70">
              <TiArrowLeft className="size-8 text-white" />
            </button>

            {/* Name & Total Posts */}
            <div className="">
              <h1 className="font-semibold text-xl text-white">Post</h1>
            </div>
          </div>

          {/* Detail User */}
          <div className="flex items-center justify-between px-5">
            {/* Wrapper profile image & name */}
            <div className="flex items-center gap-x-3">
              {/* Profile Image */}
              <Link to={`/profile/${post[0].userId}`}>
                <img src={post[0].user.profileImage ?? "/assets/img/blank-profile.png"} alt="profile-image" className="size-10 rounded-full hover:opacity-70" />
              </Link>
              {/* Name & Username */}
              <div className="flex flex-col">
                <Link to={`/profile/${post[0].userId}`} className="font-semibold text-white hover:underline">
                  {post[0].user.name}
                </Link>
                <p className="text-slate-500 text-sm -mt-1">@{post[0].user.username}</p>
              </div>
            </div>

            {/* Option Button  */}
            {post[0].userId === user?.userId && (
              <div className="relative">
                <button onClick={() => setOptionButton(!optionButton)}>
                  <BsThreeDots className="absolute top-0 right-0 z-10 text-white size-5 hover:opacity-60" />
                </button>

                {optionButton && (
                  <span className="z-20">
                    <button onClick={handleDeletePost} className="absolute right-0 -top-8 z-50 text-white text-sm font-semibold px-3 py-1 ring-1 ring-slate-700/70 rounded-md shadow-lg shadow-slate-500/30 hover:bg-red-700/50">
                      Delete
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Body Post */}
          <div className="mx-5 mt-3">
            <p className="text-white text-justify">{post[0].body}</p>

            {/* POST IMAGE */}
            {post[0].postImage && (
              <div className="max-w-full my-5">
                <img src={`${POSTS_IMAGE_URL + post[0].postImage}`} alt="post-image" className="rounded-2xl max-h-[35rem] min-w-[70%]" />
              </div>
            )}

            {/* Date & Views */}
            <div className="flex items-center gap-x-3 mt-5">
              <p className="text-slate-500">{formatDate(post[0].created_at)}</p>
              <p className="text-white font-semibold">
                0 <span className="text-slate-500 font-normal">Views</span>
              </p>
            </div>

            {/* Footer Card Detail Post */}
            <div className="mt-5 py-3 border-y border-slate-800">
              <FooterCardPost post={post[0]} toggleLike={() => handleToggleLike(post[0].id)} />
            </div>
          </div>

          {/* Input Comment Section */}
          <div className={`relative mt-5 ${isCommentFocus ? "pb-12" : "pb-0"}`}>
            {/* Border Bottom */}
            <span className="absolute bottom-0 border border-slate-800 w-full"></span>
            <div className="mx-5 flex items-start">
              {/* Profile Image */}
              <Link to={`/profile/${post[0].userId}`} className="w-[12%] hover:opacity-70">
                <img src={post[0].user.profileImage ?? "/assets/img/blank-profile.png"} alt="profile-image" className="size-10 rounded-full" />
              </Link>

              {/* Input Comment */}
              <div className="flex flex-col w-full -ml-2">
                <textarea name="body" placeholder="Post your reply" className="text-white bg-black text-lg w-full mr-5 focus:outline-none resize-none placeholder:text-xl placeholder:text-slate-500 scrollbar-hide" maxLength={450} value={commentBody} onChange={handleInputComment} onFocus={() => setIsCommentFocus(true)}></textarea>
                {/* Addons & button reply */}
                <div className="mt-3">
                  {isCommentFocus && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-x-5">
                        {/* Upload Image */}
                        <div>
                          <label htmlFor="upload-image" className="hover:cursor-pointer hover:opacity-70">
                            <LuImage size={19} className="text-blue-500" />
                          </label>
                          {/* <input hidden type="file" name="upload-image" id="upload-image" /> */}
                        </div>

                        {/* GIF */}
                        <div>
                          <label htmlFor="" className="hover:cursor-pointer hover:opacity-70">
                            <MdOutlineGifBox size={19} className="text-blue-500" />
                          </label>
                          {/* <input hidden type="file" name="upload-image" id="upload-image" /> */}
                        </div>

                        {/* Emoticons */}
                        <div>
                          <label htmlFor="" className="hover:cursor-pointer hover:opacity-70">
                            <BsEmojiSmile size={17} className="text-blue-500" />
                          </label>
                          {/* <input hidden type="file" name="upload-image" id="upload-image" /> */}
                        </div>

                        {/* Map */}
                        <div>
                          <label htmlFor="" className="hover:cursor-pointer hover:opacity-70">
                            <BiMap size={22} className="text-blue-500 opacity-50" />
                          </label>
                          {/* <input hidden type="file" name="upload-image" id="upload-image" /> */}
                        </div>
                      </div>

                      <form onSubmit={handleCreateNewComment}>
                        <button disabled={!commentBody} className="px-3 py-1 text-lg bg-white hover:opacity-80  rounded-[3rem] font-semibold disabled:bg-slate-500 disabled:text-black">
                          Reply
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>

              {/* Initial Reply Button */}
              {!isCommentFocus && (
                <div>
                  <button disabled={!commentBody} className="px-3 py-1 text-lg rounded-[3rem] font-semibold disabled:bg-slate-500 disabled:text-black">
                    Reply
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Comments Section */}
          {post[0].comment?.map((comment, index) => {
            return <CardComment key={index} comment={comment} />
          })}
        </section>
      )}
    </Sidebar>
  )
}
