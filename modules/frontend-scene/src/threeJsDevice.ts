import { HomieDevice, HomieNode, HomieProperty } from 'homie-node';
import { OrthographicCamera, PerspectiveCamera, StereoCamera } from 'three';

class ThreeJSDevice {
  private homieDevice: HomieDevice;

  constructor(deviceName: string) {
    this.homieDevice = new HomieDevice(deviceName, 'three-js', '3.0.1');
  }

  addOrthographicCamera(cameraName: string) {
    const cameraNode = new HomieNode(this.homieDevice, cameraName, 'orthographic-camera');
    const positionProperty = new HomieProperty(cameraNode, 'position', 'string', '0,0,0');
    const rotationProperty = new HomieProperty(cameraNode, 'rotation', 'string', '0,0,0');
    const leftProperty = new HomieProperty(cameraNode, 'left', 'float', '-1.0');
    const rightProperty = new HomieProperty(cameraNode, 'right', 'float', '1.0');
    const topProperty = new HomieProperty(cameraNode, 'top', 'float', '1.0');
    const bottomProperty = new HomieProperty(cameraNode, 'bottom', 'float', '-1.0');
    const nearProperty = new HomieProperty(cameraNode, 'near', 'float', '0.1');
    const farProperty = new HomieProperty(cameraNode, 'far', 'float', '2000');
    // Add any additional properties here

    // Start the device and nodes
    this.homieDevice.setup();
    cameraNode.setup();
  }

  addPerspectiveCamera(cameraName: string) {
    const cameraNode = new HomieNode(this.homieDevice, cameraName, 'perspective-camera');
    const positionProperty = new HomieProperty(cameraNode, 'position', 'string', '0,0,0');
    const rotationProperty = new HomieProperty(cameraNode, 'rotation', 'string', '0,0,0');
    const fovProperty = new HomieProperty(cameraNode, 'fov', 'float', '50.0');
    const aspectProperty = new HomieProperty(cameraNode, 'aspect', 'float', '1.0');
    const nearProperty = new HomieProperty(cameraNode, 'near', 'float', '0.1');
    const farProperty = new HomieProperty(cameraNode, 'far', 'float', '2000');
    // Add any additional properties here

    // Start the device and nodes
    this.homieDevice.setup();
    cameraNode.setup();
  }

  addStereoCamera(cameraName: string) {
    const cameraNode = new HomieNode(this.homieDevice, cameraName, 'stereo-camera');
    const positionProperty = new HomieProperty(cameraNode, 'position', 'string', '0,0,0');
    const rotationProperty = new HomieProperty(cameraNode, 'rotation', 'string', '0,0,0');
    const aspectProperty = new HomieProperty(cameraNode, 'aspect', 'float', '1.0');
    const eyeSepProperty = new HomieProperty(cameraNode, 'eyeSep', 'float', '0.064');
    const nearProperty = new HomieProperty(cameraNode, 'near', 'float', '0.1');
    const farProperty = new HomieProperty(cameraNode, 'far', 'float', '2000');
    // Add any additional properties here

    // Start the
  }

}
