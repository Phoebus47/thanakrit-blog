import { Request, Response, NextFunction } from 'express';

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  profile_pic?: string;
  role?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserData {
  name: string;
  email: string;
  username: string;
  password: string;
  profile_pic?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Post related types
export interface Post {
  id: string;
  title: string;
  content: string;
  description?: string;
  image?: string;
  category?: string;
  author_id: string;
  created_at: Date;
  updated_at: Date;
  likes_count?: number;
}

export interface CreatePostData {
  title: string;
  content: string;
  description?: string;
  image?: string;
  category?: string;
  author_id: string;
}

// Comment related types
export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  comment_text: string;
  created_at: Date;
  updated_at: Date;
  user?: User;
}

export interface CreateCommentData {
  post_id: string;
  user_id: string;
  comment_text: string;
}

// Like related types
export interface Like {
  id: string;
  post_id: string;
  user_id: string;
  created_at: Date;
}

export interface CreateLikeData {
  post_id: string;
  user_id: string;
}

// API Response types - flexible for direct JSON responses
export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
  error?: string;
  [key: string]: any; // Allow additional properties
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Express Request with user
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

// JWT Payload
export interface JwtPayload {
  userId: string;
  username: string;
  name: string;
  iat?: number;
  exp?: number;
}

// Form data types for requests
export interface PostFormData {
  title: string;
  image: string;
  category_id: number;
  description: string;
  content: string;
  status_id: number;
  date: string;
  likes_count?: number;
}

export interface CommentFormData {
  post_id: number;
  user_id: string;
  comment_text: string;
}

export interface LikeFormData {
  post_id: number;
  user_id: string;
}

export interface UserUpdateData {
  name?: string;
  username?: string;
  profile_pic?: string;
}

// Express Handler types to avoid return type conflicts
export type AsyncRouteHandler<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any
> = (
  req: Request<P, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next?: NextFunction
) => Promise<void> | void;

// Express module augmentation
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// Multer file type
export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
