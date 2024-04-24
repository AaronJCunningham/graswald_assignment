import store from '@/store';
import { Grid } from '@mantine/core';
import Image from 'next/image';
import { useSnapshot } from 'valtio';

function ImageGrid() {
  const snapshot = useSnapshot(store);

  return (
    <Grid>
      {snapshot.modelsArray.map((model, index) => (
        <Grid.Col span={4} key={index} style={{ position: 'relative', height: '200px' }}>
          <Image
            src="https://ik.imagekit.io/fx30u3wgcqib/robot_9hkBKX9F4.png?updatedAt=1713892862332"
            alt="Robot"
            layout="fill" // This makes the image fill the container while respecting aspect ratio
            objectFit="cover" // Resizes the image to cover the container while maintaining aspect ratio
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}

export default ImageGrid;
