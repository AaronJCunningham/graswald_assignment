import { proxy } from 'valtio';

interface ImageFile extends File {}

interface ModelResponse {
  id: string;
  url: string;
  details: any;
}

export interface Model {
  id: number;
  name: string;
  createdAt: string;
}

interface AppState {
  images: ImageFile[];
  modelResponse: ModelResponse | null;
  processing: boolean;
  modelsArray: Model[];
  openModal: boolean;

  
}

const store = proxy<AppState>({
  images: [],
  modelResponse: null,
  processing: false,
  modelsArray: [],
  openModal: false,

});

export default store;
