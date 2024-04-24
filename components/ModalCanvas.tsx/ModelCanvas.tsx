import { Canvas, useLoader } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { Button} from '@mantine/core'; 
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment,  OrbitControls } from '@react-three/drei';

// this component loads a 3D model and has the ability to export it as a png

function ModelCanvas() {
  const canvasRef= useRef<HTMLCanvasElement>()

  const handleDownloadImage = () => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.error("Canvas not found");
      return;
    }
    console.log(canvas)
    const url = canvas.toDataURL('image/png');  //png
    const link = document.createElement('a');
    link.href = url;
    link.download = 'canvas-image.png';  // filename
    link.style.display = 'none';  // Ensure the link is not visible
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div style={{ height: "500px", width: '100%' }}>
        {/*@ts-ignore */}
        <Canvas ref={canvasRef} gl={{ preserveDrawingBuffer: true }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
          <Environment preset='city' />
          <OrbitControls />
        </Canvas>
      </div>
      <Button onClick={handleDownloadImage}>Save as Image</Button>
    </>
  );
}

function Model() {

  const {scene}= useLoader(GLTFLoader, '/robot.glb');
  return <primitive object={scene} scale={1.1} position={[0, -2, 0]} />;
}

export default ModelCanvas;
