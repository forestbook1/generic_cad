import { Tool } from './Tool';

export class ToolManager {
  private tools: Map<string, Tool> = new Map();
  private currentTool: Tool | null = null;

  registerTool(tool: Tool) {
    if (this.tools.has(tool.name)) {
      console.warn(`Tool ${tool.name} is already registered.`);
    } else {
      this.tools.set(tool.name, tool);
    }
  }

  switchTool(name: string) : boolean {
    if (this.currentTool) {
      this.currentTool.setEnabled(false);
      // toggle tool activation
      if (this.currentTool.name === name) {
        this.currentTool = null;
        return false;
      }
    }
    // switch tool
    const newTool = this.tools.get(name);
    if (newTool) {
      newTool.setEnabled(true);
      this.currentTool = newTool;
    }
    console.log(`current tool : ${name}`);
    return true;
  }

  getToolList(): Tool[] {
    return Array.from(this.tools.values());
  }
}