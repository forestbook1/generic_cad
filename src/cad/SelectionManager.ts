import * as THREE from 'three';

export class SelectionManager {
  private selected: THREE.Object3D | null = null;

  constructor() {}

  select(object: THREE.Object3D) {
    if (this.selected === object) return;

    this.clearSelection();

    this.selected = object;
    this.highlight(object);
    console.log('Selected:', object.name || object.type);
  }

  clearSelection() {
    if (this.selected) {
      this.unhighlight(this.selected);
    }
    this.selected = null;
  }

  private highlight(object: THREE.Object3D) {
    if (object instanceof THREE.Mesh) {
      const mat = object.material as THREE.MeshStandardMaterial;
      mat.emissive = new THREE.Color(0x333333); // ハイライト色
    }
  }

  private unhighlight(object: THREE.Object3D) {
    if (object instanceof THREE.Mesh) {
      const mat = object.material as THREE.MeshStandardMaterial;
      mat.emissive = new THREE.Color(0x000000);
    }
  }

  getSelected(): THREE.Object3D | null {
    return this.selected;
  }
}