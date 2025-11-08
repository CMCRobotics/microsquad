import { CoralReef, CoralBranch, PlayerAvatar, HomieDeviceAFrameElement } from './homie-lit-library';

// Example usage
const reef = new CoralReef('reef-001', 'Main Coral Reef');
const branch1 = new CoralBranch('branch-001', 'Staghorn Coral 1', '0 1 -5', '#FF7F50');
const branch2 = new CoralBranch('branch-002', 'Elkhorn Coral 1', '2 1 -5', '#FFD700');
const player1 = new PlayerAvatar('player-001', 'Diver 1', '0 1.6 0');

reef.addNode(branch1);
reef.addNode(branch2);
reef.addNode(player1);

// Set up the scene
const sceneElement = document.getElementById('reef-scene') as HomieDeviceAFrameElement;
sceneElement.device = reef;
