import {
  putMenuFetcher,
  postMenuOrderFetcher,
  deleteMenuFetcher,
} from '@/api/mutations'
import { getImages } from '@/api/quries'
import {
  IMenuMutate,
  IMenuOrderMutate,
  ISearchImage,
  IUserSubMenu,
} from '@/types/image'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const useImageQuery = () => {
  // 이미지 검색
  const useSearchImages = (params: ISearchImage) => {
    return useQuery(['images', params], () => getImages(params), {
      enabled: !!params.query,
    })
  }

  // PUT 9.1.3 사용자 메뉴 수정
  const usePutMenu = () => {
    const queryClient = useQueryClient()
    return useMutation((params: IMenuMutate) => putMenuFetcher(params), {
      onSuccess: ({ data }) => {
        if (data.code !== 1000) return toast.warning(data.message)
        toast.success(data.message)
        queryClient.invalidateQueries({ queryKey: ['menus'] })
      },
      onError(error: any) {
        toast.error(error.response.data.message)
      },
    })
  }

  // POST 9.1.5 사용자 메뉴 등록
  const usePostMenuOrder = () => {
    const queryClient = useQueryClient()
    return useMutation(
      (params: IMenuOrderMutate[]) => postMenuOrderFetcher(params),
      {
        onSuccess: ({ data }) => {
          if (data.code !== 1000) return toast.warning(data.message)
          toast.success(data.message)
          queryClient.invalidateQueries({ queryKey: ['menus'] })
        },
        onError(error: any) {
          toast.error(error.response.data.message)
        },
      },
    )
  }

  // DELETE 9.1.6 사용자 메뉴 삭제
  const useDeleteMenu = () => {
    const queryClient = useQueryClient()
    return useMutation((params: IUserSubMenu) => deleteMenuFetcher(params), {
      onSuccess: ({ data }) => {
        if (data.code !== 1000) return toast.warning(data.message)
        toast.success(data.message)
        queryClient.invalidateQueries({ queryKey: ['menus'] })
      },
      onError(error: any) {
        toast.error(error.response.data.message)
      },
    })
  }

  return { useSearchImages, usePutMenu, usePostMenuOrder, useDeleteMenu }
}

export default useImageQuery
