import * as THREE from 'three';
import { Tool } from './Tool';
import { VoxelManager } from '../cad/VoxelManager';
import { ColorState } from '../state/ColorState';
import { ControlsManager } from '../core/ControlsManager';

export class VoxelPlacerTool implements Tool {
  name = 'VoxelPlacer';

  private isEnabled = false;

  private intervalId: number | null = null;
  private isMouseDown = false;
  private raycaster = new THREE.Raycaster();
  private ground: THREE.Mesh;
  
  constructor(
    private camera: THREE.Camera,
    private domElement: HTMLElement,
    private scene: THREE.Scene,
    private controls: ControlsManager,
    private voxelManager: VoxelManager
  ) {
    // 地面（XZ平面）
    const geometry = new THREE.PlaneGeometry(10000, 10000);
    const material = new THREE.MeshBasicMaterial({ visible: false });
    this.ground = new THREE.Mesh(geometry, material);
    this.ground.rotateX(-Math.PI / 2);
    this.scene.add(this.ground);

    //this.domElement.addEventListener('click', this.onClick);
    this.domElement.addEventListener('mousedown', this.onMouseDown);
    this.domElement.addEventListener('mousemove', this.onMouseMove);
    this.domElement.addEventListener('mouseup', this.onMouseUp);
  }

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled) this.stopRepeating();
  }

  private onMouseDown = (event: MouseEvent) => {
    if (!this.isEnabled) return;
    if (event.button !== 0) return; // 左クリックのみ
    this.isMouseDown = true;
    this.controls.setEnabled(false);
    this.onRepeat(event);

    // set interval
    this.intervalId = window.setInterval(() => {
      if (this.isMouseDown) this.onRepeat(event);
    }, 100); // repeat every 100ms
  }

  private onMouseMove = (event: MouseEvent) => {
    if (!this.isEnabled) return;
    if (this.isMouseDown) this.onRepeat(event);
  }

  private onMouseUp = (event: MouseEvent) => {
    if (!this.isEnabled) return;
    this.isMouseDown = false;
    this.controls.setEnabled(true);
    this.stopRepeating();
  }

  private onRepeat = (event: MouseEvent) => {
    if (!this.isEnabled) return;

    const rect = this.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    const color = ColorState.getColor();
    this.PlaceVoxel(mouse, color);
  };

  private PlaceVoxel(mouse : THREE.Vector2, color: THREE.Color) {
    this.raycaster.setFromCamera(mouse, this.camera);

    // 全てのオブジェクト（地面＋ボクセル）を対象に
    const allObjects = [this.ground, ...this.voxelManager.getAllVoxelMeshes()];
    const intersects = this.raycaster.intersectObjects(allObjects);

    if (intersects.length > 0) {
      const intersect = intersects[0];

      const normal = intersect.face?.normal.clone();
      if (!normal) return;
      
      // 面の法線に沿って1マス積む
      const position = intersect.point.clone().add(normal.multiplyScalar(0.5));
      const x = Math.round(position.x);
      const y = Math.round(position.y);
      const z = Math.round(position.z);
      
      this.voxelManager.addVoxel(x, y, z, color);
    }
  }

  private stopRepeating() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  dispose() {
    this.domElement.removeEventListener('mousedown', this.onMouseDown);
    this.domElement.removeEventListener('mouseup', this.onMouseUp);
  }
}