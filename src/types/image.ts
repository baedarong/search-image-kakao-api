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
  thumbnail: string
  image_url: string
  width: number
  height: number
  display_sitename: string
  doc_url: string
  datetime: string
  isLiked?: boolean
  type?: string
}

export interface IVideo {
  title: string
  play_time: number
  thumbnail_url: string
  thumbnail: string
  url: string
  width: number
  height: number
  datetime: string
  author: string
  isLiked?: boolean
  type?: string
}
export interface IImages {
  meta: IMeta
  documents: IImage[]
}

export interface IDocument extends IVideo, IImage {}
export interface IVideos {
  meta: IMeta
  documents: IVideo[]
}

export interface IDocuments {
  imageMeta: IMeta
  imageDocuments: IImage[]
  videoMeta: IMeta
  videoDocuments: IVideo[]
}
