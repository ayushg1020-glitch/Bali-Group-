import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { buildSiloModel, updateSiloConstruction, SiloMeshElements } from './SiloGeometry';

interface SiloCanvasProps {
  progress: number;
  className?: string;
  isReducedMotion?: boolean;
}

export const SiloCanvas: React.FC<SiloCanvasProps> = ({
  progress,
  className = '',
  isReducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<SiloMeshElements | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);

  // Check WebGL availability once
  useEffect(() => {
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
      }
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  // Initialize Three.js Scene, Camera, Renderer, Studio Daylight & Silo Meshes
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !webGLSupported) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // 1. SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Soft architectural background color (matches corporate light grey #F8FAFC)
    scene.background = new THREE.Color(0xF8FAFC);
    scene.fog = new THREE.FogExp2(0xF8FAFC, 0.018);

    // 2. CAMERA
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.5, 100);
    camera.position.set(8.5, 2.5, 11.5);
    camera.lookAt(0, 0.8, 0);
    cameraRef.current = camera;

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. STUDIO DAYLIGHT LIGHTING
    // Ambient light - soft skylight
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.9);
    scene.add(ambientLight);

    // Directional Key Sun Light (produces soft realistic shadows)
    const sunLight = new THREE.DirectionalLight(0xFFFFFF, 1.6);
    sunLight.position.set(12, 20, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 45;
    sunLight.shadow.camera.left = -9;
    sunLight.shadow.camera.right = 9;
    sunLight.shadow.camera.top = 12;
    sunLight.shadow.camera.bottom = -4;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Subtle Bali Yellow fill light to pick up steel corrugation bevels
    const yellowFillLight = new THREE.DirectionalLight(0xFDE047, 0.35);
    yellowFillLight.position.set(-10, 8, -6);
    scene.add(yellowFillLight);

    // Back rim light to outline cylindrical profile against background
    const rimLight = new THREE.DirectionalLight(0xCBD5E1, 0.6);
    rimLight.position.set(-6, 14, 12);
    scene.add(rimLight);

    // 5. SILO 3D MESH HIERARCHY
    const siloElements = buildSiloModel();
    elementsRef.current = siloElements;
    scene.add(siloElements.rootGroup);

    // Initial update
    const initProgress = isReducedMotion ? 1.0 : progress;
    updateSiloConstruction(siloElements, initProgress, camera);
    renderer.render(scene, camera);

    // 6. RESIZE OBSERVER
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
        renderer.render(scene, camera);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 7. CLEANUP
    return () => {
      resizeObserver.disconnect();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries & materials
      siloElements.rootGroup.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });

      renderer.dispose();
      elementsRef.current = null;
      rendererRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
    };
  }, [webGLSupported]);

  // Update silo construction deterministically when progress changes
  useEffect(() => {
    const elements = elementsRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    const scene = sceneRef.current;

    if (!elements || !camera || !renderer || !scene) return;

    const targetProgress = isReducedMotion ? 1.0 : progress;
    updateSiloConstruction(elements, targetProgress, camera);
    renderer.render(scene, camera);
  }, [progress, isReducedMotion]);

  if (!webGLSupported) {
    return (
      <div className={`relative flex items-center justify-center bg-brand-light-grey rounded-2xl p-8 border border-gray-200 ${className}`}>
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-brand-yellow/20 rounded-xl flex items-center justify-center text-brand-black">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h4 className="font-heading font-bold text-lg text-brand-black mb-2">
            Engineered Grain Silo Infrastructure
          </h4>
          <p className="text-sm text-brand-steel mb-4">
            High-strength corrugated galvanized steel grain storage silos with 350-600 GSM zinc coating and computer-engineered rafter roofs.
          </p>
          <img
            src="/images/solutions/flat-bottom-silos.jpg"
            alt="Bali Group Flat-Bottom Grain Silo"
            className="w-full h-48 object-cover rounded-lg shadow-sm border border-gray-200"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative overflow-hidden select-none ${className}`}
      style={{ touchAction: 'pan-y' }}
    />
  );
};
