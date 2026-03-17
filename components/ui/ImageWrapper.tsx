// components/ui/ImageWrapper.tsx
"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Image, { ImageProps } from "next/image";
import { Dialog, DialogTitle, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, XIcon } from "lucide-react";

interface ImageWrapperProps extends Omit<ImageProps, 'src' | 'alt' | 'priority' | 'className'> {
  src: string;
  alt: string;
  allImages?: string[];
  priority?: boolean;
  className?: string;
  wrapperClassName?: string;
  openViewer?: boolean;
  onViewerClose?: () => void;
  
  // Feature toggles
  enableZoom?: boolean;
  enableNavigation?: boolean;
  enableThumbnails?: boolean;
  enableKeyboardNav?: boolean;
  enableDoubleClickZoom?: boolean;
  enableWheelZoom?: boolean;
  enableDrag?: boolean;
  
  // Zoom settings
  minZoom?: number;
  maxZoom?: number;
  zoomStep?: number;
  initialZoom?: 'fit' | 'actual' | number;
  
  // Display settings
  scaleMode?: 'actual' | 'contain' | 'cover';
  backgroundColor?: string;
  
  // Dialog settings
  dialogClassName?: string;
  closeOnClickOutside?: boolean;
  showZoomPercentage?: boolean;
  showImageCounter?: boolean;
  showImageDimensions?: boolean;
  
  // Image quality
  quality?: number;
  
  // Callbacks
  onImageChange?: (index: number) => void;
  onZoomChange?: (zoom: number) => void;
}


const isSupportedImage = (src: string) => {
  const validExtensions = [".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif"];
  return validExtensions.some(ext => src.toLowerCase().endsWith(ext));
};

