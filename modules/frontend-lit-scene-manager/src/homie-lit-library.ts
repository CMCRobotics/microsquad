import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AFrame, Component, Entity, Schema } from 'aframe';

export class HomieProperty {
  constructor(
    public name: string,
    public dataType: string,
    public value: any,
    public unit?: string
  ) {}
}

export class HomieNode {
  constructor(
    public id: string,
    public name: string,
    public type: string,
    public properties: { [key: string]: HomieProperty } = {}
  ) {}

  addProperty(property: HomieProperty) {
    this.properties[property.name] = property;
  }
}


export class HomieDevice {
  constructor(
    public id: string,
    public name: string,
    public nodes: { [key: string]: HomieNode } = {}
  ) {}

  addNode(node: HomieNode) {
    this.nodes[node.id] = node;
  }
}

interface PropertyBinding {
  homieProperty: string;
  aframeComponent: string;
  converter?: (value: any) => any;
}

class PropertyBindingManager {
  private static instance: PropertyBindingManager;
  private bindings: PropertyBinding[] = [];

  private constructor() {
    // Initialize with default bindings
    this.addBinding({ homieProperty: 'position', aframeComponent: 'position' });
    this.addBinding({ homieProperty: 'rotation', aframeComponent: 'rotation' });
    this.addBinding({ homieProperty: 'scale', aframeComponent: 'scale' });
    this.addBinding({ homieProperty: 'color', aframeComponent: 'color' });
    this.addBinding({
      homieProperty: 'geometry',
      aframeComponent: 'geometry',
      converter: (value) => typeof value === 'string' ? JSON.parse(value) : value
    });
  }

  static getInstance(): PropertyBindingManager {
    if (!PropertyBindingManager.instance) {
      PropertyBindingManager.instance = new PropertyBindingManager();
    }
    return PropertyBindingManager.instance;
  }

  addBinding(binding: PropertyBinding) {
    this.bindings.push(binding);
  }

  getBindings(): PropertyBinding[] {
    return this.bindings;
  }
}

interface HomieNodeComponentData {
  node?: string;
}

interface HomieNodeComponent extends Component<HomieNodeComponentData> {
  nodeData?: HomieNode;
}

AFRAME.registerComponent<HomieNodeComponentData>('homie-node', {
  schema: {
    node?: { type: 'string' }
  } as Schema<HomieNodeComponentData>,
  
  init: function(this: HomieNodeComponent) {
    this.node = JSON.parse(this.data.node) as HomieNode;
    (this.el as Entity).setAttribute('id', this.node.id);
    this.updateProperties();
  },
  
  // update: function(this: HomieNodeComponent) {
  //   // this.updateNodeProperties();
  // },
  
  // updateNodeProperties: function(this: HomieNodeComponent) {
  //   this.nodeData = JSON.parse(this.data.node) as HomieNode;
  //   (this.el as Entity).setAttribute('id', this.nodeData.id);

  //   const bindings = PropertyBindingManager.getInstance().getBindings();
  //   Object.entries(this.nodeData.properties).forEach(([key, prop]) => {
  //     const binding = bindings.find(b => b.homieProperty === key);
  //     if (binding) {
  //       const value = binding.converter ? binding.converter(prop.value) : prop.value;
  //       (this.el as Entity).setAttribute(binding.aframeComponent, value as any);
  //     }
  //   });
  // }
});


export class CoralBranch extends HomieNode {
  constructor(id: string, name: string, position: string, color: string) {
    super(id, name, 'coral-branch');
    this.addProperty(new HomieProperty('health', 'integer', 100, '%'));
    this.addProperty(new HomieProperty('color', 'string', color));
    this.addProperty(new HomieProperty('position', 'string', position));
    this.addProperty(new HomieProperty('geometry', 'string', JSON.stringify({ primitive: 'cylinder', height: 1, radius: 0.1 })));
  }

  toAFrame() {
    return html`
      <a-entity homie-node=${JSON.stringify(this)}></a-entity>
    `;
  }
}

export class PlayerAvatar extends HomieNode {
  constructor(id: string, name: string, position: string) {
    super(id, name, 'player-avatar');
    this.addProperty(new HomieProperty('position', 'string', position));
    this.addProperty(new HomieProperty('geometry', 'string', JSON.stringify({ primitive: 'sphere', radius: 0.5 })));
  }

  toAFrame() {
    return html`
      <a-entity homie-node=${JSON.stringify(this)}></a-entity>
    `;
  }
}

export class CoralReef extends HomieDevice {
  constructor(id: string, name: string) {
    super(id, name);
  }

  toAFrame() {
    return html`
      <a-scene>
        <a-sky color="#87CEEB"></a-sky>
        <a-plane position="0 0 0" rotation="-90 0 0" width="100" height="100" color="#008080"></a-plane>
        ${Array.from(Object.values(this.nodes)).map(node => (node as CoralBranch | PlayerAvatar).toAFrame())}
      </a-scene>
    `;
  }
}

@customElement('homie-device-aframe')
export class HomieDeviceAFrameElement extends LitElement {
  @property({ type: Object }) device!: CoralReef;

  render() {
    return this.device.toAFrame();
  }
}

// Example of adding a custom binding
PropertyBindingManager.getInstance().addBinding({
  homieProperty: 'health',
  aframeComponent: 'health-indicator',
  converter: (value) => ({ health: value })
});
