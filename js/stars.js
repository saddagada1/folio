import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.163.0/build/three.module.js";

const container = document.querySelector(".stars");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const stars = createStarfield();
scene.add(stars);
camera.position.z = 1200;

const clock = new THREE.Clock();
const speed = 5;
let dt = 0;

function createStarfield() {
  const numStars = 2000;
  const vertices = [];
  for (let i = 0; i < numStars; i++) {
    const x = THREE.MathUtils.randFloatSpread(2000);
    const y = THREE.MathUtils.randFloatSpread(2000);
    const z = THREE.MathUtils.randFloatSpread(2000);
    vertices.push(x, y, z);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    opacity: 0.7,
    transparent: true,
  });

  const points = new THREE.Points(geometry, material);
  return points;
}

function animate() {
  requestAnimationFrame(animate);
  dt = clock.getDelta();
  camera.position.z -= speed * dt;
  if (camera.position.z <= 0) {
    camera.position.z = 1200;
  }
  renderer.render(scene, camera);
}

animate();
