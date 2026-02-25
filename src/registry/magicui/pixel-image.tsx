/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";

type PixelGrid = {
  rows: number;
  cols: number;
};

type PixelImageProps = {
  src: string;
  alt?: string;
  className?: string;
  customGrid?: PixelGrid;
  grayscaleAnimation?: boolean;
  onError?: () => void;
};

export function PixelImage({
  src,
  alt = "image",
  className,
  customGrid,
  grayscaleAnimation = false,
  onError,
}: PixelImageProps) {
  const rows = customGrid?.rows ?? 8;
  const cols = customGrid?.cols ?? 8;
  const totalCells = rows * cols;

  return (
    <div
      className={cn(
        "group relative isolate h-full w-full overflow-hidden",
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        onError={onError}
        className={cn(
          "h-full w-full object-cover [image-rendering:pixelated] transition-all duration-700",
          grayscaleAnimation
            ? "grayscale group-hover:grayscale-0 group-hover:scale-105"
            : "group-hover:scale-105"
        )}
      />

      <div
        className="pointer-events-none absolute inset-0 grid transition-opacity duration-500 group-hover:opacity-20"
        style={{
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: totalCells }).map((_, index) => {
          const opacity = 0.06 + ((index * 13) % 7) * 0.012;
          return (
            <span
              key={index}
              className={cn(
                "border border-black/8 dark:border-white/10 bg-black/8 dark:bg-white/10",
                grayscaleAnimation && "pixel-gray-animation"
              )}
              style={{ animationDelay: `${(index % cols) * 45}ms`, opacity }}
            />
          );
        })}
      </div>
    </div>
  );
}
