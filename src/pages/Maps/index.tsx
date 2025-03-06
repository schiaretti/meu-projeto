import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import useGetLocation from "../../hooks/useGetLocation";

function RecenterMap({ coords }: { coords: LatLngExpression }) {
  const map = useMap();
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      map.setView(coords, 18); // Apenas no primeiro carregamento
      setFirstLoad(false);
    }
  }, [coords, map, firstLoad]);

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
      
      {/* Título */}
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Cadastro de postes</h2>
  
      {/* Seção do formulário */}
      <section className="bg-white p-6 border border-slate-400 rounded-lg shadow-lg">
        
        {/* Mapa com tamanho fixo */}
        <div className="w-full h-[500px] md:h-[400px] rounded-md shadow-md overflow-hidden">
          <MapContainer 
            center={coords} 
            zoom={13} 
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <RecenterMap coords={coords} />
  
            {markerPosition && (
              <CircleMarker
                center={markerPosition}
                radius={10}
                color="blue"
                fillColor="blue"
                fillOpacity={0.9}
              >
                <Popup>Posição atual do usuário</Popup>
              </CircleMarker>
            )}
          </MapContainer>
        </div>
  
        {/* Botão separado do mapa */}
        <button 
          type="button" 
          onClick={() => console.log("Salvar coordenadas:", markerPosition)}
          className="mt-6 w-full bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Salvar Localização
        </button>
  
      </section>
    </div>
  );
  
}

export default Maps;
