import { formatNumberToK } from "../utils/formatNumberToK"
import { Posts } from "../types/posts.type"
import { useAuth } from "../Auth/useAuth"

// ICONS
import { PiUploadSimpleBold } from "react-icons/pi"
import { FiBookmark } from "react-icons/fi"
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2"
import { BiGitCompare, BiBarChart } from "react-icons/bi"
import { IoMdHeartEmpty } from "react-icons/io"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

interface FooterCardPostProps {
  post: Posts | null
  toggleLike: () => void
}

export const FooterCardPost = ({ post, toggleLike }: FooterCardPostProps) => {
  const { user } = useAuth()
  const [isLike, setIsLike] = useState<boolean>(post?.like?.some((l) => l.userId === user?.userId) || false)

  useEffect(() => {
    setIsLike(post?.like?.some((l) => l.userId === user?.userId) || false)
  }, [post?.like, user?.userId])

  return (
    <div className="relative text-slate-500 capitalize flex items-center justify-between pr-40">
      {/* Comments */}
      <Link to={`/detail-post/${post?.id}`} className="flex items-center gap-x-1  hover:text-blue-500 group">
        <HiOutlineChatBubbleOvalLeft size={20} />
        <p>{formatNumberToK(post?._count.comment || 0)}</p>
      </Link>

      {/* Respost */}
      <button className="flex items-center gap-x-1  hover:text-green-500">
        <BiGitCompare size={20} />
        <p>{formatNumberToK(0)}</p>
      </button>

      {/* Like */}
      <button
        className={`flex items-center gap-x-1 ${isLike && "text-red-500"} hover:text-red-500`}
        onClick={toggleLike}>
        <IoMdHeartEmpty size={20} />
        <p>{formatNumberToK(post?._count.like || 0)}</p>
      </button>

      {/* Views */}
      <button className="flex items-center gap-x-1  hover:text-blue-500">
        <BiBarChart size={20} />
        <p>{formatNumberToK(0)}</p>
      </button>
      <div className="absolute right-0 flex items-center gap-x-3 text-slate-500">
        {/* Bookmark */}
        <button>
          <FiBookmark size={20} className="hover:text-blue-500" />
        </button>
        {/* Upload */}
        <button>
          <PiUploadSimpleBold size={20} className="hover:text-blue-500" />
        </button>
      </div>
    </div>
  )
}
