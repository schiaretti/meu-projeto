/*import React, { useRef, useState, useEffect } from 'react';
import useGetLocation from '../hooks/useGetLocation'; // Importe o hook de geolocalização

interface ComponentebotaoProps {
  minPhotos?: number; // Número mínimo de fotos (opcional, padrão é 3)
  onSave?: (photos: { url: string; coords: [number, number] | null }[]) => void; // Função para salvar as fotos
}

const Componentebotao: React.FC<ComponentebotaoProps> = ({ minPhotos = 3, onSave }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [photos, setPhotos] = useState<{ url: string; coords: [number, number] | null }[]>([]); // Array para armazenar as fotos com coordenadas
  const [cameraMode, setCameraMode] = useState<'front' | 'back'>('back'); // Estado da câmera
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { coords } = useGetLocation(); // Usa o hook de geolocalização

  // Inicializa a câmera quando o componente é montado ou quando a câmera é alternada
  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const constraints = {
          video: {
            facingMode: cameraMode === 'front' ? 'user' : 'environment', // Alterna entre frontal e traseira
          },
        };

        const newStream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
        setStream(newStream);
      } catch (err) {
        console.error("Erro ao acessar a câmera:", err);
        handleCameraError(err);
      }
    };

    initializeCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraMode]);

  // Função para capturar a foto
  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      const dataUrl = canvas.toDataURL('image/png');
      setPhotos((prevPhotos) => [...prevPhotos, { url: dataUrl, coords }]); // Adiciona a foto com as coordenadas
    }
  };

  // Alternar entre câmera frontal e traseira
  const toggleCamera = () => {
    setCameraMode((prevMode) => (prevMode === 'front' ? 'back' : 'front'));
  };

  // Tratamento de erros da câmera
  const handleCameraError = (err: unknown) => {
    if (err instanceof Error) {
      if (err.name === 'NotAllowedError') {
        alert("Permissão para acessar a câmera foi negada. Por favor, permita o acesso à câmera nas configurações do navegador.");
      } else if (err.name === 'NotFoundError') {
        alert("Nenhuma câmera foi encontrada no dispositivo.");
      } else if (err.name === 'NotReadableError') {
        alert("A câmera está em uso por outro aplicativo ou não pode ser acessada.");
      } else {
        alert("Erro ao acessar a câmera. Verifique as permissões e tente novamente.");
      }
    } else {
      alert("Erro desconhecido ao acessar a câmera.");
    }
  };

  // Função para salvar as fotos
  const handleSave = () => {
    if (onSave) {
      onSave(photos); // Chama a função onSave com as fotos e coordenadas
    }
  };

  return (
    <div>
      {/* Botão para alternar a câmera */
     /* <button
        type="button"
        onClick={toggleCamera}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 mb-2"
      >
        <span role="img" aria-label="camera">
          📷
        </span>
        {cameraMode === 'front' ? 'Câmera Frontal' : 'Câmera Traseira'}
      </button>

      {/* Vídeo da câmera */
     /* <div
        onClick={capturePhoto} // Captura a foto ao tocar na tela
        style={{ position: 'relative', width: '100%', height: 'auto' }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
        ></video>
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '14px',
          }}
        >
          Toque na tela para capturar a foto
        </div>
      </div>

      {/* Exibe as fotos capturadas com as coordenadas */
      /*{photos.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Fotos Capturadas:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={photo.url}
                  alt={`Captured ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                  {index + 1}
                </span>
                <p className="text-sm mt-2">
                  Coordenadas: {photo.coords ? `${photo.coords[0]}, ${photo.coords[1]}` : "Não disponível"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botão "Salvar" aparece apenas após atingir o número mínimo de fotos */
     /* {photos.length >= minPhotos && (
        <div className="mt-4">
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition"
          >
            <span role="img" aria-label="save" className="mr-2">
              💾
            </span>
            Salvar
          </button>
        </div>
      )}
    </div>
  );
};

export default Componentebotao;*/

import React, { useRef, useState, useEffect } from 'react';
import useGetLocation from '../hooks/useGetLocation'; // Importe o hook de geolocalização

interface ComponentebotaoProps {
  minPhotos?: number; // Número mínimo de fotos (opcional, padrão é 3)
  onSave?: (photos: { url: string; coords: [number, number] | null }[]) => void; // Função para salvar as fotos
}

const Componentebotao: React.FC<ComponentebotaoProps> = ({ minPhotos = 3, onSave }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [photos, setPhotos] = useState<{ url: string; coords: [number, number] | null }[]>([]); // Array para armazenar as fotos com coordenadas
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { coords } = useGetLocation(); // Usa o hook de geolocalização

  // Inicializa a câmera traseira quando o componente é montado
  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const constraints = {
          video: {
            facingMode: 'environment', // Usa apenas a câmera traseira
          },
        };

        const newStream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
        setStream(newStream);
      } catch (err) {
        console.error("Erro ao acessar a câmera:", err);
        handleCameraError(err);
      }
    };

    initializeCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Função para capturar a foto
  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      const dataUrl = canvas.toDataURL('image/png');
      setPhotos((prevPhotos) => [...prevPhotos, { url: dataUrl, coords }]); // Adiciona a foto com as coordenadas
    }
  };

  // Tratamento de erros da câmera
  const handleCameraError = (err: unknown) => {
    if (err instanceof Error) {
      if (err.name === 'NotAllowedError') {
        alert("Permissão para acessar a câmera foi negada. Por favor, permita o acesso à câmera nas configurações do navegador.");
      } else if (err.name === 'NotFoundError') {
        alert("Nenhuma câmera foi encontrada no dispositivo.");
      } else if (err.name === 'NotReadableError') {
        alert("A câmera está em uso por outro aplicativo ou não pode ser acessada.");
      } else {
        alert("Erro ao acessar a câmera. Verifique as permissões e tente novamente.");
      }
    } else {
      alert("Erro desconhecido ao acessar a câmera.");
    }
  };

  // Função para salvar as fotos
  const handleSave = () => {
    if (onSave) {
      onSave(photos); // Chama a função onSave com as fotos e coordenadas
    }
  };

  return (
    <div>
      {/* Vídeo da câmera */}
      <div
        onClick={capturePhoto} // Captura a foto ao tocar na tela
        style={{ position: 'relative', width: '100%', height: 'auto' }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
        ></video>

        {/* Ícone de câmera para capturar a foto */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '60px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: '2px solid #fff',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <span role="img" aria-label="camera" style={{ fontSize: '24px' }}>
            📸
          </span>
        </div>
      </div>

      {/* Exibe as fotos capturadas com as coordenadas */}
      {photos.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Fotos Capturadas:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={photo.url}
                  alt={`Captured ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                  {index + 1}
                </span>
                <p className="text-sm mt-2">
                  Coordenadas: {photo.coords ? `${photo.coords[0]}, ${photo.coords[1]}` : "Não disponível"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botão "Salvar" aparece apenas após atingir o número mínimo de fotos */}
      {photos.length >= minPhotos && (
        <div className="mt-4">
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition"
          >
            <span role="img" aria-label="save" className="mr-2">
              💾
            </span>
            Salvar
          </button>
        </div>
      )}
    </div>
  );
};

export default Componentebotao;