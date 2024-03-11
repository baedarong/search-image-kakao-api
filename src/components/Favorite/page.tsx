'use client'

import { IDocument } from '@/types/image'
import { formatDate } from '@/utils/dateConverter'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'

// OK: 검색 결과에서 보관했던 이미지들이 보관한 순서대로 보입니다.
// OK: 보관한 이미지 리스트는 앱 재시작 후 다시 보여야 합니다. (DB 관련 라이브러리 사용 금지. SharedPreferences 사용 권장)
// OK: 적혀있지 않은 내용은 자유롭게 작성하시면 됩니다. (요건을 침해하지 않는 범위에서 기능 추가 등)

export default function Favorite(props: { show: boolean }) {
  const [images, setImages] = useState<IDocument[]>([])

  useEffect(() => {
    const existingImagesJSON = localStorage.getItem('myImages')
    if (existingImagesJSON) {
      const existingImages: IDocument[] = JSON.parse(existingImagesJSON)
      setImages(existingImages)
    }
  }, [props.show]) // 컴포넌트가 처음 렌더링될 때만 실행
  
  /*
  const handleRemoveImage = (clickedImage: IDocument) => {
    try {
      const existingImagesJSON = localStorage.getItem('myImages')
      if (existingImagesJSON) {
        const existingImages: IDocument[] = JSON.parse(existingImagesJSON)
        // 클릭된 이미지를 제외하고 다시 로컬 스토리지에 저장
        const updatedImages = existingImages.filter(
          (image) => image.image_url !== clickedImage.image_url,
        )
        localStorage.setItem('myImages', JSON.stringify(updatedImages))
        setImages(updatedImages)
        toast.success('보관함에서 이미지를 삭제했습니다!')
      }
    } catch (error) {
      toast.error('보관함에서 이미지를 제거하는데 실패했습니다!')
    }
  }
  */
  return (
    <div>
      {images.length > 0 ? (
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
            <div className="flex items-center justify-between space-x-4">
              <h2 className="text-lg font-medium text-gray-900">
                내 보관함에 저장된 이미지 리스트입니다. 추가한 순서대로
                조회됩니다.
              </h2>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
              {images?.map((image, imageIndex) => (
                <div
                  key={imageIndex}
                  className="group relative"
                  // onClick={() => handleRemoveImage(image)}
                >
                  <div className="aspect-h-3 aspect-w-4 cursor-pointer overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={image.thumbnail_url}
                      alt={image.thumbnail_url}
                      className="object-cover object-center"
                      width={image.width}
                      height={image.height}
                    />
                    {/* <div
                      className="flex items-end p-4 opacity-0 group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      <div className="w-full  rounded-md bg-white bg-opacity-75 px-4 py-2 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                        삭제하기
                      </div>
                    </div> */}
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
      ) : (
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <p className="text-base font-semibold leading-7 text-blue-600">
                카카오 AI 검색
              </p>
              <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                보관함에 나만의 이미지를 저장해보세요!
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                카카오 AI 검색 기능을 이용하여 이미지 또는 동영상을
                검색해보세요. 이미지는 최신순으로 나타나며, 보관함에 추가하기
                기능을 통해 내 보관함에 이미지를 저장할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
