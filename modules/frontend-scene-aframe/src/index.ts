require('aframe');
require('aframe-extras');
require('three');


import { AnimationMixer, TextureLoader, sRGBEncoding, SkinnedMesh } from 'three';
// import * as three from 'super-three';
import {GLTFLoader} from 'super-three/examples/jsm/loaders/GLTFLoader'
import { clone } from 'super-three/examples/jsm/utils/SkeletonUtils'


const loader = new GLTFLoader();
loader.load('assets/characterMediumAllAnimations.glb', function(gltf) {

    const model = clone(gltf.scene);
    model.castShadow = true;
    model.receiveShadow = true;
    model.scale.set(0.25, 0.25,0.25);
    model.position.set(0,0,-3);
        
    const skin = "alienA";

    const mixer = new AnimationMixer( model );

    const animations = gltf.animations;

    // Create a new skinned mesh using the skin texture
    const skinTexture = new TextureLoader().load('assets/skins/alienA.png');
    skinTexture.encoding = sRGBEncoding;
    skinTexture.flipY = false;

    model.traverse( (child) => {
        if ( child instanceof SkinnedMesh ) {
            // TODO : Should we clone the material to apply the texture ?
            child.material.map = skinTexture;
            child.material.roughness = 0.85;
            child.material.needsUpdate = true;
        } 
    });

    // Add the skinned mesh to the scene
    if(document.querySelector('a-scene')){
        const scene = document.querySelector('a-scene')!['object3D'] ;
        scene.add(model);

        // Create a new animation mixer and add the animations to it
        
        // animations.forEach(function(animation) {
        //     mixer.clipAction(animation).play();
        // });
        mixer.clipAction(animations[13]).play();

        // Animate the character
        function animate() {
            requestAnimationFrame(animate);
            mixer.update(0.01);
        }
        animate();
    }

});