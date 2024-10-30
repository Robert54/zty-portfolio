const fragmentShader = `
  uniform vec3 uColor;
  uniform float uOpacity;

  void main() {
    float distanceToCenter = length(gl_PointCoord - 0.5);
    float strength = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
    
    // Slightly enhance the particle core
    strength = pow(strength, 1.5);
    
    vec3 color = uColor * strength;
    
    // Use the new uOpacity uniform, but ensure it doesn't make particles disappear
    float alpha = strength * max(uOpacity, 0.5);

    gl_FragColor = vec4(color, alpha);
  }
`;

export default fragmentShader;