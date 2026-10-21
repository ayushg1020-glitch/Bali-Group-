import * as THREE from 'three';

/**
 * Creates a procedural corrugation normal/bump canvas texture
 * representing authentic 2.66" (6.76 cm) industrial sine corrugation ridges.
 */
export function createCorrugationTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Base zinc metallic tone
    ctx.fillStyle = '#E5E7EB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw horizontal sine wave corrugation shadows & highlights
    const waves = 16;
    const waveHeight = canvas.height / waves;

    for (let i = 0; i < waves; i++) {
      const y = i * waveHeight;
      const grad = ctx.createLinearGradient(0, y, 0, y + waveHeight);
      grad.addColorStop(0.0, '#FFFFFF');
      grad.addColorStop(0.2, '#D1D5DB');
      grad.addColorStop(0.5, '#9CA3AF');
      grad.addColorStop(0.8, '#D1D5DB');
      grad.addColorStop(1.0, '#F3F4F6');

      ctx.fillStyle = grad;
      ctx.fillRect(0, y, canvas.width, waveHeight);

      // Subtle vertical spangle crystalline zinc flakes
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      for (let j = 0; j < 8; j++) {
        const rx = Math.random() * canvas.width;
        const ry = y + Math.random() * waveHeight;
        ctx.fillRect(rx, ry, Math.random() * 4 + 2, Math.random() * 4 + 2);
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
 * High-performance PBR materials matching Bali Group's industrial engineering specs.
 */
export function createSiloMaterials() {
  const corrugationMap = createCorrugationTexture();

  // Galvanized Steel Sidewall Material (350-600 GSM Zinc)
  const galvanizedMaterial = new THREE.MeshStandardMaterial({
    color: 0xD8DCE3,
    metalness: 0.82,
    roughness: 0.28,
    bumpMap: corrugationMap,
    bumpScale: 0.04,
    envMapIntensity: 1.2,
  });

  // Darker Galvanized Structural Stiffener Material (Vertical Columns)
  const stiffenerMaterial = new THREE.MeshStandardMaterial({
    color: 0x94A3B8,
    metalness: 0.88,
    roughness: 0.24,
  });

  // 30° Conical Roof Panels (Galvanized Radial Sheets)
  const roofMaterial = new THREE.MeshStandardMaterial({
    color: 0xE2E8F0,
    metalness: 0.78,
    roughness: 0.32,
    bumpMap: corrugationMap,
    bumpScale: 0.02,
  });

  // Circular Reinforced Concrete Foundation
  const concreteMaterial = new THREE.MeshStandardMaterial({
    color: 0xD4D4D8,
    metalness: 0.05,
    roughness: 0.92,
  });

  // Foundation Base Angle (Steel with black seal line)
  const baseAngleMaterial = new THREE.MeshStandardMaterial({
    color: 0x64748B,
    metalness: 0.75,
    roughness: 0.45,
  });

  // Safety Ladder & Cage (Bali Group Yellow Accent #FACC15 + Steel)
  const ladderYellowMaterial = new THREE.MeshStandardMaterial({
    color: 0xFACC15,
    metalness: 0.45,
    roughness: 0.35,
  });

  const ladderSteelMaterial = new THREE.MeshStandardMaterial({
    color: 0xCBD5E1,
    metalness: 0.85,
    roughness: 0.25,
  });

  // Roof Vents & Peak Inspection Cap
  const peakCapMaterial = new THREE.MeshStandardMaterial({
    color: 0xFACC15,
    metalness: 0.65,
    roughness: 0.3,
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
