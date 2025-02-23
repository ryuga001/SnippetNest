export interface Snippet {
    id: string;
    title: string;
    description: string;
    category: string[];
    tags: string[];
    source_code: string;
    cover_image: string;
    author: {
        author_id: string;
        username: string;
        avatar: string;
    };
    liked: boolean;
}

export interface User {
    id: string;
    username: string;
    email: string;
    avatar: string;
    role: 'user' | 'admin';
}

