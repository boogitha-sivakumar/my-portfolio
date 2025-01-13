let camera, scene, renderer, particles;
let mouseX = 0,
  mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.z = 1000;

  scene = new THREE.Scene();

  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 20000;
  const positions = [];

  for (let i = 0; i < particlesCount; i++) {
    positions.push(Math.random() * 2000 - 1000);
    positions.push(Math.random() * 2000 - 1000);
    positions.push(Math.random() * 2000 - 1000);
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 2,
    opacity: 0.5,
    transparent: true,
  });

  particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Add to background container
  const container = document.getElementById("stars-container");
  container.appendChild(renderer.domElement);

  // Set the z-index of the particles to be below other content
  renderer.domElement.style.position = "fixed";
  renderer.domElement.style.top = "0";
  renderer.domElement.style.left = "0";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.zIndex = "-1";

  document.body.style.touchAction = "none";
  document.body.addEventListener("pointermove", onPointerMove);
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  particles.rotation.x += 0.002;
  particles.rotation.y += 0.004;

  renderer.render(scene, camera);
}
