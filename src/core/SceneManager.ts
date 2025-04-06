import * as THREE from 'three';

export class SceneManager {
  public scene: THREE.Scene;

  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);

    const dl = new THREE.DirectionalLight( 0xffffff, 1 );
    dl.position.set( 50, 50, 50 );
    dl.castShadow = true;
    const dlhelper = new THREE.DirectionalLightHelper( dl, 5 );
    this.scene.add( dl );
    this.scene.add( dlhelper );
    const dl2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
    dl2.position.set( -50, 50, 50 );
    const dl2helper = new THREE.DirectionalLightHelper( dl2, 5 );
    this.scene.add( dl2);
    this.scene.add( dl2helper );

    const ambient = new THREE.AmbientLight(0x404040);
    this.scene.add(ambient);
    
    this.setGridHelper(true);
    this.setAxesHelper(true);
  }

  setGridHelper( visible : boolean ) {
    if (visible) {
      const size = 10;
      const divisions = 10;
      const gridHelper = new THREE.GridHelper( size, divisions );
      this.scene.add( gridHelper );
    } else {
      const gridHelper = this.scene.getObjectByName('gridHelper');
      if (gridHelper) {
        this.scene.remove(gridHelper);
      }
    }
  }

  setAxesHelper( visible : boolean ) {
    if (visible) {
      const axesHelper = new THREE.AxesHelper( 10 );
      this.scene.add( axesHelper );
    } else {
      const axesHelper = this.scene.getObjectByName('axesHelper');
      if (axesHelper) {
        this.scene.remove(axesHelper);
      }
    }
  }
}