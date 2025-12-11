import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { VeritasButton } from './ui/VeritasButton';
export function VeritasHero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a1628, 0.02); // Navy fog
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 15;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    // Objects Group
    const group = new THREE.Group();
    scene.add(group);
    // Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const solidGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.8,
      roughness: 0.2
    });
    // Shapes
    // 1. Icosahedron (Main center piece)
    const mainGeo = new THREE.IcosahedronGeometry(4, 1);
    const mainMesh = new THREE.Mesh(mainGeo, goldMaterial);
    group.add(mainMesh);
    // 2. Inner solid core
    const coreGeo = new THREE.IcosahedronGeometry(2, 0);
    const coreMesh = new THREE.Mesh(coreGeo, solidGoldMaterial);
    group.add(coreMesh);
    // 3. Floating Rings (Torus)
    const ringGeo = new THREE.TorusGeometry(8, 0.1, 16, 100);
    const ringMesh = new THREE.Mesh(ringGeo, goldMaterial);
    ringMesh.rotation.x = Math.PI / 2;
    group.add(ringMesh);
    const ringGeo2 = new THREE.TorusGeometry(10, 0.1, 16, 100);
    const ringMesh2 = new THREE.Mesh(ringGeo2, goldMaterial);
    ringMesh2.rotation.x = Math.PI / 3;
    ringMesh2.rotation.y = Math.PI / 4;
    group.add(ringMesh2);
    // 4. Floating Cubes
    const cubes: THREE.Mesh[] = [];
    const cubeGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    for (let i = 0; i < 20; i++) {
      const cube = new THREE.Mesh(cubeGeo, solidGoldMaterial);
      // Random position around the center
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 6 + Math.random() * 8;
      cube.position.x = radius * Math.sin(phi) * Math.cos(theta);
      cube.position.y = radius * Math.sin(phi) * Math.sin(theta);
      cube.position.z = radius * Math.cos(phi);
      cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      group.add(cube);
      cubes.push(cube);
    }
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xd4af37, 2, 50);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    const blueLight = new THREE.PointLight(0x0a66c2, 1, 50);
    blueLight.position.set(-10, -10, 10);
    scene.add(blueLight);
    // Mouse Interaction
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
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
      // Smooth rotation towards mouse
      targetRotation.x = mouse.y * 0.2;
      targetRotation.y = mouse.x * 0.2;
      group.rotation.x += (targetRotation.x - group.rotation.x) * 0.05;
      group.rotation.y += (targetRotation.y - group.rotation.y) * 0.05;
      // Constant rotation
      mainMesh.rotation.y += 0.002;
      mainMesh.rotation.z += 0.001;
      coreMesh.rotation.y -= 0.004;
      ringMesh.rotation.z += 0.001;
      ringMesh2.rotation.z -= 0.001;
      // Animate cubes
      cubes.forEach((cube, i) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        // Gentle floating
        cube.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01;
      });
      renderer.render(scene, camera);
    };
    animate();
    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      mainGeo.dispose();
      coreGeo.dispose();
      ringGeo.dispose();
      cubeGeo.dispose();
      goldMaterial.dispose();
      solidGoldMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  return <div className="relative w-full h-screen bg-[#0A1628] overflow-hidden">
      {/* 3D Container */}
      <div ref={containerRef} className="absolute inset-0 z-0" />

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }}>
            <span className="inline-block py-1 px-3 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-6">
              The New Standard in Verification
            </span>
          </motion.div>

          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight">
            Trust Verified.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F4E4C1]">
              Talent Secured.
            </span>
          </motion.h1>

          <motion.p initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.6
        }} className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Enterprise-grade background verification powered by advanced AI and
            human expertise. Accuracy, speed, and compliance for the modern
            workforce.
          </motion.p>

          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 0.8
        }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <VeritasButton variant="primary" icon>
              Schedule a Demo
            </VeritasButton>
            <VeritasButton variant="outline">See How It Works</VeritasButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 1.5,
      duration: 1
    }} className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[#D4AF37] text-xs tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
      </motion.div>
    </div>;
}