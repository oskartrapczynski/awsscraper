import ReactDOM from 'react-dom/client';
import App from './App';
import './reset.css';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { SnackbarProvider } from 'notistack';
Amplify.configure(awsExports);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <SnackbarProvider>
    <App />
  </SnackbarProvider>
  // </React.StrictMode>
);
