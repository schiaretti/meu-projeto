import React, { useRef, useState } from 'react';

const Componentebotao: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  // Função para capturar a foto
  const handleTakePhoto = async () => {
    try {
      // Acessa a câmera do dispositivo
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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
        setPhoto(dataUrl);
      }

      // Para a câmera após tirar a foto
      stream.getTracks().forEach((track) => track.stop());
    } catch (err) {
      console.error("Erro ao acessar a câmera:", err);
    }
  };

  return (
    <div>
      {/* Botão para tirar a foto */}
      <button
        onClick={() => {
          console.log("Botão clicado!");
          handleTakePhoto(); // Adiciona a lógica de captura da foto
        }}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
        }}
      >
        <span role="img" aria-label="camera">
          📸
        </span>{" "}
        Tirar Foto
      </button>

      {/* Vídeo oculto para acessar a câmera */}
      <video ref={videoRef} autoPlay playsInline style={{ display: 'none' }}></video>

      {/* Exibe a foto capturada */}
      {photo && (
        <div>
          <h2>Foto Capturada</h2>
          <img
            src={photo}
            alt="Captured"
            style={{ maxWidth: '50%', height: 'auto' }}
          />
        </div>
      )}
    </div>
  );
};

export default Componentebotao;