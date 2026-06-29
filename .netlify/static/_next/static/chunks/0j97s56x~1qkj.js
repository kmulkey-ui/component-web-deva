(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,68199,e=>{"use strict";var t=e.i(23817),r=e.i(63351),i=e.i(79243),s=e.i(10220),o=e.i(23138);let a={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var n=s;class l{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}let u=new n.OrthographicCamera(-1,1,1,-1,0,1);class h extends n.BufferGeometry{constructor(){super(),this.setAttribute("position",new n.Float32BufferAttribute([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new n.Float32BufferAttribute([0,2,0,0,2,0],2))}}let c=new h;class d{constructor(e){this._mesh=new n.Mesh(c,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,u)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class f extends l{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof s.ShaderMaterial?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=s.UniformsUtils.clone(e.uniforms),this.material=new s.ShaderMaterial({name:void 0!==e.name?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new d(this.material)}render(e,t,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this._fsQuad.material=this.material,this.renderToScreen?e.setRenderTarget(null):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil)),this._fsQuad.render(e)}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class m extends l{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,r){let i,s,o=e.getContext(),a=e.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0),this.inverse?(i=0,s=1):(i=1,s=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(o.REPLACE,o.REPLACE,o.REPLACE),a.buffers.stencil.setFunc(o.ALWAYS,i,0xffffffff),a.buffers.stencil.setClear(s),a.buffers.stencil.setLocked(!0),e.setRenderTarget(r),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(o.EQUAL,1,0xffffffff),a.buffers.stencil.setOp(o.KEEP,o.KEEP,o.KEEP),a.buffers.stencil.setLocked(!0)}}class v extends l{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class p{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),void 0===t){const r=e.getSize(new s.Vector2);this._width=r.width,this._height=r.height,(t=new s.WebGLRenderTarget(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:s.HalfFloatType})).texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new f(a),this.copyPass.material.blending=s.NoBlending,this.timer=new s.Timer}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);-1!==t&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),void 0===e&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),r=!1;for(let t=0,i=this.passes.length;t<i;t++){let i=this.passes[t];if(!1!==i.enabled){if(i.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),i.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),i.needsSwap){if(r){let t=this.renderer.getContext(),r=this.renderer.state.buffers.stencil;r.setFunc(t.NOTEQUAL,1,0xffffffff),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),r.setFunc(t.EQUAL,1,0xffffffff)}this.swapBuffers()}void 0!==m&&(i instanceof m?r=!0:i instanceof v&&(r=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(void 0===e){let t=this.renderer.getSize(new s.Vector2);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,(e=this.renderTarget1.clone()).setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let r=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(r,i),this.renderTarget2.setSize(r,i);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(r,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class g extends l{constructor(e,t,r=null,i=null,o=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=r,this.clearColor=i,this.clearAlpha=o,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new s.Color}render(e,t,r){let i,s,o=e.autoClear;e.autoClear=!1,null!==this.overrideMaterial&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),null!==this.clearColor&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),null!==this.clearAlpha&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),!0==this.clearDepth&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:r),!0===this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),null!==this.clearColor&&e.setClearColor(this._oldClearColor),null!==this.clearAlpha&&e.setClearAlpha(i),null!==this.overrideMaterial&&(this.scene.overrideMaterial=s),e.autoClear=o}}let x={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new s.Color(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class b extends l{constructor(e,t=1,r,i){super(),this.strength=t,this.radius=r,this.threshold=i,this.resolution=void 0!==e?new s.Vector2(e.x,e.y):new s.Vector2(256,256),this.clearColor=new s.Color(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let o=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);this.renderTargetBright=new s.WebGLRenderTarget(o,n,{type:s.HalfFloatType}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){const t=new s.WebGLRenderTarget(o,n,{type:s.HalfFloatType});t.texture.name="UnrealBloomPass.h"+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);const r=new s.WebGLRenderTarget(o,n,{type:s.HalfFloatType});r.texture.name="UnrealBloomPass.v"+e,r.texture.generateMipmaps=!1,this.renderTargetsVertical.push(r),o=Math.round(o/2),n=Math.round(n/2)}this.highPassUniforms=s.UniformsUtils.clone(x.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new s.ShaderMaterial({uniforms:this.highPassUniforms,vertexShader:x.vertexShader,fragmentShader:x.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];o=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new s.Vector2(1/o,1/n),o=Math.round(o/2),n=Math.round(n/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1,this.compositeMaterial.uniforms.bloomFactors.value=[1,.8,.6,.4,.2],this.bloomTintColors=[new s.Vector3(1,1,1),new s.Vector3(1,1,1),new s.Vector3(1,1,1),new s.Vector3(1,1,1),new s.Vector3(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=s.UniformsUtils.clone(a.uniforms),this.blendMaterial=new s.ShaderMaterial({uniforms:this.copyUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,premultipliedAlpha:!0,blending:s.AdditiveBlending,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new s.Color,this._oldClearAlpha=1,this._basic=new s.MeshBasicMaterial,this._fsQuad=new d(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let r=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(r,i);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(r,i),this.renderTargetsVertical[e].setSize(r,i),this.separableBlurMaterials[e].uniforms.invSize.value=new s.Vector2(1/r,1/i),r=Math.round(r/2),i=Math.round(i/2)}render(e,t,r,i,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let t=0;t<this.nMips;t++)this._fsQuad.material=this.separableBlurMaterials[t],this.separableBlurMaterials[t].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[t].uniforms.direction.value=b.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[t]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[t].uniforms.colorTexture.value=this.renderTargetsHorizontal[t].texture,this.separableBlurMaterials[t].uniforms.direction.value=b.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[t]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[t];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?e.setRenderTarget(null):e.setRenderTarget(r),this._fsQuad.render(e),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){let t=[],r=e/3;for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(r*r))/r);return new s.ShaderMaterial({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new s.Vector2(.5,.5)},direction:{value:new s.Vector2(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new s.ShaderMaterial({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}b.BlurDirectionX=new s.Vector2(1,0),b.BlurDirectionY=new s.Vector2(0,1);let w={name:"FilmShader",uniforms:{tDiffuse:{value:null},time:{value:0},intensity:{value:.5},grayscale:{value:!1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		uniform float intensity;
		uniform bool grayscale;
		uniform float time;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 base = texture2D( tDiffuse, vUv );

			float noise = rand( fract( vUv + time ) );

			vec3 color = base.rgb + base.rgb * clamp( 0.1 + noise, 0.0, 1.0 );

			color = mix( base.rgb, color, intensity );

			if ( grayscale ) {

				color = vec3( luminance( color ) ); // assuming linear-srgb

			}

			gl_FragColor = vec4( color, base.a );

		}`};class T extends l{constructor(e=.5,t=!1){super(),this.uniforms=s.UniformsUtils.clone(w.uniforms),this.material=new s.ShaderMaterial({name:w.name,uniforms:this.uniforms,vertexShader:w.vertexShader,fragmentShader:w.fragmentShader}),this.uniforms.intensity.value=e,this.uniforms.grayscale.value=t,this._fsQuad=new d(this.material)}render(e,t,r,i){this.uniforms.tDiffuse.value=r.texture,this.uniforms.time.value+=i,this.renderToScreen?e.setRenderTarget(null):(e.setRenderTarget(t),this.clear&&e.clear()),this._fsQuad.render(e)}dispose(){this.material.dispose(),this._fsQuad.dispose()}}let y={uniforms:{tDiffuse:{value:null},time:{value:0},intensity:{value:0},grainSize:{value:1.5}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float intensity;
    uniform float grainSize;
    varying vec2 vUv;
    
    float random(vec2 p) {
      return fract(sin(dot(p.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      
      // Film grain
      vec2 grainUV = vUv * grainSize;
      float grain = random(grainUV + time * 0.1);
      grain = (grain - 0.5) * intensity;
      
      // Add grain to color
      color.rgb += grain;
      
      // Subtle vignette
      float vignette = 1.0 - length(vUv - 0.5) * 0.3 * intensity;
      color.rgb *= vignette;
      
      gl_FragColor = color;
    }
  `},C={uniforms:{tDiffuse:{value:null},time:{value:0},distortion:{value:0},mouseX:{value:.5},mouseY:{value:.5},gradientShift:{value:0},bloomThreshold:{value:.8}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform float distortion;
    uniform float mouseX;
    uniform float mouseY;
    uniform float gradientShift;
    uniform float bloomThreshold;
    varying vec2 vUv;
    
    vec3 hsv2rgb(vec3 c) {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }
    
    void main() {
      vec2 uv = vUv;
      vec2 mouse = vec2(mouseX, mouseY);
      float dist = distance(uv, mouse);
      
      // Wave distortion
      float wave = sin(dist * 10.0 - time * 2.0) * distortion;
      uv += normalize(uv - mouse) * wave * 0.02;
      
      // Get base color
      vec4 color = texture2D(tDiffuse, uv);
      
      // Animated gradient overlay
      float gradientAngle = time * 0.5 + gradientShift;
      float gradientPos = uv.x * cos(gradientAngle) + uv.y * sin(gradientAngle);
      vec3 gradientColor = hsv2rgb(vec3(gradientPos + time * 0.1, 0.7, 1.0));
      
      // Mix gradient with original color
      color.rgb = mix(color.rgb, gradientColor, 0.3 * distortion);
      
      // Enhance bright areas for bloom
      float brightness = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      if (brightness > bloomThreshold * (1.0 - distortion * 0.3)) {
        color.rgb *= 1.0 + distortion * 0.5;
      }
      
      // Chromatic aberration with gradient influence
      float r = texture2D(tDiffuse, uv + vec2(0.002, 0.0) * distortion).r;
      float g = texture2D(tDiffuse, uv).g;
      float b = texture2D(tDiffuse, uv - vec2(0.002, 0.0) * distortion).b;
      
      vec3 finalColor = vec3(r, g, b);
      finalColor = mix(finalColor, gradientColor, 0.2 * distortion);
      
      gl_FragColor = vec4(finalColor, color.a);
    }
  `};e.s(["AdvancedButton",0,({children:e,onClick:a,variant:n="primary",size:l="medium",disabled:u=!1,gradientType:h="animated",className:c=""})=>{let d=(0,r.useRef)(null),m=(0,r.useRef)(null),v=(0,r.useRef)(null),x=(0,r.useRef)(null),w=(0,r.useRef)(null),S=(0,r.useRef)(null),M=(0,r.useRef)(null),_=(0,r.useRef)(null),[R,U]=(0,r.useState)(!1),[D,B]=(0,r.useState)({x:.5,y:.5}),P=(0,r.useRef)(null),z=(0,r.useRef)(null),A=(0,r.useRef)(null),F=(0,r.useRef)(null),V=(0,r.useRef)(null),E=(0,r.useRef)(null),L=(0,r.useRef)(null),j=(0,r.useRef)(null),Q=(0,r.useRef)(null);return(0,r.useEffect)(()=>{if(!m.current)return;let e=new s.Scene;P.current=e;let t=new s.OrthographicCamera(-1,1,1,-1,0,1),r=new o.WebGLRenderer({canvas:m.current,alpha:!0,antialias:!0,powerPreference:"high-performance"});r.setPixelRatio(window.devicePixelRatio),r.toneMapping=s.ACESFilmicToneMapping,r.toneMappingExposure=1.2,z.current=r;let a=new p(r);A.current=a;let n=new g(e,t);a.addPass(n);let l=new b(new s.Vector2(window.innerWidth,window.innerHeight),0,.6,.7);V.current=l,a.addPass(l);let u=new f(C);F.current=u,a.addPass(u);let h=new f(y);E.current=h,a.addPass(h);let c=new T(0,0,648,!1);L.current=c,a.addPass(c);let v=new s.PlaneGeometry(2,2,32,32),x=new s.ShaderMaterial({uniforms:{color1:{value:new s.Color(6514417)},color2:{value:new s.Color(9133302)},color3:{value:new s.Color(0xec4899)},time:{value:0},mouseX:{value:.5},mouseY:{value:.5},hover:{value:0},bloomStrength:{value:0}},vertexShader:`
        varying vec2 vUv;
        uniform float time;
        uniform float hover;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          // Subtle vertex displacement on hover
          float displacement = sin(pos.x * 10.0 + time) * sin(pos.y * 10.0 + time) * 0.02 * hover;
          pos.z += displacement;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,fragmentShader:`
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform float time;
        uniform float mouseX;
        uniform float mouseY;
        uniform float hover;
        uniform float bloomStrength;
        varying vec2 vUv;
        
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
        
        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m;
          m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }
        
        void main() {
          vec2 uv = vUv;
          vec2 mouse = vec2(mouseX, mouseY);
          
          // Dynamic gradient based on mouse position
          float mouseDist = distance(uv, mouse);
          float mouseInfluence = 1.0 - smoothstep(0.0, 0.5, mouseDist);
          
          // Animated noise-based gradient
          float noise = snoise(uv * 3.0 + time * 0.2) * 0.5 + 0.5;
          float gradientNoise = snoise(uv * 2.0 - time * 0.1) * 0.5 + 0.5;
          
          // Three-color gradient with animation
          vec3 gradient = mix(color1, color2, uv.x + sin(time * 0.5) * 0.2);
          gradient = mix(gradient, color3, uv.y + cos(time * 0.3) * 0.2);
          
          // Add noise variation
          gradient = mix(gradient, color3, noise * 0.3);
          
          // Mouse-reactive gradient shift
          vec3 mouseGradient = mix(color2, color3, mouseInfluence);
          gradient = mix(gradient, mouseGradient, hover * 0.5);
          
          // Radial gradient overlay
          float radial = 1.0 - length(uv - 0.5) * 2.0;
          radial = smoothstep(0.0, 1.0, radial);
          gradient *= 0.8 + radial * 0.2;
          
          // Animated shimmer effect
          float shimmer = sin(uv.x * 20.0 - time * 3.0) * sin(uv.y * 20.0 + time * 2.0);
          shimmer = shimmer * 0.05 * hover;
          gradient += shimmer;
          
          // Bloom enhancement on hover
          float bloomBoost = 1.0 + bloomStrength * mouseInfluence * 2.0;
          gradient *= bloomBoost;
          
          // Add hot spots for bloom
          float hotSpot = smoothstep(0.3, 0.0, mouseDist) * hover;
          gradient += vec3(hotSpot * 0.5);
          
          gl_FragColor = vec4(gradient, 1.0);
        }
      `,transparent:!0}),w=new s.Mesh(v,x);j.current=w,e.add(w);let S=()=>{Q.current=requestAnimationFrame(S);let e=.001*performance.now();j.current&&j.current.material&&(j.current.material.uniforms.time.value=e,j.current.material.uniforms.hover.value=i.gsap.utils.interpolate(j.current.material.uniforms.hover.value,+!!R,.1),j.current.material.uniforms.bloomStrength.value=i.gsap.utils.interpolate(j.current.material.uniforms.bloomStrength.value,+!!R,.1)),V.current&&(V.current.strength=i.gsap.utils.interpolate(V.current.strength,1.5*!!R,.1)),E.current&&E.current.uniforms&&(E.current.uniforms.time.value=e,E.current.uniforms.intensity.value=i.gsap.utils.interpolate(E.current.uniforms.intensity.value,.3*!!R,.1)),L.current&&L.current.uniforms&&L.current.uniforms.nIntensity&&(L.current.uniforms.nIntensity.value=i.gsap.utils.interpolate(L.current.uniforms.nIntensity.value,.2*!!R,.1)),F.current&&F.current.uniforms&&(F.current.uniforms.time.value=e,F.current.uniforms.distortion.value=i.gsap.utils.interpolate(F.current.uniforms.distortion.value,+!!R,.1),F.current.uniforms.gradientShift.value=D.x*Math.PI*2),A.current&&A.current.render()},M=()=>{let e=d.current?.getBoundingClientRect();e&&(r.setSize(e.width,e.height),a.setSize(e.width,e.height))};return M(),S(),window.addEventListener("resize",M),()=>{window.removeEventListener("resize",M),Q.current&&cancelAnimationFrame(Q.current),r.dispose(),x.dispose(),v.dispose()}},[]),(0,r.useEffect)(()=>{},[R,D]),(0,r.useEffect)(()=>{let e=i.gsap.timeline({paused:!0});return e.to(d.current,{scale:1.05,duration:.3,ease:"power2.out"}).to(v.current,{letterSpacing:"0.05em",duration:.3,ease:"power2.out"},0).to(w.current,{opacity:1,scale:1.2,duration:.3,ease:"power2.out"},0).to(S.current,{opacity:1,duration:.3,ease:"power2.out"},0),M.current&&e.to(M.current,{strokeDashoffset:0,duration:.6,ease:"power2.out"},0),_.current&&e.to(_.current,{opacity:1,duration:.3,ease:"power2.out"},0),d.current&&(d.current._timeline=e),S.current&&i.gsap.to(S.current,{"--gradient-angle":"360deg",duration:10,repeat:-1,ease:"none"}),()=>{e.kill()}},[]),(0,t.jsxs)("button",{ref:d,className:`advanced-button ${{small:"btn-small",medium:"btn-medium",large:"btn-large"}[l]} ${{primary:"btn-primary",secondary:"btn-secondary",ghost:"btn-ghost",gradient:"btn-gradient"}[n]} ${{animated:"gradient-animated",static:"gradient-static",radial:"gradient-radial",conic:"gradient-conic"}[h]} ${u?"disabled":""} ${c}`,onMouseEnter:e=>{!u&&(U(!0),d.current&&d.current._timeline&&d.current._timeline.play(),x.current&&i.gsap.to(x.current,{scale:1,opacity:.3,duration:.4,ease:"power2.out"}),w.current&&i.gsap.to(w.current,{filter:"blur(40px)",duration:.4,ease:"power2.out"}))},onMouseLeave:()=>{!u&&(U(!1),d.current&&d.current._timeline&&d.current._timeline.reverse(),x.current&&i.gsap.to(x.current,{scale:0,opacity:0,duration:.3,ease:"power2.in"}),w.current&&i.gsap.to(w.current,{filter:"blur(20px)",duration:.3,ease:"power2.in"}))},onMouseMove:e=>{if(u||!d.current)return;let t=d.current.getBoundingClientRect(),r=(e.clientX-t.left)/t.width,s=(e.clientY-t.top)/t.height;B({x:r,y:s}),F.current&&F.current.uniforms&&(F.current.uniforms.mouseX.value=r,F.current.uniforms.mouseY.value=s),j.current&&j.current.material&&j.current.material.uniforms&&(j.current.material.uniforms.mouseX.value=r,j.current.material.uniforms.mouseY.value=s),x.current&&i.gsap.to(x.current,{x:(r-.5)*t.width,y:(s-.5)*t.height,duration:.1}),d.current.style.setProperty("--mouse-x",`${100*r}%`),d.current.style.setProperty("--mouse-y",`${100*s}%`)},onClick:e=>{if(u||!d.current)return;let t=d.current.getBoundingClientRect(),r=e.clientX-t.left,s=e.clientY-t.top,o=document.createElement("div");o.className="click-ripple gradient-ripple bloom-ripple",o.style.left=`${r}px`,o.style.top=`${s}px`,d.current.appendChild(o),i.gsap.fromTo(o,{scale:0,opacity:1},{scale:3,opacity:0,duration:.8,ease:"power2.out",onComplete:()=>o.remove()}),i.gsap.to(d.current,{scale:.95,duration:.1,yoyo:!0,repeat:1,ease:"power2.inOut"}),S.current&&i.gsap.to(S.current,{opacity:1,duration:.2,yoyo:!0,repeat:1}),V.current&&i.gsap.to(V.current,{strength:2.5,duration:.2,yoyo:!0,repeat:1,ease:"power2.inOut"}),a?.(e)},disabled:u,style:{"--mouse-x":"50%","--mouse-y":"50%"},children:[(0,t.jsx)("canvas",{ref:m,className:"button-canvas"}),(0,t.jsx)("div",{ref:_,className:"film-grain-overlay"}),(0,t.jsx)("div",{ref:S,className:"button-gradient"}),(0,t.jsxs)("svg",{className:"button-border",viewBox:"0 0 100 100",preserveAspectRatio:"none",children:[(0,t.jsx)("defs",{children:(0,t.jsxs)("linearGradient",{id:`border-gradient-${n}`,x1:"0%",y1:"0%",x2:"100%",y2:"100%",children:[(0,t.jsx)("stop",{offset:"0%",stopColor:"#6366f1",children:(0,t.jsx)("animate",{attributeName:"stop-color",values:"#6366f1;#8b5cf6;#ec4899;#6366f1",dur:"4s",repeatCount:"indefinite"})}),(0,t.jsx)("stop",{offset:"50%",stopColor:"#8b5cf6",children:(0,t.jsx)("animate",{attributeName:"stop-color",values:"#8b5cf6;#ec4899;#6366f1;#8b5cf6",dur:"4s",repeatCount:"indefinite"})}),(0,t.jsx)("stop",{offset:"100%",stopColor:"#ec4899",children:(0,t.jsx)("animate",{attributeName:"stop-color",values:"#ec4899;#6366f1;#8b5cf6;#ec4899",dur:"4s",repeatCount:"indefinite"})})]})}),(0,t.jsx)("rect",{ref:M,x:"1",y:"1",width:"98",height:"98",fill:"none",stroke:`url(#border-gradient-${n})`,strokeWidth:"2",strokeDasharray:"400",strokeDashoffset:"400",rx:"8"})]}),(0,t.jsx)("div",{ref:w,className:"button-glow"}),(0,t.jsx)("div",{ref:x,className:"button-ripple"}),(0,t.jsx)("span",{ref:v,className:"button-text",children:e})]})}],68199)},70744,e=>{e.n(e.i(68199))}]);