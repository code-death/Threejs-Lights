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

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.34)
scene.add(directionalLight)
directionalLight.position.set(1, 2.9, -1.9)

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

const hemisphericalLight = new THREE.HemisphereLight(0xff00bb, 0x0011ff, 0.03)
scene.add(hemisphericalLight)

hemisphericalLight.position.set(-3, 0.7, -2.7)

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
const pointLight = new THREE.PointLight(0x001eff, 1, 0, 10)
pointLight.position.set(1.7, 1.9, 1.4)
scene.add(pointLight)

const pointLightFolder = gui.addFolder('PointLight')
pointLightFolder.close()
pointLightFolder.add(pointLight, 'intensity').min(0).max(100).step(0.1).name('Intensity')
pointLightFolder.add(pointLight, 'distance').min(0).max(100).step(0.1).name('Distance')
pointLightFolder.add(pointLight, 'decay').min(0).max(100).step(0.1).name('Decay')
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
const rectAreaLight = new THREE.RectAreaLight(0x0008ff, 1.08, 4.02, 0.82)
rectAreaLight.position.set(-1.4, -0.1, 3.3)
rectAreaLight.rotation.y = 5.6898
scene.add(rectAreaLight)

const rectAreaLightFolder = gui.addFolder('RectAreaLight')
rectAreaLightFolder.close()
rectAreaLightFolder.add(rectAreaLight, 'intensity').min(0).max(10).step(0.01).name('Intensity')
rectAreaLightFolder.addColor(rectAreaLight, 'color')
rectAreaLightFolder.add(rectAreaLight, 'width').min(0).max(10).step(0.01).name('Width')
rectAreaLightFolder.add(rectAreaLight, 'height').min(0).max(10).step(0.01).name('Height')

// RectArea Light position updater
const rlPositionFolder = rectAreaLightFolder.addFolder('Position')
rlPositionFolder.close()
rlPositionFolder.add(rectAreaLight.position, 'x').min(-10).max(10).step(0.1).name('x')
rlPositionFolder.add(rectAreaLight.position, 'y').min(-5).max(5).step(0.1).name('y')
rlPositionFolder.add(rectAreaLight.position, 'z').min(-10).max(10).step(0.1).name('z')

//RectArea Light rotation updater
const rlRotationFolder = rectAreaLightFolder.addFolder('Rotaton')
rlRotationFolder.close()
rlRotationFolder.add(rectAreaLight.rotation, 'x').min(0).max(Math.PI*2).step(Math.PI/180).name('x')
rlRotationFolder.add(rectAreaLight.rotation, 'y').min(0).max(Math.PI*2).step(Math.PI/180).name('y')
rlRotationFolder.add(rectAreaLight.rotation, 'z').min(0).max(Math.PI*2).step(Math.PI/180).name('z')

/*
//Spot Light
*/
const spotLight = new THREE.SpotLight(0xffffff, 1.15, 10.2, 0.7766715, 1, 1.8)
spotLight.position.set(-1.5, 3.7, 3.8)
spotLight.rotation.x = 5.986479
scene.add(spotLight)

const spotLightFolder = gui.addFolder('SpotLight')
spotLightFolder.close()
spotLightFolder.add(spotLight, 'intensity').min(0).max(10).step(0.01).name('Intensity')
spotLightFolder.addColor(spotLight, 'color')
spotLightFolder.add(spotLight, 'distance').min(0).max(100).step(0.1).name('Distance')
spotLightFolder.add(spotLight, 'angle').min(0).max(Math.PI/2).step(Math.PI/360).name('Angle')
spotLightFolder.add(spotLight, 'penumbra').min(0).max(1).step(0.001).name('Penumbra')
spotLightFolder.add(spotLight, 'decay').min(0).max(10).step(0.01).name('Deacay')

//SpotLight position updater
const slPositionFolder = spotLightFolder.addFolder('Position')
slPositionFolder.close()
slPositionFolder.add(spotLight.position, 'x').min(-10).max(10).step(0.1).name('x')
slPositionFolder.add(spotLight.position, 'y').min(-5).max(5).step(0.1).name('y')
slPositionFolder.add(spotLight.position, 'z').min(-10).max(10).step(0.1).name('z')

//SpotLight rotation updater
const slRotationFolder = spotLightFolder.addFolder('Rotaton')
slRotationFolder.close()
slRotationFolder.add(spotLight.rotation, 'x').min(0).max(Math.PI*2).step(Math.PI/180).name('x')
slRotationFolder.add(spotLight.rotation, 'y').min(0).max(Math.PI*2).step(Math.PI/180).name('y')
slRotationFolder.add(spotLight.rotation, 'z').min(0).max(Math.PI*2).step(Math.PI/180).name('z')



/*
// Helpers
*/
const helperOn = {
    hlHelper: false,
    dlHelper: false,
    plHelper: false,
    slHelper: false,
    rlHelper: false,
}

const hemisphericalLightHelper = new THREE.HemisphereLightHelper(hemisphericalLight, 0.3)
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.3)
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.3)
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)

// Toggling Helpers
hemisphericalLightFolder.add(helperOn, 'hlHelper').name('Helper Toggle').onChange((e) => {e ? scene.add(hemisphericalLightHelper) : scene.remove(hemisphericalLightHelper)})
directionalLightFolder.add(helperOn, 'dlHelper').name('Helper Toggle').onChange((e) => {e ? scene.add(directionalLightHelper) : scene.remove(directionalLightHelper)})
pointLightFolder.add(helperOn, 'plHelper').name('Helper Toggle').onChange((e) => {e ? scene.add(pointLightHelper) : scene.remove(pointLightHelper)})
spotLightFolder.add(helperOn, 'slHelper').name('Helper Toggle').onChange((e) => {e ? scene.add(spotLightHelper) : scene.remove(spotLightHelper)})
rectAreaLightFolder.add(helperOn, 'rlHelper').name('Helper Toggle').onChange((e) => {e ? scene.add(rectAreaLightHelper) : scene.remove(rectAreaLightHelper)})

window.requestAnimationFrame(() => {
    spotLightHelper.update()
    directionalLightHelper.update()
})


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