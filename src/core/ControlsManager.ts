import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';

export class ControlsManager {
  private controls: OrbitControls;

  constructor(camera: THREE.Camera, domElement: HTMLElement) {
    this.controls = new OrbitControls(camera as THREE.PerspectiveCamera, domElement);
    this.controls.enableDamping = true;
    this.setControlMode(true, true, true);
  }

  update() {
    this.controls.update();
  }

  setControlMode(rotate: boolean, zoom: boolean, pan: boolean) {
    this.controls.enablePan = pan;
    this.controls.enableZoom = zoom;
    this.controls.enableRotate = rotate;
  }

  setEnabled(enabled: boolean) {
    this.controls.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.controls.enabled;
  }
}