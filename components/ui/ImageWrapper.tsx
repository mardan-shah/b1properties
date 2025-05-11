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
}

const ImageWrapper: React.FC<ImageWrapperProps> = ({
  src,
  alt,
  allImages,
  priority,
  className,
  wrapperClassName,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Fix the ESLint warning by using useMemo
  const imagesToDisplay = useMemo(() => {
    return allImages && allImages.length > 0 ? allImages : [src];
  }, [allImages, src]);

  const initialIndex = useMemo(() => {
    return imagesToDisplay.indexOf(src) !== -1 ? imagesToDisplay.indexOf(src) : 0;
  }, [imagesToDisplay, src]);
  
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  // Reset zoom level and position when changing images or closing dialog
  const resetZoomAndPosition = useCallback(() => {
    setZoomLevel(1);
    setDragPosition({ x: 0, y: 0 });
  }, []);

  // Constrain drag position to keep image in view
  const constrainDragPosition = useCallback((position: {x: number, y: number}, zoom: number) => {
    if (!imageContainerRef.current || !imageRef.current || zoom <= 1) {
      return { x: 0, y: 0 };
    }

    const container = imageContainerRef.current.getBoundingClientRect();
    const img = imageRef.current.getBoundingClientRect();
    
    // Calculate the boundaries for the image when zoomed
    const scaledImgWidth = img.width * zoom;
    const scaledImgHeight = img.height * zoom;
    
    // Calculate max drag distances
    const maxDragX = Math.max(0, (scaledImgWidth - container.width) / 2);
    const maxDragY = Math.max(0, (scaledImgHeight - container.height) / 2);
    
    return {
      x: Math.max(-maxDragX, Math.min(maxDragX, position.x)),
      y: Math.max(-maxDragY, Math.min(maxDragY, position.y))
    };
  }, []);

  useEffect(() => {
    resetZoomAndPosition();
  }, [activeIndex, resetZoomAndPosition]);

  useEffect(() => {
    if (!open) resetZoomAndPosition();
  }, [open, resetZoomAndPosition]);

  // Constrain drag position whenever zoom level changes
  useEffect(() => {
    setDragPosition(prev => constrainDragPosition(prev, zoomLevel));
  }, [zoomLevel, constrainDragPosition]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % imagesToDisplay.length);
  }, [imagesToDisplay.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + imagesToDisplay.length) % imagesToDisplay.length);
  }, [imagesToDisplay.length]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    const newZoom = Math.max(1, Math.min(5, zoomLevel + delta));
    
    // Only allow zoom if it's different enough (to prevent tiny changes)
    if (Math.abs(newZoom - zoomLevel) > 0.05) {
      if (imageContainerRef.current) {
        const rect = imageContainerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate new relative position based on cursor position
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate the offset from center in the current zoom
        const offsetX = (x - centerX - dragPosition.x);
        const offsetY = (y - centerY - dragPosition.y);
        
        // Calculate how much the offset should change with the new zoom
        const zoomRatio = newZoom / zoomLevel;
        const newOffsetX = offsetX * zoomRatio;
        const newOffsetY = offsetY * zoomRatio;
        
        // Calculate the new position
        const newPositionX = dragPosition.x + (offsetX - newOffsetX);
        const newPositionY = dragPosition.y + (offsetY - newOffsetY);
        
        // Update zoom first
        setZoomLevel(newZoom);
        
        // Then update position with constraints
        setDragPosition(constrainDragPosition({ x: newPositionX, y: newPositionY }, newZoom));
      } else {
        setZoomLevel(newZoom);
      }
    }
  }, [zoomLevel, dragPosition, constrainDragPosition]);

  // Handle mouse/touch drag for panning
  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (zoomLevel <= 1) return;
    
    e.preventDefault();
    setIsDragging(true);
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setDragStart({
      x: clientX - dragPosition.x,
      y: clientY - dragPosition.y
    });
  }, [zoomLevel, dragPosition]);

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const newPosition = {
      x: clientX - dragStart.x,
      y: clientY - dragStart.y
    };
    
    setDragPosition(constrainDragPosition(newPosition, zoomLevel));
  }, [isDragging, dragStart, zoomLevel, constrainDragPosition]);

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
      else if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleNext, handlePrev]);

  useEffect(() => {
    if (!open) {
      setActiveIndex(initialIndex);
    }
  }, [src, initialIndex, open]);

  // Double click to toggle zoom
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      resetZoomAndPosition();
    } else {
      const newZoom = 2.5;
      
      // Zoom toward click position
      if (imageContainerRef.current) {
        const rect = imageContainerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate how much to translate to center the clicked point
        const newPositionX = centerX - x;
        const newPositionY = centerY - y;
        
        // Set new zoom level and position with constraints
        setZoomLevel(newZoom);
        setDragPosition(constrainDragPosition({ x: newPositionX, y: newPositionY }, newZoom));
      } else {
        setZoomLevel(newZoom);
      }
    }
  }, [zoomLevel, resetZoomAndPosition, constrainDragPosition]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={`cursor-zoom-in w-full h-full relative group overflow-hidden ${wrapperClassName || ''}`}>
          <Image
            src={src}
            alt={alt}
            className={`transition-transform duration-300 group-hover:scale-105 w-full h-full ${className || ''}`}
            priority={priority}
            {...rest}
          />
        </div>
      </DialogTrigger>
      <DialogTitle className="sr-only">{alt}</DialogTitle>
      <DialogContent className="min-w-[95vw] w-full h-[90vh] p-2 sm:p-3 bg-black/90 backdrop-blur-md flex flex-col z-[9999] focus:outline-none border-none shadow-2xl rounded-lg">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close image preview"
        >
          <XIcon size={24} />
        </button>

        <div className="relative flex-grow w-full flex items-center justify-center my-1 sm:my-0">
          {imagesToDisplay.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-1 sm:left-2 md:left-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} className="sm:size-5" />
            </button>
          )}
          <div 
            ref={imageContainerRef}
            className="relative w-full h-full max-h-[calc(90vh-100px)] sm:max-h-[calc(90vh-120px)] flex items-center justify-center overflow-hidden"
            onWheel={handleWheel}
          >
            <div 
              className={`transition-transform duration-75 origin-center ${zoomLevel > 1 ? 'cursor-grab' : 'cursor-zoom-in'} ${isDragging ? 'cursor-grabbing' : ''}`}
              style={{
                transform: `scale(${zoomLevel}) translate(${dragPosition.x / zoomLevel}px, ${dragPosition.y / zoomLevel}px)`,
                maxWidth: '100%',
                maxHeight: '100%',
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
              onDoubleClick={handleDoubleClick}
            >
              <Image
                ref={imageRef}
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
                  maxHeight: '100%'
                }}
              />
            </div>
          </div>
          {imagesToDisplay.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-1 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Next image"
            >
              <ChevronRight size={18} className="sm:size-5" />
            </button>
          )}
        </div>

        {imagesToDisplay.length > 1 && (
          <div className="w-full h-[70px] sm:h-[90px] flex-shrink-0 mt-auto no-scrollbar">
            <div className="flex gap-2 overflow-x-auto p-1 sm:p-2 h-full items-center">
              {imagesToDisplay.map((imgSrc, idx) => (
                <button
                  key={imgSrc + idx}
                  className={`h-14 w-20 sm:h-[70px] sm:w-28 flex-shrink-0 rounded border-2 transition-all duration-150 ease-in-out relative overflow-hidden focus:outline-none
                             ${idx === activeIndex ? "border-white ring-2 ring-white scale-105" : "border-transparent hover:border-neutral-400 opacity-60 hover:opacity-100 focus:border-neutral-400"}`}
                  onClick={() => setActiveIndex(idx)}
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
        
        {zoomLevel > 1 && (
          <div className="absolute bottom-3 left-3 z-20 text-white text-xs bg-black/50 px-2 py-1 rounded-md">
            {Math.round(zoomLevel * 100)}%
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageWrapper;