import http from "../http";
import { CommentsBody, CommentsInterface, PostsInterface, PostsResponse, UserInterface, UserResponseInterface } from "./user-service.interface";

export const getUser = async (id: number): Promise<UserInterface> => {
    const response = await http.get<UserInterface>(`user/${id}`);
    return response.data;
}

export const getPostsByUserID = async (id: number): Promise<PostsInterface[]> => {
    const response = await http.get<PostsResponse<PostsInterface>>(`posts/user/${id}`);
    return response.data.posts;
}

export const getCommentsByPostID = async (id: number): Promise<CommentsBody[]> => {
    const response = await http.get<CommentsInterface<CommentsBody>> (`posts/${id}/comments`);
    return response.data.comments;
}

export const searchUser = async (query: string): Promise<UserInterface[]> => {
    const response = await http.get<UserResponseInterface<UserInterface>>(`users/search?q=${query}&limit=10`)
    return response.data.users;
}