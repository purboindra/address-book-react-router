import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

export default function MapComponent() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex w-full max-w-5xl items-center justify-center">
        Component Rendered as Server
      </div>
    );
  }

  return (
    <MapContainer
      style={{ height: "100vh", width: "100%" }}
      center={[-6.229935, 106.407097]} // Balaraja
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[-6.229935, 106.407097]}>
        <Popup>
          <h1>Toko Pak Bejo</h1>
          <h2>JL. Ahmad Dahlan No 13</h2>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
