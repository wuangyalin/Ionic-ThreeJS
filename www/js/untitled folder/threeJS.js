angular.module('starter.threeJS', [])

.directive('cardboarddGl', [function() {
  return {
    restrict: 'E',
    link: function($scope, $element, $attr) {
      create($element[0]);
    }
  }
  function create(glFrame) {
    // MAIN

    // standard global variables
    var container, scene, camera, renderer, controls, objControl;
    var clock = new THREE.Clock();
    var loader = new THREE.JSONLoader();

    // custom global variables

    var MovingCube;
    var bed;
    var objects = [];
    var projector, mouse = { x: 0, y: 0 };
    var walls;
    var wallWidth = 1000;
    var wallHight = 700;
    var wallright,wallleft,wallfront,wallback;
    var original_position;

    var video, videoImage, videoImageContext, videoTexture,movieScreen, loaded = 0;
    var tv,a,b,c,d;


    init();
    animate();

    // FUNCTIONS    
    function init() 
    {
      // SCENE
      scene = new THREE.Scene();
      scene.fog = new THREE.Fog( 0xffffff, 1000, 4000 );

      // CAMERA
      var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
      var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 10, FAR = 20000;
    /*  camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
      scene.add(camera);
      camera.position.set(0,150,400);
      camera.lookAt(scene.position);  */

            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 );
            camera.position.set( 0, 150, 1300 );

      // RENDERER
      if ( Detector.webgl )
        renderer = new THREE.WebGLRenderer( {antialias:true} );
      else
        renderer = new THREE.CanvasRenderer(); 

      renderer.setClearColor( scene.fog.color );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
      container = glFrame;
     // container.appendChild( options );
      container.appendChild( renderer.domElement );

      // CONTROLS
      controls = new THREE.OrbitControls( camera, renderer.domElement );

      // LIGHT
      scene.add( new THREE.AmbientLight( 0x222222 ) );

    /*        var light = new THREE.DirectionalLight( 0xffffff, 2.25 );
            light.position.set( 200, 450, 500 );

            light.castShadow = true;
            light.shadowMapWidth = 1024;
            light.shadowMapHeight = 1024;
            light.shadowMapDarkness = 0.95;
            // light.shadowCameraVisible = true;
            light.shadowCameraNear = 100;
            light.shadowCameraFar = 1200;
            light.shadowCameraTop = 350;
            light.shadowCameraBottom = -350;
            light.shadowCameraRight = 1000;
            light.shadowCameraLeft = -1000;

            scene.add( light );*/



      var light1 = new THREE.PointLight(0xfffff0);
      light1.position.set(0,500,0);
      scene.add(light1);

            //  GROUND

    /*        var gt = THREE.ImageUtils.loadTexture( "textures/terrain/grasslight-big.jpg" );
            var gg = new THREE.PlaneBufferGeometry( 16000, 16000 );
            var gm = new THREE.MeshPhongMaterial( { color: 0xffffff, map: gt } );

            var ground1 = new THREE.Mesh( gg, gm );
            ground1.rotation.x = - Math.PI / 2;
            ground1.material.map.repeat.set( 64, 64 );
            ground1.material.map.wrapS = THREE.RepeatWrapping;
            ground1.material.map.wrapT = THREE.RepeatWrapping;
            // note that because the ground does not cast a shadow, .castShadow is left false
            ground1.receiveShadow = true;

            scene.add( ground1 );*/

      //move control
       
      objControl = new THREE.TransformControls( camera, renderer.domElement );
      objControl.addEventListener( 'change', render );



    /*
        
        add Objects

    */
      addWall();
      addDoor();
      addBed();

      scene.add(objControl);
      scene.add(walls);
      
      glFrame.addEventListener( 'resize', onWindowResize, false );
      document.addEventListener( 'mousedown', onDocumentMouseDown, false );
      document.addEventListener( 'touchstart', onDocumentTouchStart, false );


    }

    function addBed(){
      addObj('bed',0.6,0.6,0.6,0,0,0,0,0,0);
    }

    function rotate(){
      objControl.setMode( "rotate" );
    }

    function increaseSize(){
      objControl.setSize( objControl.size + 0.1 );
    }

    function decreaseSize(){
      objControl.setSize( Math.max(objControl.size - 0.1, 0.1 ) );
    }
    function move(){
      objControl.setMode( "translate" );
    }
    function reset(){
      MovingCube.position.set(0,0,0);
    }

    function removeObj(){
      MovingCube.position.set(wallWidth,wallWidth,wallWidth);
      scene.remove(MovingCube);
      objControl.detach();
    }

    function addDoor(){
      // texture
            var manager = new THREE.LoadingManager();
            manager.onProgress = function ( item, loaded, total ) {

              console.log( item, loaded, total );

            };

            var texture = new THREE.Texture();

            var onProgress = function ( xhr ) {
              if ( xhr.lengthComputable ) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log( Math.round(percentComplete, 2) + '% downloaded' );
              }
            };

            var onError = function ( xhr ) {
            };

            // model
            var loader = new THREE.OBJMTLLoader();
            loader.load( 'models/door/door.obj', 'models/door/door.mtl', function ( object ) {

              object.scale.set(200,200,200);
              object.position.set(-wallWidth/2,0,-300);
              object.rotation.y = Math.PI/2;


              walls.add( object );

            }, onProgress, onError );
    }


    function addTv(){
      if(loaded == 1){
        removeObj();
        loaded = 0;
      //  console.log("mei you");
        walls.remove(movieScreen);
        video.pause();
        video.currentTime = 0;
      }
      else if(loaded == 0){

        loaded = 1;
      //  console.log("you");

        // create the video element
        video = document.createElement( 'video' );
        // video.id = 'video';
        // video.type = ' video/ogg; codecs="theora, vorbis" ';
        video.src = "videos/GOT.ogv";
        video.load(); // must call after setting/changing source
        video.play();
        
        videoImage = document.createElement( 'canvas' );
        videoImage.width = 600;
        videoImage.height = 600;

        videoImageContext = videoImage.getContext( '2d' );
        // background color if no video present
        videoImageContext.fillStyle = '#000000';
        videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

        videoTexture = new THREE.Texture( videoImage );
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        
        var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true} );
        // the geometry on which the movie will be displayed;
        //    movie image will be scaled to fit these dimensions.
        var movieGeometry = new THREE.PlaneGeometry( 600, 300, 4, 4 );
        movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );

    /*    movieScreen.position.set(a,b,c);
        movieScreen.rotation.y = d;*/
        

        movieScreen.position.set(wallWidth/2-1,500,100);
        movieScreen.rotation.y = -Math.PI/2;
        walls.add(movieScreen);
        objects.push(movieScreen);
        objControl.attach(movieScreen);
        MovingCube = movieScreen;
      }
    }

    function addObj(name,scale_x,scale_y,scale_z,position_x,position_y,position_z,rotate_x,rotate_y,rotate_z){
        console.log("asdasdasd");
          loader.load('models/'+name+'/'+name+'.js', function (geometry, mat) {
                for(var i=0;i<mat.length;i++){
                    var material = mat[ i ];
                    material.color.setHex( 0xffffff );
                }

          var faceMaterial = new THREE.MeshFaceMaterial( mat );

          var object = new THREE.Mesh(geometry, faceMaterial);
                object.rotation.x = rotate_x;

          object.rotation.y = rotate_y;
          object.rotation.z = rotate_z;

          object.scale.set(scale_x,scale_y,scale_z)
        object.position.set(position_x,position_y,position_z)
            scene.add(object);
            objects.push(object);
            objControl.attach(object);
            MovingCube = object;
            if(name == "TV"){
              a = position_x;
              b = position_y;
              c = position_z;
              d = rotate;
            }
        });     
    }

    function addWall(){
        //ground
      walls = new THREE.Object3D();
          
            
      var groundGeo = new THREE.PlaneBufferGeometry(wallWidth, wallWidth);
      var wallGeo = new THREE.PlaneBufferGeometry(wallWidth, wallHight);

            
      var wallTexture = THREE.ImageUtils.loadTexture('models/grey.jpg');
      wallTexture.minFilter = THREE.LinearFilter;
      wallTexture.magFilter = THREE.LinearFilter;

      var floorTexture = THREE.ImageUtils.loadTexture('models/floor.jpg');
      //var floorTexture = THREE.ImageUtils.loadTexture('textures/grey.jpg');
      floorTexture.minFilter = THREE.LinearFilter;
      floorTexture.magFilter = THREE.LinearFilter;


      var ground = new THREE.Mesh(groundGeo, new THREE.MeshPhongMaterial({
                      map: floorTexture
                }));
      ground.overdraw = true;



      ground.position.set(0, 0, 0);
      ground.rotation.x = -Math.PI/2;
      walls.add(ground);
            
      var wallleft = new THREE.Mesh(wallGeo, new THREE.MeshPhongMaterial({
                      map: wallTexture
                }));
      wallleft.overdraw = true;
      wallleft.position.set(-wallWidth/2, wallHight/2, 0);
      wallleft.rotation.y = Math.PI/2;
      walls.add(wallleft);
            
      var wallright = new THREE.Mesh(wallGeo, new THREE.MeshPhongMaterial({
                      map: wallTexture
                }));
      wallright.overdraw = true;
      wallright.position.set(wallWidth/2, wallHight/2, 0);
      wallright.rotation.y = -Math.PI/2;
      walls.add(wallright);
            
      var wallback = new THREE.Mesh(wallGeo, new THREE.MeshPhongMaterial({
                      map: wallTexture
          }));
      wallback.overdraw = true;
      wallback.position.set(0, wallHight/2, -wallWidth/2);
      walls.add(wallback);
            
      var wallfront = new THREE.Mesh(wallGeo, new THREE.MeshPhongMaterial({
              map: wallTexture
            }));
      wallfront.overdraw = true;
      wallfront.position.set(0, wallHight/2, wallWidth/2);
      wallfront.rotation.y = -Math.PI;

      walls.add(wallfront);

    }


    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
      controls.handleResize();
      render();
    }

    function onDocumentTouchStart( event ) 
    {
      if ( event.touches.length == 1 ) {

          // the following line would stop any other event handler from firing
          // (such as the mouse's TrackballControls)
          // event.preventDefault();
          console.log("Click null");  
          // update the mouse variable
         // mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
         // mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            var xOff = getOffset(glFrame).left; 
           var yOff = getOffset(glFrame).top; 

          //  mouse.x = ( ( event.clientX - xOff ) / container.clientWidth ) * 2 - 1;
          //  mouse.y = - ( ( event.clientY - yOff ) / container.clientHeight ) * 2 + 1;
            mouse.x = ( ( event.touches[0].clientX - xOff ) / container.clientWidth ) * 2 - 1;
            mouse.y = - ( ( event.touches[0].clientY - yOff ) / container.clientHeight ) * 2 + 1;

          objControl.detach();
          controls.enabled = true;
          // find intersections
          // create a Ray with origin at the mouse position
          //   and direction into the scene (camera direction)
          var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
            vector = vector.unproject(camera);

          var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

          // create an array containing all objects in the scene with which the ray intersects
          var intersects = ray.intersectObjects( objects );
          
          // if there is one (or more) intersections
          if ( intersects.length > 0 )
          {
            console.log("Hit @ " + toString( intersects[0].point ) );
            // change the color of the closest face.
            MovingCube = intersects[0].object;
            objControl.attach(MovingCube);
            controls.enabled = false;

          }
      }

    }

    function onDocumentMouseDown( event ) 
    {
      // the following line would stop any other event handler from firing
      // (such as the mouse's TrackballControls)
      // event.preventDefault();
      console.log("Click.");  
      // update the mouse variable
     // mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
     // mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        var xOff = getOffset(glFrame).left; 
        var yOff = getOffset(glFrame).top; 

        mouse.x = ( ( event.clientX - xOff ) / container.clientWidth ) * 2 - 1;
        mouse.y = - ( ( event.clientY - yOff ) / container.clientHeight ) * 2 + 1;

      objControl.detach();
      controls.enabled = true;
      // find intersections
      // create a Ray with origin at the mouse position
      //   and direction into the scene (camera direction)
      var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
        vector = vector.unproject(camera);

      var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

      // create an array containing all objects in the scene with which the ray intersects
      var intersects = ray.intersectObjects( objects );
      
      // if there is one (or more) intersections
      if ( intersects.length > 0 )
      {
        console.log("Hit @ " + toString( intersects[0].point ) );
        // change the color of the closest face.
        MovingCube = intersects[0].object;
        objControl.attach(MovingCube);
        controls.enabled = false;

      }

    }

    function toString(v) { return "[ " + v.x + ", " + v.y + ", " + v.z + " ]"; }
    function getOffset(el) {
        var _x = 0;
        var _y = 0;
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    }




    function animate() 
    {
        requestAnimationFrame( animate );
        controls.update();

      render();   
    }



    function render() 
    {
      if(movieScreen){
        if ( video.readyState === video.HAVE_ENOUGH_DATA ) 
        {
          videoImageContext.drawImage( video, 0, 0 );
          if ( videoTexture ) 
            videoTexture.needsUpdate = true;
        }
      }


      objControl.update();
      renderer.render( scene, camera );
    }
  }
}]);

