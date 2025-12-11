import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { ModernButton } from './ui/ModernButton';
import { Shield, Cpu, CheckCircle } from 'lucide-react';
export function BlockchainHero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    // Scene Setup
    const scene = new THREE.Scene();
    // No fog for clean look, or very subtle white fog
    scene.fog = new THREE.Fog(0xffffff, 20, 60);
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 30;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    // Network Group
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);
    // Nodes (Spheres)
    const nodeCount = 35;
    const nodes: THREE.Mesh[] = [];
    const nodeGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6
    }); // Bright Blue
    // Generate nodes
    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      // Random position
      mesh.position.x = (Math.random() - 0.5) * 40;
      mesh.position.y = (Math.random() - 0.5) * 25;
      mesh.position.z = (Math.random() - 0.5) * 15;
      // Store velocity for animation
      mesh.userData = {
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.02
      };
      nodes.push(mesh);
      networkGroup.add(mesh);
    }
    // Connections (Lines)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x7c3aed,
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
      targetRotation.x = mouse.y * 0.1;
      targetRotation.y = mouse.x * 0.1;
      networkGroup.rotation.x += (targetRotation.x - networkGroup.rotation.x) * 0.05;
      networkGroup.rotation.y += (targetRotation.y - networkGroup.rotation.y) * 0.05;
      // Update nodes
      nodes.forEach(node => {
        node.position.x += node.userData.vx;
        node.position.y += node.userData.vy;
        node.position.z += node.userData.vz;
        // Bounce off bounds
        if (Math.abs(node.position.x) > 20) node.userData.vx *= -1;
        if (Math.abs(node.position.y) > 12) node.userData.vy *= -1;
        if (Math.abs(node.position.z) > 8) node.userData.vz *= -1;
      });
      // Update lines
      const positions: number[] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = nodes[i].position.distanceTo(nodes[j].position);
          if (dist < 8) {
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
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineMaterial.dispose();
      linesGeometry.dispose();
      renderer.dispose();
    };
  }, []);
  return <section className="relative w-full min-h-screen pt-20 flex items-center justify-center overflow-hidden bg-white">
      {/* 3D Container Background */}
      <div ref={containerRef} className="absolute inset-0 z-0 opacity-60" />

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }}>
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-[#3B82F6] text-xs font-semibold tracking-wide uppercase mb-8">
            The Future of Verification
          </span>
        </motion.div>

        <motion.h1 initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.1
      }} className="text-5xl md:text-7xl font-bold text-[#0F172A] mb-6 leading-tight tracking-tight">
          Blockchain-Verified.
          <br />
          <span className="text-gradient">Instantly Trusted.</span>
        </motion.h1>

        <motion.p initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.2
      }} className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Immutable background verification powered by blockchain and AI.
          Instant results, zero fraud, complete transparency for the modern
          enterprise.
        </motion.p>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6,
        delay: 0.3
      }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <ModernButton variant="primary" icon>
            Request Demo
          </ModernButton>
          <ModernButton variant="outline">See How It Works</ModernButton>
        </motion.div>

        {/* Trust Badges */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.6,
        delay: 0.5
      }} className="flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-500">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#3B82F6]" />
            <span>Blockchain Secured</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#7C3AED]" />
            <span>AI Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>ISO 27001 Certified</span>
          </div>
        </motion.div>
      </div>
    </section>;
}