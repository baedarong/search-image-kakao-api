import { getImages } from '@/api/quries'
import { ISearchImage } from '@/types/image'
import { useQuery } from '@tanstack/react-query'

const useImageQuery = () => {
  // 이미지 검색
  const useSearchImages = (params: ISearchImage) => {
    return useQuery(['images', params], () => getImages(params), {
      enabled: !!params.query,
    })
  }

  return { useSearchImages }
}

export default useImageQuery
