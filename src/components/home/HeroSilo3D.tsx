import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCcw, Play, Pause, ZoomIn, ZoomOut, Compass, Sparkles, ShieldCheck } from 'lucide-react';
import { CornerMarks } from '../common/IndustrialGraphics';

interface HeroSilo3DProps {
  className?: string;
}

export const HeroSilo3D: React.FC<HeroSilo3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [activePin, setActivePin] = useState<string | null>(null);

  const defaultCameraPos = new THREE.Vector3(3.2, 2.0, 5.2);
  const defaultTarget = new THREE.Vector3(0, 0.4, 0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 550;

    // 1. SCENE
    const scene = new THREE.Scene();

    // 2. CAMERA
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.copy(defaultCameraPos);
    cameraRef.current = camera;

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 3.5;
    controls.maxDistance = 9.5;
    controls.minPolarAngle = Math.PI / 8; // Prevent looking directly from top
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // Prevent dipping below base
    controls.target.copy(defaultTarget);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    controlsRef.current = controls;

    // Pause auto-rotation on user drag, resume after 4s idle
    const handleStart = () => {
      controls.autoRotate = false;
      setIsAutoRotating(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const handleEnd = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        controls.autoRotate = true;
        setIsAutoRotating(true);
      }, 4000);
    };

    controls.addEventListener('start', handleStart);
    controls.addEventListener('end', handleEnd);

    // 5. LIGHTING SETUP
    // Ambient fill
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    // Key Light (warm daylight)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(6, 10, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Cool Rim Light from rear (highlights galvanized metal edges)
    const rimLight = new THREE.DirectionalLight(0xd0e8ff, 1.4);
    rimLight.position.set(-6, 8, -6);
    scene.add(rimLight);

    // Subtle Industrial Yellow Fill (brand identity reflection)
    const yellowFill = new THREE.DirectionalLight(0xfacc15, 0.5);
    yellowFill.position.set(0, -3, 6);
    scene.add(yellowFill);

    // 6. GROUND SHADOW & PEDESTAL RING
    // Soft shadow contact disk
    const shadowGeo = new THREE.PlaneGeometry(5, 5);
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(128, 128, 20, 128, 128, 120);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.55)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(canvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.55;
    scene.add(shadowMesh);

    // Technical drafting compass ring on ground
    const ringGeo = new THREE.RingGeometry(1.7, 1.72, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = -1.54;
    scene.add(ringMesh);

    // Outer dashed boundary ring
    const outerRingGeo = new THREE.RingGeometry(2.3, 2.31, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });
    const outerRingMesh = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRingMesh.rotation.x = -Math.PI / 2;
    outerRingMesh.position.y = -1.54;
    scene.add(outerRingMesh);

    // 7. LOAD GRAIN SILO GLTF MODEL
    const loader = new GLTFLoader();
    loader.load(
      '/models/grain_silo/scene.gltf',
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;

        // Compute Bounding Box to perfectly center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Center model geometry around origin
        model.position.x = -center.x;
        model.position.y = -center.y;
        model.position.z = -center.z;

        // Wrap in a pivot group for clean placement
        const pivot = new THREE.Group();
        pivot.add(model);

        // Normalize scale to fit nicely in 3D stage (approx 3.4 height)
        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleFactor = 3.6 / maxDim;
        pivot.scale.setScalar(scaleFactor);

        // Position slightly elevated above shadow plane
        pivot.position.y = 0.35;

        // Enhance materials
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.envMapIntensity = 1.2;
              mat.roughness = Math.max(mat.roughness || 0, 0.22);
              mat.metalness = Math.min(Math.max(mat.metalness || 0, 0.65), 0.9);
            }
          }
        });

        scene.add(pivot);
        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (error) => {
        console.error('Error loading grain silo model:', error);
        setLoading(false);
      }
    );

    // 8. ANIMATION LOOP
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 9. RESIZE HANDLING
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW > 0 && newH > 0) {
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    };
    window.addEventListener('resize', handleResize);

    // 10. CLEANUP
    return () => {
      window.removeEventListener('resize', handleResize);
      controls.removeEventListener('start', handleStart);
      controls.removeEventListener('end', handleEnd);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // UI Control Handlers
  const handleToggleAutoRotate = () => {
    if (!controlsRef.current) return;
    const newState = !isAutoRotating;
    controlsRef.current.autoRotate = newState;
    setIsAutoRotating(newState);
  };

  const handleResetCamera = () => {
    if (!controlsRef.current || !cameraRef.current) return;
    cameraRef.current.position.copy(defaultCameraPos);
    controlsRef.current.target.copy(defaultTarget);
    controlsRef.current.autoRotate = true;
    setIsAutoRotating(true);
  };

  const handleZoom = (delta: number) => {
    if (!cameraRef.current || !controlsRef.current) return;
    const direction = new THREE.Vector3().subVectors(
      cameraRef.current.position,
      controlsRef.current.target
    );
    const newDistance = Math.min(
      Math.max(direction.length() + delta, controlsRef.current.minDistance),
      controlsRef.current.maxDistance
    );
    direction.setLength(newDistance);
    cameraRef.current.position.addVectors(controlsRef.current.target, direction);
  };

  return (
    <div className={`relative w-full h-full min-h-[440px] sm:min-h-[520px] lg:min-h-[580px] flex items-center justify-center select-none ${className}`}>
      
      {/* Blueprint Grid Atmosphere for the 3D Stage */}
      <div 
        className="absolute inset-0 bg-blueprint-grid-dark opacity-35 pointer-events-none [mask-image:radial-gradient(circle_at_center,black_30%,transparent_75%)]" 
      />

      {/* Drafting Corner Registration Brackets */}
      <CornerMarks color="border-white/20 group-hover:border-brand-yellow/60" />

      {/* Top Architectural Spec Header */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-black/85 text-brand-yellow text-[10px] font-mono-tech uppercase tracking-widest border border-brand-yellow/40 backdrop-blur-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
          <span>3D CAD VISUALIZATION</span>
        </span>
        <span className="text-[10px] font-mono-tech text-gray-400 hidden sm:inline">
          // 360° INTERACTIVE INSPECTION
        </span>
      </div>

      {/* 3D Canvas Mounting Node */}
      <div 
        ref={containerRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none relative z-10"
        title="Click and drag to rotate the grain silo in 3D"
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-brand-black/90 backdrop-blur-xs">
          <div className="w-14 h-14 border-2 border-brand-yellow/30 border-t-brand-yellow rounded-full animate-spin mb-4" />
          <p className="text-white text-xs font-mono-tech uppercase tracking-widest">
            LOADING 3D GRAIN SILO CAD MODEL...
          </p>
          <div className="w-48 h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
            <div 
              className="h-full bg-brand-yellow transition-all duration-300"
              style={{ width: `${Math.max(loadProgress, 15)}%` }}
            />
          </div>
          <span className="text-[10px] text-gray-400 font-mono-tech mt-1.5">
            // HOT-DIP GALVANIZED CORRUGATED STEEL MODEL
          </span>
        </div>
      )}

      {/* Interactive Controls Pill (Bottom Right) */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-brand-black/85 border border-white/20 p-1.5 backdrop-blur-md shadow-premium">
        
        {/* Toggle Auto-Rotate */}
        <button
          onClick={handleToggleAutoRotate}
          title={isAutoRotating ? 'Pause Auto-Rotation' : 'Resume Auto-Rotation'}
          className={`p-2 transition-colors ${
            isAutoRotating 
              ? 'bg-brand-yellow text-brand-black' 
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        {/* Reset View */}
        <button
          onClick={handleResetCamera}
          title="Reset Camera Framing"
          className="p-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Zoom In */}
        <button
          onClick={() => handleZoom(-0.8)}
          title="Zoom In"
          className="p-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={() => handleZoom(0.8)}
          title="Zoom Out"
          className="p-2 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Drag Instruction Banner (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-2 bg-brand-black/75 px-3 py-1.5 border border-white/15 backdrop-blur-xs pointer-events-none">
        <Compass className="w-3.5 h-3.5 text-brand-yellow animate-spin" style={{ animationDuration: '8s' }} />
        <span className="text-[10px] font-mono-tech text-gray-300 uppercase tracking-wider">
          CLICK & DRAG TO ROTATE 360° • SCROLL TO ZOOM
        </span>
      </div>

      {/* Floating Interactive Specification Badges */}
      <div className="absolute top-16 right-4 z-20 space-y-2 hidden md:block">
        <div 
          onClick={() => setActivePin(activePin === 'roof' ? null : 'roof')}
          className={`px-3 py-1.5 border text-[10px] font-mono-tech uppercase tracking-wider cursor-pointer transition-all backdrop-blur-xs flex items-center gap-1.5 ${
            activePin === 'roof'
              ? 'bg-brand-yellow text-brand-black border-brand-yellow font-bold shadow-yellow-glow'
              : 'bg-brand-black/70 text-gray-300 border-white/20 hover:border-brand-yellow/80 hover:text-white'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
          <span>30° WEATHER-SHED ROOF</span>
        </div>

        <div 
          onClick={() => setActivePin(activePin === 'wall' ? null : 'wall')}
          className={`px-3 py-1.5 border text-[10px] font-mono-tech uppercase tracking-wider cursor-pointer transition-all backdrop-blur-xs flex items-center gap-1.5 ${
            activePin === 'wall'
              ? 'bg-brand-yellow text-brand-black border-brand-yellow font-bold shadow-yellow-glow'
              : 'bg-brand-black/70 text-gray-300 border-white/20 hover:border-brand-yellow/80 hover:text-white'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
          <span>2.66" SINE CORRUGATION</span>
        </div>

        <div 
          onClick={() => setActivePin(activePin === 'hopper' ? null : 'hopper')}
          className={`px-3 py-1.5 border text-[10px] font-mono-tech uppercase tracking-wider cursor-pointer transition-all backdrop-blur-xs flex items-center gap-1.5 ${
            activePin === 'hopper'
              ? 'bg-brand-yellow text-brand-black border-brand-yellow font-bold shadow-yellow-glow'
              : 'bg-brand-black/70 text-gray-300 border-white/20 hover:border-brand-yellow/80 hover:text-white'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
          <span>CONICAL DISCHARGE HOPPER</span>
        </div>
      </div>

      {/* Active Pin Detailed Callout Tooltip */}
      {activePin && (
        <div className="absolute top-36 right-4 z-20 max-w-xs p-3.5 bg-brand-black/95 border-l-4 border-brand-yellow border-y border-r border-white/20 text-white backdrop-blur-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono-tech text-brand-yellow uppercase tracking-widest font-bold">
              {activePin === 'roof' && 'SPEC: 30° ROOF SYSTEM'}
              {activePin === 'wall' && 'SPEC: 2.66" SINE WALLS'}
              {activePin === 'hopper' && 'SPEC: HEAVY DISCHARGE'}
            </span>
            <button 
              onClick={() => setActivePin(null)}
              className="text-gray-400 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-gray-200 leading-relaxed font-heading">
            {activePin === 'roof' && 'Engineered for extreme snow and wind load resistance, featuring pre-assembled structural rafters and center peak fill cap.'}
            {activePin === 'wall' && 'Continuous roll-formed high-tensile steel with 350-600 GSM certified zinc galvanization preventing bin wall buckling.'}
            {activePin === 'hopper' && 'Precision-angled 45° to 60° gravity cone ensuring total cleanout of grains, pulses, and oilseeds with zero bridge formation.'}
          </p>
        </div>
      )}

    </div>
  );
};
