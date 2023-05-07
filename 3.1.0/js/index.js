var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Set the clear color to transparent

// Load texture image
var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load('public/diamond_ore.png');

var material = new THREE.MeshPhongMaterial({ map: texture });
var geometry = new THREE.BoxGeometry(1, 1, 1);

var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add lights to the scene for shading
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

var pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(2, 2, 2);
scene.add(pointLight);

camera.position.z = 3;

// Variables to store mouse position and rotation
var mouseX = 0;
var mouseY = 0;
var prevMouseX = 0;
var prevMouseY = 0;
var isMouseDown = false;
var targetRotationX = 0;
var targetRotationY = 0;
var targetRotationOnMouseDownX = 0;
var targetRotationOnMouseDownY = 0;

// Add event listeners for mouse movement
document.addEventListener('mousemove', onDocumentMouseMove);
document.addEventListener('mousedown', onDocumentMouseDown);
document.addEventListener('mouseup', onDocumentMouseUp);

function onDocumentMouseDown(event) {
  event.preventDefault();

  isMouseDown = true;

  prevMouseX = mouseX;
  prevMouseY = mouseY;

  targetRotationOnMouseDownX = targetRotationX;
  targetRotationOnMouseDownY = targetRotationY;
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - window.innerWidth / 2) / 200;
  mouseY = (event.clientY - window.innerHeight / 2) / 200;

  if (isMouseDown) {
    targetRotationX += (mouseX - prevMouseX) * 1;
    targetRotationY += (mouseY - prevMouseY) * 1;

    cube.rotation.x += (mouseY - prevMouseY) * 0.01;
    cube.rotation.y -= (mouseX - prevMouseX) * 0.01;
  }

  prevMouseX = mouseX;
  prevMouseY = mouseY;
}

function onDocumentMouseUp(event) {
  isMouseDown = false;
}

// Animate the cube
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += (targetRotationY - cube.rotation.x) * 0.05;
  cube.rotation.y += (targetRotationX - cube.rotation.y) * 0.05;
  cube.position.set(0, -0.5, 0);
  renderer.render(scene, camera);
}

animate();
