import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import useGetLocation from "../../hooks/useGetLocation";
import { useNavigate } from "react-router-dom";

function RecenterMap({ coords }: { coords: LatLngExpression }) {
  const map = useMap();
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      map.setView(coords, 18);
      setFirstLoad(false);
    }
  }, [coords, map, firstLoad]);

  return null;
}

function Maps() {
  const { coords } = useGetLocation();
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (coords) {
      setMarkerPosition([coords[0], coords[1]]);
    }
  }, [coords]);

  if (!coords) {
    return <h1>Obtendo a localização...</h1>;
  }

  return (
    <div className="max-w-md mx-auto mt-2 bg-slate-200 p-8 border border-slate-300 rounded-lg shadow-lg">
      <section className="bg-white p-6 border border-slate-400 rounded-lg shadow-lg">
        <div className="w-full h-[500px] md:h-[400px] rounded-md shadow-md overflow-hidden">
          <MapContainer center={coords} zoom={13} className="w-full h-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <RecenterMap coords={coords} />
            {markerPosition && (
              <CircleMarker center={markerPosition} radius={10} color="blue" fillColor="blue" fillOpacity={0.9}>
                <Popup>Localização selecionada</Popup>
              </CircleMarker>
            )}
          </MapContainer>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={() => {
              if (markerPosition) {
                console.log("Salvando localização:", markerPosition);
                navigate(`/CadastroPoste?lat=${markerPosition[0]}&lng=${markerPosition[1]}`);
              }
            }}
            className="w-full bg-blue-500 text-white py-2 px-5 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Salvar Localização
          </button>
        </div>
      </section>
    </div>
  );
}

export default Maps;
