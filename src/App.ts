import './style.css'
import * as THREE from 'three';
import { Voxel } from './voxel';

import { Renderer } from './core/Renderer';
import { SceneManager } from './core/SceneManager';
import { CameraManager } from './core/CameraManager';
import { ControlsManager } from './core/ControlsManager';
//import { GeometryFactory } from './cad/GeometryFactory';
import { SelectionManager } from './cad/SelectionManager';
import { MouseHandler } from './events/MouseHandler';
import { VoxelManager } from './cad/VoxelManager';
import { VoxelPlacer } from './cad/VoxelPlacer';

export class App {
  private renderer: Renderer;
  private sceneManager: SceneManager;
  private cameraManager: CameraManager;
  private controls: ControlsManager;
  private selectionManager: SelectionManager;
  //private mouseHandler: MouseHandler;
  private voxelManager: VoxelManager;
  private voxelPlacer: VoxelPlacer;
  private isPlacing: boolean = false;
  
  constructor(private container: HTMLElement) {
    this.renderer = new Renderer(container);
    this.sceneManager = new SceneManager();
    this.cameraManager = new CameraManager(container);
    this.controls = new ControlsManager(this.cameraManager.camera, this.renderer.domElement);
    this.selectionManager = new SelectionManager(this.sceneManager.scene);
    //this.mouseHandler = new MouseHandler(this.cameraManager.camera, this.renderer.domElement, this.sceneManager.scene);
    this.voxelManager = new VoxelManager(this.sceneManager.scene);
    this.voxelPlacer = new VoxelPlacer(this.cameraManager.camera, this.renderer.domElement, this.sceneManager.scene, this.voxelManager);

    this.voxelManager = new VoxelManager(this.sceneManager.scene);
    this.voxelPlacer = new VoxelPlacer(this.cameraManager.camera, this.renderer.domElement, this.sceneManager.scene, this.voxelManager);
  }
  
  addPointSphere(position: THREE.Vector3, color: number) {
    const sphereGeometry = new THREE.SphereGeometry( 0.15, 32, 32 );
    const sphereMaterial = new THREE.MeshBasicMaterial( { color } );
    const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    sphere.position.copy( position );
    this.sceneManager.scene.add( sphere );
    return sphere;
  }
  
  private setupUI() {
    const voxelButton = document.getElementById('voxelButton')!;
    voxelButton.addEventListener('click', () => {
      this.isPlacing = !this.isPlacing;
      this.voxelPlacer.setEnabled(this.isPlacing);
      voxelButton.classList.toggle('active', this.isPlacing);
    });
  }

  /*
  toggleView(viewtype?: string) {
    if (viewtype) {
      if (viewtype === 'perspective') {
        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
        camera.position.set( 100, 100, 100 );
        camera.lookAt( 0, 0, 0 );
      } else if (viewtype === 'top') {
        camera = new THREE.OrthographicCamera( window.innerWidth / - 20, window.innerWidth / 20, window.innerHeight / 20, window.innerHeight / - 20, 1, 500 );
        camera.position.set( 0, 100, 0 );
        camera.lookAt( 0, 0, 0 );
      } else if (viewtype === 'front') {
        camera = new THREE.OrthographicCamera( window.innerWidth / - 20, window.innerWidth / 20, window.innerHeight / 20, window.innerHeight / - 20, 1, 500 );
        camera.position.set( 0, 0, 100 );
        camera.lookAt( 0, 0, 0 );
      } else if (viewtype === 'right') {
        camera = new THREE.OrthographicCamera( window.innerWidth / - 20, window.innerWidth / 20, window.innerHeight / 20, window.innerHeight / - 20, 1, 500 );
        camera.position.set( 100, 0, 0 );
        camera.lookAt( 0, 0, 0 );
      } else {
        // error
      console.error('Invalid view type');
    }
    //controls = new OrbitControls( camera, renderer.domElement );
    //controls.update();
  }
}
*/

addVoxel(position: THREE.Vector3, color: number) {
  const voxel = new Voxel(position, color);
  this.sceneManager.scene.add(voxel.mesh);
  return voxel;
}

addGroundPlane() {
  const geometry = new THREE.PlaneGeometry( 100, 100 );
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff, side : THREE.DoubleSide } );
  const plane = new THREE.Mesh( geometry, material );
  plane.rotation.x = Math.PI / 2;
  plane.position.set(0, -1, 0);
  this.sceneManager.scene.add( plane );
}

private animate = () => {
  requestAnimationFrame(this.animate);
  this.controls.update();
  this.renderer.render(this.sceneManager.scene, this.cameraManager.camera);
};

start() {
  

  
  /*
  //this.addGroundPlane();
  this.addVoxel(new THREE.Vector3(0, 0, 0), 0xff0000);
  this.addVoxel(new THREE.Vector3(1, 0, 0), 0x00ff00);
  this.addVoxel(new THREE.Vector3(0, 1, 0), 0x0000ff);
  this.addVoxel(new THREE.Vector3(1, 1, 0), 0xffff00);
  this.addVoxel(new THREE.Vector3(0, 0, 1), 0xff00ff);
  this.addVoxel(new THREE.Vector3(1, 0, 1), 0x00ffff);
  this.addVoxel(new THREE.Vector3(0, 1, 1), 0x000000);
  this.addVoxel(new THREE.Vector3(1, 1, 1), 0xffffff);
  */
  this.setupUI();
  this.animate();
}
}


/*
const buttonPerspectiveView = document.getElementById('btn_perspective_view') as HTMLButtonElement;
const buttonTopView = document.getElementById('btn_top_view') as HTMLButtonElement;
const buttonFrontView = document.getElementById('btn_front_view') as HTMLButtonElement;
const buttonRightView = document.getElementById('btn_right_view') as HTMLButtonElement;

buttonPerspectiveView.addEventListener('click', () => {
  toggleView('perspective');
});
buttonTopView.addEventListener('click', () => {
  toggleView('top');
});
buttonFrontView.addEventListener('click', () => {
  toggleView('front');
});
buttonRightView.addEventListener('click', () => {
  toggleView('right');
});
*/

