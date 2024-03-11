export interface ISearchMedia {
  query: string
  sort: 'accuracy' | 'recency'
  page: number
  size: number
}

export interface IMeta {
  total_count: number
  pageable_count: number
  is_end: boolean
}

export interface IImage {
  collection: string
  thumbnail_url: string
  image_url: string
  width: number
  height: number
  display_sitename: string
  doc_url: string
  datetime: string
  isLiked?: boolean
}

export interface IImages {
  meta: IMeta
  documents: IImage[]
}

export interface IVideo {
  title: string
  play_time: number
  thumbnail: string
  url: string
  datetime: string
  author: string
}

export interface IVideos {
  meta: IMeta
  documents: IVideo[]
}
