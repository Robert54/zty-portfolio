import { useFBO } from "@react-three/drei";
import { useFrame, extend, createPortal } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import SimulationMaterial from "./SimulationMaterial";

import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";

extend({ SimulationMaterial });

const FBOParticles = ({
  color,
  position = [0, 0, 0],
  timeOffset = 0,
  seed = 0,
  count = 100000,
  scale = 1,
  opacity = 1,
  visible = true
}) => {
  const size = Math.ceil(Math.sqrt(count));

  const points = useRef(null);
  const simulationMaterialRef = useRef(null);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 1;

  const positions = new Float32Array([
    -1, -1, 0, 1, -1, 0, 1, 1, 0,
    -1, -1, 0, 1, 1, 0, -1, 1, 0
  ]);

  const uvs = new Float32Array([
    0, 0, 1, 0, 1, 1,
    0, 0, 1, 1, 0, 1
  ]);

  const renderTarget = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    type: THREE.FloatType,
  });

  const particlesPosition = useMemo(() => {
    const length = size * size;
    const particles = new Float32Array(length * 3);
    for (let i = 0; i < length; i++) {
      let i3 = i * 3;
      particles[i3 + 0] = (i % size) / size;
      particles[i3 + 1] = i / size / size;
      particles[i3 + 2] = 0;
    }
    return particles;
  }, [size]);

  const uniforms = useMemo(() => ({
    uPositions: { value: null },
    uColor: { value: new THREE.Color(color) },
    uTime: { value: 0 },
    uSeed: { value: seed },
    uFrequency: { value: 0.3 },
    uAmplitude: { value: 0.3 * scale },
    uMaxDistance: { value: 0.4 * scale },
    uSize: { value: 20 * scale },
    uScale: { value: scale },
    uOpacity: { value: opacity },
  }), [color, seed, scale, opacity]);

  useFrame((state) => {
    const { gl, clock } = state;
    const elapsedTime = clock.elapsedTime + timeOffset;

    if (simulationMaterialRef.current) {
      simulationMaterialRef.current.uniforms.uTime.value = elapsedTime;
    }

    gl.setRenderTarget(renderTarget);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    if (points.current && points.current.material instanceof THREE.ShaderMaterial) {
      points.current.material.uniforms.uPositions.value = renderTarget.texture;
      points.current.material.uniforms.uTime.value = elapsedTime;
    }
  });

  return (
    <group position={position} scale={scale} visible={visible}>
      {createPortal(
        <mesh>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-uv"
              count={uvs.length / 2}
              array={uvs}
              itemSize={2}
            />
          </bufferGeometry>
          <simulationMaterial ref={simulationMaterialRef} args={[size]} />
        </mesh>,
        scene
      )}
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
          transparent={true}
        />
      </points>
    </group>
  );
};

export default FBOParticles;