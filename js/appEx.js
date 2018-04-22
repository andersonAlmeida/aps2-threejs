(function(){
	// common variables
	var wWidth = window.innerWidth,
		wHeight = window.innerHeight;

	// three js variables 
	var scene = new THREE.Scene(),
		camera = new THREE.PerspectiveCamera( 75, wWidth / wHeight, 0.2, 1000),
		renderer = new THREE.WebGLRenderer({antialias: true}),
        plane;

    // add camera controls
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
        
    controls.enableDamping = true;
    controls.dampingFactor = 0.5;
    controls.enableZoom = true;

    // define the render size 
	renderer.setSize(wWidth, wHeight);

	// change the background color
	// renderer.setClearColor(0x000000, 1);

    // append to the body our renderer
	document.body.appendChild(renderer.domElement);	

	// set the camera position
	camera.position.z = 250;

    // add camera in the scene
	scene.add(camera);	

    var createPlane = function() {
        var planeGeometry = new THREE.PlaneGeometry(2000, 2000);
        var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000});
        plane = new THREE.Mesh(planeGeometry, planeMaterial);

        plane.rotation.x = -0.5 * Math.PI;
        plane.position.y = -60;

        scene.add(plane);
    };

    createPlane();

    // create lights and add to the scene
    var lightAmbient = new THREE.AmbientLight(0xffffff),
        light = new THREE.PointLight(0xffffff, 1, 4000),        
        light_two = new THREE.PointLight(0xffffff, 1, 4000);

    light.position.set(50, 0, 0);
    light_two.position.set(-100, 800, 800);
    
    scene.add(light, light_two, lightAmbient);
    
    var loadObjs = function() {
        // add an 3D element in the scene
        var mtlLoader = new THREE.MTLLoader();

        mtlLoader.setTexturePath('models/r2d2/');
        mtlLoader.setPath('models/r2d2/');
        mtlLoader.load('r2-d2.mtl', function (materials) {
         
            materials.preload();
         
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath('models/r2d2/');
            objLoader.load('r2-d2.obj', function (object) {
         
                scene.add(object);
                object.position.y -= 60;
            });         
        }); 

        var mtlLoader2 = new THREE.MTLLoader();

        mtlLoader2.setTexturePath('models/Akira/');
        mtlLoader2.setPath('models/Akira/');
        mtlLoader2.load('akira.mtl', function (materials) {
         
            materials.preload();
         
            var objLoader2 = new THREE.OBJLoader();
            objLoader2.setMaterials(materials);
            objLoader2.setPath('models/Akira/');
            objLoader2.load('akira.obj', function (object) {            
         
                scene.add(object);
                object.position.y += 350;
                object.position.x = 0;
                object.position.z -= 1000;

                object.scale.set(100,100,100);
         
            });
         
        });        
    };

    loadObjs();
  
	// main loop
	function animate() {
		requestAnimationFrame(animate);
        controls.update();
		renderer.render(scene, camera);
	}
	animate();
})();