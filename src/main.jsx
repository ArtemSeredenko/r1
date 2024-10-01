import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import IconDownloader from './components/IconDownloader.jsx';

import './index.css';
import Instructions from './components/Instructions.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IconDownloader />
    <Instructions />
  </StrictMode>
);