const ImageWrapper: React.FC<ImageWrapperProps> = ({
  src,
  alt,
  allImages,
  priority,
  className,
  wrapperClassName,
  openViewer = false,
  onViewerClose,
  
  // Feature toggles
  enableZoom = true,
  enableNavigation = true,
  enableThumbnails = true,
  enableKeyboardNav = true,
  enableDoubleClickZoom = true,
  enableWheelZoom = true,
  enableDrag = true,
  
  // Zoom settings
  minZoom = 0.1,
  maxZoom = 5,
  zoomStep = 0.01,
  initialZoom = 'actual',
  
  // Display settings
  scaleMode = 'actual',
  backgroundColor = 'bg-black/90',
  
  // Dialog settings
  dialogClassName,
  closeOnClickOutside = true,
  showZoomPercentage = true,
  showImageCounter = true,
  showImageDimensions = true,
  
  // Image quality
  quality = 100,
  
  // Callbacks
  onImageChange,
  onZoomChange,
  
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

  // Show navigation controls
  const showNavigation = enableNavigation && imagesToDisplay.length > 1;
  const showThumbnailsBar = enableThumbnails && imagesToDisplay.length > 1;

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

  // Helper to calculate the zoom level to fit/contain the image in the container
  const getContainZoom = useCallback(() => {
    if (!imageContainerRef.current || !naturalImageDimensions) return 1;
    const containerWidth = imageContainerRef.current.offsetWidth;
    const containerHeight = imageContainerRef.current.offsetHeight;
    const { width: naturalWidth, height: naturalHeight } = naturalImageDimensions;

    if (naturalWidth === 0 || naturalHeight === 0 || containerWidth === 0 || containerHeight === 0) {
      return 1;
    }

    return Math.min(containerWidth / naturalWidth, containerHeight / naturalHeight);
  }, [naturalImageDimensions]);

  // Helper to calculate the zoom level to cover the container
  const getCoverZoom = useCallback(() => {
    if (!imageContainerRef.current || !naturalImageDimensions) return 1;
    const containerWidth = imageContainerRef.current.offsetWidth;
    const containerHeight = imageContainerRef.current.offsetHeight;
    const { width: naturalWidth, height: naturalHeight } = naturalImageDimensions;

    if (naturalWidth === 0 || naturalHeight === 0 || containerWidth === 0 || containerHeight === 0) {
      return 1;
    }

    return Math.max(containerWidth / naturalWidth, containerHeight / naturalHeight);
  }, [naturalImageDimensions]);

  // Get the appropriate zoom based on scale mode
  const getScaleModeZoom = useCallback(() => {
    if (!imageContainerRef.current || !naturalImageDimensions) return 1;
    const containerWidth = imageContainerRef.current.offsetWidth;
    const containerHeight = imageContainerRef.current.offsetHeight;
    const { width: naturalWidth, height: naturalHeight } = naturalImageDimensions;

    switch (scaleMode) {
      case 'contain':
        return getContainZoom();
      case 'cover':
        return getCoverZoom();
      case 'actual':
      default:
        if (naturalWidth > containerWidth || naturalHeight > containerHeight) {
          return getContainZoom();
        }
        return 1;
    }
  }, [naturalImageDimensions, scaleMode, getContainZoom, getCoverZoom]);

  // Get initial zoom based on settings
  const getInitialZoom = useCallback(() => {
    if (typeof initialZoom === 'number') {
      return Math.max(minZoom, Math.min(maxZoom, initialZoom));
    }
    if (initialZoom === 'actual') {
      return getScaleModeZoom();
    }
    return getContainZoom();
  }, [initialZoom, minZoom, maxZoom, getScaleModeZoom, getContainZoom]);

  // Effect for initial fit and when image/dialog state changes
  useEffect(() => {
    if (open) {
      if (naturalImageDimensions && imageContainerRef.current) {
        const initialZoomLevel = getInitialZoom();
        setZoomLevel(initialZoomLevel);
        setDragPosition({ x: 0, y: 0 });
        
        if (onZoomChange) {
          onZoomChange(initialZoomLevel);
        }
      }
    } else {
      setZoomLevel(1);
      setDragPosition({ x: 0, y: 0 });
      setNaturalImageDimensions(null);
    }
  }, [open, naturalImageDimensions, activeIndex, getInitialZoom, onZoomChange]);

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

  // Notify parent when active index changes
  useEffect(() => {
    if (open && onImageChange) {
      onImageChange(activeIndex);
    }
  }, [activeIndex, onImageChange, open]);

  const constrainDragPosition = useCallback((position: { x: number; y: number }, currentZoom: number) => {
    if (!enableDrag || !imageContainerRef.current || !naturalImageDimensions || currentZoom <= 0) {
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
  }, [naturalImageDimensions, enableDrag]);

  // Constrain drag position reactively when zoomLevel or naturalImageDimensions change
  useEffect(() => {
    if (open && naturalImageDimensions) {
      setDragPosition(prev => constrainDragPosition(prev, zoomLevel));
    }
  }, [zoomLevel, naturalImageDimensions, constrainDragPosition, open]);

  const handleNext = useCallback(() => {
    if (!showNavigation) return;
    setActiveIndex((prev) => (prev + 1) % imagesToDisplay.length);
  }, [imagesToDisplay.length, showNavigation]);

  const handlePrev = useCallback(() => {
    if (!showNavigation) return;
    setActiveIndex((prev) => (prev - 1 + imagesToDisplay.length) % imagesToDisplay.length);
  }, [imagesToDisplay.length, showNavigation]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!enableWheelZoom || !enableZoom) return;
    
    e.preventDefault();
    if (!naturalImageDimensions || !imageContainerRef.current) return;

    const containZoom = getContainZoom();
    const minZoomAllowed = Math.max(minZoom, containZoom * 0.5);
    const maxZoomAllowed = maxZoom;

    const delta = e.deltaY * -zoomStep;
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
    
    if (onZoomChange) {
      onZoomChange(newZoom);
    }
  }, [zoomLevel, dragPosition, constrainDragPosition, naturalImageDimensions, getContainZoom, enableWheelZoom, enableZoom, minZoom, maxZoom, zoomStep, onZoomChange]);

  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!enableDrag || !naturalImageDimensions || !imageContainerRef.current) return;

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
  }, [zoomLevel, dragPosition, naturalImageDimensions, enableDrag]);

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging || !naturalImageDimensions || !enableDrag) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const newPosition = {
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    };
    setDragPosition(constrainDragPosition(newPosition, zoomLevel));
  }, [isDragging, dragStart, zoomLevel, constrainDragPosition, naturalImageDimensions, enableDrag]);

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
    if (!enableKeyboardNav) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!open) return;
      if (event.key === "ArrowRight") handleNext();
      else if (event.key === "ArrowLeft") handlePrev();
      else if (event.key === "Escape") handleOpenChange(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleNext, handlePrev, handleOpenChange, enableKeyboardNav]);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    if (!enableDoubleClickZoom || !enableZoom || !naturalImageDimensions || !imageContainerRef.current) return;

    const currentScaleModeZoom = getScaleModeZoom();
    const zoomedInTarget = Math.min(Math.max(currentScaleModeZoom * 2.5, 1.0), maxZoom);

    let targetZoom;
    if (Math.abs(zoomLevel - currentScaleModeZoom) < 0.05) {
      targetZoom = zoomedInTarget;
    } else {
      targetZoom = currentScaleModeZoom;
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
    
    if (onZoomChange) {
      onZoomChange(targetZoom);
    }
  }, [zoomLevel, dragPosition, naturalImageDimensions, getScaleModeZoom, constrainDragPosition, enableDoubleClickZoom, enableZoom, maxZoom, onZoomChange]);

  // Handle thumbnail click - Fixed to prevent duplication
  const handleThumbnailClick = useCallback((e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (idx !== activeIndex) {
      setActiveIndex(idx);
    }
  }, [activeIndex]);

  // Determine cursor style
  const getCursorClass = () => {
    if (!enableZoom && !enableDrag) return '';
    if (!naturalImageDimensions) return '';
    
    const containerWidth = imageContainerRef.current?.offsetWidth || 0;
    const containerHeight = imageContainerRef.current?.offsetHeight || 0;
    const scaledImgWidth = naturalImageDimensions.width * zoomLevel;
    const scaledImgHeight = naturalImageDimensions.height * zoomLevel;
    
    const canDrag = enableDrag && (scaledImgWidth > containerWidth || scaledImgHeight > containerHeight);
    
    if (canDrag) {
      return isDragging ? 'cursor-grabbing' : 'cursor-grab';
    } else if (enableZoom && enableDoubleClickZoom) {
      return 'cursor-zoom-in';
    }
    return '';
  };

  // Calculate display percentage relative to actual size
  const getDisplayPercentage = () => {
    if (!naturalImageDimensions) return 100;
    return Math.round(zoomLevel * 100);
  };

  // Check if image is being scaled down from actual size
  const isScaledDown = () => {
    return naturalImageDimensions && zoomLevel < 0.99;
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className={`cursor-pointer w-full h-full relative group overflow-hidden ${wrapperClassName || ''}`}>
          <Image
            src={src}
            alt={alt}
            className={`transition-transform duration-300 group-hover:scale-105 w-full h-full object-cover ${className || ''}`}
            priority={priority}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
            {...rest}
          />
        </div>
      </DialogTrigger>
      <DialogTitle className="sr-only">{alt}</DialogTitle>
      <DialogContent 
        showCloseButton={false}
        className={`min-w-[95vw] md:min-w-[75vw] w-full h-[80vh] mt-8 p-2 sm:p-3 ${backgroundColor} backdrop-blur-md flex flex-col z-[9999] focus:outline-none border-none shadow-2xl rounded-lg ${dialogClassName || ''}`}
        onPointerDownOutside={closeOnClickOutside ? undefined : (e) => e.preventDefault()}
      >
        <button
          onClick={() => handleOpenChange(false)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors cursor-pointer"
          aria-label="Close image preview"
        >
          <X size={24} />
        </button>

        <div
          ref={imageContainerRef}
          className="relative flex-grow w-full flex items-center justify-center my-1 sm:my-0 overflow-hidden"
          onWheel={naturalImageDimensions && enableWheelZoom ? handleWheel : undefined}
        >
          <div
            className={`transition-transform duration-75 origin-center ${getCursorClass()}`}
            style={{
              transform: `scale(${zoomLevel}) translate(${dragPosition.x / zoomLevel}px, ${dragPosition.y / zoomLevel}px)`,
            }}
            onMouseDown={naturalImageDimensions && enableDrag ? handleMouseDown : undefined}
            onTouchStart={naturalImageDimensions && enableDrag ? handleMouseDown : undefined}
            onDoubleClick={naturalImageDimensions && enableDoubleClickZoom ? handleDoubleClick : undefined}
          >
            {(open && (imagesToDisplay[activeIndex]))  &&  (
              <Image
                key={imagesToDisplay[activeIndex]}
                src={imagesToDisplay[activeIndex]}
                alt={`${alt} - Image ${activeIndex + 1} of ${imagesToDisplay.length}`}
                className="select-none"
                priority
                width={naturalImageDimensions?.width || 1920}
                height={naturalImageDimensions?.height || 1080}
                sizes="(max-width: 640px) 95vw, (max-width: 1200px) 90vw, 80vw"
                quality={quality}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                style={{
                  width: naturalImageDimensions ? `${naturalImageDimensions.width}px` : 'auto',
                  height: naturalImageDimensions ? `${naturalImageDimensions.height}px` : 'auto',
                  maxWidth: 'none',
                  maxHeight: 'none',
                }}
                onLoadingComplete={({ naturalWidth, naturalHeight }) => {
                  setNaturalImageDimensions({ width: naturalWidth, height: naturalHeight });
                }}
              />
            )}
          </div>
        </div>
        
        {showNavigation && (
          <button
            onClick={handlePrev}
            disabled={!naturalImageDimensions}
            className="absolute left-1 sm:left-2 md:left-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors focus:outline-none disabled:opacity-50 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} className="sm:size-5" />
          </button>
        )}
        {showNavigation && (
          <button
            onClick={handleNext}
            disabled={!naturalImageDimensions}
            className="absolute right-1 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors focus:outline-none disabled:opacity-50 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight size={18} className="sm:size-5" />
          </button>
        )}

        {showThumbnailsBar && (
          <div className="w-full h-[70px] sm:h-[90px] flex-shrink-0 mt-auto no-scrollbar">
            <div className="flex gap-2 overflow-x-auto p-1 sm:p-2 h-full items-center justify-center">
              {imagesToDisplay.map((imgSrc, idx) => (
                <div>
                  {imgSrc && (
                    <button
                      key={`${imgSrc}-${idx}`}
                      className={`h-14 w-20 sm:h-[70px] sm:w-28 flex-shrink-0 rounded border-2 transition-all duration-150 ease-in-out relative overflow-hidden focus:outline-none
                                      ${idx === activeIndex ? "border-white ring-2 ring-white scale-105" : "border-transparent hover:border-neutral-400 opacity-60 hover:opacity-100 focus:border-neutral-400"}`}
                      onClick={(e) => handleThumbnailClick(e, idx)}
                      onMouseDown={(e) => e.preventDefault()}
                      type="button"
                      aria-label={`View image ${idx + 1}`}
                    >
                        <Image
                          src={imgSrc}
                          alt={`Thumbnail of ${alt} ${idx + 1}`}
                          fill
                          className="object-cover pointer-events-none"
                          sizes="10vw"
                          draggable={false}
                        />                  
                    </button>
                  )}
                </div>
              ))}
              
            </div>
          </div>
        )}

        {showImageCounter && imagesToDisplay.length > 1 && (
          <div className="absolute top-3 left-3 z-20 text-white text-xs bg-black/50 px-2 py-1 rounded-md">
            {activeIndex + 1} / {imagesToDisplay.length}
          </div>
        )}

        {/* {naturalImageDimensions && (
          <div className="absolute bottom-3 left-3 z-20 text-white text-xs bg-black/50 px-2 py-1 rounded-md space-y-0.5">
            {showImageDimensions && (
              <div>
                {naturalImageDimensions.width} × {naturalImageDimensions.height}px
              </div>
            )}
            {showZoomPercentage && (
              <div className="flex items-center gap-1">
                <span>{getDisplayPercentage()}%</span>
                {isScaledDown() && (
                  <span className="text-yellow-400" title="Image scaled down to fit">
                    (fit)
                  </span>
                )}
              </div>
            )}
          </div>
        )} */}
      </DialogContent>
    </Dialog>
  );
};

export default ImageWrapper;
