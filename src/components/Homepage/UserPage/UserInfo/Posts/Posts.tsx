import { CommentsBody, PostsInterface } from "../../../../../services/userService/user-service.interface";
import { useState } from "react";
import Comments from "./Comments/Comments";
import Preloader from "../../../../../Extra/Preloader";

type Props = {
    postsData: PostsInterface[] | undefined,
    userAvatar: string | undefined,
    seeComments: (id: number) => void,
    commentsData: CommentsBody[] | undefined,
    isLoadedComments: boolean,
    goToUserPageByClckingOnComment: (id: number) => void,
}

const Posts = ({ postsData, userAvatar, seeComments, commentsData, isLoadedComments, goToUserPageByClckingOnComment }: Props) => {

    const [isShowComments, setShowComments] = useState(false);

    const handleToggleComments = (id: number) => {
        setShowComments(true);
        seeComments(id);
    }

    return (
        <div>
            {postsData && postsData.map(item => (
                <div key={item.id} className="mt-5">
                    <img className="w-10 h-10 p-1 rounded-full ring-2 ring-blue-400 mb-2" src={userAvatar} alt="Bordered avatar" />
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">{item.title}</h5>
                    <p className="mb-3 font-normal text-gray-500">{item.body}</p>
                    <div className="flex-wrap md:flex justify-between items-center">

                        <div className="flex items-center">
                            <span className="mr-2 border-2 px-2 rounded-full">{item.reactions}</span>
                            <svg className="inline-flex items-center w-5 h-5 cursor-pointer" fill="white" stroke="blue" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                            <div className="ml-5">
                                {item?.tags.map(tag => (
                                    <a href="#smth" className="inline-flex items-center text-blue-600 hover:underline">#{tag}  </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <button onClick={() => { handleToggleComments(item.id) }} className="font-normal text-gray-500">Comments</button>
                        </div>
                    </div>
                    {isShowComments ? (
                        isLoadedComments ? (
                            <Comments
                                goToUserPageByClckingOnComment={goToUserPageByClckingOnComment}
                                commentsData={commentsData}
                                setShowComments={setShowComments}
                                itemId={item.id}
                            />) : (
                            <Preloader />)
                    ) : null}
                </div>))}
        </div>
    )
}

export default Posts;