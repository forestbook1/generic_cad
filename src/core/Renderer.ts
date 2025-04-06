import * as THREE from 'three';

export class Renderer {
  private renderer: THREE.WebGLRenderer;

  constructor(container: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    window.addEventListener('resize', () => {
      this.onResize(container);
    });
  }

  get domElement() {
    return this.renderer.domElement;
  }

  render(scene: THREE.Scene, camera: THREE.Camera) {
    this.renderer.render(scene, camera);
  }

  private onResize(container: HTMLElement) {
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }
}