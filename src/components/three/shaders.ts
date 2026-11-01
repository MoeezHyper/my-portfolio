// Ashima Arts 3D simplex noise (MIT)
export const simplexNoise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

export const blobVertex = /* glsl */ `
uniform float uTime;
uniform float uDensity;
uniform float uStrength;
uniform float uHover;

varying vec3 vNormal;
varying vec3 vViewDir;
varying float vDistort;

${simplexNoise}

float distortAt(vec3 p){
  float t = uTime * 0.32;
  float s = uStrength + uHover * 0.14;
  float n = snoise(p * uDensity + vec3(t, t * 0.7, -t * 0.4));
  n += 0.35 * snoise(p * uDensity * 2.3 - vec3(t * 0.8));
  return n * s;
}

vec3 displaced(vec3 p){
  vec3 n = normalize(p);
  return p + n * distortAt(n);
}

vec3 orthogonal(vec3 v){
  return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0) : vec3(0.0, -v.z, v.y));
}

void main(){
  vec3 p = displaced(position);
  // Recompute the normal from neighbouring displaced points
  float eps = 0.004;
  vec3 t = orthogonal(normal);
  vec3 b = normalize(cross(normal, t));
  vec3 p1 = displaced(position + t * eps);
  vec3 p2 = displaced(position + b * eps);
  vec3 dn = normalize(cross(p1 - p, p2 - p));

  vDistort = distortAt(normalize(position));
  vNormal = normalize(normalMatrix * dn);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vViewDir = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

export const blobFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

varying vec3 vNormal;
varying vec3 vViewDir;
varying float vDistort;

void main(){
  vec3 n = normalize(vNormal);
  vec3 v = normalize(vViewDir);
  float ndv = max(dot(n, v), 0.0);
  float fres = pow(1.0 - ndv, 2.6);

  // Iridescent band driven by distortion + orientation
  float band = smoothstep(0.25, 1.0, 0.5 + 0.5 * sin(vDistort * 7.0 + n.y * 2.4 + uTime * 0.35));
  vec3 base = mix(uColorA, uColorB, band);
  base = mix(base, uColorC, smoothstep(0.35, 1.0, n.x * 0.5 + 0.5) * 0.5);

  vec3 L1 = normalize(vec3(0.6, 0.8, 0.6));
  vec3 L2 = normalize(vec3(-0.7, -0.3, 0.4));
  float diff = max(dot(n, L1), 0.0);
  float back = max(dot(n, L2), 0.0);
  float spec = pow(max(dot(reflect(-L1, n), v), 0.0), 48.0);

  vec3 col = base * 0.08;
  col += base * diff * 0.45;
  col += uColorB * back * 0.18;
  col += vec3(1.0) * spec * 0.55;
  col += mix(uColorA, uColorB, n.y * 0.5 + 0.5) * fres * 1.6;

  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`;

export const particleVertex = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
attribute float aScale;
varying float vAlpha;
void main(){
  vec3 p = position;
  p.y += sin(uTime * 0.25 + aScale * 30.0) * 0.08;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mv.z);
  vAlpha = 0.25 + 0.75 * (0.5 + 0.5 * sin(uTime * 1.4 + aScale * 57.0));
}
`;

export const particleFragment = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(uColor, a * a * vAlpha);
  #include <colorspace_fragment>
}
`;
