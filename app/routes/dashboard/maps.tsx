// maps.tsx
import { lazy, Suspense } from "react";

const MapComponent = lazy(() => import("~/components/map-component"));

export default function Maps() {
  return (
    <div className="flex w-full max-w-5xl h-screen mx-auto justify-center py-8 gap-3">
      <Suspense fallback={<p>Loading map...</p>}>
        <MapComponent />
      </Suspense>
    </div>
  );
}
