import {
  putMenuFetcher,
  postMenuOrderFetcher,
  deleteMenuFetcher,
} from '@/api/mutations'
import { menusFetcher } from '@/api/quries'
import {
  IMenuMutate,
  IMenuOrderMutate,
  IUserSubMenu,
} from '@/types/menu/manage'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const useMenuQuery = () => {
  // GET 9.1.1 사용자 메뉴 리스트 조회
  const useMenus = (params: { groupId: string; groupName: string }) => {
    return useQuery(['menus', params], () => menusFetcher(params))
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

  return { useMenus, usePutMenu, usePostMenuOrder, useDeleteMenu }
}

export default useMenuQuery
