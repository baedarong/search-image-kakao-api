export interface IMenus {
  menus: IUserMenu[]
}

export interface IUserSubMenu {
  menuId: string
  menuName: string
  isUse: string
}

export interface IUserMenu extends IUserSubMenu {
  subMenus: IUserSubMenu[]
}

export interface IMenuMutate extends IUserSubMenu {
  groupId?: string //전체 관리자(공통 수정) 일경우, null 또는 안보내도됨
}

export interface IMenuOrderMutate {
  menuId: string
  subMenus: string[]
}
