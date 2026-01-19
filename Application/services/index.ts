/**
 * Application Layer - Services Module
 * 
 * Centralized exports for all application-level services.
 * These services handle business logic, data processing, and API method calls.
 * 
 * Usage:
 * import { getHeroData, getCoupleInfo } from "@/Application/services"
 */

export { getEventDetailsData, getEventDetailsDataClient } from "./event-details.service"
export { getHeroData, getHeroDataClient } from "./hero.service"
export { getGiftDescriptionData, getGiftDescriptionDataClient } from "./gift-registry.service"
export { getCoupleInfo, getCoupleInfoClient } from "./couple-info.service"
export { getItineraryData, getItineraryDataClient } from "./itinerary.service"
export {
  getConfirmacionAsistenciaDataFromAPI,
  getConfirmacionAsistenciaDataClient,
} from "./confirmacion-asistencia.service"
export { getPhotoGalleryData, getPhotoGalleryDataClient } from "./photo-gallery.service"
export { getLogisticsData, getLogisticsDataClient } from "./logistics.service"
