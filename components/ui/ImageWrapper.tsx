// components/ui/ImageWrapper.tsx
"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Image, { ImageProps } from "next/image";
import { Dialog, DialogTitle, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, XIcon } from "lucide-react";

interface ImageWrapperProps extends Omit<ImageProps, 'src' | 'alt' | 'priority' | 'className'> {
  src: string;
  alt: string;
  allImages?: string[];
  priority?: boolean;
  className?: string;
  wrapperClassName?: string;
  openViewer?: boolean;
  onViewerClose?: () => void; // Add callback for when viewer closes
  // Ensure width and height or fill are passed for the trigger image via ...rest
}

const ImageWrapper: React.FC<ImageWrapperProps> = ({
  src,
  alt,
  allImages,
  priority,
  className,
  wrapperClassName,
  openViewer = false,
  onViewerClose,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [naturalImageDimensions, setNaturalImageDimensions] = useState<{ width: number; height: number } | null>(null);

  const imageContainerRef = useRef<HTMLDivElement>(null);

  const imagesToDisplay = useMemo(() => {
    return allImages && allImages.length > 0 ? allImages : [src];
  }, [allImages, src]);

  const initialIndex = useMemo(() => {
    const index = imagesToDisplay.indexOf(src);
    return index !== -1 ? index : 0;
  }, [imagesToDisplay, src]);

  const [activeIndex, setActiveIndex] = useState(initialIndex);

  // Effect to handle external openViewer prop
  useEffect(() => {
    if (openViewer) {
      setOpen(true);
    }
  }, [openViewer]);

  // Handle dialog close
  const handleOpenChange = useCallback((newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen && onViewerClose) {
      onViewerClose();
    }
  }, [onViewerClose]);

  // Helper to calculate the zoom level to fit the image in the container
  const getCurrentFitZoom = useCallback(() => {
    if (!imageContainerRef.current || !naturalImageDimensions) return 1;
    const containerWidth = imageContainerRef.current.offsetWidth;
    const containerHeight = imageContainerRef.current.offsetHeight;
    const { width: naturalWidth, height: naturalHeight } = naturalImageDimensions;

    if (naturalWidth === 0 || naturalHeight === 0 || containerWidth === 0 || containerHeight === 0) {
      return 1;
    }
    const fitZoomRatio = Math.min(containerWidth / naturalWidth, containerHeight / naturalHeight);
    return fitZoomRatio;
  }, [naturalImageDimensions]);

  // Effect for initial fit and when image/dialog state changes
  useEffect(() => {
    if (open) {
      if (naturalImageDimensions && imageContainerRef.current) {
        const fitZoom = getCurrentFitZoom();
        setZoomLevel(fitZoom);
        setDragPosition({ x: 0, y: 0 });
      }
    } else {
      // Dialog closed: reset states
      setZoomLevel(1);
      setDragPosition({ x: 0, y: 0 });
      setNaturalImageDimensions(null);
    }
  }, [open, naturalImageDimensions, activeIndex, getCurrentFitZoom]);

  // Effect to clear natural dimensions when image source changes (via activeIndex)
  useEffect(() => {
    if (open) {
      setNaturalImageDimensions(null);
    }
  }, [activeIndex, open]);

  // Effect to reset activeIndex to the initial one if src changes while dialog is closed
  useEffect(() => {
    if (!open) {
      setActiveIndex(initialIndex);
    }
  }, [src, initialIndex, open]);

  const constrainDragPosition = useCallback((position: { x: number; y: number }, currentZoom: number) => {
    if (!imageContainerRef.current || !naturalImageDimensions || currentZoom <= 0) {
      return { x: 0, y: 0 };
    }

    const containerWidth = imageContainerRef.current.offsetWidth;
    const containerHeight = imageContainerRef.current.offsetHeight;
    const scaledImgWidth = naturalImageDimensions.width * currentZoom;
    const scaledImgHeight = naturalImageDimensions.height * currentZoom;

    if (scaledImgWidth <= containerWidth && scaledImgHeight <= containerHeight) {
      return { x: 0, y: 0 };
    }

    const maxDragX = Math.max(0, (scaledImgWidth - containerWidth) / 2);
    const maxDragY = Math.max(0, (scaledImgHeight - containerHeight) / 2);

    return {
      x: Math.max(-maxDragX, Math.min(maxDragX, position.x)),
      y: Math.max(-maxDragY, Math.min(maxDragY, position.y)),
    };
  }, [naturalImageDimensions]);

  // Constrain drag position reactively when zoomLevel or naturalImageDimensions change
  useEffect(() => {
    if (open && naturalImageDimensions) {
      setDragPosition(prev => constrainDragPosition(prev, zoomLevel));
    }
  }, [zoomLevel, naturalImageDimensions, constrainDragPosition, open]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % imagesToDisplay.length);
  }, [imagesToDisplay.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + imagesToDisplay.length) % imagesToDisplay.length);
  }, [imagesToDisplay.length]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (!naturalImageDimensions || !imageContainerRef.current) return;

    const fitZoom = getCurrentFitZoom();
    const minZoomAllowed = Math.max(fitZoom * 0.5, 0.1);
    const maxZoomAllowed = 5;

    const delta = e.deltaY * -0.01;
    let newZoom = zoomLevel * Math.exp(delta);
    newZoom = Math.max(minZoomAllowed, Math.min(maxZoomAllowed, newZoom));

    if (Math.abs(newZoom - zoomLevel) < 0.001 && newZoom !== minZoomAllowed && newZoom !== maxZoomAllowed) {
      return;
    }

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const pointOnImageX = (x - (centerX + dragPosition.x)) / zoomLevel;
    const pointOnImageY = (y - (centerY + dragPosition.y)) / zoomLevel;
    const newDragX = x - centerX - pointOnImageX * newZoom;
    const newDragY = y - centerY - pointOnImageY * newZoom;

    setZoomLevel(newZoom);
    setDragPosition(constrainDragPosition({ x: newDragX, y: newDragY }, newZoom));
  }, [zoomLevel, dragPosition, constrainDragPosition, naturalImageDimensions, getCurrentFitZoom]);

  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!naturalImageDimensions || !imageContainerRef.current) return;

    const containerWidth = imageContainerRef.current.offsetWidth;
    const containerHeight = imageContainerRef.current.offsetHeight;
    const scaledImgWidth = naturalImageDimensions.width * zoomLevel;
    const scaledImgHeight = naturalImageDimensions.height * zoomLevel;

    if (scaledImgWidth <= containerWidth && scaledImgHeight <= containerHeight) {
      return;
    }

    e.preventDefault();
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({
      x: clientX - dragPosition.x,
      y: clientY - dragPosition.y,
    });
  }, [zoomLevel, dragPosition, naturalImageDimensions]);

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging || !naturalImageDimensions) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const newPosition = {
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    };
    setDragPosition(constrainDragPosition(newPosition, zoomLevel));
  }, [isDragging, dragStart, zoomLevel, constrainDragPosition, naturalImageDimensions]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!open) return;
      if (event.key === "ArrowRight") handleNext();
      else if (event.key === "ArrowLeft") handlePrev();
      else if (event.key === "Escape") handleOpenChange(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleNext, handlePrev, handleOpenChange]);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    if (!naturalImageDimensions || !imageContainerRef.current) return;

    const fitZoom = getCurrentFitZoom();
    const zoomedInTarget = Math.min(Math.max(fitZoom * 2.5, 1.0), 5);

    let targetZoom;
    if (Math.abs(zoomLevel - fitZoom) < 0.05) {
      targetZoom = zoomedInTarget;
    } else {
      targetZoom = fitZoom;
    }

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const pointOnImageX = (x - (centerX + dragPosition.x)) / zoomLevel;
    const pointOnImageY = (y - (centerY + dragPosition.y)) / zoomLevel;
    const newDragX = x - centerX - pointOnImageX * targetZoom;
    const newDragY = y - centerY - pointOnImageY * targetZoom;

    setZoomLevel(targetZoom);
    setDragPosition(constrainDragPosition({ x: newDragX, y: newDragY }, targetZoom));
  }, [zoomLevel, dragPosition, naturalImageDimensions, getCurrentFitZoom, constrainDragPosition]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className={`cursor-pointer w-full h-full relative group overflow-hidden ${wrapperClassName || ''}`}>
          <Image
            src={src}
            alt={alt}
            className={`transition-transform duration-300 group-hover:scale-105 w-full h-full object-cover ${className || ''}`}
            priority={priority}
            {...rest}
          />
        </div>
      </DialogTrigger>
      <DialogTitle className="sr-only">{alt}</DialogTitle>
      <DialogContent className="min-w-[95vw] w-full h-[90vh] p-2 sm:p-3 bg-black/90 backdrop-blur-md flex flex-col z-[9999] focus:outline-none border-none shadow-2xl rounded-lg">
        <button
          onClick={() => handleOpenChange(false)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close image preview"
        >
          <XIcon size={24} />
        </button>

        <div
          ref={imageContainerRef}
          className="relative flex-grow w-full flex items-center justify-center my-1 sm:my-0 overflow-hidden"
          onWheel={naturalImageDimensions ? handleWheel : undefined}
        >
          <div
            className={`transition-transform duration-75 origin-center ${
              naturalImageDimensions &&
              (naturalImageDimensions.width * zoomLevel > (imageContainerRef.current?.offsetWidth || 0) ||
               naturalImageDimensions.height * zoomLevel > (imageContainerRef.current?.offsetHeight || 0))
                ? isDragging ? 'cursor-grabbing' : 'cursor-grab'
                : 'cursor-zoom-in'
            }`}
            style={{
              transform: `scale(${zoomLevel}) translate(${dragPosition.x / zoomLevel}px, ${dragPosition.y / zoomLevel}px)`,
              maxWidth: '100%',
              maxHeight: '100%',
            }}
            onMouseDown={naturalImageDimensions ? handleMouseDown : undefined}
            onTouchStart={naturalImageDimensions ? handleMouseDown : undefined}
            onDoubleClick={naturalImageDimensions ? handleDoubleClick : undefined}
          >
            {open && (
              <Image
                key={imagesToDisplay[activeIndex]}
                src={imagesToDisplay[activeIndex]}
                alt={`${alt} - Image ${activeIndex + 1} of ${imagesToDisplay.length}`}
                className="select-none object-contain"
                priority
                width={1920}
                height={1080}
                sizes="(max-width: 640px) 95vw, (max-width: 1200px) 90vw, 80vw"
                quality={90}
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
                onLoadingComplete={({ naturalWidth, naturalHeight }) => {
                  setNaturalImageDimensions({ width: naturalWidth, height: naturalHeight });
                }}
              />
            )}
          </div>
        </div>
        
        {imagesToDisplay.length > 1 && (
          <button
            onClick={handlePrev}
            disabled={!naturalImageDimensions}
            className="absolute left-1 sm:left-2 md:left-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} className="sm:size-5" />
          </button>
        )}
        {imagesToDisplay.length > 1 && (
          <button
            onClick={handleNext}
            disabled={!naturalImageDimensions}
            className="absolute right-1 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
            aria-label="Next image"
          >
            <ChevronRight size={18} className="sm:size-5" />
          </button>
        )}

        {imagesToDisplay.length > 1 && (
          <div className="w-full h-[70px] sm:h-[90px] flex-shrink-0 mt-auto no-scrollbar">
            <div className="flex gap-2 overflow-x-auto p-1 sm:p-2 h-full items-center justify-center">
              {imagesToDisplay.map((imgSrc, idx) => (
                <button
                  key={imgSrc + idx}
                  className={`h-14 w-20 sm:h-[70px] sm:w-28 flex-shrink-0 rounded border-2 transition-all duration-150 ease-in-out relative overflow-hidden focus:outline-none
                                  ${idx === activeIndex ? "border-white ring-2 ring-white scale-105" : "border-transparent hover:border-neutral-400 opacity-60 hover:opacity-100 focus:border-neutral-400"}`}
                  onClick={() => {
                    if (idx !== activeIndex) setActiveIndex(idx);
                  }}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image
                    src={imgSrc}
                    alt={`Thumbnail of ${alt} ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="10vw"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {naturalImageDimensions && zoomLevel > getCurrentFitZoom() * 1.05 && (
          <div className="absolute bottom-3 left-3 z-20 text-white text-xs bg-black/50 px-2 py-1 rounded-md">
            {Math.round(zoomLevel / getCurrentFitZoom() * 100)}%
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageWrapper;