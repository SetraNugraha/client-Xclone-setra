import { Data } from "../types/posts.type"
import { Link } from "react-router-dom"
import { FooterCardPost } from "./FooterCardPost"
import { BsThreeDots } from "react-icons/bs"

interface CardPostProps {
  data: Data
}

export const CardPost = ({ data }: CardPostProps) => {
  // If data empty
  if (data.posts.length === 0 || data.posts.length === null) return

  // If have data
  return data.posts.map((post, index) => {
    return (
      <Link to={"/detail-post"} key={index}>
        <section className="border-b border-slate-800 hover:bg-slate-700/30 transition-all duration-100 z-0">
          <div className="p-5 flex items-start gap-x-5 z-10">
            {/* Profile Image */}
            <Link to={"/profile"} className="hover:opacity-70 ">
              <img
                src={`assets/img/${data.profileImage}`}
                alt="profile-image"
                className="rounded-full size-12 mx-1 z-10 "
              />
            </Link>

            {/* Container Header, Body, Footer Post */}
            <div className="flex flex-col gap-y-1 w-full ">
              {/* Header Post */}
              <div className="w-full ">
                {/* Name , Username, Date & setting button */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-x-3 items-center">
                    <Link to={"/profile"} className="text-white font-bold hover:underline">
                      {data.name}
                    </Link>
                    <p className="text-slate-600 ">{data.username}</p>
                    <p className="text-slate-600">{post.date}</p>
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
  })
}
