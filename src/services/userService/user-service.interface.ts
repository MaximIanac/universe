export interface UserResponseInterface<UserInterface> {
    users: UserInterface[],
    total: number,
    skip: number,
    limit: number
}

export interface UserInterface {
    id: number,
    firstName: string,
    lastName: string,
    maidenName:string,
    gender: string,
    email: string,
    age: number,
    phone: string,
    username: string,
    birthDate: string,
    image: string,
    height: number,
    weight: number,
    bloodGroup: string,
    university: string,
    address: {
        address: string,
        city: string
    }
    company: {
        department: string,
        name: string,
        title: string
    }
}

export interface PostsResponse<PostsInterface> {
    posts: PostsInterface[],
    total: number,
    skip: number,
    limit: number
}

export interface PostsInterface {
    id: number,
    title: string,
    body: string,
    userID: number,
    tags: string[],
    reactions: number
}

export interface CommentsInterface<CommentsBody> {
    comments: CommentsBody[],
    total: number,
    skip:number,
    limit: number
}

export interface CommentsBody {
    id: number,
    body: string,
    postId: number,
    user: {
        id: number,
        username: string
    }
}