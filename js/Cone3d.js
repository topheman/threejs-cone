THREE.Cone3d = function(){
    
    /** Modelisation / Textures / Lights part */
    
    var cylinderGeometry, cylinderMaterial, leftEyeGeometry, leftEyeTexture, leftEyeMaterial, rightEyeGeometry, rightEyeTexture, rightEyeMaterial;
    this.cylinder;
    this.leftEye;
    this.rightEye;
    
    THREE.Object3D.call(this);
    
    cylinderGeometry	= new THREE.CylinderGeometry(1, 3, 6, 50,1);
    cylinderMaterial	= new THREE.MeshLambertMaterial({
        color: 0xCC0000
    });
    this.cylinder	= new THREE.Mesh( cylinderGeometry, cylinderMaterial );
    this.cylinder.castShadow = true;
    this.cylinder.receiveShadow = false;
    
    leftEyeGeometry = new THREE.SphereGeometry(1, 10, 10);
    leftEyeTexture	= THREE.ImageUtils.loadTexture( "./images/eye.png" );
//    texture	= THREE.ImageUtils.loadTexture( "./images/android-logo-white.png" );
    leftEyeTexture.wrapS = leftEyeTexture.wrapT = THREE.ClampToEdgeWrapping;
    leftEyeMaterial	= new THREE.MeshLambertMaterial({
        color: 0xFFFFFF,
        map:    leftEyeTexture
    });
    this.leftEye = new THREE.Mesh( leftEyeGeometry, leftEyeMaterial );
    this.leftEye.position.x = 1;
    this.leftEye.position.y = 1;
    this.leftEye.position.z = 1.5;
//    this.leftEye.rotation.y = -Math.PI/2;
    this.leftEye.scale.y = 1.2;
    this.leftEye.castShadow = true;
    this.leftEye.receiveShadow = false;
    
    rightEyeGeometry = new THREE.SphereGeometry(1, 10, 10);
    rightEyeTexture = THREE.ImageUtils.loadTexture( "./images/eye.png" );
//    console.info(rightEyeTexture,leftEyeTexture);
    rightEyeTexture.wrapS = rightEyeTexture.wrapT = THREE.ClampToEdgeWrapping;
    rightEyeMaterial = new THREE.MeshLambertMaterial({
        color: 0xFFFFFF,
        map:    rightEyeTexture
    });
    this.rightEye = new THREE.Mesh( rightEyeGeometry, rightEyeMaterial );
    this.rightEye.position.x = -1;
    this.rightEye.position.y = 1;
    this.rightEye.position.z = 1.5;
//    this.rightEye.rotation.y = -Math.PI/2;
    this.rightEye.scale.y = 1.2;
    this.rightEye.castShadow = true;
    this.rightEye.receiveShadow = false;
    
    this.cylinder.add(this.leftEye);
    this.cylinder.add(this.rightEye);
    this.cylinder.translateY(3);
    this.add(this.cylinder);
    
    this.castShadow = true;
    this.receiveShadow = false;
    
    /** Animation part */
    
    this.jumping = false;
    this.bouncing = false;
    this.squinting = false;
    
    /** Original attributes */
    this.leftEye.material.map.offset.original = {};
    this.rightEye.material.map.offset.original = {};
    this.leftEye.material.map.offset.original.x = 0.25;
    this.rightEye.material.map.offset.original.x = 0.25;
    this.leftEye.material.map.offset.original.y = 0;
    this.rightEye.material.map.offset.original.y = 0;
    
    this.reInit();
    
};

THREE.Cone3d.prototype = new THREE.Object3D();
THREE.Cone3d.prototype.constructor = THREE.Cone3d;

THREE.Cone3d.prototype.reInit = function(){
    this.leftEye.material.map.offset.x = this.leftEye.material.map.offset.original.x;
    this.rightEye.material.map.offset.x = this.rightEye.material.map.offset.original.x;
    this.leftEye.material.map.offset.y = this.leftEye.material.map.offset.original.y;
    this.rightEye.material.map.offset.y = this.rightEye.material.map.offset.original.y;
    this._bounceInfos = {};
};

THREE.Cone3d.prototype.update = function(){
    this.updateBounce();
};

THREE.Cone3d.prototype.updateBounce = function(){
    if(this.bouncing == true){
        this.scale.y = 1 + Math.sin(this._bounceInfos.range) * 0.1;
        this._bounceInfos.range += 0.1;
    }
};

THREE.Cone3d.prototype.turnLeft = function(){
    this.rotation.y += 0.05;
};

THREE.Cone3d.prototype.turnRight = function(){
    this.rotation.y -= 0.05;
};

THREE.Cone3d.prototype.moveForward = function(){
    this.translateZ(0.5);
};

THREE.Cone3d.prototype.moveBack = function(){
    this.translateZ(-0.5);
};

THREE.Cone3d.prototype.bounce = function(){
    if(this.bouncing == false){
        this._bounceInfos.range = 0;
        this.bouncing = true;
    }
};

THREE.Cone3d.prototype.stopBounce = function(){
    if(this.bouncing == true){
        this.scale.y = 1;
        this.bouncing = false;
    }
};

THREE.Cone3d.prototype.squint = function(){
//    if(this.squinting == false){
//        this.leftEye.rotation.y -= Math.PI/4;
//        this.rightEye.rotation.y += Math.PI/4;
//        this.squinting = true;
//    }
//    if(this.squinting == false){
        if(this.leftEye.material.map.offset.x < 0.38){
            this.leftEye.material.map.offset.x = this.leftEye.material.map.offset.x + 0.01;
            this.rightEye.material.map.offset.x = this.rightEye.material.map.offset.x - 0.01;
            this.leftEye.material.map.offset.y = this.leftEye.material.map.offset.y + 0.008;
            this.rightEye.material.map.offset.y = this.rightEye.material.map.offset.y + 0.008;
            this.leftEye.material.map.needsUpdate = true;
            this.rightEye.material.map.needsUpdate = true;
        }
        this.squinting = true;
//    }
};

THREE.Cone3d.prototype.stopSquint = function(){
//    if(this.squinting == true){
//        this.leftEye.rotation.y += Math.PI/4;
//        this.rightEye.rotation.y -= Math.PI/4;
//        this.squinting = false;
//    }
//    if(this.squinting == true){
        this.leftEye.material.map.offset.x = this.leftEye.material.map.offset.original.x;
        this.rightEye.material.map.offset.x = this.rightEye.material.map.offset.original.x;
        this.leftEye.material.map.offset.y = this.leftEye.material.map.offset.original.y;
        this.rightEye.material.map.offset.y = this.rightEye.material.map.offset.original.y;
        this.leftEye.material.map.needsUpdate = true;
        this.rightEye.material.map.needsUpdate = true;
        this.squinting = false;
//    }
};