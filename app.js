console.log("working");

const canvas = document.querySelector('#c');
//creating camera
const fov =80;
const aspect = canvas.clientWidth / canvas.clientHeight;
const near = 0.1;//clip plane
const far = 2000;//clip plane


const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 1;

const renderer = new THREE.WebGLRenderer({canvas});

const width = canvas.clientWidth;
const height = canvas.clientHeight;
renderer.setSize(width,height);

new THREE.OrbitControls(camera, canvas);

const scene = new THREE.Scene();

const loader = new THREE.TextureLoader();
const texture = loader.load(
    'images/pexels-justin-hamilton-92248.jpg',
    ()=>{
        const renderTarget = new THREE.WebGLCubeRenderTarget(texture.image.height)
        renderTarget.fromEquirectangularTexture(renderer, texture)

        scene.background = renderTarget.texture;
    }
)

function render (){
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

requestAnimationFrame(render);

const audioElement = new audio();