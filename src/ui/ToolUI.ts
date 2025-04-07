import { ToolManager } from '../tools/ToolManager';
// todo: style適用する？
//import * as styles from './style.css';

export function setupToolUI(toolManager: ToolManager) {
  const activeColor = '#27ae60'; // green
  const inactiveColor = '#2e86de'; // blue

  const container = document.createElement('div');
  container.id = 'toolButtons';
  container.style.position = 'absolute';
  container.style.top = '10px';
  container.style.left = '10px';

  toolManager.getToolList().forEach(tool => {
    const btn = document.createElement('button');
    
    btn.style.top = '10px';
    btn.style.left = '10px';
    btn.style.zIndex = '10';
    btn.style.padding = '8px 12px';
    btn.style.color = 'white';
    btn.style.background = inactiveColor; // default color
    btn.style.border = 'none';
    btn.style.borderRadius = '6px';
    btn.style.fontSize = '14px';
    btn.style.cursor = 'pointer';

    btn.innerText = tool.name; // 将来は `tool.label` や `tool.icon` にしても良い
    btn.addEventListener('click', () => {
      const activate = toolManager.switchTool(tool.name);
      if (activate) {
        document.querySelectorAll('#toolButtons button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
      btn.style.background = activate ? activeColor : inactiveColor; // switch color
    });
    container.appendChild(btn);
  });

  document.body.appendChild(container);
}