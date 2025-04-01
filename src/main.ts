import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene: THREE.Scene, 
    renderer: THREE.WebGLRenderer, 
    camera: THREE.Camera,
    controls: OrbitControls
    ;

function init() {
  // set environment
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(Math.max(1, window.devicePixelRatio), 2));
  renderer.setClearColor( new THREE.Color( 0xdddddd ) );
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
  camera.position.set( 0, 0, 100 );
  camera.lookAt( 0, 0, 0 );

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



init();
addSampleObjects();
animate();
