import { GetHeroUseCase } from "../use-cases/hero/get-hero.use-case"
import { GetCoupleInfoUseCase } from "../use-cases/couple-info/get-couple-info.use-case"
import { GetGiftRegistryUseCase } from "../use-cases/gift-registry/get-gift-registry.use-case"
import { GetEventDetailsUseCase } from "../use-cases/event-details/get-event-details.use-case"
import { GetItineraryUseCase } from "../use-cases/itinerary/get-itinerary.use-case"
import { GetLogisticsUseCase } from "../use-cases/logistics/get-logistics.use-case"
import { GetPhotoGalleryUseCase } from "../use-cases/photo-gallery/get-photo-gallery.use-case"
import { GetConfirmacionUseCase } from "../use-cases/confirmacion-asistencia/get-confirmacion.use-case"

import { HeroRepository } from "@/lib/infrastructure/repositories/hero.repository"
import { CoupleInfoRepository } from "@/lib/infrastructure/repositories/couple-info.repository"
import { GiftRegistryRepository } from "@/lib/infrastructure/repositories/gift-registry.repository"
import { EventDetailsRepository } from "@/lib/infrastructure/repositories/event-details.repository"
import { ItineraryRepository } from "@/lib/infrastructure/repositories/itinerary.repository"
import { LogisticsRepository } from "@/lib/infrastructure/repositories/logistics.repository"
import { PhotoGalleryRepository } from "@/lib/infrastructure/repositories/photo-gallery.repository"
import { ConfirmacionAsistenciaRepository } from "@/lib/infrastructure/repositories/confirmacion-asistencia.repository"

import { HeroMapper } from "@/lib/infrastructure/mappers/hero.mapper"
import { CoupleInfoMapper } from "@/lib/infrastructure/mappers/couple-info.mapper"
import { GiftRegistryMapper } from "@/lib/infrastructure/mappers/gift-registry.mapper"
import { EventDetailsMapper } from "@/lib/infrastructure/mappers/event-details.mapper"
import { ItineraryMapper } from "@/lib/infrastructure/mappers/itinerary.mapper"
import { LogisticsMapper } from "@/lib/infrastructure/mappers/logistics.mapper"
import { PhotoGalleryMapper } from "@/lib/infrastructure/mappers/photo-gallery.mapper"
import { ConfirmacionAsistenciaMapper } from "@/lib/infrastructure/mappers/confirmacion-asistencia.mapper"

export class UseCaseFactory {
  static createGetHeroUseCase(): GetHeroUseCase {
    const repository = new HeroRepository()
    const mapper = HeroMapper
    return new GetHeroUseCase(repository, mapper)
  }

  static createGetCoupleInfoUseCase(): GetCoupleInfoUseCase {
    const repository = new CoupleInfoRepository()
    const mapper = CoupleInfoMapper
    return new GetCoupleInfoUseCase(repository, mapper)
  }

  static createGetGiftRegistryUseCase(): GetGiftRegistryUseCase {
    const repository = new GiftRegistryRepository()
    const mapper = GiftRegistryMapper
    return new GetGiftRegistryUseCase(repository, mapper)
  }

  static createGetEventDetailsUseCase(): GetEventDetailsUseCase {
    const repository = new EventDetailsRepository()
    const mapper = EventDetailsMapper
    return new GetEventDetailsUseCase(repository, mapper)
  }

  static createGetItineraryUseCase(): GetItineraryUseCase {
    const repository = new ItineraryRepository()
    const mapper = ItineraryMapper
    return new GetItineraryUseCase(repository, mapper)
  }

  static createGetLogisticsUseCase(): GetLogisticsUseCase {
    const repository = new LogisticsRepository()
    const mapper = LogisticsMapper
    return new GetLogisticsUseCase(repository, mapper)
  }

  static createGetPhotoGalleryUseCase(): GetPhotoGalleryUseCase {
    const repository = new PhotoGalleryRepository()
    const mapper = PhotoGalleryMapper
    return new GetPhotoGalleryUseCase(repository, mapper)
  }

  static createGetConfirmacionUseCase(): GetConfirmacionUseCase {
    const repository = new ConfirmacionAsistenciaRepository()
    const mapper = ConfirmacionAsistenciaMapper
    return new GetConfirmacionUseCase(repository, mapper)
  }
}
