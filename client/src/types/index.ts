// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  profile_pic?: string;
  role?: string;
  created_at: string;
  updated_at: string;
}

// Post Types
export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  image?: string;
  date: string;
  likes_count: number;
  user_id: string;
  users?: User;
  created_at: string;
  updated_at: string;
}

// Comment Types
export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  comment_text: string;
  users?: User;
  created_at: string;
  updated_at: string;
}

// Like Types
export interface Like {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

// Auth Types
export interface AuthState {
  loading: boolean | null;
  getUserLoading: boolean | null;
  error: string | null;
  user: User | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  username: string;
}

export interface ResetPasswordCredentials {
  currentPassword: string;
  newPassword: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasMore: boolean;
}

export interface PostsResponse {
  posts?: Post[];
  data?: Post[];
  pagination?: PaginationInfo;
  hasMore?: boolean;
  total?: number;
  page?: number;
  limit?: number;
}

// Form Types
export interface ProfileFormData {
  image: string;
  name: string;
  username: string;
  email: string;
}

// Hook Types
export interface UseFetchPostsReturn {
  posts: Post[];
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => void;
}

// Component Props Types
export interface AuthRouteProps {
  children: React.ReactNode;
  isLoading: boolean | null;
  isAuthenticated: boolean;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
  isLoading: boolean | null;
  isAuthenticated: boolean;
  userRole: string;
  requiredRole: string;
}

// JWT Interceptor Types
export interface JWTInterceptorsInterface {
  setup: (onUnauthorized?: () => void) => void;
  setUnauthorizedCallback: (callback: () => void) => void;
  setToken: (token: string) => void;
  getToken: () => string | null;
  clearToken: () => void;
  isAuthenticated: () => boolean;
  reset: () => void;
}
