import { Link } from "react-router-dom"

interface RecommendToFollowProps {
  name: string
  username: string
  profileImage: string
}

export const RecommendToFollow = ({ name, username, profileImage }: RecommendToFollowProps) => {
  return (
    <section className="relative flex items-center justify-between group py-2">
      {/* Hover Background */}
      <span className="absolute group-hover:bg-slate-700/20 w-full h-full"></span>
      <div className="flex items-center gap-x-2 px-5 z-10">
        {/* Profile Image */}
        <Link to={"#"}>
          <img src={profileImage} alt="profile-image" className="size-9 rounded-full hover:opacity-80" />
        </Link>

        {/* Name & Username */}
        <Link to={"#"} className="flex flex-col items-start">
          <p className="font-bold text-white hover:underline">{name}</p>
          <p className="text-slate-500 text-sm">@{username}</p>
        </Link>
      </div>

      {/* Button Follow */}
      <div className="pr-5 z-10">
        <button className="px-2 py-1 text-sm font-bold rounded-[2rem] bg-white hover:opacity-80">Follow</button>
      </div>
    </section>
  )
}
