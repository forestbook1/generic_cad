export class ColorState {
  private static currentColor = '#ff0000';

  static getColor(): string {
    return this.currentColor;
  }

  static setColor(newColor: string) {
    this.currentColor = newColor;
  }
}