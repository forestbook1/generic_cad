import { ColorState } from '../state/ColorState';

export class ColorPickerUI {
  private container: HTMLInputElement;

  constructor(parent: HTMLElement = document.body) {
    this.container = document.createElement('input');
    this.container.type = 'color';
    this.container.value = ColorState.getColorHex();
    this.container.style.position = 'absolute';
    this.container.style.top = '50px';
    this.container.style.left = '10px';
    this.container.style.zIndex = '10';

    this.container.addEventListener('input', this.onColorChange);
    parent.appendChild(this.container);
  }

  private onColorChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    ColorState.setColor(input.value);
    console.log('Color changed to:', ColorState.getColor());
  };

  setPosition(x: number, y: number) {
    this.container.style.left = `${x}px`;
    this.container.style.top = `${y}px`;
  }

  setVisible(visible: boolean) {
    this.container.style.display = visible ? 'block' : 'none';
  }

  dispose() {
    this.container.removeEventListener('input', this.onColorChange);
    if (this.container.parentElement) {
      this.container.parentElement.removeChild(this.container);
    }
  }
}