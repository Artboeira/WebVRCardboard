import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 3);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true; // Enable WebXR
document.body.appendChild(VRButton.createButton(renderer)); // VR button for interaction
document.body.appendChild(renderer.domElement);

// Controls for Standard Navigation (non-VR) - Optional
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.6, 0);
controls.update();

// Creating a 360° panoramic view
const geometry = new THREE.SphereGeometry(500, 60, 40);
geometry.scale(-1, 1, 1); // Make the inside of the sphere the "outside"

const texture = new THREE.TextureLoader().load('path_to_your_360_image.jpg'); // Put the path of your 360 image here
const material = new THREE.MeshBasicMaterial({ map: texture });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Animation loop
function animate() {
  renderer.setAnimationLoop(function () {
    renderer.render(scene, camera);
  });
}

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

animate(); // Start the animation loop

