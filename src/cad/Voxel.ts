import * as THREE from 'three';

export class Voxel extends THREE.Object3D {
  public color: THREE.Color;
  public mesh: THREE.Mesh;

  constructor(position: THREE.Vector3, color: THREE.Color) {
    super();
    this.color = color;
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    geometry.translate(position.x, position.y, position.z);
    const material = new THREE.MeshStandardMaterial({ color });
    this.mesh = new THREE.Mesh(geometry, material);
  }

  public setColor(color: THREE.Color) {
    (this.mesh.material as THREE.MeshBasicMaterial).color.set(color);
  }
}