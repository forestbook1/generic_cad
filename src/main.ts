import { App } from './App';
import './styles/style.css'

window.addEventListener('DOMContentLoaded', () => { 
  const container = document.getElementById('app');
  if (!container) {
    throw new Error('No container element with id "app"');
  }

  const app = new App(container);
  app.start();
});