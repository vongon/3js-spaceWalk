STATE = {
  forward: true,
  left: false,
  right: false,
  up: false,
  down: false
}
MAX_Z = 4.0
MIN_Z = -10.0

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
camera.position.z = 5;

TARGET = {x:0, y:0, z:0};
var cubes = []

function render() {
  requestAnimationFrame( render );
  renderer.render( scene, camera );
  for(idx in cubes){
    cube = cubes[idx]
    cube.rotation.x += 0.01;
    cube.rotation.z += 0.01;
  }
  camera.rotation.x = checkRotX(camera)
  camera.rotation.y = checkRotY(camera)
  camera.position.z = checkPosZ(camera)
  //cube.position.z = zoomZ(cube)
}

var createCubes = function(count){
  cubes = []
  for (var i = 0; i < count; i++){
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshPhongMaterial( {color: 0xFF00DC} );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.z = -i * 1.0
    cube.position.x = (Math.random() - 0.5) * 20
    cube.position.y = (Math.random() - 0.5) * 20
    scene.add( cube );
    cubes.push( cube );
  }
  return cubes
}

var createLights = function(){
  var directionalLight1 = new THREE.DirectionalLight( 0xffffff, 0.4 );
  directionalLight1.position.set( 0, 1, 0 );
  scene.add( directionalLight1 );

  var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
  directionalLight2.position.set( 0, -1, 1 );
  scene.add( directionalLight2 );
}

var zoomZ = function(cube){
  multiplier = .05
  if (cube.position.z >= MAX_Z){
    STATE.forward = false;
  } else if (cube.position.z <= MIN_Z){
    STATE.forward = true;
  }
  z = cube.position.z
  if (STATE.forward){
    return z + (Math.abs((MAX_Z+0.5) - z))*multiplier
  } else {
  return z - (Math.abs((MIN_Z-0.5) - z))*multiplier
  }
}

var checkPosX = function(c){
  x = c.position.x;
  if (STATE.left){
    return x - .05;
  } else if (STATE.right){
    return x + .05;
  } else {
    return x
  }
}

var checkPosY = function(c){
  y = c.position.y;
  if (STATE.up){
    return y + .05;
  } else if (STATE.down){
    return y - .05;
  } else {
    return y
  }
}

var checkRotX = function(c){
  x = c.rotation.x;
  if (STATE.down){
    return x - .02;
  } else if (STATE.up){
    return x + .02;
  } else {
    return x
  }
}

var checkRotY = function(c){
  y = c.rotation.y;
  if (STATE.left){
    return y + .02;
  } else if (STATE.right){
    return y - .02;
  } else {
    return y
  }
}

var checkPosZ = function(c){
  z = c.position.z
  if (STATE.forward){
    return z - .02;
  } else if (STATE.backward){
    return z + .02;
  } else {
    return z
  }
}


window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return;
  }
  switch (event.key) {
    case "ArrowDown":
      STATE.up = false;
      STATE.down = true;
      break;
    case "ArrowUp":
      STATE.up = true;
      STATE.down = false;
      break;
    case "ArrowLeft":
      STATE.left = true;
      STATE.right = false;
      break;
    case "ArrowRight":
      STATE.left = false;
      STATE.right = true;
      break;
    case "w":
      STATE.forward = true;
    case "s":
      STATE.backward = true;
    default:
      return;
  }
  event.preventDefault();
}, true);

window.addEventListener("keyup", function (event) {
  if (event.defaultPrevented) {
    return;
  }
  switch (event.key) {
    case "ArrowDown":
      STATE.down = false;
      break;
    case "ArrowUp":
      STATE.up = false;
      break;
    case "ArrowLeft":
      STATE.left = false;
      break;
    case "ArrowRight":
      STATE.right = false;
      break;
    case "w":
      STATE.forward = false;
    case "s":
      STATE.backward = false;
    default:
      return;
  }
  event.preventDefault();
}, true);

cubes = createCubes(100)
createLights()
render();