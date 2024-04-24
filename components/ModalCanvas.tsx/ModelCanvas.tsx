import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import { Button, Loader } from '@mantine/core'; 
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment,  OrbitControls } from '@react-three/drei';
import store from '@/store';

function ModelCanvas() {
  const canvasRef= useRef<HTMLCanvasElement>()

  const handleDownloadImage = () => {
    const canvas = canvasRef.current
    if (!canvas) {
      console.error("Canvas not found");
      return;
    }
    console.log(canvas)
    const url = canvas.toDataURL('image/png');  // Ensure you get the PNG format
    const link = document.createElement('a');
    link.href = url;
    link.download = 'canvas-image.png';  // Set the filename for download
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

const {gl} = useThree()

useEffect(() => {
  store.refs.gl = gl
}, [gl])

  const {scene}= useLoader(GLTFLoader, 'https://ik.imagekit.io/fx30u3wgcqib/robot_GGKQSK4u4.glb?updatedAt=1713883148800');
  return <primitive object={scene} scale={1.1} position={[0, -2, 0]} />;
}

export default ModelCanvas;
