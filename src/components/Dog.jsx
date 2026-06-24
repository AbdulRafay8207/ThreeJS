import * as THREE from "three"
import { OrbitControls, useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

function Dog() {

    const model = useGLTF("/models/dog.drc.glb")
    const { camera, gl } = useThree()
    camera.position.z = 0.5
    gl.toneMapping = THREE.ReinhardToneMapping
    gl.outputColorSpace = THREE.SRGBColorSpace

    const { actions } = useAnimations(model.animations, model.scene)

    useEffect(() => {
        actions["Take 001"].play()
    }, [actions])

    // const textures = useTexture({
    //     normalMap: "/dog_normals.jpg",
    //     sampleMapCap: "/matcap/mat-2.png"
    // })

    const [normalMap, sampleMapCap,] = (useTexture(["/dog_normals.jpg", "/matcap/mat-2.png"])).map((texture) => {
        texture.flipY = false
        texture.colorSpace = THREE.SRGBColorSpace
        return texture
    })

    const [branchMap, branchNormalMap] = (useTexture(["branches_diffuse.jpeg", "branches_normals.jpeg"])).map((texture) => {
        texture.colorSpace = THREE.SRGBColorSpace
        return texture
    })

    const dogMaterial = new THREE.MeshMatcapMaterial({
        normalMap: normalMap,
        matcap: sampleMapCap
    })

    const branchMaterial = new THREE.MeshMatcapMaterial({
        normalMap: branchNormalMap,
        map: branchMap
    })

    model.scene.traverse((child) => {
        if (child.name.includes("DOG")) {
            child.material = dogMaterial
        } else {
            child.material = branchMaterial
        }
    })

    const dogModel = useRef(model)

    gsap.registerPlugin(useGSAP, ScrollTrigger)

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#section-1",
                endTrigger: "#section-3",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                markers: true
            }
        })
        tl.to(dogModel.current.scene.position, {
            z: "-0.5",
            y: "+=0.1" 
        })
        .to(dogModel.current.scene.rotation, {
            x: "+=0.3"
        })
        .to(dogModel.current.scene.rotation, {
            y: "-=3.4"
        },"third")
        .to(dogModel.current.scene.position, {
            x: "-=0.5",
            z: "+=0.20",
            y: '+=0.01'
        },"third")
    },[])

    return (
        <>
            {/* <mesh>
                <meshBasicMaterial color={0x00FF00} />
                <boxGeometry args={[1, 1, 1]} />
            </mesh> */}
            <primitive object={model.scene} position={[0.2, -0.58, 0]} rotation={[0, 0.61, 0]} />
            <directionalLight intensity={10} position={[0, 5, 5]} color={0xFFFFFF} />
            {/* <OrbitControls /> */}
        </>
    )
}

export default Dog