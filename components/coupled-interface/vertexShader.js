const vertexShader = `
  uniform sampler2D uPositions;
  uniform float uTime;
  uniform float uSize;

  void main() {
    vec3 pos = texture2D(uPositions, position.xy).xyz;

    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    // Use the new uSize uniform, but keep the original logic
    float size = uSize;
    
    // Keep the original size variation
    size += sin(uTime * 0.5 + pos.x * 10.0) * 1.5;
    size += cos(uTime * 0.5 + pos.y * 10.0) * 1.5;
    
    // Size attenuation
    size *= (1.0 / -viewPosition.z);

    gl_PointSize = size;
  }

`;

export default vertexShader;