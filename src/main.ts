import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene: THREE.Scene, 
    renderer: THREE.WebGLRenderer, 
    camera: THREE.Camera,
    controls: OrbitControls
    ;

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

function init() {
  // set environment
  scene = new THREE.Scene();

  // set renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(Math.max(1, window.devicePixelRatio), 2));
  renderer.setClearColor( new THREE.Color( 0xdddddd ) );
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // set camera perspective
  toggleView('perspective');

  // set orbit controls
  controls = new OrbitControls( camera, renderer.domElement );
  controls.update();

  // add grid helper
  const size = 10;
  const divisions = 10;
  const gridHelper = new THREE.GridHelper( size, divisions );
  scene.add( gridHelper );

  // add axes helper
  const axesHelper = new THREE.AxesHelper( 10 );
  scene.add( axesHelper );

  // onclick event
  window.addEventListener( 'click', onMouseEvent, false );
}

function onMouseEvent(event: MouseEvent){
  const mouse = new THREE.Vector2();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera( mouse, camera );
  const intersects = raycaster.intersectObjects( scene.children );
  
  if ( intersects.length > 0 ) {
    const intersect = intersects[ 0 ];
    const point = intersect.point;
    const sphereGeometry = new THREE.SphereGeometry( 0.15, 32, 32 );
    const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    sphere.position.copy( point );
    scene.add( sphere );
    console.log( 'intersected point: ', point );
  }
}

// animate
function animate() {
  requestAnimationFrame( animate );
  controls.update();
  renderer.render( scene, camera );
}

// add some objects
function addSampleObjects() {
  const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
  const points = [];
  points.push( new THREE.Vector3( - 10, 0, 0 ) );
  points.push( new THREE.Vector3( 0, 10, 0 ) );
  points.push( new THREE.Vector3( 10, 0, 0 ) );

  const geometry = new THREE.BufferGeometry().setFromPoints( points );
  const line = new THREE.Line( geometry, material );
  scene.add( line );
}

function toggleView(viewtype?: string) {
  if (viewtype) {
    if (viewtype === 'perspective') {
      camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
      camera.position.set( 0, 0, 100 );
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
    controls = new OrbitControls( camera, renderer.domElement );
    controls.update();
  }
}


init();
addSampleObjects();
animate();
