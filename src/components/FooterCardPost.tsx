import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2"
import { BiGitCompare } from "react-icons/bi"
import { IoMdHeartEmpty } from "react-icons/io"
import { BiBarChart } from "react-icons/bi"
import { formatNumberToK } from "../utils/formatNumberToK"

import { PiUploadSimpleBold } from "react-icons/pi"
import { FiBookmark } from "react-icons/fi"

import { Posts } from "../types/posts.type"

interface FooterCardPostProps {
  post: Posts | null
}

export const FooterCardPost = ({ post }: FooterCardPostProps) => {
  return (
    <div className="relative text-slate-500 capitalize flex items-center justify-between mx-2 pr-40">
      {/* Comments */}
      <button className="flex items-center gap-x-1  hover:text-blue-500 group">
        <HiOutlineChatBubbleOvalLeft size={20} />
        <p>{formatNumberToK(post?._count.comment || 0)}</p>
      </button>

      {/* Respost */}
      <button className="flex items-center gap-x-1  hover:text-green-500">
        <BiGitCompare size={20} />
        <p>{formatNumberToK(0)}</p>
      </button>

      {/* Like */}
      <button className="flex items-center gap-x-1  hover:text-red-500">
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
