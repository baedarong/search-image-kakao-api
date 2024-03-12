import { IImages, ISearchMedia, IVideos } from '@/types/image'
import { instance } from './common'
import { toast } from 'react-toastify'

// GET 이미지 검색하기
export const getImages = async (params: ISearchMedia): Promise<IImages> => {
  return await instance
    .get(
      `/search/image?query=${params.query}&sort=${params.sort}&page=${params.page}&size=${params.size}`,
    )
    .then((response) => response.data)
    .catch((error) => toast.error(error.response.data.message))
}

// GET 비디오 검색
export const getVideos = async (params: ISearchMedia): Promise<IVideos> => {
  return await instance
    .get(
      `/search/vclip?query=${params.query}&sort=${params.sort}&page=${params.page}&size=${params.size}`,
    )
    .then((response) => response.data)
    .catch((error) => toast.error(error.response.data.message))
}
