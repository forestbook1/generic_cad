import * as THREE from 'three';
import { Tool } from '../tools/Tool';
import { VoxelManager } from './VoxelManager';

export class VoxelPlacer implements Tool {
  name = 'VoxelPlacer';

  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private ground: THREE.Mesh;
  private isEnabled = false;

  constructor(
    private camera: THREE.Camera,
    private domElement: HTMLElement,
    private scene: THREE.Scene,
    private voxelManager: VoxelManager
  ) {
    // 地面（XZ平面）
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshBasicMaterial({ visible: false });
    this.ground = new THREE.Mesh(geometry, material);
    this.ground.rotateX(-Math.PI / 2);
    this.scene.add(this.ground);

    this.domElement.addEventListener('click', this.onClick);
  }

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  private onClick = (event: MouseEvent) => {
    if (!this.isEnabled) return;

    const rect = this.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

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
      
      this.voxelManager.addVoxel(x, y, z);
    }
  };

  dispose() {
    this.domElement.removeEventListener('click', this.onClick);
  }
}