import React, { useRef, useState } from 'react';

interface ComponentebotaoProps {
  buttonText: string; // Texto do botão
  minPhotos?: number; // Número mínimo de fotos (opcional, padrão é 3)
}

const Componentebotao: React.FC<ComponentebotaoProps> = ({ buttonText, minPhotos = 3 }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [photos, setPhotos] = useState<string[]>([]); // Array para armazenar as fotos
  const [cameraMode, setCameraMode] = useState<'front' | 'back'>('back'); // Estado da câmera

  const handleTakePhoto = async () => {
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
      }

      // Aguarda um breve momento para garantir que o vídeo esteja pronto
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Cria um canvas para capturar a foto
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

      // Para a câmera após tirar a foto
      stream.getTracks().forEach((track) => track.stop());
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

  const toggleCamera = () => {
    setCameraMode((prevMode) => (prevMode === 'front' ? 'back' : 'front')); // Alterna entre frontal e traseira
  };

  return (
    <div>
      {/* Botões lado a lado */}
      <div className="flex gap-2 mb-2">
        {/* Botão para alternar a câmera */}
        <button
          type="button"
          onClick={toggleCamera}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          <span role="img" aria-label="camera">
            📷
          </span>
          {cameraMode === 'front' ? 'Câmera Frontal' : 'Câmera Traseira'}
        </button>

        {/* Botão para tirar foto */}
        <button
          type="button"
          onClick={handleTakePhoto}
          disabled={photos.length >= minPhotos} // Desabilita o botão após atingir o mínimo de fotos
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span role="img" aria-label="camera">
            📸
          </span>
          {buttonText} ({photos.length}/{minPhotos})
        </button>
      </div>

      {/* Vídeo oculto para acessar a câmera */}
      <video ref={videoRef} autoPlay playsInline className="hidden"></video>

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