import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
export function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mountRef.current) return;
    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 30;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    // Network Group
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);
    // Nodes (Spheres)
    const nodeCount = 40;
    const nodes: THREE.Mesh[] = [];
    const nodeGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x0a66c2
    });
    // Generate nodes in a spherical distribution
    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      // Random point on sphere surface
      const phi = Math.acos(-1 + 2 * i / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 12;
      mesh.position.setFromSphericalCoords(radius, phi, theta);
      nodes.push(mesh);
      networkGroup.add(mesh);
    }
    // Connections (Lines)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0a66c2,
      transparent: true,
      opacity: 0.15
    });
    const linesGeometry = new THREE.BufferGeometry();
    const linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
    networkGroup.add(linesMesh);
    // Mouse Interaction
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates
      const rect = mountRef.current?.getBoundingClientRect();
      if (rect) {
        mouse.x = (event.clientX - rect.left) / rect.width * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    // Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      // Update lines based on node positions (dynamic connections)
      // For performance, we'll just connect nearby nodes based on initial positions
      // but let's make it look dynamic by rotating the group
      // Smooth rotation towards mouse
      targetRotation.x = mouse.y * 0.5;
      targetRotation.y = mouse.x * 0.5;
      networkGroup.rotation.x += (targetRotation.x - networkGroup.rotation.x) * 0.05;
      networkGroup.rotation.y += (targetRotation.y - networkGroup.rotation.y) * 0.05;
      // Constant slow rotation
      networkGroup.rotation.y += 0.002;
      // Pulse effect for nodes
      const time = Date.now() * 0.001;
      nodes.forEach((node, i) => {
        const scale = 1 + Math.sin(time + i) * 0.2;
        node.scale.setScalar(scale);
      });
      // Update line geometry
      const positions: number[] = [];
      // Connect nodes that are close to each other
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = nodes[i].position.distanceTo(nodes[j].position);
          if (dist < 8) {
            // Connection threshold
            positions.push(nodes[i].position.x, nodes[i].position.y, nodes[i].position.z, nodes[j].position.x, nodes[j].position.y, nodes[j].position.z);
          }
        }
      }
      linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      renderer.render(scene, camera);
    };
    animate();
    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineMaterial.dispose();
      linesGeometry.dispose();
      renderer.dispose();
    };
  }, []);
  return <div ref={mountRef} className="w-full h-[400px] md:h-[600px] cursor-default" aria-label="Interactive 3D network visualization" />;
}