import * as THREE from 'three';
import { createSiloMaterials } from './SiloMaterials';

export interface SiloMeshElements {
  rootGroup: THREE.Group;
  foundationGroup: THREE.Group;
  rings: THREE.Group[];
  stiffeners: THREE.Group[];
  roofGroup: THREE.Group;
  accessoriesGroup: THREE.Group;
  groundShadow: THREE.Mesh;
  materials: ReturnType<typeof createSiloMaterials>;
}

export function buildSiloModel(): SiloMeshElements {
  const materials = createSiloMaterials();
  const rootGroup = new THREE.Group();
  rootGroup.name = 'BaliSiloRoot';

  // Radius and height parameters
  const siloRadius = 4.0;
  const numRings = 5;
  const ringHeight = 1.35;
  const siloHeight = numRings * ringHeight; // ~6.75 units

  // ==========================================
  // 1. GROUND PLANE & CONTACT SHADOW
  // ==========================================
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 128;
  shadowCanvas.height = 128;
  const sCtx = shadowCanvas.getContext('2d');
  if (sCtx) {
    const grad = sCtx.createRadialGradient(64, 64, 10, 64, 64, 60);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 128, 128);
  }
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);

  const shadowGeo = new THREE.PlaneGeometry(16, 16);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    depthWrite: false,
  });
  const groundShadow = new THREE.Mesh(shadowGeo, shadowMat);
  groundShadow.rotation.x = -Math.PI / 2;
  groundShadow.position.y = -0.01;
  rootGroup.add(groundShadow);

  // ==========================================
  // 2. FOUNDATION GROUP
  // ==========================================
  const foundationGroup = new THREE.Group();
  foundationGroup.name = 'FoundationGroup';

  // Primary circular reinforced concrete slab
  const foundationRadius = siloRadius + 0.65;
  const slabHeight = 0.45;
  const slabGeo = new THREE.CylinderGeometry(foundationRadius, foundationRadius + 0.15, slabHeight, 48);
  const slabMesh = new THREE.Mesh(slabGeo, materials.concreteMaterial);
  slabMesh.position.y = slabHeight / 2;
  slabMesh.receiveShadow = true;
  foundationGroup.add(slabMesh);

  // Secondary elevated equipment plinth
  const plinthHeight = 0.15;
  const plinthGeo = new THREE.CylinderGeometry(siloRadius + 0.25, siloRadius + 0.35, plinthHeight, 48);
  const plinthMesh = new THREE.Mesh(plinthGeo, materials.concreteMaterial);
  plinthMesh.position.y = slabHeight + plinthHeight / 2;
  foundationGroup.add(plinthMesh);

  // Bolt-on foundation base angle ring
  const baseAngleGeo = new THREE.TorusGeometry(siloRadius + 0.04, 0.05, 8, 48);
  const baseAngleMesh = new THREE.Mesh(baseAngleGeo, materials.baseAngleMaterial);
  baseAngleMesh.rotation.x = Math.PI / 2;
  baseAngleMesh.position.y = slabHeight + plinthHeight;
  foundationGroup.add(baseAngleMesh);

  // Foundation anchor bolts (24 bolts around base ring)
  const boltGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.1, 8);
  const boltMat = materials.stiffenerMaterial;
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const bolt = new THREE.Mesh(boltGeo, boltMat);
    bolt.position.set(
      Math.cos(angle) * (siloRadius + 0.12),
      slabHeight + plinthHeight + 0.05,
      Math.sin(angle) * (siloRadius + 0.12)
    );
    foundationGroup.add(bolt);
  }

  rootGroup.add(foundationGroup);

  // Base Y offset for silo body
  const siloBaseY = slabHeight + plinthHeight;

  // ==========================================
  // 3. SIDEWALL RINGS GROUP (5 sequential rings)
  // ==========================================
  const rings: THREE.Group[] = [];

  for (let r = 0; r < numRings; r++) {
    const ringGroup = new THREE.Group();
    ringGroup.name = `SiloRing_${r}`;
    const ringCenterY = siloBaseY + r * ringHeight + ringHeight / 2;

    // Cylindrical corrugated steel wall sheet
    const ringGeo = new THREE.CylinderGeometry(siloRadius, siloRadius, ringHeight, 48, 1, true);
    const ringMesh = new THREE.Mesh(ringGeo, materials.galvanizedMaterial);
    ringMesh.castShadow = true;
    ringMesh.receiveShadow = true;
    ringGroup.add(ringMesh);

    // Horizontal lap joint seam bead
    const lapSeamGeo = new THREE.TorusGeometry(siloRadius + 0.015, 0.02, 6, 48);
    const lapSeamMesh = new THREE.Mesh(lapSeamGeo, materials.stiffenerMaterial);
    lapSeamMesh.rotation.x = Math.PI / 2;
    lapSeamMesh.position.y = ringHeight / 2;
    ringGroup.add(lapSeamMesh);

    // Initial deterministic position (will be animated via scroll progress)
    ringGroup.position.set(0, ringCenterY, 0);
    rootGroup.add(ringGroup);
    rings.push(ringGroup);
  }

  // ==========================================
  // 4. EXTERNAL VERTICAL STIFFENERS (16 columns)
  // ==========================================
  const stiffeners: THREE.Group[] = [];
  const numStiffeners = 16;

  for (let i = 0; i < numStiffeners; i++) {
    const stiffenerGroup = new THREE.Group();
    stiffenerGroup.name = `Stiffener_${i}`;
    const angle = (i / numStiffeners) * Math.PI * 2;

    // Vertical column segment (hat profile)
    const colGeo = new THREE.BoxGeometry(0.12, siloHeight, 0.08);
    const colMesh = new THREE.Mesh(colGeo, materials.stiffenerMaterial);
    colMesh.position.set(0, siloHeight / 2, 0);
    colMesh.castShadow = true;
    stiffenerGroup.add(colMesh);

    stiffenerGroup.position.set(
      Math.cos(angle) * (siloRadius + 0.04),
      siloBaseY,
      Math.sin(angle) * (siloRadius + 0.04)
    );
    stiffenerGroup.rotation.y = -angle + Math.PI / 2;

    rootGroup.add(stiffenerGroup);
    stiffeners.push(stiffenerGroup);
  }

  // ==========================================
  // 5. CONICAL ROOF GROUP (30° Engineering Slope)
  // ==========================================
  const roofGroup = new THREE.Group();
  roofGroup.name = 'RoofGroup';
  const roofHeight = siloRadius * Math.tan((30 * Math.PI) / 180); // ~2.31 units for 30 deg slope
  const roofTopY = siloBaseY + siloHeight;

  // Conical roof shell
  const roofGeo = new THREE.ConeGeometry(siloRadius + 0.15, roofHeight, 32, 1, false);
  const roofMesh = new THREE.Mesh(roofGeo, materials.roofMaterial);
  roofMesh.position.y = roofHeight / 2;
  roofMesh.castShadow = true;
  roofGroup.add(roofMesh);

  // Eave overhang compression ring
  const eaveGeo = new THREE.TorusGeometry(siloRadius + 0.15, 0.05, 8, 48);
  const eaveMesh = new THREE.Mesh(eaveGeo, materials.stiffenerMaterial);
  eaveMesh.rotation.x = Math.PI / 2;
  eaveMesh.position.y = 0;
  roofGroup.add(eaveMesh);

  // 16 Radial rafter seam ridges on the cone
  const rafterLineGeo = new THREE.BoxGeometry(0.04, roofHeight * 1.15, 0.04);
  for (let j = 0; j < 16; j++) {
    const rAngle = (j / 16) * Math.PI * 2;
    const rafter = new THREE.Mesh(rafterLineGeo, materials.stiffenerMaterial);
    rafter.position.set(
      (Math.cos(rAngle) * siloRadius) / 2,
      roofHeight / 2,
      (Math.sin(rAngle) * siloRadius) / 2
    );
    rafter.rotation.y = -rAngle;
    rafter.rotation.z = Math.PI / 6; // ~30 deg
    roofGroup.add(rafter);
  }

  // Peak inspection cap & aeration exhaust dome
  const peakCapGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.35, 16);
  const peakCapMesh = new THREE.Mesh(peakCapGeo, materials.peakCapMaterial);
  peakCapMesh.position.y = roofHeight + 0.15;
  roofGroup.add(peakCapMesh);

  // Aeration mushroom vents around roof
  const ventGeo = new THREE.CylinderGeometry(0.18, 0.12, 0.2, 12);
  for (let k = 0; k < 4; k++) {
    const vAngle = (k / 4) * Math.PI * 2 + Math.PI / 4;
    const vent = new THREE.Mesh(ventGeo, materials.stiffenerMaterial);
    vent.position.set(
      Math.cos(vAngle) * 2.2,
      roofHeight * 0.45 + 0.1,
      Math.sin(vAngle) * 2.2
    );
    roofGroup.add(vent);
  }

  roofGroup.position.set(0, roofTopY, 0);
  rootGroup.add(roofGroup);

  // ==========================================
  // 6. ACCESSORIES GROUP (Ladder, Safety Cage, Catwalk)
  // ==========================================
  const accessoriesGroup = new THREE.Group();
  accessoriesGroup.name = 'AccessoriesGroup';

  const ladderAngle = Math.PI / 4; // 45 deg front-right for cinematic viewing
  const ladderDistance = siloRadius + 0.18;
  const ladderX = Math.cos(ladderAngle) * ladderDistance;
  const ladderZ = Math.sin(ladderAngle) * ladderDistance;

  // Ladder Group container
  const ladderGroup = new THREE.Group();
  ladderGroup.position.set(ladderX, siloBaseY, ladderZ);
  ladderGroup.rotation.y = -ladderAngle + Math.PI / 2;

  // Two vertical rails
  const railHeight = siloHeight + 0.8;
  const railGeo = new THREE.BoxGeometry(0.04, railHeight, 0.04);
  const leftRail = new THREE.Mesh(railGeo, materials.ladderSteelMaterial);
  leftRail.position.set(-0.25, railHeight / 2, 0);
  ladderGroup.add(leftRail);

  const rightRail = new THREE.Mesh(railGeo, materials.ladderSteelMaterial);
  rightRail.position.set(0.25, railHeight / 2, 0);
  ladderGroup.add(rightRail);

  // Ladder rungs every 0.35 units
  const numRungs = Math.floor(railHeight / 0.35);
  const rungGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.5, 8);
  rungGeo.rotateZ(Math.PI / 2);
  for (let m = 1; m < numRungs; m++) {
    const rung = new THREE.Mesh(rungGeo, materials.ladderSteelMaterial);
    rung.position.set(0, m * 0.35, 0);
    ladderGroup.add(rung);
  }

  // Safety Cage Hoops (starting at y: 2.2 to top)
  const cageStartHeight = 2.2;
  const cageEndHeight = railHeight;
  const numHoops = Math.floor((cageEndHeight - cageStartHeight) / 0.65);
  const hoopGeo = new THREE.TorusGeometry(0.38, 0.02, 6, 16, Math.PI * 1.5);

  for (let h = 0; h < numHoops; h++) {
    const hoop = new THREE.Mesh(hoopGeo, materials.ladderYellowMaterial);
    hoop.rotation.x = Math.PI / 2;
    hoop.rotation.z = Math.PI / 4;
    hoop.position.set(0, cageStartHeight + h * 0.65, 0.25);
    ladderGroup.add(hoop);
  }

  // Safety cage vertical strapping bars
  for (let s = -1; s <= 1; s += 0.5) {
    const strapGeo = new THREE.BoxGeometry(0.02, cageEndHeight - cageStartHeight, 0.02);
    const strap = new THREE.Mesh(strapGeo, materials.ladderYellowMaterial);
    strap.position.set(s * 0.3, cageStartHeight + (cageEndHeight - cageStartHeight) / 2, 0.55);
    ladderGroup.add(strap);
  }

  // Eave access rest platform
  const platformGeo = new THREE.BoxGeometry(0.8, 0.06, 0.8);
  const platform = new THREE.Mesh(platformGeo, materials.stiffenerMaterial);
  platform.position.set(0, siloHeight, 0.4);
  ladderGroup.add(platform);

  accessoriesGroup.add(ladderGroup);
  rootGroup.add(accessoriesGroup);

  return {
    rootGroup,
    foundationGroup,
    rings,
    stiffeners,
    roofGroup,
    accessoriesGroup,
    groundShadow,
    materials,
  };
}

