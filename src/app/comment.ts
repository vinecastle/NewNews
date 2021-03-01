export class Comment {
    commentId: string;//Ought to be int?
    articleId: string;//Ought to be int?
    author: {
        name: string;
        email: string
    }
    content: string;
}