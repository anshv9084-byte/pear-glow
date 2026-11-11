"use client";

import { useEffect, useRef } from "react";

interface AutoVideoProps {
  src: string;
  poster: string;
  label: string;
  className?: string;
}

export default function AutoVideo({
  src,
  poster,
  label,
  className,
}: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (!("IntersectionObserver" in window)) {
      void video.play().catch(() => {});
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      muted
      loop
      playsInline
      controls
      controlsList="nodownload noplaybackrate"
      disablePictureInPicture
      preload="none"
      className={className}
    />
  );
}
