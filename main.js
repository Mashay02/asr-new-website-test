import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Three.js scene setup ---
const canvas = document.querySelector('#scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 5;

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 1.5, 1.5),
  new THREE.MeshStandardMaterial({ color: 0x6c8cff, roughness: 0.3 })
);
scene.add(cube);

scene.add(new THREE.AmbientLight(0xffffff, 0.4));
const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(3, 4, 5);
scene.add(light);

// --- GSAP + ScrollTrigger animations ---
gsap.to(cube.rotation, {
  x: Math.PI * 2,
  y: Math.PI * 2,
  scrollTrigger: {
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
  },
});

gsap.utils.toArray('.panel h1').forEach((heading) => {
  gsap.from(heading, {
    y: 60,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: heading,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
});

// --- Render loop & resize ---
function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
