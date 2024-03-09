import { IMenus } from '@/types/menu/manage'
import { instance, Response } from './common'
import { toast } from 'react-toastify'

// GET 9.1.1 사용자 메뉴 리스트 조회
export const menusFetcher = async (params: {
  groupId: string
  groupName: string
}): Promise<Response<IMenus>> => {
  return await instance
    .get(`admin/menu/usermenus?groupId=${params.groupId}`)
    .then((response) => response.data)
    .catch((error) => toast.error(error.response.data.message))
}
