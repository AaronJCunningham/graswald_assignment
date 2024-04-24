import store from '@/store';
import { Grid } from '@mantine/core';
import Image from 'next/image';
import { useSnapshot } from 'valtio';

//simple image grid

function ImageGrid() {
  const snapshot = useSnapshot(store);

  return (
    <Grid>
      {snapshot.modelsArray.map((model, index) => (
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
