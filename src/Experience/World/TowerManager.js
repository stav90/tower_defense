import Experience from '../Experience'
import * as THREE from 'three'
import Tower from './Tower'
import gsap from 'gsap'

 export default class TowerManager {
    constructor(spawnManager) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        // ---- Tower List ----
        this.towerArray = new Array();
        // ---- Temporary variables ----
        this.newTowerMeshToCreate = undefined;
        this.selectedTower = undefined;

        this.spawnManager = spawnManager

        this.waveOfMonsters = spawnManager.waveOfMonsters
       


        this.plasmaBalls = [];

        this.setGeometry()
        this.setTextures()
        // this.setMaterial()
        // this.setMesh()
        this.getMonsters()
    }
    getMonsters() {
        // console.log('this.waveOfMonsters', this.waveOfMonsters)
    }
    setGeometry() {
        this.geometry = new THREE.BoxGeometry( 1, 3, 1 );
      
    }
   
    setTextures() {
 
    }
    // setMaterial() {
    //     this.material = new THREE.MeshStandardMaterial({ color : 0xc0392b})
    // }
    // setMesh() {
    //     this.mesh = new THREE.Mesh(this.geometry, this.material)
    //     this.mesh.receiveShadow = true
    //     // this.scene.add(this.mesh)
    // }

    addTower(newtowermesh) {
        var newtower = new Tower( this.spawnManager);
        newtower.mesh = newtowermesh;
        
        this.setUpTurret(newtower)
        // console.log(newtower)
        this.towerArray.push(newtower);

    }
    setUpTurret(newtower){
        const textureLoader = new THREE.TextureLoader()
        const muzzleTexture = textureLoader.load( '/textures/muzzle.png' );
		const muzzleMaterial = new THREE.SpriteMaterial( { map: muzzleTexture } );
		newtower.muzzle = new THREE.Sprite( muzzleMaterial );
        newtower.muzzle.position.y = .6
        newtower.muzzle.position.z = 2.5
        newtower.muzzle.scale.set(1.5,1.5,1.5)
        newtower.muzzle.visible = false
        newtower.mesh.traverse((child) => {
            if(child.name === 'Turret'){
                newtower.turret = child
                child.add(newtower.muzzle)
            }
        })
    }

    deleteTower(TowerObj) {
        const index = this.towerArray.indexOf(TowerObj);
        if (index > -1) {
        this.towerArray.splice(index, 1);
        }
    }

    getTowerAtPosition(x, z) {
        
        for(var i = 0 ; i < this.towerArray.length ; i++ )
        {
            if(this.towerArray[i].mesh.position.x == x && this.towerArray[i].mesh.position.z == z )
            {
                console.log(this.towerArray[i])
                return this.towerArray[i];
                
            }
        }
        return null;
    }
    rotateMuzzle = async(muzzle) =>{
        muzzle.visible = true
        gsap.to(muzzle.material, {duration: .1, opacity: 1})
        muzzle.material.opacity = 1 
        muzzle.material.rotation = Math.random() * Math.PI;  
      
        // console.log(muzzle.material.opacity)
    }
    turnOffMuzzle(muzzle) {
    //   console.log(muzzle.material.opacity)
        // muzzle.material.opacity = 0
      gsap.to(muzzle.material, {duration: .1,opacity: 0})
    
    }

    getDistanceToEnemy = async() => {
        // let EnemyInFiringRange = false
        for(var i = 0 ; i < this.towerArray.length ; i++ ){ //loop through all the towers
            for(var j = 0 ; j < this.waveOfMonsters.length ; j++ ){// loop through all the monsters

                this.towerArray[i].distance = this.towerArray[i].mesh.position.distanceTo(this.waveOfMonsters[j].mesh.position);//character Vector
                //  console.log('distance',this.towerArray[0].distance)
                if(this.towerArray[i].distance < 2.5){
                    // EnemyInFiringRange = true
                   
                    this.towerArray[i].mesh.traverse((child) => {
                        if(child.name === 'Turret'){
                            child.lookAt(this.waveOfMonsters[j].mesh.position.x, 2.6 , this.waveOfMonsters[j].mesh.position.z )
                            // this.getDir(child)
                        }
                    })
                    this.rotateMuzzle(this.towerArray[i].muzzle)
                    this.waveOfMonsters[j].health -= .005
                    // this.createBullets()
                }else {
                    this.turnOffMuzzle(this.towerArray[i].muzzle)
                }
                 
            }
  
        }
    }

    
    // getDir(turret){
    //     const objectsWorldPosition = new THREE.Vector3()
    //     this.pos = turret.getWorldPosition(objectsWorldPosition)
    //     this.pos.y += .3

    //     const objectsWorldQuaternion = new THREE.Quaternion
    //     this.quat = turret.getWorldQuaternion(objectsWorldQuaternion)
     

    //     const objectsWorldirection = new THREE.Vector3()
    //     this.direction = turret.getWorldDirection(objectsWorldirection)
    // }

    // createBullets = async() =>{
       
    //     let plasmaBall = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 4), new THREE.MeshBasicMaterial({color: 'black'}));
    //     plasmaBall.scale.set(.2, .2, .2)
    //     plasmaBall.position.copy(this.pos); // start position - the tip of the weapon
    //     plasmaBall.quaternion.copy(this.quat); // apply towers quaternion
    //     this.scene.add(plasmaBall);
    //     this.plasmaBalls.push(plasmaBall);
    // }

    pause(ms) { 
        return new Promise(resolve => setTimeout(resolve, ms))
    };
  
    update = async(delta) =>{
        if(this.towerArray.length > 0){
            this.getDistanceToEnemy()
            
            // if(this.plasmaBalls.length > 0){
            //     this.plasmaBalls.forEach((b) => {
            //         b.translateZ(50 * delta * .0005);

            //     });   
            // }
        }
        
    }
 }