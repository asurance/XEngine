attribute vec2 position;
attribute vec2 uv;

uniform mat3 matrix;

varying vec2 texcoord;

void main(){
  texcoord=uv;
  gl_Position=vec4(matrix*vec3(position,1.),1.);
}