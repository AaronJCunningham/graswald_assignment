import { useState } from 'react';
import { Modal, Button } from '@mantine/core';
import ModelCanvas from './ModelCanvas';
import { useSnapshot } from 'valtio';
import store from '@/store';

function ModelViewerModal() {

  const snapshot = useSnapshot(store)

  return (
    <>
      <Modal
        opened={snapshot.openModal}
        onClose={() => store.openModal = false}
        title="3D Model Viewer"
        size="lg"
      >
        <ModelCanvas />
      </Modal>
    </>
  );
}

export default ModelViewerModal;
