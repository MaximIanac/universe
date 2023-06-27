import { CommentsBody } from "../../../../../../services/userService/user-service.interface";

type Props = {
    commentsData: CommentsBody[] | undefined,
    itemId: number,
    setShowComments: React.Dispatch<React.SetStateAction<boolean>>,
    goToUserPageByClckingOnComment: (id: number) => void
}

const Comments = ({ commentsData, itemId, setShowComments, goToUserPageByClckingOnComment }: Props) => {

    return (
        <div>
            {commentsData?.map((item, index) => {
                return (
                    <div key={item.id}>
                        {itemId === item.postId &&
                            <div>
                                <div className="ml-10 my-5 bg-gray-100 w-auto rounded-xl px-2 pb-2">
                                    <div className="p-2">
                                        <h5 onClick={() => goToUserPageByClckingOnComment(item.user.id)} className="text-lg font-medium tracking-tight text-gray-900 hover:underline cursor-pointer">{item.user.username}</h5>
                                        <p className="text-md font-normal text-gray-500">{item.body}</p>
                                    </div>
                                </div>
                                {index === commentsData.length - 1 &&
                                    <div onClick={() => setShowComments(false)} className="flex cursor-pointer justify-end mt-2 pr-6">
                                        <button className="font-normal text-gray-500 flex align-top">
                                            Hide Comments
                                        </button>
                                        <div className="relative">
                                            <svg className="absolute top-[3px] ml-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                            </svg>
                                        </div>
                                    </div>
                                }
                            </div>
                        }

                    </div>
                );
            })}
        </div>
    )
}

export default Comments;