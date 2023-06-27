import { useEffect, useState } from "react";
import { getCommentsByPostID, getPostsByUserID } from "../../../../../services/userService/userService";
import { CommentsBody, PostsInterface } from "../../../../../services/userService/user-service.interface";
import { useNavigate, useParams } from "react-router-dom";
import Posts from "./Posts";
import Preloader from "../../../../../Extra/Preloader";

type Props = {
    userAvatar: string | undefined
}

const PostsAPI = ({userAvatar}: Props) => {

    const [postsData, setPosts] = useState<PostsInterface[]>();
    const [isLoaded, setLoading] = useState<boolean>(false);
    const [isLoadedComments, setLoadingComments] = useState<boolean>(true);
    const [commentsData, setComments] = useState<CommentsBody[]>();
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        setLoading(false);

        if (id) {
            getPostsByUserID(parseInt(id))
                .then(data => {
                    setPosts(data);
                    setLoading(true);
                })
        }
    }, [id])

    const seeComments = (id: number) => {
        setLoadingComments(false);

        if (id) {
            getCommentsByPostID(id)
                .then(data => {
                    setComments(data);
                    setLoadingComments(true);
                }) 
        }
    }

    const goToUserPageByClckingOnComment = (id: number) => {
        navigate(`/${id}`);
    }

    return (
        <div className="rounded-lg w-full md:shadow-lg md:shadow-gray-300 font-sans md:border-slate-300 md:p-4 mb-8">
            {isLoaded ? (
                postsData?.length ? (
                <Posts 
                    postsData={postsData} 
                    userAvatar={userAvatar} 
                    seeComments={seeComments} 
                    goToUserPageByClckingOnComment={goToUserPageByClckingOnComment}
                    commentsData={commentsData}
                    isLoadedComments={isLoadedComments}  
                />) : (
                    <div className="text-lg font-light text-gray-300 text-center p-4">There is no any posts</div>
                )
            ) : (<Preloader />)}
        </div>
    )
}

export default PostsAPI;