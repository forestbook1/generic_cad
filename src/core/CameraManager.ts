import * as THREE from 'three';

export class CameraManager {
  public camera: THREE.PerspectiveCamera;

  constructor(container: HTMLElement) {
    const aspect = container.clientWidth / container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    //this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
    this.camera.position.set( 50, 50, 50 );
    this.camera.lookAt(0, 0, 0);
  }

  /*
  toggleCameraView(viewtype: string) {
    if (viewtype === 'perspective') {
      this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.set(100, 100, 100);
      this.camera.lookAt(0, 0, 0);
    } else if (viewtype === 'top') {
      this.camera = new THREE.OrthographicCamera(window.innerWidth / -20, window.innerWidth / 20, window.innerHeight / 20, window.innerHeight / -20, 1, 500);
      this.camera.position.set(0, 100, 0);
      this.camera.lookAt(0, 0, 0);
    } else if (viewtype === 'front') {
      this.camera = new THREE.OrthographicCamera(window.innerWidth / -20, window.innerWidth / 20, window.innerHeight / 20, window.innerHeight / -20, 1, 500);
      this.camera.position.set(0, 0, 100);
      this.camera.lookAt(0, 0, 0);
    } else if (viewtype === 'right') {
      this.camera = new THREE.OrthographicCamera(window.innerWidth / -20, window.innerWidth / 20, window.innerHeight / 20, window.innerHeight / -20, 1, 500);
      this.camera.position.set(100, 0, 0);
      this.camera.lookAt(0, 0, 0);
    } else {
      console.error('Invalid view type');
    }
    //controls.update();
  }
  */
}