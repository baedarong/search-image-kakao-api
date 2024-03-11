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

export interface ISearchImage {
  query: string
  sort?: 'accuracy' | 'recency'
  page?: number
  size?: number
}

export interface IMeta {
  total_count: number
  pageable_count: number
  is_end: boolean
}

export interface IDocument {
  collection: string
  thumbnail_url: string
  image_url: string
  width: number
  height: number
  display_sitename: string
  doc_url: string
  datetime: string
  liked?: boolean
}

export interface IImages {
  meta: IMeta
  documents: IDocument[]
}

export const mockimages: IImages = {
  meta: {
    total_count: 422583,
    pageable_count: 3854,
    is_end: false,
  },
  documents: [
    {
      collection: 'news',
      thumbnail_url:
        'https://search2.kakaocdn.net/argon/130x130_85_c/36hQpoTrVZp',
      image_url:
        'http://t1.daumcdn.net/news/201706/21/kedtv/20170621155930292vyyx.jpg',
      width: 540,
      height: 457,
      display_sitename: '한국경제TV',
      doc_url: 'http://v.media.daum.net/v/20170621155930002',
      datetime: '2017-06-21T15:59:30.000+09:00',
    },
  ],
}
