'use client'
import React,{ useState, useMemo } from 'react'
import ImageWrapper from '@/components/ui/ImageWrapper'

interface ShowcaseGridProps {
  images: string[]
  title: string
}

const getGridLayout = (numImages: number) => {
  const defaultSpan = 'md:col-span-1 md:row-span-1'

  if (numImages >= 8) {
    return {
      containerClass:
        'grid grid-cols-1 grid-rows-4 auto-rows-[20vh] md:grid-cols-4 md:auto-rows-[20vh] md:grid-flow-dense',
      spans: [
        'md:col-span-2 md:row-span-2',
        'md:col-span-1 md:row-span-2',
        'md:col-span-1 md:row-span-2',
        'md:col-span-1 md:row-span-2',
        'md:col-span-1 md:row-span-1',
        'md:col-span-1 md:row-span-1',
        'md:col-span-2 md:row-span-1',
        'md:col-span-1 md:row-span-2',
      ],
    }
  }

  switch (numImages) {
    case 1:
      return {
        containerClass: 'grid grid-cols-1 auto-rows-[20vh]',
        spans: ['md:col-span-1 md:row-span-1'],
      }
    case 2:
      return {
        containerClass: 'grid grid-cols-1 grid-rows-2 auto-rows-[20vh] md:grid-cols-2 md:auto-rows-[20] md:gap-2',
        spans: ['md:col-span-1 md:row-span-1', 'md:col-span-1 md:row-span-1'],
      }
    case 3:
      return {
        containerClass: 'grid grid-cols-1 grid-rows-3 auto-rows-[20vh] md:grid-cols-3 md:auto-rows-[20vh] md:grid-flow-dense',
        spans: ['md:col-span-2 md:row-span-2', 'md:col-span-1 md:row-span-1', 'md:col-span-1 md:row-span-1'],
      }
    case 4:
      return {
        containerClass: 'grid grid-cols-1 grid-rows-4 auto-rows-[20vh] md:grid-cols-2 md:auto-rows-[20vh] md:grid-flow-dense',
        spans: ['md:col-span-2 md:row-span-2', 'md:col-span-1 md:row-span-1', 'md:col-span-1 md:row-span-1', 'md:col-span-2 md:row-span-1'],
      }
    case 5:
      return {
        containerClass: 'grid grid-cols-1 grid-rows-5 auto-rows-[20vh] md:grid-cols-3 md:auto-rows-[18vh] md:grid-flow-dense',
        spans: ['md:col-span-2 md:row-span-2', 'md:col-span-1 md:row-span-4', 'md:col-span-2 md:row-span-1', 'md:col-span-1 md:row-span-1', 'md:col-span-1 md:row-span-1'],
      }
    case 6:
      return {
        containerClass: 'grid grid-cols-1 grid-rows-6 auto-rows-[20vh] md:grid-cols-3 md:auto-rows-[18vh] md:grid-flow-dense',
        spans: ['md:col-span-2 md:row-span-2', 'md:col-span-1 md:row-span-2', 'md:col-span-1 md:row-span-1', 'md:col-span-1 md:row-span-1', 'md:col-span-3 md:row-span-1', 'md:col-span-1 md:row-span-1'],
      }
    case 7:
      return {
        containerClass: 'grid grid-cols-1 grid-rows-7 auto-rows-[18vh] md:grid-cols-3 md:auto-rows-[18vh] md:grid-flow-dense',
        spans: ['md:col-span-2 md:row-span-2', 'md:col-span-1 md:row-span-2', 'md:col-span-1 md:row-span-1', 'md:col-span-1 md:row-span-1', 'md:col-span-2 md:row-span-1', 'md:col-span-1 md:row-span-1', 'md:col-span-1 md:row-span-1'],
      }
    default:
      return {
        containerClass: 'grid grid-cols-1 auto-rows-[20vh] md:grid-cols-2 md:auto-rows-[20vh]',
        spans: Array(numImages).fill(defaultSpan),
      }
  }
}

const ShowcaseGrid = ({ images, title }: ShowcaseGridProps) => {
  const [showAllImages, setShowAllImages] = useState(false)

  const visibleImages = useMemo(() => {
    return images.length > 8 ? images.slice(0, 8) : images
  }, [images])

  const extraCount = images.length > 8 ? images.length - 8 : 0
  const layout = useMemo(() => getGridLayout(visibleImages.length), [visibleImages.length])

  const openViewer = () => setShowAllImages(true)
  const closeViewer = () => setShowAllImages(false)

  return (
    <div className="w-full my-10">
      <div className={`${layout.containerClass} gap-[6px] md:gap-2 h-[150vh] md:h-[100vh]`}>
        {visibleImages.map((src, index) => {
          const isLastWithMore = index === 7 && extraCount > 0
          const spanClass = `col-span-full ${layout.spans[index] || 'md:col-span-1 md:row-span-1'}`

          return (
            <div
              key={index}
              className={`relative overflow-hidden ${spanClass} group cursor-pointer rounded-sm shadow-md`}
              onClick={isLastWithMore ? openViewer : undefined}
            >
              <ImageWrapper
                src={src}
                allImages={images}
                width={1920}
                height={1080}
                alt={`${title} image ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-sm"
                loading="lazy"
              />
              {isLastWithMore && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center text-white text-3xl font-bold z-10">
                  +{extraCount}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {showAllImages && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full p-4 bg-transparent overflow-y-auto">
            <button
              className="absolute top-4 right-6 text-white text-3xl z-50"
              onClick={closeViewer}
            >
              ✕
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pt-16">
              {images.map((img, i) => (
                <div key={i} className="flex justify-center items-center">
                  <ImageWrapper
                    src={img}
                    allImages={images}
                    width={1920}
                    height={1080}
                    alt={`Full ${title} image ${i + 1}`}
                    className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-sm"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(ShowcaseGrid)
