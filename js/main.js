// Setup Three.js scene
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.width === "180px") { /* Smaller width */
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "180px"; /* Smaller width */
    }
}
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("background-container").appendChild(renderer.domElement);

// Array of texture paths
const textures = [
    "assets/texture1.jpg",
    "assets/texture2.jpg",
    "assets/texture3.jpg",
    "assets/texture4.jpg"
];

// Randomly select a texture
const randomTexturePath = textures[Math.floor(Math.random() * textures.length)];

// Load texture
const loader = new THREE.TextureLoader();
loader.load(randomTexturePath, function(texture) {
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    createBackground(texture);
});

function createBackground(texture) {
    const geometry = new THREE.PlaneGeometry(10, 6);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    camera.position.z = 5;

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
