import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Clock,
  Color,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";

/*
  Prolonge en 3D les étoiles de la vidéo : une coquille de points qui dérive
  lentement, plus un halo doré derrière le titre. Rendu en additif par-dessus
  la vidéo, donc seules les zones claires ressortent.
*/

const NB_ETOILES = 1400;
const RAYON_INT = 12;
const RAYON_EXT = 46;

const VERT_ETOILES = /* glsl */ `
  attribute float aTaille;
  attribute float aPhase;
  varying float vPhase;
  uniform float uTemps;
  uniform float uRatio;

  void main() {
    vPhase = aPhase;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float scintille = 0.72 + 0.28 * sin(uTemps * 1.4 + aPhase * 6.28318);
    gl_PointSize = aTaille * uRatio * scintille * (300.0 / max(-mv.z, 0.001));
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG_ETOILES = /* glsl */ `
  precision mediump float;
  varying float vPhase;
  uniform vec3 uBlanc;
  uniform vec3 uOr;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = pow(smoothstep(0.5, 0.0, d), 2.2);
    gl_FragColor = vec4(mix(uBlanc, uOr, vPhase * 0.7), a);
  }
`;

const VERT_HALO = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG_HALO = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform vec3 uCouleur;
  uniform float uTemps;
  uniform float uIntensite;

  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float souffle = 0.88 + 0.12 * sin(uTemps * 0.5);
    float a = pow(smoothstep(1.0, 0.0, d), 3.0) * uIntensite * souffle;
    gl_FragColor = vec4(uCouleur, a);
  }
`;

const HeroHalo = ({ className = "" }: { className?: string }) => {
  const hoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hote = hoteRef.current;
    if (!hote) return;

    // Pas de WebGL (vieux mobile, GPU bloqué) : on ne fait rien, la vidéo suffit.
    const canvasTest = document.createElement("canvas");
    const supporte = !!(
      canvasTest.getContext("webgl2") || canvasTest.getContext("webgl")
    );
    if (!supporte) return;

    const sansMouvement = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new Scene();
    const camera = new PerspectiveCamera(58, 1, 0.1, 200);
    camera.position.z = 30;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }
    renderer.setClearColor(0x000000, 0);
    hote.appendChild(renderer.domElement);
    Object.assign(renderer.domElement.style, {
      width: "100%",
      height: "100%",
      display: "block",
    });

    // --- étoiles ---
    const positions = new Float32Array(NB_ETOILES * 3);
    const tailles = new Float32Array(NB_ETOILES);
    const phases = new Float32Array(NB_ETOILES);

    for (let i = 0; i < NB_ETOILES; i += 1) {
      // Distribution uniforme sur une coquille sphérique.
      const u = Math.random() * 2 - 1;
      const theta = Math.random() * Math.PI * 2;
      const r = RAYON_INT + Math.cbrt(Math.random()) * (RAYON_EXT - RAYON_INT);
      const p = Math.sqrt(1 - u * u);
      positions[i * 3] = r * p * Math.cos(theta);
      positions[i * 3 + 1] = r * p * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * u;
      tailles[i] = 0.9 + Math.random() * 2.6;
      phases[i] = Math.random();
    }

    const geoEtoiles = new BufferGeometry();
    geoEtoiles.setAttribute("position", new BufferAttribute(positions, 3));
    geoEtoiles.setAttribute("aTaille", new BufferAttribute(tailles, 1));
    geoEtoiles.setAttribute("aPhase", new BufferAttribute(phases, 1));

    const matEtoiles = new ShaderMaterial({
      vertexShader: VERT_ETOILES,
      fragmentShader: FRAG_ETOILES,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {
        uTemps: { value: 0 },
        uRatio: { value: 1 },
        uBlanc: { value: new Color(0.93, 0.96, 1.0) },
        uOr: { value: new Color(1.0, 0.78, 0.36) },
      },
    });

    const etoiles = new Points(geoEtoiles, matEtoiles);
    scene.add(etoiles);

    // --- halo ---
    const geoHalo = new PlaneGeometry(58, 58);
    const matHalo = new ShaderMaterial({
      vertexShader: VERT_HALO,
      fragmentShader: FRAG_HALO,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {
        uTemps: { value: 0 },
        uCouleur: { value: new Color(1.0, 0.72, 0.3) },
        uIntensite: { value: 0.5 },
      },
    });
    const halo = new Mesh(geoHalo, matHalo);
    halo.position.z = -14;
    scene.add(halo);

    // --- dimensions ---
    const redimensionner = () => {
      const { clientWidth: w, clientHeight: h } = hote;
      if (!w || !h) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(ratio);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      matEtoiles.uniforms.uRatio.value = ratio;
    };
    redimensionner();
    const ro = new ResizeObserver(redimensionner);
    ro.observe(hote);

    // --- parallaxe pointeur ---
    const pointeur = { x: 0, y: 0 };
    const cible = { x: 0, y: 0 };
    const onPointeur = (e: PointerEvent) => {
      cible.x = (e.clientX / window.innerWidth - 0.5) * 2;
      cible.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!sansMouvement) window.addEventListener("pointermove", onPointeur, { passive: true });

    // --- boucle, suspendue hors écran ou onglet caché ---
    const horloge = new Clock();
    let brut = 0;
    let visible = true;

    const io = new IntersectionObserver(
      ([entree]) => {
        visible = entree.isIntersecting;
      },
      { threshold: 0.01 },
    );
    io.observe(hote);

    const rendre = () => {
      const t = horloge.getElapsedTime();
      matEtoiles.uniforms.uTemps.value = t;
      matHalo.uniforms.uTemps.value = t;
      if (!sansMouvement) {
        etoiles.rotation.y = t * 0.016;
        etoiles.rotation.x = Math.sin(t * 0.05) * 0.05;
        pointeur.x += (cible.x - pointeur.x) * 0.045;
        pointeur.y += (cible.y - pointeur.y) * 0.045;
        camera.position.x = pointeur.x * 2.2;
        camera.position.y = -pointeur.y * 1.4;
        camera.lookAt(0, 0, 0);
      }
      renderer.render(scene, camera);
    };

    const boucle = () => {
      brut = requestAnimationFrame(boucle);
      if (!visible || document.hidden) return;
      rendre();
    };

    if (sansMouvement) {
      rendre(); // une image fixe, pas de boucle
    } else {
      boucle();
    }

    return () => {
      cancelAnimationFrame(brut);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointeur);
      geoEtoiles.dispose();
      matEtoiles.dispose();
      geoHalo.dispose();
      matHalo.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === hote) {
        hote.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={hoteRef} aria-hidden="true" className={className} />;
};

export default HeroHalo;
