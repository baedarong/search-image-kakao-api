'use client'

import useImageQuery from '@/query/useImageQuery'
import { IDocument, IImages, ISearchImage } from '@/types/image'
import { formatDate } from '@/utils/dateConverter'

import Image from 'next/image'
import { SetStateAction, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

// * 첫 번째 fragment : 검색 결과
// OK: 검색어를 입력할 수 있습니다.
// OK: 검색된 이미지 리스트가 나타납니다. 각 아이템에는 이미지와 함께 날짜와 시간을 표시합니다.
// 스크롤을 통해 다음 페이지를 불러옵니다.
// OK: 리스트에서 특정 이미지를 선택하여 '내 보관함'으로 저장할 수 있습니다.
// OK: 이미 보관된 이미지는 특별한 표시를 보여줍니다. (좋아요/별표/하트 등)
// OK: 보관된 이미지를 다시 선택하여 보관함에서 제거 가능합니다.

export default function Search() {
  const [inputValue, setInputValue] = useState('')
  const [searchParams, setSearchParams] = useState<ISearchImage>({
    query: '',
    sort: 'recency',
    page: 1,
    size: 10,
  }) // 검색조건
  const { useSearchImages } = useImageQuery()
  const { data: images, isLoading, error } = useSearchImages(searchParams)
  const [data, setData] = useState<IImages>({
    meta: {
      total_count: 0,
      pageable_count: 0,
      is_end: false,
    },
    documents: [],
  })

  useEffect(() => {
    if (!images || !images?.documents) return
    setData({
      meta: images.meta,
      documents: [...data.documents, ...images.documents],
    })
  }, [images])

  const handleChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault() // 폼 제출 시 페이지 새로고침 방지
    if (!inputValue.trim()) {
      setInputValue('')
      return toast.error('검색어를 입력해주세요.')
    }
    //검색 조건이 달라진 경우 초기화
    if (inputValue !== searchParams.query) {
      setData({
        meta: {
          total_count: 0,
          pageable_count: 0,
          is_end: false,
        },
        documents: [],
      })
    }
    setSearchParams((prevState) => ({ ...prevState, query: inputValue }))
  }

  const handleClickImage = (image: IDocument) => {
    try {
      // 기존에 저장된 정보 가져오기
      const existingImagesJSON = localStorage.getItem('myImages')
      let existingImages: IDocument[] = []

      if (existingImagesJSON) {
        // 기존에 저장된 정보가 있다면 JSON 문자열을 파싱하여 배열로 변환
        existingImages = JSON.parse(existingImagesJSON)

        // 이미지가 이미 존재하는지 확인
        const existingImageIndex = existingImages.findIndex(
          (existingImage) => existingImage.image_url === image.image_url,
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
      const updatedImages = [...existingImages, image] // 보관한 순서대로 저장
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

      {data.documents.length === 0 ? (
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
              {data?.documents?.map((image, imageIndex) => (
                <div
                  key={imageIndex}
                  className="group relative"
                  onClick={() => handleClickImage(image)}
                >
                  <div className="aspect-h-3 aspect-w-4 cursor-pointer overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={image.thumbnail_url}
                      alt={`${searchParams.query} 이미지 - ${image.collection}에서 발췌`}
                      className="object-cover object-center"
                      width={image.width}
                      height={image.height}
                    />
                    <div
                      className="flex items-end p-4 opacity-0 group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      <div className="flex w-full justify-between rounded-md bg-white bg-opacity-75 px-4 py-2 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                        <span>보관함에 저장하기</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
                    <h3>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {image.display_sitename}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {formatDate(image.datetime)}
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
