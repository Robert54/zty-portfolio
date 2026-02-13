"use client";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import FBOParticles from "./FBOParticles";

const Scene = () => (
  <Canvas
    camera={{ position: [1.5, 1.5, 2.5] }}
    style={{ background: "transparent" }}
    // style={{ background: "black" }}
  >
    <ambientLight intensity={0.8} />
    <FBOParticles
      color="#00CED1"
      position={[-1.5, 0, 0]}
      timeOffset={0}
      count={10000}
      scale={1.3}
      opacity={0.85}
    />
    {/* <FBOParticles 
      color="#FF5F1F"
      position={[-1.5, 0, 0]} 
      timeOffset={0} 
      count={10000} 
      scale={1.3} 
      opacity={0.01}
    />
    <FBOParticles 
      color="#00CED1"
      position={[0, -1.5, 0]} 
      timeOffset={10} 
      count={10000} 
      scale={0.8} 
      opacity={0.95}
    /> */}
    <FBOParticles
      color="#00CED1"
      position={[0, -1.5, 0]}
      timeOffset={10}
      count={10000}
      scale={0.8}
      opacity={0.85}
    />
    {/* <FBOParticles 
      color="#00FF94" // "#4682B4" 
      position={[1.2, 0, 0]} 
      timeOffset={5} 
      count={10000} 
      scale={2} 
      opacity={0.45}
    /> */}
    {/* <FBOParticles 
      color="#00CED1" // Deep Teal
      position={[-1.8, 0, 0]} 
      timeOffset={0} 
      count={10000} 
      scale={1.3} 
      opacity={0.85}
    />
    <FBOParticles 
      color="#FF5252" // Warm Coral
      position={[1.2, 0, 0]} 
      timeOffset={5} 
      count={10000} 
      scale={1} 
      opacity={0.85}
    /> */}
    <EffectComposer>
      <Bloom 
        luminanceThreshold={0}
        luminanceSmoothing={0.9}
        height={300}
        intensity={1.2}
        radius={2}
      />
    </EffectComposer>
  </Canvas>
);

const App = () => (
  <div style={{ width: "100%", height: "100%", position: "relative" }}>
    <Scene />
  </div>
);

export default App;
