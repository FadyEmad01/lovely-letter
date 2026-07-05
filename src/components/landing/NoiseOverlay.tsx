"use client";

export default function NoiseOverlay() {
  return (
     <div className="pointer-events-none fixed inset-0 z-50 h-full w-full overflow-hidden">
      <div
        className="absolute -left-[100%] -top-[100%] h-[300%] w-[300%] animate-noise bg-repeat"
        style={{
          backgroundImage: 'url("/texture/noise.webp")',
        }}
      />
    </div>
  );
}
