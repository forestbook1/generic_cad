import { ToolManager } from '../tools/ToolManager';

export function setupToolUI(toolManager: ToolManager) {
  const container = document.createElement('div');
  container.id = 'toolButtons';
  container.style.position = 'absolute';
  container.style.top = '10px';
  container.style.left = '10px';

  toolManager.getToolList().forEach(tool => {
    const btn = document.createElement('button');
    btn.className = 'toolButton';

    btn.innerText = tool.name; // 将来は `tool.label` や `tool.icon` にしても良い
    btn.addEventListener('click', () => {
      const activate = toolManager.switchTool(tool.name);
      if (activate) {
        document.querySelectorAll('#toolButtons button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    container.appendChild(btn);
  });

  document.body.appendChild(container);
}