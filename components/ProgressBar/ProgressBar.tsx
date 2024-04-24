import React, { useState, useEffect } from 'react';
import { Progress } from '@mantine/core';
import store from '@/store';
import { useSnapshot } from 'valtio';

function ProgressBar() {
const snapshot = useSnapshot(store)

  const [value, setValue] = useState(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;



    if (store.processing) {
      intervalId = setInterval(() => {
        setValue((oldValue) => {
          const newValue = oldValue + 1;
          console.log(newValue)
          if (newValue > 100) {
            clearInterval(intervalId);
            return 100;
          }
          return newValue;
        });
      }, 50);
    }

    return () => clearInterval(intervalId);
  }, [snapshot.processing]);

  if (!snapshot.processing) return null;

  return <Progress value={value} />;
}

export default ProgressBar;
