import simulationVertexShader from './simulationVertexShader';
import simulationFragmentShader from './simulationFragmentShader';
import * as THREE from "three";

const getRandomData = (width, height) => {
  // We need to create a vec4 since we're passing the positions to the fragment shader
  // Data textures need to have 4 components: R, G, B, and A
  const count = width * height;
  const data = new Float32Array(count * 4);
    
  for (let i = 0; i < count; i++) {
    const stride = i * 4;

    const distance = Math.sqrt(Math.random()) * 2.0;
    const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
    const phi = THREE.MathUtils.randFloat(0, Math.PI * 2);

    data[stride] = distance * Math.sin(theta) * Math.cos(phi);
    data[stride + 1] = distance * Math.sin(theta) * Math.sin(phi);
    data[stride + 2] = distance * Math.cos(theta);
    data[stride + 3] = 1.0; // This value will not have any impact
  }
  
  return data;
};

class SimulationMaterial extends THREE.ShaderMaterial {
  constructor(size) {
    const positionsTexture = new THREE.DataTexture(
      getRandomData(size, size),
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    positionsTexture.needsUpdate = true;

    const simulationUniforms = {
      positions: { value: positionsTexture },
      uFrequency: { value: 0.25 },
      uTime: { value: 0 },
    };

    super({
      uniforms: simulationUniforms,
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });
  }
}

export default SimulationMaterial;
