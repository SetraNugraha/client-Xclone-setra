import { Posts } from "../types/posts.type"
import { Link } from "react-router-dom"
import { FooterCardPost } from "./FooterCardPost"
import { BsThreeDots } from "react-icons/bs"
import { formatDate } from "../utils/formatDate"
import { usePosts } from "../hooks/usePosts"
import { useAuth } from "../Auth/useAuth"
import { useState } from "react"
import { useUsers } from "../hooks/useUsers"

interface CardPostProps {
  post: Posts
}

export const CardPost = ({ post }: CardPostProps) => {
  const POSTS_IMAGE_URL = import.meta.env.VITE_POSTS_IMAGE_URL
  const { user } = useAuth()
  const { data: getUser } = useUsers(post.userId)
  const { handleToggleLike, deletePost } = usePosts()
  const [optionButton, setOptionButton] = useState<boolean>(false)

  // PROFILE IMAGE
  const PROFILE_IMAGE_URL = import.meta.env.VITE_USER_PROFILE_URL
  const profileImage = getUser?.profileImage
    ? `${PROFILE_IMAGE_URL + getUser.profileImage}`
    : "/assets/img/blank-profile.png"

  const handleDeletePost = () => {
    const isConfirm: boolean = confirm("Are you sure want to delete post ?")

    if (isConfirm) {
      deletePost.mutate(post.id)
      setOptionButton(false)
    } else {
      alert("Delete post cancceled")
      setOptionButton(false)
    }
  }

  return (
    <section className="border-b border-slate-800 hover:bg-slate-700/30 transition-all duration-100 -z-10">
      <div className="p-5 flex items-start gap-x-5 z-10">
        {/* Profile Image */}
        <Link to={`/profile/${post.userId}`} className="hover:opacity-70 ">
          <img src={profileImage} alt="profile-image" className="rounded-full size-12 mx-1 z-10 " />
        </Link>

        {/* Container Header, Body, Footer Post */}
        <div className="flex flex-col gap-y-1 w-full ">
          {/* Header Post */}
          <div className="w-full ">
            {/* Name , Username, Date & setting button */}
            <div className="flex items-center justify-between">
              {/* Name */}
              <div className="flex gap-x-3 items-center">
                <Link to={`/profile/${post.userId}`} className="text-white font-bold hover:underline">
                  {post.user.name}
                </Link>
                <div className="flex items-center gap-x-1">
                  <p className="text-slate-600">@{post.user.username}</p>
                  <span className="text-slate-600">•</span>
                  <p className="text-slate-600">{formatDate(post.created_at)}</p>
                </div>
              </div>

              {/* Option Button  */}
              {post.userId === user?.userId && (
                <div className="relative">
                  <button onClick={() => setOptionButton(!optionButton)}>
                    <BsThreeDots className="absolute top-0 right-0 text-white size-5 hover:opacity-60" />
                  </button>

                  {optionButton && (
                    <span className="z-20">
                      <button
                        onClick={handleDeletePost}
                        className="absolute right-0 top-6 z-50 text-white text-sm font-semibold px-3 py-1 ring-1 ring-slate-700/70 rounded-md shadow-lg shadow-slate-500/30 hover:bg-red-700/50">
                        Delete
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Body Post */}
          <div className="flex flex-col gap-y-3">
            {/* BODY POST */}
            <Link to={`/detail-post/${post.id}`} className="flex flex-col gap-y-5">
              <p className="text-white text-justify">{post.body}</p>

              {post.postImage && (
                <div className="max-w-full z-10">
                  <img
                    src={`${POSTS_IMAGE_URL + post.postImage}`}
                    alt="post-image"
                    className="rounded-2xl max-h-[35rem] min-w-[70%]"
                  />
                </div>
              )}
            </Link>

            {/* FOOTER POST*/}
            <div className="z-50">
              <FooterCardPost post={post} toggleLike={() => handleToggleLike(post.id)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
