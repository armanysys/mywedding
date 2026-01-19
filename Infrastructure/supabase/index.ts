/**
 * Infrastructure Layer - Supabase Module
 * 
 * Centralized exports for all Supabase-related infrastructure components.
 * 
 * Usage:
 * import { createClient, createAdminClient, updateSession } from "@/Infrastructure/supabase"
 */

export { createClient } from "./client"
export { createAdminClient } from "./admin"
export { updateSession } from "./middleware"
