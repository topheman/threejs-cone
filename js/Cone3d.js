THREE.Cone3d = function(){
    
    var geometry,material,texture;
    this.cylinder;
    this.leftEye;
    this.rightEye;
    
    THREE.Object3D.call(this);
    
    geometry	= new THREE.CylinderGeometry(1, 3, 6, 100,1);
    material	= new THREE.MeshLambertMaterial({
        color: 0xCC0000
    });
    this.cylinder	= new THREE.Mesh( geometry, material );
    this.cylinder.castShadow = true;
    this.cylinder.receiveShadow = false;
    
    geometry = new THREE.SphereGeometry(1, 50, 50);
    texture	= THREE.ImageUtils.loadTexture( "./images/eye.png" );
    material	= new THREE.MeshLambertMaterial({
        color: 0xFFFFFF,
        map:    texture
    });
    this.leftEye = new THREE.Mesh( geometry, material );
    this.leftEye.position.x = 1;
    this.leftEye.position.y = 1;
    this.leftEye.position.z = 1.5;
    this.leftEye.rotation.y = -Math.PI/2;
    this.leftEye.scale.y = 1.2;
    this.leftEye.castShadow = true;
    this.leftEye.receiveShadow = false;
    
    this.rightEye = new THREE.Mesh( geometry, material );
    this.rightEye.position.x = -1;
    this.rightEye.position.y = 1;
    this.rightEye.position.z = 1.5;
    this.rightEye.rotation.y = -Math.PI/2;
    this.rightEye.scale.y = 1.2;
    this.rightEye.castShadow = true;
    this.rightEye.receiveShadow = false;
    
    this.cylinder.add(this.leftEye);
    this.cylinder.add(this.rightEye);
    this.cylinder.translateY(3);
    this.add(this.cylinder);
    
    this.castShadow = true;
    this.receiveShadow = false;
    
}

THREE.Cone3d.prototype = new THREE.Object3D();
THREE.Cone3d.prototype.constructor = THREE.Cone3d;

//THREE.Cone3d.prototype.renderDepth = function(){
//    console.info('renderDepth');
//}

THREE.Cone3d.prototype.eyeUp = function(){
    this.rightEye.position.y++;
}

THREE.Cone3d.prototype.bounceOnce = function(){
    
}