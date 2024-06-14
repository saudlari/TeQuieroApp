import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { Box, Link, IconButton } from '@chakra-ui/react';
import { FaCamera, FaEraser } from 'react-icons/fa';

const PhotoBooth = ({onUpload}) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      const teQuieroImage = new Image();
      teQuieroImage.onload = () => {
        ctx.drawImage(teQuieroImage, 10, 10, 200, 200);
        const imgWithText = canvas.toDataURL('image/jpg');
        setImageSrc(imgWithText);
      };
      teQuieroImage.src = '/assets/teQuiero.png'; // Ruta relativa desde la carpeta public
    };
    image.src = imageSrc;
  }, [webcamRef, canvasRef]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <canvas ref={canvasRef} width={640} height={480} style={{ display: 'none' }} />
      {imageSrc ? (
        <Box mt={4} textAlign="center">
          <img src={imageSrc} alt="captured" width="100%" style={{ borderRadius: '10px' }} />
          <Link href={imageSrc} download="foto_con_filtro.jpg" color="teal.500" mt={4} display="block">
            Descargar Foto
          </Link>
          <Link onClick={()=> onUpload(imageSrc)}>
            Enviar
          </Link>
          <IconButton
            colorScheme="teal"
            aria-label="Capturar Foto"
            icon={<FaEraser />}
            onClick={() => setImageSrc(null)}
            position="absolute"
            bottom="10px"
            left="50%"
            transform="translateX(-50%)"
            isRound
            size="lg"
          />
        </Box>
      ) : (
        <Box position="relative" width="100%" maxWidth="360px">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            height="auto"
            videoConstraints={{ 
              facingMode: "user", 
              width: 640, 
              height: 480 
            }}
            style={{ borderRadius: '10px' }}
            mirrored={true}
          />
          <IconButton
            colorScheme="teal"
            aria-label="Capturar Foto"
            icon={<FaCamera />}
            onClick={capture}
            position="absolute"
            bottom="10px"
            left="50%"
            transform="translateX(-50%)"
            isRound
            size="lg"
          />
        </Box>
      )}
    </Box>
  );
};

export default PhotoBooth;
