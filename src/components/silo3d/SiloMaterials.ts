import * as THREE from 'three';

/**
 * Creates a procedural corrugation normal/bump canvas texture
 * representing authentic 2.66" (6.76 cm) industrial sine corrugation ridges
 * with realistic crystalline zinc spangle flakes (hot-dip galvanized finish).
 */
export function createCorrugationTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Base zinc metallic tone
    ctx.fillStyle = '#E2E8F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw horizontal sine wave corrugation with authentic 2.66" sinusoidal profile
    const waves = 16;
    const waveHeight = canvas.height / waves;

    for (let i = 0; i < waves; i++) {
      const y = i * waveHeight;
      const grad = ctx.createLinearGradient(0, y, 0, y + waveHeight);
      grad.addColorStop(0.0, '#FFFFFF'); // ridge apex specular highlight
      grad.addColorStop(0.18, '#CBD5E1'); // upper flank
      grad.addColorStop(0.50, '#94A3B8'); // valley trough shadow
      grad.addColorStop(0.82, '#CBD5E1'); // lower flank
      grad.addColorStop(1.0, '#FFFFFF'); // adjacent ridge apex

      ctx.fillStyle = grad;
      ctx.fillRect(0, y, canvas.width, waveHeight);

      // Authentic crystalline zinc spangle (hot-dip galvanization flower pattern)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
      for (let j = 0; j < 16; j++) {
        const rx = Math.random() * canvas.width;
        const ry = y + Math.random() * waveHeight;
        const size = Math.random() * 5 + 2;
        ctx.fillRect(rx, ry, size, size);
      }
      ctx.fillStyle = 'rgba(100, 116, 139, 0.15)';
      for (let j = 0; j < 8; j++) {
        const rx = Math.random() * canvas.width;
        const ry = y + Math.random() * waveHeight;
        ctx.fillRect(rx, ry, Math.random() * 3 + 1, Math.random() * 3 + 1);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 2);
  return texture;
}

/**
 * Creates a procedural concrete foundation surface texture
 * representing M30/M35 industrial aggregate concrete with micro-pores.
 */
export function createConcreteBumpTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#D4D4D8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Micro aggregate flecks
    for (let i = 0; i < 600; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 1.5 + 0.5;
      const isLight = Math.random() > 0.5;
      ctx.fillStyle = isLight ? 'rgba(255, 255, 255, 0.25)' : 'rgba(80, 80, 90, 0.2)';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

/**
 * High-performance PBR materials matching Bali Group's industrial engineering specs.
 */
export function createSiloMaterials() {
  const corrugationMap = createCorrugationTexture();
  const concreteBumpMap = createConcreteBumpTexture();

  // Galvanized Steel Sidewall Material (350-600 GSM Zinc with authentic sine corrugation)
  const galvanizedMaterial = new THREE.MeshStandardMaterial({
    color: 0xDEE2E6,
    metalness: 0.86,
    roughness: 0.24,
    bumpMap: corrugationMap,
    bumpScale: 0.045,
  });

  // Darker Galvanized Structural Stiffener Material (Vertical Columns)
  const stiffenerMaterial = new THREE.MeshStandardMaterial({
    color: 0x94A3B8,
    metalness: 0.88,
    roughness: 0.22,
  });

  // 30° Conical Roof Panels (Galvanized Radial Sheets)
  const roofMaterial = new THREE.MeshStandardMaterial({
    color: 0xE2E8F0,
    metalness: 0.82,
    roughness: 0.26,
    bumpMap: corrugationMap,
    bumpScale: 0.025,
  });

  // Circular Reinforced Concrete Foundation (M30/M35 standard with aggregate texture)
  const concreteMaterial = new THREE.MeshStandardMaterial({
    color: 0xD4D4D8,
    metalness: 0.02,
    roughness: 0.94,
    bumpMap: concreteBumpMap,
    bumpScale: 0.02,
  });

  // Foundation Base Angle (Heavy steel with black seal line)
  const baseAngleMaterial = new THREE.MeshStandardMaterial({
    color: 0x64748B,
    metalness: 0.78,
    roughness: 0.40,
  });

  // Safety Ladder & Cage (Bali Group Yellow Accent #FACC15 with satin industrial sheen)
  const ladderYellowMaterial = new THREE.MeshStandardMaterial({
    color: 0xFACC15,
    metalness: 0.38,
    roughness: 0.30,
  });

  const ladderSteelMaterial = new THREE.MeshStandardMaterial({
    color: 0xCBD5E1,
    metalness: 0.88,
    roughness: 0.22,
  });

  // Roof Vents & Peak Inspection Cap (Bali Yellow Accent apex)
  const peakCapMaterial = new THREE.MeshStandardMaterial({
    color: 0xFACC15,
    metalness: 0.68,
    roughness: 0.28,
  });

  return {
    galvanizedMaterial,
    stiffenerMaterial,
    roofMaterial,
    concreteMaterial,
    baseAngleMaterial,
    ladderYellowMaterial,
    ladderSteelMaterial,
    peakCapMaterial,
  };
}
