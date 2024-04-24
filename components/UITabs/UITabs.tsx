import React, { useState } from 'react';
import {  Tabs, rem } from '@mantine/core';
import { IconPhoto, Icon360, IconGridDots } from '@tabler/icons-react';
import ImageDropZone from '../ImageDropZone/ImageDropZone';
import ProcessedFiles from '../ProcessedFiles/ProcessedFiles';
import ImageGrid from '../ImageGrid/ImageGrid';
import ProgressBar from '../ProgressBar/ProgressBar';
import ModelViewerModal from '../ModalCanvas.tsx/ModelViewerModal';

//I used tabs to build a simple clean interface

function UITabs() {
  const iconStyle = { width: rem(12), height: rem(12) };
  const [activeTab, setActiveTab] = useState('imageDropZone');  // Default active tab

  return (
    <div className="tabsContainer">
      <div className="tabsWrapper">
        <Tabs defaultValue="imageDropZone" value={activeTab} >
          <Tabs.List className="tabList">
            <Tabs.Tab 
              value="imageDropZone" 
              leftSection={<IconPhoto style={iconStyle} />}
              className={`tab ${activeTab === 'imageDropZone' ? 'active' : ''}`}
                onClick={() =>  setActiveTab("imageDropZone")}
            >
            Upload Images  
            </Tabs.Tab>
            <Tabs.Tab 
              value="processedFiles" 
              leftSection={<Icon360 style={iconStyle} />}
              className={`tab ${activeTab === 'processedFiles' ? 'active' : ''}`}
              onClick={() =>  setActiveTab("processedFiles")}

            >
            Processed Uploads
            </Tabs.Tab>
            <Tabs.Tab 
              value="imageGallery" 
              leftSection={<IconGridDots style={iconStyle} />}
              className={`tab ${activeTab === 'imageGallery' ? 'active' : ''}`}
              onClick={() =>  setActiveTab("imageGallery")}

            >
            Image Gallery
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="imageDropZone" className="tabPanel">
          <ImageDropZone />
         <ProgressBar />
          </Tabs.Panel>
          <Tabs.Panel value="processedFiles" className="tabPanel">
            <ProcessedFiles />
            <ModelViewerModal />
          </Tabs.Panel>
          <Tabs.Panel value="imageGallery" className="tabPanel">
            <ImageGrid />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}

export default UITabs;
