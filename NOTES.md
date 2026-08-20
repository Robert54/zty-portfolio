# Notes

## Hero particles + Bloom (`components/coupled-interface`)

The homepage background is two additive FBO point clouds plus a Bloom pass:

```jsx
<Canvas style={{ background: "transparent" }}>
  <FBOParticles color="#00CED1" ... />
  <FBOParticles color="#FF5F1G" ... />  {/* invalid hex → Three.js falls back to white */}
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
```

This JSX does **not** set `mipmapBlur`. Which blur path runs is therefore decided by the `postprocessing` default.

### What broke (Feb 2026)

Commit `d16d150` (`chore: update dependencies for security fixes`) bumped the lockfile. Particle source was unchanged; the look still went from airy cyan/white clouds to a dark organic blob with a red hotspot.

| Package | Working (Nov 26 2024 deploy `zty-portfolio-mgacfyaat`, commit `cacb552`) | Broken |
|---|---|---|
| `postprocessing` | **6.36.3** | **6.38.2** |
| `@react-three/postprocessing` | 2.16.3 | 2.19.1 |

`BloomEffect` defaults in `postprocessing`:

| Default | 6.36.3 (good) | 6.38.2 (bad) |
|---|---|---|
| `mipmapBlur` | `false` → Kawase blur | `true` → UE4-style mipmap blur |
| `radius` | documented as **mipmap-only**, so `radius={2}` was ignored | applied; `2` is huge vs the 0.85 default |
| `luminanceThreshold` | 0.9 | 1.0 (our JSX already forces `0`, so the whole frame blooms) |

With `luminanceThreshold={0}` + mipmap blur + `radius={2}`, 10k additive particles smear into a solid volume.

6.38 also changed how bloom writes alpha on a **transparent** canvas:

- `bloom.frag`: `vec4(rgb * intensity, a)` → `texture * intensity` (alpha scaled by 1.2)
- SCREEN blend: full-vec4 screen → RGB screen + `max(dst.a, src.a)`

Bloomed pixels become opaque. The browser then composites the dark particle RGB over the page instead of additive glow, which reads as a black blob with a blown-out (red-looking) peak.

Reference: https://github.com/pmndrs/postprocessing/compare/v6.36.3...v6.38.2  
In particular: mipmap-blur default, `bloom.frag`, blend shaders (`screen.frag` / `add.frag`).

### What we did

`7bf3d88` restored the Nov 2024 particle files **and** pinned `package-lock.json` to the pre-`d16d150` 3D stack (`postprocessing@6.36.3`, drei 9.115, fiber 8.17, Next 14.2.3). Do not run a casual `npm update` on the r3f/postprocessing tree without checking the hero.

### If Bloom is upgraded later

Keep Kawase (old look) by passing `mipmapBlur={false}` explicitly, or retune `radius` / `luminanceThreshold` for the mipmap path. Do not assume `radius={2}` and `height={300}` still mean the same thing.

`#FF5F1G` is not valid hex (likely a typo for `#FF5F1F`). Three.js warns and uses white, which is the intended second cloud.
