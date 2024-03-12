'use client'

import useImageQuery from '@/query/useImageQuery'
import { IDocument, IImage, IMeta, ISearchMedia, IVideo } from '@/types/image'
import { formatDate } from '@/utils/dateConverter'
import { HeartIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

import Image from 'next/image'
import { SetStateAction, useEffect, useState } from 'react'
import { toast, useToast } from 'react-toastify'

/*
OK: 검색은 키워드 하나에 이미지 검색과 동영상 검색을 동시에 사용합니다.
OK: 두 검색 결과를 합친 리스트를 사용합니다.
OK: 구체적인 사용 필드는 아래와 같습니다.
이미지 검색 API 의 thumbnail_url 필드 이용
동영상 검색 API 의 thumbnail 필드 이용
TOBE: 두 검색 결과를 datetime 필드를 이용해 정렬하여 출력합니다. (최신부터 나타나도록)

* 첫 번째 fragment : 검색 결과
OK: 검색어를 입력할 수 있습니다.
OK: 검색된 이미지 리스트가 나타납니다. 각 아이템에는 이미지와 함께 날짜와 시간을 표시합니다.
OK: 스크롤을 통해 다음 페이지를 불러옵니다.
OK: 리스트에서 특정 이미지를 선택하여 '내 보관함'으로 저장할 수 있습니다.
OK: 이미 보관된 이미지는 특별한 표시를 보여줍니다. (좋아요/별표/하트 등)
OK: 보관된 이미지를 다시 선택하여 보관함에서 제거 가능합니다.

*/
export default function Search(props: { show: boolean }) {
  const [inputValue, setInputValue] = useState('')
  const [searchParams, setSearchParams] = useState<ISearchMedia>({
    query: '',
    sort: 'recency',
    page: 1,
    size: 10,
  }) // 검색조건
  const [metas, setMetas] = useState<{ imageMeta: IMeta; videoMeta: IMeta }>({
    imageMeta: {
      total_count: 0,
      pageable_count: 0,
      is_end: false,
    },
    videoMeta: {
      total_count: 0,
      pageable_count: 0,
      is_end: false,
    },
  })
  const { useSearchImages, useSearchVideos } = useImageQuery()
  const { data: images } = useSearchImages(searchParams, metas.imageMeta)
  const { data: videos } = useSearchVideos(searchParams, metas.videoMeta)

  const [results, setResults] = useState<(IImage | IVideo)[]>([])
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isFetching, setIsFetching] = useState(false)
  const [page, setPage] = useState(1)

  // 페이지가 로드될 때 세션 스토리지에서 스크롤 위치를 가져와 설정합니다.
  useEffect(() => {
    if (props.show) {
      const storedPosition = sessionStorage.getItem('scrollPosition')
      if (storedPosition) {
        window.scrollTo(0, parseInt(storedPosition))
      }
    }
    // 컴포넌트가 unmount될 때 스크롤 위치를 세션 스토리지에 저장합니다.
    return () => {
      sessionStorage.setItem('scrollPosition', scrollPosition.toString())
    }
  }, [props.show])

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY
      setScrollPosition(currentPosition)
      if (!isFetching) {
        // 화면 전체의 높이
        const windowHeight = window.innerHeight
        // 스크롤된 높이
        const scrollHeight = document.documentElement.scrollHeight
        // 스크롤된 높이 - 화면 전체의 높이
        const scrolled = scrollHeight - windowHeight
        // 스크롤된 높이 * 4/5
        const fourFifth = scrolled * (4 / 5)

        // 현재 스크롤 위치가 화면의 4/5쯤에 도달했을 때 setSearchParams 호출
        if (window.scrollY >= fourFifth) {
          setIsFetching(true) // 스크롤 중임을 표시
          setPage(page + 1)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isFetching]) // isScrolling 상태가 변경될 때마다 이펙트 재실행

  useEffect(() => {
    setSearchParams({ ...searchParams, page: page })
  }, [page])

  // localStorage에서 모든 '좋아요' 상태를 가져오는 함수
  const getLikedItems = (): IDocument[] => {
    const likedItemsJSON = localStorage.getItem('myImages')
    return likedItemsJSON ? JSON.parse(likedItemsJSON) : []
  }

  // 특정 아이템의 '좋아요' 상태를 확인하여 업데이트 하는 함수
  const isLikedImage = (image_id: string): boolean => {
    const likedItems = getLikedItems()
    return likedItems.some((item) => item.thumbnail_url === image_id)
  }

  // 이미지 isLiked 필드 추가
  const addIsLikedImage = (
    documents: IImage[],
  ): (IImage & { isLiked: boolean })[] => {
    return documents.map((document) => ({
      ...document,
      isLiked: isLikedImage(document.thumbnail_url),
    }))
  }

  // 특정 아이템의 '좋아요' 상태를 확인하여 업데이트 하는 함수
  const isLikedVideo = (image_id: string): boolean => {
    const likedItems = getLikedItems()
    return likedItems.some((item) => item.thumbnail === image_id)
  }

  // 이미지 isLiked 필드 추가
  const addIsLikedVideo = (
    documents: IVideo[],
  ): (IVideo & { isLiked: boolean })[] => {
    return documents.map((document) => ({
      ...document,
      isLiked: isLikedVideo(document.thumbnail),
    }))
  }

  function sortByDatetimeDesc(dataArray: (IVideo | IImage)[]) {
    return dataArray.sort((a, b) => {
      // 날짜를 파싱하여 Date 객체로 변환
      const dateA = new Date(a.datetime)
      const dateB = new Date(b.datetime)

      // 내림차순 정렬을 위해 b에서 a를 뺌
      return Number(dateB) - Number(dateA)
    })
  }

  useEffect(() => {
    if (!images || !images?.documents || !videos || !videos.documents) return
    // 보관함과 비교하여 liked 필드 추가
    const addLikedImageList = addIsLikedImage(images.documents)
    const addLikedVideoList = addIsLikedVideo(videos.documents)

    // 새로운 데이터에 모두 type 추가
    const combinedResults = [
      ...addLikedImageList.map((item) => ({ ...item, type: 'image' })),
      ...addLikedVideoList.map((item) => ({ ...item, type: 'video' })),
    ]

    // 이미지, 비디오 최신순으로 정렬
    const sortedDates = sortByDatetimeDesc(combinedResults)

    setResults([...results, ...sortedDates])
    setMetas({
      imageMeta: images.meta,
      videoMeta: videos.meta,
    })
    setIsFetching(false)
  }, [images, videos])

  const handleChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault() // 폼 제출 시 페이지 새로고침 방지
    setPage(1)
    if (!inputValue.trim()) {
      setInputValue('')
      return toast.error('검색어를 입력해주세요.')
    }
    //검색 조건이 달라진 경우 초기화
    if (inputValue !== searchParams.query) {
      setMetas({
        imageMeta: {
          total_count: 0,
          pageable_count: 0,
          is_end: false,
        },
        videoMeta: {
          total_count: 0,
          pageable_count: 0,
          is_end: false,
        },
      })
      setResults([])
    }
    setSearchParams((prevState) => ({ ...prevState, query: inputValue }))
    setIsFetching(false)
  }

  // 클릭한 요소의 isLiked 값을 변경하는 함수
  const toggleIsLiked = (documentIndex: number) => {
    setResults((prevData) => {
      const newDocuments = prevData.map((document, index) => {
        if (index === documentIndex) {
          // 클릭한 요소의 isLiked 값을 반대로 변경한 새로운 객체를 반환합니다.
          return {
            ...document,
            isLiked: !document.isLiked,
          }
        }
        return document // 변경하지 않을 경우 기존 객체를 반환합니다.
      })

      return newDocuments
    })
  }

  const handleClickImage = (docs: IImage | IVideo) => {
    try {
      // 기존에 저장된 정보 가져오기
      const existingImagesJSON = localStorage.getItem('myImages')
      let existingImages: (IImage | IVideo)[] = []
      if (existingImagesJSON) {
        // 기존에 저장된 정보가 있다면 JSON 문자열을 파싱하여 배열로 변환
        existingImages = JSON.parse(existingImagesJSON)

        // 이미지가 이미 존재하는지 확인
        const existingImageIndex = existingImages.findIndex((existingImage) =>
          docs.type === 'image'
            ? existingImage.thumbnail_url === docs.thumbnail_url
            : existingImage.thumbnail === docs.thumbnail,
        )

        if (existingImageIndex !== -1) {
          // 이미지가 이미 보관함에 있는 경우 제거
          existingImages.splice(existingImageIndex, 1)
          localStorage.setItem('myImages', JSON.stringify(existingImages))
          toast.info('이미지를 보관함에서 제거했습니다.')
          return // 이미지를 제거하고 함수 종료
        }
      }

      // 이미지가 보관함에 없는 경우 추가
      const updatedImages = [...existingImages, docs] // 보관한 순서대로 저장
      localStorage.setItem('myImages', JSON.stringify(updatedImages))

      toast.success('이미지를 내 보관함에 추가했습니다!')
    } catch (error) {
      toast.error('이미지를 보관함에 추가하거나 제거하는데 실패했습니다.')
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="search-bar mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8"
      >
        <label
          htmlFor="search-bar"
          className="sr-only mb-2 text-sm font-medium text-gray-900 "
        >
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            <svg
              className="h-4 w-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
            placeholder="검색어를 입력하세요."
            required
            onChange={handleChange}
            value={inputValue}
          />
          <button
            type="submit"
            className="absolute bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            검색
          </button>
        </div>
      </form>

      {results.length === 0 ? (
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <p className="text-base font-semibold leading-7 text-blue-600">
                카카오 AI 검색
              </p>
              <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                이미지 또는 동영상을 검색해보세요!
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                카카오 AI 검색 기능을 이용하여 이미지 또는 동영상을
                검색해보세요. 이미지는 최신순으로 나타나며, 보관함에 추가하기
                기능을 통해 내 보관함에 이미지를 저장할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
            <div className="flex items-center justify-between space-x-4">
              <h2 className="text-lg font-medium text-gray-900">
                {searchParams.query}에 대한 검색 결과입니다.
              </h2>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
              {results?.map((docs, docsIndex) => (
                <div
                  key={docsIndex}
                  className="group relative"
                  onClick={() => {
                    handleClickImage(docs)
                    toggleIsLiked(docsIndex)
                  }}
                >
                  <div className="aspect-h-3 aspect-w-4 cursor-pointer overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={docs.thumbnail_url ?? docs.thumbnail}
                      alt={'imagealt'}
                      className="object-cover object-center"
                      width={docs.width ?? 200}
                      height={docs.height ?? 200}
                    />
                    <div
                      className="flex items-end p-4 opacity-100"
                      aria-hidden="true"
                    >
                      <div className="flex w-auto justify-items-end rounded-md bg-white bg-opacity-75 px-4 py-2 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                        <HeartIcon
                          className={clsx(
                            '"h-6 text-gray-400" w-6',
                            docs.isLiked && 'fill-red-400 text-red-400',
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {formatDate(docs.datetime)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
