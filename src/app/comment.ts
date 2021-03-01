

export class Comment {
    commentId: number;//Ought to be int?
    articleId: number;//Ought to be int?
    author: {
        name: string;
        email: string
    }
    content: string;
    time: string;//Ought to be timestamp
}