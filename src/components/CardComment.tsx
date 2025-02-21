import { Link } from "react-router-dom"
import { formatNumberToK } from "../utils/formatNumberToK"
import { formatDate } from "../utils/formatDate"
import { BsThreeDots } from "react-icons/bs"
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2"
import { BiGitCompare } from "react-icons/bi"
import { IoMdHeartEmpty } from "react-icons/io"
import { PiUploadSimpleBold } from "react-icons/pi"
import { FiBookmark } from "react-icons/fi"
import { useAuth } from "../Auth/useAuth"
import { Comments } from "../types/posts.type"
import { usePosts } from "../hooks/usePosts"
import { useState } from "react"

interface CardCommentProps {
  comment: Comments
}

export const CardComment = ({ comment }: CardCommentProps) => {
  const { user } = useAuth()
  const { deleteComment } = usePosts()
  const getProfileImage = comment.user.profileImage
  const profileImage = getProfileImage ? getProfileImage : "/assets/img/blank-profile.png"
  const [optionButton, setOptionButton] = useState<boolean>(false)

  const handleDeleteComment = () => {
    const isConfirm = confirm("Are you sure want to delete this comment ?")

    if (isConfirm) {
      deleteComment.mutate(comment.id)
      setOptionButton(false)
    } else {
      alert("Delete comment cancelled.")
      setOptionButton(false)
    }
  }

  return (
    <div className="relative flex items-start px-5 py-4">
      {/* Border Bottom */}
      <span className="absolute w-full border border-slate-800 bottom-0 -mx-5"></span>

      {/* Profile Image */}
      <Link className="w-[10%]" to={`/profile/${comment.userId}`}>
        <img src={profileImage} alt="profile-image" className="size-10 rounded-full hover:opacity-70" />
      </Link>

      {/* username & body comment */}
      <div className="w-full">
        {/* Username */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Link to={`/profile/${comment.userId}`} className="text-white font-semibold hover:underline">
              {comment.user.name}
            </Link>
            <p className="text-sm text-slate-500">@{comment.user.username}</p>
            <span className="text-sm text-slate-500">•</span>
            <p className="text-sm text-slate-500">{formatDate(comment.created_at)}</p>
          </div>

          {comment.userId === user?.userId && (
            <div className="relative">
              <button onClick={() => setOptionButton(!optionButton)}>
                <BsThreeDots className="absolute top-0 right-0 text-white size-5 hover:opacity-60" />
              </button>

              {optionButton && (
                <span className="z-20">
                  <button onClick={handleDeleteComment} className="absolute right-0 top-6 z-50 text-white text-sm font-semibold px-3 py-1 ring-1 ring-slate-700/70 rounded-md shadow-lg shadow-slate-500/30 hover:bg-red-700/50">
                    Delete
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Body comment */}
        <div>
          <p className="text-white text-justify">{comment.body}</p>
        </div>

        {/* Footer Comment */}
        <div className="-mx-2 mt-5">
          {/* <FooterCardPost post={post[0]} /> */}
          <div className="relative text-slate-500 capitalize flex items-center justify-between mx-2 pr-40">
            {/* Comments */}
            <button className="flex items-center gap-x-1  hover:text-blue-500 group">
              <HiOutlineChatBubbleOvalLeft size={20} />
              <p>{formatNumberToK(0)}</p>
            </button>

            {/* Respost */}
            <button className="flex items-center gap-x-1  hover:text-green-500">
              <BiGitCompare size={20} />
              <p>{formatNumberToK(0)}</p>
            </button>

            {/* Like */}
            <button className="flex items-center gap-x-1  hover:text-red-500">
              <IoMdHeartEmpty size={20} />
              <p>{formatNumberToK(0)}</p>
            </button>

            {/* Views */}
            <button className="flex items-center gap-x-1  hover:text-blue-500">
              <FiBookmark size={20} />
              <p>{formatNumberToK(0)}</p>
            </button>
            <div className="absolute right-0 flex items-center gap-x-3 text-slate-500">
              {/* Upload */}
              <button>
                <PiUploadSimpleBold size={20} className="hover:text-blue-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
