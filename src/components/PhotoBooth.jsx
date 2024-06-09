// components/PhotoBooth.js
import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';

const PhotoBooth = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.font = '30px Arial';
      ctx.fillStyle = 'red';
      ctx.fillText('Te quiero', 10, 50);
    };
    image.src = imageSrc;
  }, [webcamRef, canvasRef]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
      />
      <button onClick={capture}>Capturar Foto</button>
      {imageSrc && (
        <div>
          <canvas ref={canvasRef} width={640} height={480} />
          <a href={imageSrc} download="foto_con_filtro.jpg">Descargar Foto</a>
        </div>
      )}
    </div>
  );
};

export default PhotoBooth;
