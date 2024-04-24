import store, { Model } from '@/store';
import { Table, Button, Group } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { IconEye, IconDownload, IconTrash } from '@tabler/icons-react';

//this shows the processed files and you can delete, download, or view each file

function ProcessedFiles() {

  const [modelsArray, setModelsArray] = useLocalStorage<Model[]>({
    key: 'modelsArray',
    defaultValue: [],
    getInitialValueInEffect: true
  });

  //delete

  const handleDelete = (modelId: number) => {
    const tempArray = store.modelsArray.filter(model => model.id !== modelId);
    store.modelsArray = tempArray
    setModelsArray(tempArray)
  }

  const rows = modelsArray.map((model) => (
    <tr key={model.id}>
      <td>{model.id}</td>
      <td>{model.name}</td>
      <td>{model.createdAt}</td>
      <td>
        <Group>
          <Button variant="subtle" color="blue" size="xs" onClick={() => store.openModal = true}>
            <IconEye size={16} />
          </Button>
          <Button variant="subtle" color="green" size="xs">
           <a href={`/robot.glb`} download="your-model.glb" style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconDownload size={16} />
           </a>
          </Button>
          <Button variant="subtle" color="red" size="xs" onClick={() => handleDelete(model.id)}>
            <IconTrash size={16} />
          </Button>
        </Group>
      </td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default ProcessedFiles;
