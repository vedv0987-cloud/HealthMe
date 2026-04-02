export type PostType = "text" | "photo" | "progress" | "recipe" | "tip";

export type PostWithAuthor = {
  id: string;
  content: string;
  imageUrls: string[];
  postType: PostType;
  likesCount: number;
  commentsCount: number;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
};
