import { getImages, getVideos } from '@/api/quries'
import { ISearchMedia } from '@/types/image'
import { useQuery } from '@tanstack/react-query'

const useImageQuery = () => {
  // 이미지 검색
  const useSearchImages = (params: ISearchMedia) => {
    return useQuery(['images', params], () => getImages(params), {
      enabled: !!params.query,
    })
  }

  // 비디오 검색
  const useSearchVideos = (params: ISearchMedia) => {
    return useQuery(['videos', params], () => getVideos(params), {
      enabled: !!params.query,
    })
  }

  return { useSearchImages, useSearchVideos }
}

export default useImageQuery
