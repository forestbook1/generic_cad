import * as THREE from 'three';

export class ColorState {
  private static currentColor = new THREE.Color(0x000000);
  static getColor(): THREE.Color {
    return this.currentColor;
  }

  static getColorHex(): string {
    return this.currentColor.getHexString();
  }

  static getColorRGB(): number[] {
    return [this.currentColor.r, this.currentColor.g, this.currentColor.b];
  }

  static setColor(newColor: THREE.Color | string | number) {
    if (typeof newColor === 'string') {
      this.currentColor.set(newColor);
    }
    else if (typeof newColor === 'number') {
      this.currentColor.setHex(newColor);
    }
    else if (newColor instanceof THREE.Color) {
      this.currentColor.copy(newColor);
    }
    else {
      console.warn('Invalid color type. Expected string, number, or THREE.Color.');
      return;
    }
    console.log('Color changed to:', this.currentColor.getHexString());
  }
}