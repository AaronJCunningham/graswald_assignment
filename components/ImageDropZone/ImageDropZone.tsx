import React, { useEffect } from 'react';
import store, { Model } from '@/store';
import { Group, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useLocalStorage } from '@mantine/hooks';

/*simple dropzone set to only work with 2 images
I created an API but decided to just mock the results */


export function ImageDropZone(props: Partial<DropzoneProps>) {

  const [modelsArray, setModelsArray] = useLocalStorage<Model[]>({
    key: 'modelsArray',
    defaultValue: [],
    getInitialValueInEffect: true
  });

  useEffect(() => {
    store.modelsArray = modelsArray;
  }, [modelsArray]);

  
  const handleDrop = async (acceptedFiles: File[]) => {
    store.images.push(...acceptedFiles);
  
    // Check if exactly two images are uploaded
    if (store.images.length === 2) {
      store.processing = true;
  
      // Mock-up function to simulate model generation
      const newModel = await generate3DModel(store.images);
  
      // Add the generated model to the modelsArray
      store.modelsArray.push(newModel);
      setModelsArray(store.modelsArray); // Update local storage
  
      // Clear the images array for the next operation
      store.images = [];
      setTimeout(() => {
        store.processing = false;
      },3000)
    }
  };
  
  // Simulated function to create a new model
  async function generate3DModel(images: File[]) {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Create a new model entry
    const newModel = {
      id: store.modelsArray.length + 1, // Incremental ID based on the existing entries
      name: `Model ${store.modelsArray.length + 1}`, // Generate a name based on the array length
      createdAt: new Date().toISOString().slice(0, 10) // Current date in YYYY-MM-DD format
    };
  
    return newModel;
  }

  return (
    <Dropzone
      onDrop={handleDrop}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag 2 images here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}

export default ImageDropZone;
