import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';

export class ControlsManager {
  private controls: OrbitControls;

  constructor(camera: THREE.Camera, domElement: HTMLElement) {
    this.controls = new OrbitControls(camera as THREE.PerspectiveCamera, domElement);
    this.controls.enableDamping = true;
  }

  update() {
    this.controls.update();
  }
}