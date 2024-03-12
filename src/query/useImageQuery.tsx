import { getImages, getVideos } from '@/api/quries'
import { ISearchMedia, IMeta } from '@/types/image'
import { useQuery } from '@tanstack/react-query'

const useImageQuery = () => {
  // 이미지 검색
  const useSearchImages = (params: ISearchMedia, info: IMeta) => {
    return useQuery(['images', params], () => getImages(params), {
      enabled:
        !!params.query && !info.is_end && params.page >= 1 && params.page <= 50,
    })
  }

  // 비디오 검색
  const useSearchVideos = (params: ISearchMedia, info: IMeta) => {
    return useQuery(['videos', params], () => getVideos(params), {
      enabled:
        !!params.query && !info.is_end && params.page >= 1 && params.page <= 15,
    })
  }

  return { useSearchImages, useSearchVideos }
}

export default useImageQuery
