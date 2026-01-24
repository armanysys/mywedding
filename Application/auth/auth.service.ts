/**
 * Application Layer - Authentication Service
 * 
 * Handles all authentication-related business logic and API calls.
 * This service interacts with the api/auth endpoints for user authentication workflows.
 */

import type {
  LoginCredentials,
  LoginResponse,
  UserResponse,
  CreateUserData,
  CreateUserResponse,
} from "@/Domain/Auth"

/**
 * Authenticates a user with email and password
 * @param credentials - User login credentials
 * @returns Promise<LoginResponse> Authentication result
 */
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })

  return response.json()
}

/**
 * Logs out the current user
 * @returns Promise<{ success: boolean }> Logout result
 */
export async function logout(): Promise<{ success: boolean }> {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
  })

  return response.json()
}

/**
 * Gets the current authenticated user
 * @returns Promise<UserResponse> Current user data
 */
export async function getCurrentUser(): Promise<UserResponse> {
  const response = await fetch("/api/auth/me")

  return response.json()
}

/**
 * Creates a new admin user (requires super_admin role)
 * @param userData - New user data
 * @returns Promise<CreateUserResponse> Creation result
 */
export async function createAdminUser(userData: CreateUserData): Promise<CreateUserResponse> {
  const response = await fetch("/api/auth/admin/create-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  return response.json()
}
