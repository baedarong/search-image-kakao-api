import {
  IMenuMutate,
  IMenuOrderMutate,
  IUserSubMenu,
} from '@/types/menu/manage'
import { instance } from './common'

// PUT 9.1.3 사용자 메뉴 수정
export const putMenuFetcher = (params: IMenuMutate) => {
  return instance.put(`/admin/menu/usermenu`, {
    menuId: params.menuId,
    menuName: params.menuName,
    groupId: params.groupId ?? null,
    isUse: params.isUse,
  })
}
// POST 9.1.5 사용자 메뉴 순서 변경
export const postMenuOrderFetcher = (params: IMenuOrderMutate[]) => {
  return instance.post(`/admin/menu/usermenu/order`, {
    menus: params,
  })
}

// DELETE 9.1.6 사용자 메뉴 삭제
export const deleteMenuFetcher = (params: IUserSubMenu) => {
  return instance.delete(`/admin/menu/usermenu/${params.menuId}`)
}
