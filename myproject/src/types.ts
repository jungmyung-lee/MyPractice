export interface Comment {
    userId: string;
    content: string;
    replies: Comment[];
  }
  
  export interface Post {
    id:string;
    userId: string;
    title: string;
    content: string;
    likes: number;
    comments: Comment[];
    createdAt? : any;
    imageUrl? : string;
  }