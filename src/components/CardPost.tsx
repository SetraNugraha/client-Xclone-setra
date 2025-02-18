import { Posts } from "../types/posts.type"
import { Link } from "react-router-dom"
import { FooterCardPost } from "./FooterCardPost"
import { BsThreeDots } from "react-icons/bs"
import { formatDate } from "../utils/formatDate"

interface CardPostProps {
  post: Posts
}

export const CardPost = ({ post }: CardPostProps) => {
  const getPostsUserImage = post.user.profileImage
  const profileImage = getPostsUserImage ? getPostsUserImage : "/assets/img/blank-profile.png"
  return (
    <Link to={`/detail-post/${post.id}`}>
      <section className="border-b border-slate-800 hover:bg-slate-700/30 transition-all duration-100 z-0">
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

                <button>
                  <BsThreeDots className="text-slate-600 " size={20} />
                </button>
              </div>
            </div>

            {/* Body Post */}
            <div className="flex flex-col gap-y-3 z-10 ">
              <p className="text-white text-justify z-50">{post.body}</p>

              {post.postImage && (
                <div className="max-w-full z-10">
                  <img
                    src={`assets/img/${post.postImage}`}
                    alt="post-image"
                    className="rounded-2xl max-h-[35rem] min-w-[70%]"
                  />
                </div>
              )}

              {/* Footer */}
              <div className="z-10 ">
                <FooterCardPost post={post} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Link>
  )
}
