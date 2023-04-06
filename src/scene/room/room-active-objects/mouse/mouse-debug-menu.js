import * as THREE from 'three';
import RoomObjectDebugAbstract from "../room-object-debug.abstract";
import MOUSE_CONFIG from "./mouse-config";

export default class MouseDebugMenu extends RoomObjectDebugAbstract {
  constructor(roomObjectType) {
    super(roomObjectType);

    this._areaPlane = null;
    this._positionController = null;

    this._init();
    this._checkToDisableFolder();
  }

  updatePosition() {
    this._positionController.refresh();
  }

  initMovingAreaDebugPlane(startPosition) {
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      opacity: 0.5,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(1, 1);
    const areaPlane = this._areaPlane = new THREE.Mesh(geometry, material);
    this.add(areaPlane);

    areaPlane.rotateX(-Math.PI * 0.5);
    areaPlane.position.copy(startPosition);

    areaPlane.scale.set(MOUSE_CONFIG.movingArea.width, MOUSE_CONFIG.movingArea.height, 1);

    areaPlane.visible = false;

    if (MOUSE_CONFIG.movingArea.showDebugPlane) {
      areaPlane.visible = true;
    }
  }

  _init() {
    this._debugFolder.addInput(MOUSE_CONFIG.movingArea, 'showDebugPlane', {
      label: 'Show area',
    }).on('change', (showDebugPlane) => {
      this._areaPlane.visible = showDebugPlane.value;
    });

    this._debugFolder.addInput(MOUSE_CONFIG.movingArea, 'width', {
      label: 'Area width',
      min: 0.1,
      max: 5,
    }).on('change', () => {
      this._onAreaChanged();
    });

    this._debugFolder.addInput(MOUSE_CONFIG.movingArea, 'height', {
      label: 'Area height',
      min: 0.1,
      max: 5,
    }).on('change', () => {
      this._onAreaChanged();
    });

    this._positionController = this._debugFolder.addInput(MOUSE_CONFIG, 'position', {
      label: 'Current position',
      picker: 'inline',
      expanded: true,
      x: { min: -1, max: 1 },
      y: { min: -1, max: 1 },
    }).on('change', (position) => {
      this.events.post('onPositionChanged', position.value);
    });
  }

  _onAreaChanged() {
    this._areaPlane.scale.set(MOUSE_CONFIG.movingArea.width, MOUSE_CONFIG.movingArea.height, 1);
    this.events.post('onAreaChanged');
  }
}