import { Link } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { formatNumberToK } from "../utils/footerPostNumber"
import { useState } from "react"
import { FooterCardPost } from "../components/FooterCardPost"

// Icons
import { TiArrowLeft } from "react-icons/ti"
import { BsThreeDots } from "react-icons/bs"
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2"
import { BiGitCompare } from "react-icons/bi"
import { IoMdHeartEmpty } from "react-icons/io"
import { PiUploadSimpleBold } from "react-icons/pi"
import { FiBookmark } from "react-icons/fi"
import { BsEmojiSmile } from "react-icons/bs"
import { BiMap } from "react-icons/bi"
import { LuImage } from "react-icons/lu"
import { MdOutlineGifBox } from "react-icons/md"

export default function DetailPost() {
  const [isCommentFocus, setIsCommentFocus] = useState<boolean>(false)
  const [hasComment, setHasComment] = useState<string>("")
  const handleInputComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto"
    e.target.style.height = `${e.target.scrollHeight}px`
    setHasComment(e.target.value)
  }

  return (
    <Sidebar>
      <section>
        {/* Header */}
        <div className="flex items-center gap-x-7 py-3 px-5">
          {/* Button Back */}
          <Link to={"/"} className="hover:opacity-70">
            <TiArrowLeft className="size-8 text-white" />
          </Link>

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
            <Link to={"/profile"}>
              <img src="assets/img/snorlax.png" alt="profile-image" className="size-10 rounded-full hover:opacity-70" />
            </Link>
            {/* Name & Username */}
            <div className="flex flex-col">
              <Link to={"/profile"} className="font-semibold text-white hover:underline">
                Suma
              </Link>
              <p className="text-slate-500 text-sm -mt-1">@suma88172312</p>
            </div>
          </div>
          {/* Button option user */}
          <button>
            <BsThreeDots size={20} className="text-slate-500 hover:text-blue-500" />
          </button>
        </div>

        {/* Body Post */}
        <div className="mx-5 mt-3">
          <p className="text-white text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, maxime officiis molestiae placeat est
            dolorem! Iusto eligendi quasi consequuntur ab, quam blanditiis voluptatibus vero tempore tenetur voluptate
            eum ullam, dolorem ipsam fuga eveniet accusantium officia impedit itaque doloribus? Enim assumenda
            voluptatum excepturi, architecto amet dignissimos eaque sapiente nulla porro ipsa.
          </p>

          {/* Date & Views */}
          <div className="flex items-center gap-x-3 mt-5">
            <p className="text-slate-500">Dec 15, 2024</p>
            <p className="text-white font-semibold">
              1.2K <span className="text-slate-500 font-normal">Views</span>
            </p>
          </div>

          {/* Footer Card Detail Post */}
          <div className="mt-5 py-3 border-y border-slate-800">
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

        {/* Input Comment Section */}
        <div className={`relative mt-5 ${isCommentFocus ? "pb-12" : "pb-0"}`}>
          {/* Border Bottom */}
          <span className="absolute bottom-0 border border-slate-800 w-full"></span>
          <div className="mx-5 flex items-start">
            {/* Profile Image */}
            <Link to={"/profile"} className="w-[12%] hover:opacity-70">
              <img src="assets/img/snorlax.png" alt="profile-image" className="size-10 rounded-full" />
            </Link>

            {/* Input Comment */}
            <div className="flex flex-col w-full -ml-2">
              <textarea
                name="comment"
                placeholder="Post your reply"
                className="text-white bg-black text-lg w-full mr-5 focus:outline-none resize-none placeholder:text-xl placeholder:text-slate-500 scrollbar-hide"
                maxLength={450}
                value={hasComment}
                onChange={handleInputComment}
                onFocus={() => setIsCommentFocus(true)}></textarea>
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

                    <button
                      disabled={!hasComment}
                      className="px-3 py-1 text-lg bg-white hover:opacity-80  rounded-[3rem] font-semibold disabled:bg-slate-500 disabled:text-black">
                      Reply
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Initial Reply Button */}
            {!isCommentFocus && (
              <div>
                <button
                  disabled={!hasComment}
                  className="px-3 py-1 text-lg rounded-[3rem] font-semibold disabled:bg-slate-500 disabled:text-black">
                  Reply
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Comment 1 */}
        <div className="relative flex items-start px-5 py-4">
          {/* Border Bottom */}
          <span className="absolute w-full border border-slate-800 bottom-0 -mx-5"></span>

          {/* Profile Image */}
          <Link className="w-[10%]" to={"/profile"}>
            <img src="assets/img/snorlax.png" alt="profile-image" className="size-10 rounded-full hover:opacity-70" />
          </Link>

          {/* username & body comment */}
          <div>
            {/* Username */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <Link to={"/profile"} className="text-white font-semibold hover:underline">
                  Suma
                </Link>
                <p className="text-sm text-slate-500">@suma99127312</p>
              </div>

              <button>
                <BsThreeDots className="size-6 text-slate-500 hover:text-blue-500" />
              </button>
            </div>

            {/* Body comment */}
            <div>
              <p className="text-white text-justify">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem, exercitationem.
              </p>
            </div>

            {/* Footer Comment */}
            <div className="-mx-2 mt-5">
              <FooterCardPost post={null} />
            </div>
          </div>
        </div>

        {/* Comment 2 */}
        <div className="relative flex items-start px-5 py-4">
          {/* Border Bottom */}
          <span className="absolute w-full border border-slate-800 bottom-0 -mx-5"></span>

          {/* Profile Image */}
          <Link className="w-[10%]" to={"/profile"}>
            <img src="assets/img/download.jpeg" alt="profile-image" className="size-10 rounded-full hover:opacity-70" />
          </Link>

          {/* username & body comment */}
          <div className="w-full">
            {/* Username */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <Link to={"/profile"} className="text-white font-semibold hover:underline">
                  Budiono Siregar
                </Link>
                <p className="text-sm text-slate-500">@kapalbudino2213</p>
              </div>

              <button>
                <BsThreeDots className="size-6 text-slate-500 hover:text-blue-500" />
              </button>
            </div>

            {/* Body comment */}
            <div>
              <p className="text-white text-justify">Kapal Lawdd</p>
            </div>

            {/* Footer Comment */}
            <div className="-mx-2 mt-5">
              <FooterCardPost post={null} />
            </div>
          </div>
        </div>
      </section>
    </Sidebar>
  )
}
