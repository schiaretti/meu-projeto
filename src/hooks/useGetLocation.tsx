/*import { useEffect, useState } from "react";

function useGetLocation() {
  const [coords, setCoords] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocalização não suportada pelo navegador.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        console.log(`📍 Localização Atualizada: ${lat}, ${lon}`); // Log para depuração

        setCoords([lat, lon]);
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { coords };
}

export default useGetLocation;*/

import { useEffect, useState } from "react";

function useGetLocation(isLastPost: boolean) {
  const [coords, setCoords] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (isLastPost) {
      // Simula a obtenção das coordenadas da rua mais próxima
      const fetchNearestStreetCoords = async () => {
        try {
          // Aqui você pode integrar com uma API de geolocalização ou usar coordenadas fixas
          const mockCoords: [number, number] = [-23.5505, -46.6333]; // Exemplo: coordenadas de São Paulo
          setCoords(mockCoords);
          console.log(`📍 Coordenadas da rua mais próxima: ${mockCoords[0]}, ${mockCoords[1]}`);
        } catch (error) {
          console.error("Erro ao obter coordenadas da rua mais próxima:", error);
        }
      };

      fetchNearestStreetCoords();
    } else {
      // Usa a geolocalização padrão
      if (!navigator.geolocation) {
        console.error("Geolocalização não suportada pelo navegador.");
        return;
      }

      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          console.log(`📍 Localização Atualizada: ${lat}, ${lon}`); // Log para depuração

          setCoords([lat, lon]);
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [isLastPost]);

  return { coords };
}

export default useGetLocation;

