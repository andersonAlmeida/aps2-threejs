(function(){
	// common variables
	var wWidth = window.innerWidth,
		wHeight = window.innerHeight;

	// three js variables 
	var scene = new THREE.Scene(),
		camera = new THREE.PerspectiveCamera( 75, wWidth / wHeight, 0.2, 3000),
		renderer = new THREE.WebGLRenderer({antialias: true});

	var controls = new THREE.OrbitControls(camera, renderer.domElement);
	
    controls.enableDamping = true;
	controls.dampingFactor = 0.5;
	controls.enableZoom = true;


	renderer.setSize(wWidth, wHeight);
	// white bg
	renderer.setClearColor(0x000000, 1);
	document.body.appendChild(renderer.domElement);

	// set the camera position
	camera.position.z = 250;
	// camera.position.set(100, -400, 2000);

	scene.add(camera);

	//LIGHTNING
    //first point light
    light = new THREE.PointLight(0xffffff, 1, 4000);
    light.position.set(50, 0, 0);
    //the second one
    light_two = new THREE.PointLight(0xffffff, 1, 4000);
    light_two.position.set(-100, 800, 800);
    //And another global lightning some sort of cripple GL
    lightAmbient = new THREE.AmbientLight(0x404040);
    scene.add(light, light_two, lightAmbient);

    var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);
     
    var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    fillLight.position.set(100, 0, 100);
     
    var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize();
     
    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);

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

    // mtlLoader2.setTexturePath('models/death_star_II/');
    // mtlLoader2.setPath('models/death_star_II/');
    // mtlLoader2.load('death-star-II.mtl', function (materials) {
    mtlLoader2.setTexturePath('models/Akira/');
    mtlLoader2.setPath('models/Akira/');
    mtlLoader2.load('akira.mtl', function (materials) {
     
        materials.preload();
     
        var objLoader2 = new THREE.OBJLoader();
        objLoader2.setMaterials(materials);
        // objLoader2.setPath('models/death_star_II/');
        // objLoader2.load('death-star-II.obj', function (object) {
        objLoader2.setPath('models/Akira/');
        objLoader2.load('akira.obj', function (object) {	        
     
            scene.add(object);
            object.position.y += 350;
            object.position.x = 0;
            object.position.z -= 1000;

            object.scale.set(100,100,100);
     
        });
     
    });	

    var createPlane = function() {
        var planeGeometry = new THREE.PlaneGeometry(2000, 2000);
        var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000});
        plane = new THREE.Mesh(planeGeometry, planeMaterial);

        plane.rotation.x = -0.5 * Math.PI;
        plane.position.y = -60;

        scene.add(plane);
    };

    createPlane();	    
  
	// main loop
	function animate() {
		requestAnimationFrame(animate);

		// cube.rotation.x += 0.01;
		// cube.rotation.y += 0.01;

		renderer.render(scene, camera);
	}
	animate();
})();