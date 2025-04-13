import * as THREE from 'three';
import { Voxel } from './Voxel';

export class VoxelManager {
  private voxels: Map<string, Voxel> = new Map();

  constructor(private scene: THREE.Scene) {}

  addVoxel(x: number, y: number, z: number, color: THREE.Color) {
    const key = this.hash(x, y, z);
    if (this.voxels.has(key)) return;

    const voxel = new Voxel(new THREE.Vector3(x, y, z), color);
    this.scene.add(voxel.mesh);
    this.voxels.set(key, voxel);
    console.log(`Voxel Count: ${this.voxels.size}`);
  }

  removeVoxel(x: number, y: number, z: number) {
    const key = this.hash(x, y, z);
    const voxel = this.voxels.get(key);
    if (voxel) {
      this.scene.remove(voxel);
      this.voxels.delete(key);
    }
    console.log(`Voxel Count: ${this.voxels.size}`);
  }

  getAllVoxelMeshes(): THREE.Mesh[] {
    return Array.from(this.voxels.values()).map(voxel => voxel.mesh);
  }

  private hash(x: number, y: number, z: number): string {
    return `${x},${y},${z}`;
  }
}