/**
 * Deterministic, smooth, reversible update based strictly on normalized progress p in [0.0, 1.0].
 * No accumulated error, perfectly scrubbable in reverse.
 */
export function updateSiloConstruction(
  elements: SiloMeshElements,
  progress: number,
  camera: THREE.PerspectiveCamera,
  offsetX: number = 0
) {
  const p = Math.max(0, Math.min(1, progress));
  const { foundationGroup, rings, stiffeners, roofGroup, accessoriesGroup, groundShadow } = elements;

  // ----------------------------------------------------
  // STAGE 1: FOUNDATION (p in 0.00 to 0.18)
  // ----------------------------------------------------
  const fProgress = Math.min(1, Math.max(0, p / 0.18));
  foundationGroup.visible = fProgress > 0.01;
  groundShadow.visible = fProgress > 0.05;

  if (fProgress <= 1.0) {
    // Smooth drop and scale-in of concrete slab
    const easeF = Math.sin((fProgress * Math.PI) / 2);
    foundationGroup.position.y = (1 - easeF) * -2.0;
    foundationGroup.scale.set(easeF, easeF, easeF);
    groundShadow.scale.set(easeF, easeF, easeF);
  } else {
    foundationGroup.position.y = 0;
    foundationGroup.scale.set(1, 1, 1);
    groundShadow.scale.set(1, 1, 1);
  }

  // ----------------------------------------------------
  // STAGE 2: SIDEWALL RINGS & STIFFENERS (p in 0.18 to 0.55)
  // ----------------------------------------------------
  const ringProgress = Math.min(1, Math.max(0, (p - 0.18) / 0.37));
  const numRings = rings.length;

  rings.forEach((ring, idx) => {
    // Each ring activates across a slice of ringProgress
    const ringSliceStart = idx / numRings;
    const ringSliceEnd = (idx + 1) / numRings;

    if (ringProgress <= ringSliceStart) {
      ring.visible = false;
      ring.scale.set(0.001, 0.001, 0.001);
    } else if (ringProgress >= ringSliceEnd) {
      ring.visible = true;
      ring.scale.set(1, 1, 1);
      ring.position.y = 0.6 + idx * 1.35 + 0.675; // Standard resting height
    } else {
      // Actively assembling ring: smooth drop from above into place
      ring.visible = true;
      const t = (ringProgress - ringSliceStart) / (ringSliceEnd - ringSliceStart);
      const easeT = Math.sin((t * Math.PI) / 2);
      const targetY = 0.6 + idx * 1.35 + 0.675;
      ring.position.y = targetY + (1 - easeT) * 1.5; // Drops 1.5 units down into place
      ring.scale.set(0.8 + 0.2 * easeT, 0.8 + 0.2 * easeT, 0.8 + 0.2 * easeT);
    }
  });

  // Stiffeners grow upward alongside the rings
  stiffeners.forEach((stiffener) => {
    if (ringProgress <= 0.01) {
      stiffener.visible = false;
      stiffener.scale.set(1, 0.001, 1);
    } else {
      stiffener.visible = true;
      stiffener.scale.set(1, Math.min(1, ringProgress * 1.05), 1);
    }
  });

  // ----------------------------------------------------
  // STAGE 3: CONICAL ROOF (p in 0.55 to 0.75)
  // ----------------------------------------------------
  const roofProgress = Math.min(1, Math.max(0, (p - 0.55) / 0.2));
  const roofRestingY = 0.6 + 5 * 1.35; // ~7.35 units

  if (roofProgress <= 0.001) {
    roofGroup.visible = false;
    roofGroup.position.y = roofRestingY + 6.0;
    roofGroup.scale.set(0.7, 0.7, 0.7);
  } else if (roofProgress >= 1.0) {
    roofGroup.visible = true;
    roofGroup.position.y = roofRestingY;
    roofGroup.scale.set(1, 1, 1);
  } else {
    roofGroup.visible = true;
    const easeR = Math.sin((roofProgress * Math.PI) / 2);
    roofGroup.position.y = roofRestingY + (1 - easeR) * 4.5;
    const s = 0.75 + 0.25 * easeR;
    roofGroup.scale.set(s, s, s);
  }

  // ----------------------------------------------------
  // STAGE 4: ACCESSORIES (LADDER & CAGE) (p in 0.75 to 0.90)
  // ----------------------------------------------------
  const accProgress = Math.min(1, Math.max(0, (p - 0.75) / 0.15));

  if (accProgress <= 0.001) {
    accessoriesGroup.visible = false;
    accessoriesGroup.scale.set(1, 0.001, 1);
  } else if (accProgress >= 1.0) {
    accessoriesGroup.visible = true;
    accessoriesGroup.scale.set(1, 1, 1);
  } else {
    accessoriesGroup.visible = true;
    const easeA = Math.sin((accProgress * Math.PI) / 2);
    accessoriesGroup.scale.set(1, easeA, 1);
  }

  // ----------------------------------------------------
  // CAMERA POSITIONING & INSPECTION ORBIT (p in 0.0 to 1.0)
  // Designed so the entire silo from base to peak is 100% whole with generous margins
  // ----------------------------------------------------
  if (p < 0.18) {
    // Stage 1 Camera: Low angle ground footing, showing full circular slab, plinth, and ground shadow
    const t = p / 0.18;
    const radius = 17.5 - t * 0.5;
    const angle = Math.PI / 4 + 0.1;
    camera.position.x = offsetX + Math.cos(angle) * radius;
    camera.position.y = 3.8 + t * 0.8;
    camera.position.z = Math.sin(angle) * radius;
    camera.lookAt(offsetX, 1.2 + t * 0.6, 0);
  } else if (p < 0.55) {
    // Stage 2 Camera: Smooth elevation tracking growing rings, pulling back to frame full cylinder and base
    const t = (p - 0.18) / 0.37;
    const radius = 17.0 + t * 4.0; // from 17.0 to 21.0
    const angle = Math.PI / 4 + 0.1 - t * 0.1;
    camera.position.x = offsetX + Math.cos(angle) * radius;
    camera.position.y = 4.6 + t * 2.2; // from 4.6 to 6.8
    camera.position.z = Math.sin(angle) * radius;
    camera.lookAt(offsetX, 1.8 + t * 2.6, 0); // target smoothly ascends from 1.8 to 4.4
  } else if (p < 0.75) {
    // Stage 3 Camera: Higher pitch framing the 30° roof installation with generous sky clearance
    const t = (p - 0.55) / 0.2;
    const radius = 21.0 + t * 1.0; // 21.0 to 22.0
    const angle = Math.PI / 4 + t * 0.08;
    camera.position.x = offsetX + Math.cos(angle) * radius;
    camera.position.y = 6.8 + t * 0.4;
    camera.position.z = Math.sin(angle) * radius;
    camera.lookAt(offsetX, 4.6 + t * 0.2, 0);
  } else if (p < 0.90) {
    // Stage 4 Camera: Framing ladder, safety cage and entire structure height
    const t = (p - 0.75) / 0.15;
    const radius = 22.0 + t * 0.5;
    const angle = Math.PI / 4 + 0.08 + t * 0.05;
    camera.position.x = offsetX + Math.cos(angle) * radius;
    camera.position.y = 7.0 - t * 0.4;
    camera.position.z = Math.sin(angle) * radius;
    camera.lookAt(offsetX, 4.8, 0);
  } else {
    // Stage 5 Camera: Majestic Orbit & Pullback reveal — WHOLE SILO FULLY VISIBLE WITH AMPLE MARGINS
    const t = (p - 0.90) / 0.1;
    const orbitAngle = Math.PI / 4 + 0.13 + t * 0.32; // smooth 18° inspection arc
    const orbitRadius = 22.5 + t * 1.8; // radius 22.5 to 24.3 gives ample clearance top and bottom
    camera.position.x = offsetX + Math.cos(orbitAngle) * orbitRadius;
    camera.position.y = 6.6 - t * 0.6;
    camera.position.z = Math.sin(orbitAngle) * orbitRadius;
    camera.lookAt(offsetX, 4.8, 0); // centered right at half the structure height
  }
}
