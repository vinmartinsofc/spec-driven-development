import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Aplicativo from './Aplicativo';
import './estilos.css';

const elementoRaiz = document.getElementById('root');

if (elementoRaiz === null) {
  throw new Error('Elemento raiz da aplicação não encontrado.');
}

createRoot(elementoRaiz).render(
  <StrictMode>
    <Aplicativo />
  </StrictMode>,
);
