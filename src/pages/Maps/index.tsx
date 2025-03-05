/*import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import useGetLocation from "../../hooks/useGetLocation";

function Maps() {
  const { coords } = useGetLocation();
  const [markerPosition, setMarkerPosition] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    if (coords) {
      setMarkerPosition([coords[0], coords[1]]);
    }
  }, [coords]);

  if (!coords) {
    return <h1>Obtendo a localização...</h1>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-slate-500 p-8 border border-slate-400 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Cadastro de postes</h2>

      <form className="max-w-md mx-auto bg-slate-500 p-8 border border-slate-400 rounded-lg shadow-lg">
        <section className="max-w-md mx-auto bg-white p-8 border border-slate-400 rounded-lg shadow-lg">
          
          {/* Adicionando altura para tornar o mapa visível */
         /* <MapContainer 
            center={coords} 
            zoom={18} 
            className="w-full h-[300px] rounded-md shadow-md"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Atualizando o marcador conforme a posição muda */
            /*{markerPosition && (
              <Marker position={markerPosition}>
                <Popup>Posição atual do usuário</Popup>
              </Marker>
            )}
          </MapContainer>

          {/* Botão para salvar coordenadas ao parar */
         /* <button 
            type="button" 
            onClick={() => console.log("Salvar coordenadas:", markerPosition)}
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Salvar Localização
          </button>

        </section>
      </form>
    </div>
  );
}

export default Maps;*/

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import useGetLocation from "../../hooks/useGetLocation";

function RecenterMap({ coords }: { coords: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 18); // Centraliza o mapa na posição correta
  }, [coords, map]);
  return null;
}

function Maps() {
  const { coords } = useGetLocation();
  const [markerPosition, setMarkerPosition] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    if (coords) {
      setMarkerPosition([coords[0], coords[1]]);
    }
  }, [coords]);

  if (!coords) {
    return <h1>Obtendo a localização...</h1>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-slate-500 p-8 border border-slate-400 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Cadastro de postes</h2>

      <form className="max-w-md mx-auto bg-slate-500 p-8 border border-slate-400 rounded-lg shadow-lg">
        <section className="max-w-md mx-auto bg-white p-8 border border-slate-400 rounded-lg shadow-lg">
          
          <MapContainer 
            center={coords} 
            zoom={18} 
            className="w-full h-[300px] rounded-md shadow-md"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Componente para recentralizar o mapa na posição do usuário */}
            <RecenterMap coords={coords} />

            {/* Atualizando o marcador conforme a posição muda */}
            {markerPosition && (
              <Marker position={markerPosition}>
                <Popup>Posição atual do usuário</Popup>
              </Marker>
            )}
          </MapContainer>

          <button 
            type="button" 
            onClick={() => console.log("Salvar coordenadas:", markerPosition)}
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Salvar Localização
          </button>

        </section>
      </form>
    </div>
  );
}

export default Maps;


