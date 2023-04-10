import * as AFRAME from 'aframe';

AFRAME.registerComponent('look-at', {
    schema: { type: 'selector' },
  
    init: function () {},
  
    tick: function () {
      let targetPos = this.data.object3D.position
      this.el.object3D.lookAt(targetPos.x, targetPos.y, this.el.object3D.position.z)
    }
  })