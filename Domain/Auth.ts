/**
 * Domain Layer - Authentication Types
 * 
 * Contains all authentication-related interfaces and types used across the application.
 */

export interface LoginCredentials {
  email: string
  password: string
}

export interface UserProfile {
  role: string
  first_name: string
  last_name: string
  permissions?: string[]
  is_active?: boolean
}

export interface User {
  id: string
  email: string
}

export interface LoginResponse {
  success: boolean
  user?: User
  profile?: UserProfile | null
  error?: string
}

export interface UserResponse {
  success: boolean
  user?: User
  profile?: UserProfile | null
  error?: string
  authenticated?: boolean
}

export interface CreateUserData {
  email: string
  password: string
  first_name: string
  last_name: string
  role: string
}

export interface CreateUserResponse {
  success: boolean
  user?: User
  message?: string
  warning?: string
  error?: string
}
