import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({width: 400})


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */

//Ambient Light
const ambientLight = new THREE.AmbientLight(0xff0000, 0.5)
scene.add(ambientLight)


const ambientLightFolder = gui.addFolder('AmbientLight')
ambientLightFolder.close()
ambientLightFolder.add(ambientLight, 'intensity').min(0).max(1).step(0.01).name('Intensity')
ambientLightFolder.addColor(ambientLight, 'color')

/*
//Directional Light
*/

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.5)
scene.add(directionalLight, directionalLight.target)

const directionalLightFolder = gui.addFolder('DirectionalLight')
directionalLightFolder.close()
directionalLightFolder.add(directionalLight, 'intensity').min(0).max(1).step(0.01).name('Intensity')
directionalLightFolder.addColor(directionalLight, 'color')

//Directional Light position updater

const dlPositionFolder = directionalLightFolder.addFolder('Position')
dlPositionFolder.close()
dlPositionFolder.add(directionalLight.position, 'x').min(-10).max(10).step(0.1).name('x')
dlPositionFolder.add(directionalLight.position, 'y').min(-5).max(5).step(0.1).name('y')
dlPositionFolder.add(directionalLight.position, 'z').min(-10).max(10).step(0.1).name('z')

//Directional Light rotation updater

const dlRotationFolder = directionalLightFolder.addFolder('Rotation')
dlRotationFolder.close()
dlRotationFolder.add(directionalLight.rotation, 'x').min(0).max(Math.PI*2).step(Math.PI/180).name('x')
dlRotationFolder.add(directionalLight.rotation, 'y').min(0).max(Math.PI*2).step(Math.PI/180).name('y')
dlRotationFolder.add(directionalLight.rotation, 'z').min(0).max(Math.PI*2).step(Math.PI/180).name('z')

/*
// Hemispherical Light
*/

const hemisphericalLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.5)
scene.add(hemisphericalLight)

const hemisphericalLightFolder = gui.addFolder('HemisphericalLight')
hemisphericalLightFolder.close()
hemisphericalLightFolder.add(hemisphericalLight, 'intensity').min(0).max(1).step(0.01).name('hemisphericalLight')
hemisphericalLightFolder.addColor(hemisphericalLight, 'color')
hemisphericalLightFolder.addColor(hemisphericalLight, 'groundColor')

// Hemispherical Light position updater
const hlPositionFolder = hemisphericalLightFolder.addFolder('Position')
hlPositionFolder.close()
hlPositionFolder.add(hemisphericalLight.position, 'x').min(-10).max(10).step(0.1).name('x')
hlPositionFolder.add(hemisphericalLight.position, 'y').min(-5).max(5).step(0.1).name('y')
hlPositionFolder.add(hemisphericalLight.position, 'z').min(-10).max(10).step(0.1).name('z')

//Hemispherical Light rotation updater
const hlRotationFolder = hemisphericalLightFolder.addFolder('Rotaton')
hlRotationFolder.close()
hlRotationFolder.add(hemisphericalLight.rotation, 'x').min(0).max(Math.PI*2).step(Math.PI/180).name('x')
hlRotationFolder.add(hemisphericalLight.rotation, 'y').min(0).max(Math.PI*2).step(Math.PI/180).name('y')
hlRotationFolder.add(hemisphericalLight.rotation, 'z').min(0).max(Math.PI*2).step(Math.PI/180).name('z')

/*
//Point Light
*/
const pointLight = new THREE.PointLight(0xffffff, 0.5, 1)
pointLight.position.set(1, -0.5, 1)
scene.add(pointLight)

const pointLightFolder = gui.addFolder('PointLight')
pointLightFolder.close()
pointLightFolder.add(pointLight, 'intensity').min(0).max(100).step(1).name('Intensity')
pointLightFolder.add(pointLight, 'distance').min(0).max(10).step(0.1).name('Distance')
pointLightFolder.add(pointLight, 'decay').min(0).max(10).step(0.1).name('Decay')
pointLightFolder.addColor(pointLight, 'color')

// Point Light position updater
const plPositionFolder = pointLightFolder.addFolder('Position')
plPositionFolder.close()
plPositionFolder.add(pointLight.position, 'x').min(-10).max(10).step(0.1).name('x')
plPositionFolder.add(pointLight.position, 'y').min(-5).max(5).step(0.1).name('y')
plPositionFolder.add(pointLight.position, 'z').min(-10).max(10).step(0.1).name('z')

/*
//RectArea Light
*/
const rectAreaLight = new THREE.RectAreaLight(0x4c00ff, 1, 1, 1)
rectAreaLight.position.set(-1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3(0,0,0))
scene.add(rectAreaLight)

const rectAreaLightFolder = gui.addFolder('RectAreaLight')
rectAreaLightFolder.add(rectAreaLight, 'intensity').min(0).max(10).step(0.01).name('rectAreaLight')

/*
//Spot Light
*/
const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
spotLight.target.position.x = -1.75
scene.add(spotLight, spotLight.target)

const spotLightFolder = gui.addFolder('SpotLight')
spotLightFolder.add(spotLight, 'intensity').min(0).max(10).step(0.01).name('spotLight')


/*
// Helpers
*/
const hemisphericalLightHelper = new THREE.HemisphereLightHelper(hemisphericalLight, 0.3)
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.3)
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.3)
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)

window.requestAnimationFrame(() => {
    spotLightHelper.update()
    directionalLightHelper.update()
})

scene.add(hemisphericalLightHelper, pointLightHelper, directionalLightHelper, spotLightHelper, rectAreaLightHelper)


/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()