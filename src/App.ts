//import * as THREE from 'three';
import { Renderer } from './core/Renderer';
import { SceneManager } from './core/SceneManager';
import { CameraManager } from './core/CameraManager';
import { ControlsManager } from './core/ControlsManager';
//import { GeometryFactory } from './cad/GeometryFactory';
import { SelectionManager } from './cad/SelectionManager';
import { MouseHandler } from './events/MouseHandler';
import { ToolManager } from './tools/ToolManager';
import { setupToolUI } from './ui/ToolUI';

// todo : 個別ツール登録関連をappから追い出し
import { VoxelManager } from './cad/VoxelManager';
import { VoxelPlacer } from './cad/VoxelPlacer';


export class App {
  private renderer: Renderer;
  private sceneManager: SceneManager;
  private cameraManager: CameraManager;
  private controls: ControlsManager;
  private selectionManager: SelectionManager;
  //private mouseHandler: MouseHandler;
  private toolManager: ToolManager;
  private voxelManager: VoxelManager;
  private voxelPlacer: VoxelPlacer;
  
  constructor(private container: HTMLElement) {
    this.renderer = new Renderer(container);
    this.sceneManager = new SceneManager();
    this.cameraManager = new CameraManager(container);
    this.controls = new ControlsManager(this.cameraManager.camera, this.renderer.domElement);
    this.selectionManager = new SelectionManager(this.sceneManager.scene);
    //this.mouseHandler = new MouseHandler(this.cameraManager.camera, this.renderer.domElement, this.sceneManager.scene);
    this.voxelManager = new VoxelManager(this.sceneManager.scene);
    this.voxelPlacer = new VoxelPlacer(this.cameraManager.camera, this.renderer.domElement, this.sceneManager.scene, this.voxelManager);

    // set tools
    // todo: 個別読み込みをやめる
    this.toolManager = new ToolManager();
    this.toolManager.registerTool(this.voxelPlacer);

    setupToolUI(this.toolManager);
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
  */

  private animate = () => {
    requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.sceneManager.scene, this.cameraManager.camera);
  };

  start() {
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

