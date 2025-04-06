import * as THREE from 'three';
import { SelectionManager } from '../cad/SelectionManager';

export class MouseHandler {
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private selectionManager = new SelectionManager(this.scene);

  constructor(
    private camera: THREE.Camera,
    private domElement: HTMLElement,
    private scene: THREE.Scene
  ) {
    this.domElement.addEventListener('click', this.onClick);
  }

  private onClick = (event: MouseEvent) => {
    const rect = this.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    if (intersects.length > 0) {
      const object = intersects[0].object;

      // 選択時の処理をここに記入
      
      this.selectionManager.select(object);
    } else {
      this.selectionManager.clearSelection();
    }
  };

  dispose() {
    this.domElement.removeEventListener('click', this.onClick);
  }
}