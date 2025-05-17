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
  // Ensure width and height or fill are passed for the trigger image via ...rest
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
  const [naturalImageDimensions, setNaturalImageDimensions] = useState<{ width: number; height: number } | null>(null);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  // imageRef is for the NextImage component, not directly for its DOM element for getBoundingClientRect
  // We'll rely on naturalImageDimensions and imageContainerRef for calculations primarily.

  const imagesToDisplay = useMemo(() => {
    return allImages && allImages.length > 0 ? allImages : [src];
  }, [allImages, src]);

  const initialIndex = useMemo(() => {
    const index = imagesToDisplay.indexOf(src);
    return index !== -1 ? index : 0;
  }, [imagesToDisplay, src]);

  const [activeIndex, setActiveIndex] = useState(initialIndex);

  // Helper to calculate the zoom level to fit the image in the container
  const getCurrentFitZoom = useCallback(() => {
    if (!imageContainerRef.current || !naturalImageDimensions) return 1;
    const containerWidth = imageContainerRef.current.offsetWidth;
    const containerHeight = imageContainerRef.current.offsetHeight;
    const { width: naturalWidth, height: naturalHeight } = naturalImageDimensions;

    if (naturalWidth === 0 || naturalHeight === 0 || containerWidth === 0 || containerHeight === 0) {
      return 1;
    }
    // Calculate zoom to fit. If image is smaller than container, this zoom might be > 1.
    // We will cap it at 1 for initial display if image is small, or use it directly if image is large.
    const fitZoomRatio = Math.min(containerWidth / naturalWidth, containerHeight / naturalHeight);
    // If image is naturally smaller than container, show it at natural size (zoom=1) initially,
    // unless fitZoomRatio itself is already < 1 (which means container is smaller than image).
    // return Math.min(fitZoomRatio, 1.0); // This makes small images 100%, large images fit.
    return fitZoomRatio; // This will make small images scale up to fit if desired, or scale down large images.
                         // The user's problem description implies they want small images to not be *too* small.
                         // And large images not "zoomed in". So `fitZoomRatio` should handle both.
  }, [naturalImageDimensions]);

  // Effect for initial fit and when image/dialog state changes
  useEffect(() => {
    if (open) {
      if (naturalImageDimensions && imageContainerRef.current) {
        const fitZoom = getCurrentFitZoom();
        setZoomLevel(fitZoom);
        setDragPosition({ x: 0, y: 0 });
      }
      // If naturalImageDimensions is null, we are waiting for onLoadingComplete
    } else {
      // Dialog closed: reset states
      setZoomLevel(1);
      setDragPosition({ x: 0, y: 0 });
      setNaturalImageDimensions(null); // Important: clear for next open
    }
  }, [open, naturalImageDimensions, activeIndex, getCurrentFitZoom]);

  // Effect to clear natural dimensions when image source changes (via activeIndex)
  // This triggers onLoadingComplete for the new image, which then sets naturalImageDimensions,
  // leading to the effect above calculating and setting the new fit zoom.
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

    // If image is smaller than or fits the container at current zoom, no dragging needed.
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
    if (open && naturalImageDimensions) { // Ensure this runs only when dialog is active and image is loaded
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
    const minZoomAllowed = Math.max(fitZoom * 0.5, 0.1); // Allow zooming out to half of fit, min 0.1
    const maxZoomAllowed = 5; // Max zoom 5x (or adjust as needed)

    const delta = e.deltaY * -0.01; // Control zoom sensitivity
    let newZoom = zoomLevel * Math.exp(delta); // Exponential zoom for smoother feel
    newZoom = Math.max(minZoomAllowed, Math.min(maxZoomAllowed, newZoom));

    if (Math.abs(newZoom - zoomLevel) < 0.001 && newZoom !== minZoomAllowed && newZoom !== maxZoomAllowed) {
      return; // Avoid tiny updates unless hitting boundaries
    }

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // Cursor position relative to container
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate the point on the unscaled image that is under the cursor
    const pointOnImageX = (x - (centerX + dragPosition.x)) / zoomLevel;
    const pointOnImageY = (y - (centerY + dragPosition.y)) / zoomLevel;

    // Calculate the new drag position to keep that point under the cursor
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

    // Prevent dragging if image is smaller than or fits container at current zoom
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
    if (!isDragging || !naturalImageDimensions) return; // Also check naturalImageDimensions

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
      else if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handleNext, handlePrev]);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    if (!naturalImageDimensions || !imageContainerRef.current) return;

    const fitZoom = getCurrentFitZoom();
    // Define a zoomed-in level, e.g., 2.5x of fit, but ensure it's somewhat meaningful and capped
    const zoomedInTarget = Math.min(Math.max(fitZoom * 2.5, 1.0), 5); // At least natural size (if fit is smaller), max 5x

    let targetZoom;
    // If currently very close to fitZoom, then zoom in. Otherwise, revert to fitZoom.
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={`cursor-zoom-in w-full h-full relative group overflow-hidden ${wrapperClassName || ''}`}>
          <Image
            src={src}
            alt={alt}
            className={`transition-transform duration-300 group-hover:scale-105 w-full h-full object-contain ${className || ''}`} // object-contain for preview too
            priority={priority}
            {...rest} // Assuming width/height or fill are passed here for the trigger
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

        <div
            ref={imageContainerRef} // This ref is on the main container for calculations
            className="relative flex-grow w-full flex items-center justify-center my-1 sm:my-0 overflow-hidden"
            onWheel={naturalImageDimensions ? handleWheel : undefined} // Enable wheel only when image is loaded
        >
          {/* This inner div is for applying transformations */}
          <div
            className={`transition-transform duration-75 origin-center ${
              naturalImageDimensions &&
              (naturalImageDimensions.width * zoomLevel > (imageContainerRef.current?.offsetWidth || 0) ||
               naturalImageDimensions.height * zoomLevel > (imageContainerRef.current?.offsetHeight || 0))
                ? isDragging ? 'cursor-grabbing' : 'cursor-grab'
                : 'cursor-zoom-in' // Default or when image is smaller than container
            }`}
            style={{
              transform: `scale(${zoomLevel}) translate(${dragPosition.x / zoomLevel}px, ${dragPosition.y / zoomLevel}px)`,
              maxWidth: '100%', // Ensure the transform target respects boundaries if needed
              maxHeight: '100%', // though object-contain on Image handles aspect ratio.
            }}
            onMouseDown={naturalImageDimensions ? handleMouseDown : undefined}
            onTouchStart={naturalImageDimensions ? handleMouseDown : undefined} // Use same handler for touch
            onDoubleClick={naturalImageDimensions ? handleDoubleClick : undefined}
          >
            {open && ( // Conditionally render image to ensure onLoadingComplete fires correctly
              <Image
                // No ref needed here if not directly accessed for getBoundingClientRect
                key={imagesToDisplay[activeIndex]} // Add key to force re-render on image change
                src={imagesToDisplay[activeIndex]}
                alt={`${alt} - Image ${activeIndex + 1} of ${imagesToDisplay.length}`}
                className="select-none object-contain" // Critical for aspect ratio
                priority // Prioritize the main dialog image
                width={1920} // Provide large default, actual size controlled by object-contain & CSS
                height={1080}
                sizes="(max-width: 640px) 95vw, (max-width: 1200px) 90vw, 80vw" // Inform browser about display size
                quality={90} // Adjust quality as needed
                style={{
                  width: 'auto', // Let object-contain and dimensions dictate rendered size
                  height: 'auto',
                  maxWidth: '100%', // Necessary for object-contain within the transformed div
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
              disabled={!naturalImageDimensions} // Disable if image is loading
              className="absolute left-1 sm:left-2 md:left-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} className="sm:size-5" />
            </button>
        )}
        {imagesToDisplay.length > 1 && (
            <button
              onClick={handleNext}
              disabled={!naturalImageDimensions} // Disable if image is loading
              className="absolute right-1 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
              aria-label="Next image"
            >
              <ChevronRight size={18} className="sm:size-5" />
            </button>
        )}


        {imagesToDisplay.length > 1 && (
          <div className="w-full h-[70px] sm:h-[90px] flex-shrink-0 mt-auto no-scrollbar">
            <div className="flex gap-2 overflow-x-auto p-1 sm:p-2 h-full items-center justify-center"> {/* Added justify-center */}
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
                    sizes="10vw" // Approx size for thumbnails
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {naturalImageDimensions && zoomLevel > getCurrentFitZoom() * 1.05 && ( // Show zoom % only if meaningfully zoomed from fit
          <div className="absolute bottom-3 left-3 z-20 text-white text-xs bg-black/50 px-2 py-1 rounded-md">
            {Math.round(zoomLevel / getCurrentFitZoom() * 100)}%
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImageWrapper;