import React, { useRef, useState } from 'react';

interface ComponentebotaoProps {
  buttonText: string; // Texto do botão
  minPhotos?: number; // Número mínimo de fotos (opcional, padrão é 3)
}

const Componentebotao: React.FC<ComponentebotaoProps> = ({ buttonText, minPhotos = 3 }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [photos, setPhotos] = useState<string[]>([]); // Array para armazenar as fotos
  const [cameraMode, setCameraMode] = useState<'front' | 'back'>('back'); // Estado da câmera
  const [isCameraOpen, setIsCameraOpen] = useState(false); // Estado para controlar se a câmera está aberta

  // Função para abrir a câmera
  const openCamera = async () => {
    try {
      // Configurações da câmera
      const constraints = {
        video: {
          facingMode: cameraMode === 'front' ? 'user' : 'environment', // Alterna entre frontal e traseira
        },
      };

      // Solicita acesso à câmera
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOpen(true); // Abre a câmera
      }
    } catch (err) {
      console.error("Erro ao acessar a câmera:", err);

      // Verifica se o erro é do tipo Error
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
    }
  };

  // Função para fechar a câmera
  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop()); // Para todos os tracks da câmera
      videoRef.current.srcObject = null;
      setIsCameraOpen(false); // Fecha a câmera
    }
  };

  // Função para tirar foto
  const handleTakePhoto = () => {
    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      }

      // Converte a imagem do canvas para uma URL de dados
      const dataUrl = canvas.toDataURL('image/png');
      setPhotos((prevPhotos) => [...prevPhotos, dataUrl]); // Adiciona a nova foto ao array
    }
  };

  // Função para alternar entre câmera frontal e traseira
  const toggleCamera = () => {
    setCameraMode((prevMode) => (prevMode === 'front' ? 'back' : 'front'));
    closeCamera(); // Fecha a câmera atual
    openCamera(); // Reabre a câmera com o novo modo
  };

  return (
    <div>
      {/* Botão para abrir a câmera */}
      {!isCameraOpen && (
        <button
          type="button"
          onClick={openCamera}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <span role="img" aria-label="camera">
            📸
          </span>
          Abrir Câmera
        </button>
      )}

      {/* Exibe a câmera quando aberta */}
      {isCameraOpen && (
        <div className="mt-4">
          {/* Vídeo da câmera */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-auto rounded-lg shadow-lg"
          ></video>

          {/* Botões de controle da câmera */}
          <div className="flex gap-2 mt-2">
            {/* Botão para alternar câmera */}
            <button
              type="button"
              onClick={toggleCamera}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2"
            >
              <span role="img" aria-label="camera">
                🔄
              </span>
              Alternar Câmera 
            </button>

            {/* Botão para tirar foto */}
            <button
              type="button"
              onClick={handleTakePhoto}
              disabled={photos.length >= minPhotos}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span role="img" aria-label="camera">
                📸
              </span>
              Tirar Foto
            </button>

            {/* Botão para fechar a câmera */}
            <button
              type="button"
              onClick={closeCamera}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
            >
              <span role="img" aria-label="close">
                ❌
              </span>
              Fechar Câmera
            </button>
          </div>
        </div>
      )}

      {/* Exibe as fotos capturadas */}
      {photos.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Fotos Capturadas:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={photo}
                  alt={`Captured ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botão "Salvar" aparece apenas após atingir o número mínimo de fotos */}
      {photos.length >= minPhotos && (
        <div className="mt-4">
          <button className="w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition">
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