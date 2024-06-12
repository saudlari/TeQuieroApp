import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { Button, Box, Link } from '@chakra-ui/react';

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
    <Box textAlign="center" mt={5}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
      />
      <Button colorScheme="teal" onClick={capture} mt={4}>
        Capturar Foto
      </Button>
      {imageSrc && (
        <Box mt={4}>
          <canvas ref={canvasRef} width={640} height={480} />
          <Link href={imageSrc} download="foto_con_filtro.jpg" color="teal.500" mt={4} display="block">
            Descargar Foto
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default PhotoBooth;