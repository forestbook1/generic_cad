import * as THREE from 'three';

export class VoxelManager {
  private voxels: Map<string, THREE.Mesh> = new Map();

  constructor(private scene: THREE.Scene) {}

  addVoxel(x: number, y: number, z: number) {
    const key = this.hash(x, y, z);
    if (this.voxels.has(key)) return;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00aaff });
    const voxel = new THREE.Mesh(geometry, material);
    voxel.position.set(x, y, z);
    this.scene.add(voxel);
    this.voxels.set(key, voxel);
  }

  removeVoxel(x: number, y: number, z: number) {
    const key = this.hash(x, y, z);
    const voxel = this.voxels.get(key);
    if (voxel) {
      this.scene.remove(voxel);
      this.voxels.delete(key);
    }
  }

  getAllVoxelMeshes(): THREE.Mesh[] {
    return Array.from(this.voxels.values());
  }

  private hash(x: number, y: number, z: number): string {
    return `${x},${y},${z}`;
  }
}