export interface Snippet {
    id: string;
    title: string;
    description: string;
    category: string[];
    language: string;
    tags: string[];
    source_code: string;
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

export interface GeneratedCodeType {
    title: string,
    description: string,
    language: string,
    source_code: string,
}