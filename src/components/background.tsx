"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef(new THREE.Vector2())
  const raycaster = useRef(new THREE.Raycaster())
  const triangles = useRef<THREE.Mesh[]>([])
  const triangleVelocities = useRef<{ x: number; y: number; z: number }[]>([])
  const lastMousePosition = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 10

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Create isosceles triangle geometry
    const createIsoscelesTriangle = (size: number) => {
      const geometry = new THREE.BufferGeometry()

      // Define vertices for isosceles triangle
      const vertices = new Float32Array([
        0,
        size,
        0, // top
        -size / 2,
        -size / 2,
        0, // bottom left
        size / 2,
        -size / 2,
        0, // bottom right
      ])

      geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))
      geometry.computeVertexNormals()

      return geometry
    }

    // Create floating triangles
    const createFloatingTriangles = (count: number) => {
      const triangleMeshes: THREE.Mesh[] = []
      const velocities: { x: number; y: number; z: number }[] = []

      for (let i = 0; i < count; i++) {
        const size = Math.random() * 0.5 + 0.5
        const geometry = createIsoscelesTriangle(size)

        // Create material with glow effect
        const material = new THREE.MeshBasicMaterial({
          color: 0x7fff00,
          wireframe: true,
          transparent: true,
          opacity: 0.6,
          side: THREE.DoubleSide,
        })

        const triangle = new THREE.Mesh(geometry, material)

        // Random position within a certain range
        triangle.position.x = (Math.random() - 0.5) * 15
        triangle.position.y = (Math.random() - 0.5) * 15
        triangle.position.z = (Math.random() - 0.5) * 5

        // Random rotation
        triangle.rotation.x = Math.random() * Math.PI
        triangle.rotation.y = Math.random() * Math.PI
        triangle.rotation.z = Math.random() * Math.PI

        // Random velocity
        const velocity = {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01,
        }

        scene.add(triangle)
        triangleMeshes.push(triangle)
        velocities.push(velocity)
      }

      return { triangleMeshes, velocities }
    }

    const { triangleMeshes, velocities } = createFloatingTriangles(30)
    triangles.current = triangleMeshes
    triangleVelocities.current = velocities


    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1

      const currentPosition = { x: event.clientX, y: event.clientY }

      if (lastMousePosition.current) {
        const mouseVelocityX = (currentPosition.x - lastMousePosition.current.x) * 0.001
        const mouseVelocityY = (currentPosition.y - lastMousePosition.current.y) * 0.001

        raycaster.current.setFromCamera(mousePosition.current, camera)

        const intersects = raycaster.current.intersectObjects(triangles.current)

        if (intersects.length > 0) {
          intersects.forEach((intersect) => {
            const index = triangles.current.indexOf(intersect.object as THREE.Mesh)
            if (index !== -1) {
              triangleVelocities.current[index].x += mouseVelocityX * 2
              triangleVelocities.current[index].y -= mouseVelocityY * 2
              triangleVelocities.current[index].z += (Math.random() - 0.5) * 0.05

              const mesh = intersect.object as THREE.Mesh
              const basicMaterial = mesh.material as THREE.MeshBasicMaterial

              // Update material properties temporarily
              basicMaterial.color.setHex(0xaaff00)
              basicMaterial.opacity = 0.9

              setTimeout(() => {
                // Revert to original state
                basicMaterial.color.setHex(0x7fff00)
                basicMaterial.opacity = 0.6
              }, 300)
            }
          })
        }
      }

      lastMousePosition.current = currentPosition
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize, { passive: true })

    let frameId: number
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      triangles.current.forEach((triangle, index) => {
        const velocity = triangleVelocities.current[index]

        triangle.position.x += velocity.x
        triangle.position.y += velocity.y
        triangle.position.z += velocity.z

        velocity.x *= 0.99
        velocity.y *= 0.99
        velocity.z *= 0.99

        triangle.rotation.x += 0.001
        triangle.rotation.y += 0.002
        triangle.rotation.z += 0.001

        // Boundary check - if triangle goes too far, bounce it back
        const bounds = 10
        if (Math.abs(triangle.position.x) > bounds) {
          velocity.x *= -1
          triangle.position.x = Math.sign(triangle.position.x) * bounds
        }
        if (Math.abs(triangle.position.y) > bounds) {
          velocity.y *= -1
          triangle.position.y = Math.sign(triangle.position.y) * bounds
        }
        if (Math.abs(triangle.position.z) > 5) {
          velocity.z *= -1
          triangle.position.z = Math.sign(triangle.position.z) * 5
        }
      })
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(frameId)
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose of geometries and materials
      triangles.current.forEach((triangle) => {
        triangle.geometry.dispose()
        ;(triangle.material as THREE.Material).dispose()
      })
    }
  }, [])

  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

