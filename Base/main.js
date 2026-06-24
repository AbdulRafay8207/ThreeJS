import * as THREE from "three"

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.01, 1000)
scene.add(camera)

camera.position.z = 5

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0x00FF00
})

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)

const light = new THREE.DirectionalLight(0xFFFFFF, 10)
scene.add(light)

light.position.z = 4
light.position.y = 1

const renderer = new THREE.WebGLRenderer()
renderer.setSize(innerWidth, innerHeight)

document.body.appendChild(renderer.domElement)

function animate(){
    cube.rotation.y += 0.01
    cube.rotation.z += 0.01

    renderer.render(scene, camera)
}
renderer.setAnimationLoop(animate)