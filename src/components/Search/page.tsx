'use client'

import useImageQuery from '@/query/useImageQuery'
import { ISearchImage } from '@/types/image'
import { formatDate } from '@/utils/dateConverter'

import Image from 'next/image'
import { SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'

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
    setSearchParams((prevState) => ({ ...prevState, query: inputValue }))
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
            onSubmit={(event) => console.log(event)}
            className="absolute bottom-2.5 end-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            검색
          </button>
        </div>
      </form>

      {!images ? (
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
              {images?.documents?.map((image, imageIndex) => (
                <div
                  key={imageIndex}
                  className="group relative"
                  onClick={() => console.log(image.display_sitename)}
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
                      <div className="w-full  rounded-md bg-white bg-opacity-75 px-4 py-2 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                        내 보관함에 저장
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
