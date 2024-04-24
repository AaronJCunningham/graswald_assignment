import store from '@/store';
import { Grid } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import Image from 'next/image';
import { useSnapshot } from 'valtio';

//simple image grid

function ImageGrid() {

  const [images, setImages] = useLocalStorage<string[]>({
    key: 'canvas-images',
    defaultValue: [],
    getInitialValueInEffect: true,
  });

  return (
    <Grid>
      {images.map((model, index) => (
        <Grid.Col span={4} key={index} style={{ position: 'relative', height: '200px' }}>
          <Image
            src="/robot.png"
            alt="Robot"
            layout="fill" 
            objectFit="cover" 
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}

export default ImageGrid;
