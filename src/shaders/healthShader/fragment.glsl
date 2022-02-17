uniform vec3 colour;
uniform float health;
varying vec2 vUV;
// out vec4 out_FragColor;
 
 void main()
        {
            gl_FragColor = vec4(mix(colour, vec3(0.0), step(health, vUV.x)), 1.0);
        }
        