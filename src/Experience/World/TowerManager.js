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

        this.character = spawnManager

        this.waveOfMonsters = spawnManager.waveOfMonsters
       


        this.plasmaBalls = [];

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }
    setGeometry() {
        this.geometry = new THREE.BoxGeometry( 1, 3, 1 );
      
    }
   
    setTextures() {
 
    }
    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({ color : 0xc0392b})
    }
    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.receiveShadow = true
        // this.scene.add(this.mesh)
    }

    addTower(newtowermesh) {
        var newtower = new Tower();
        newtower.mesh = newtowermesh;
        this.towerArray.push(newtower);

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

    getDistanceToEnemy = async() => {
        // console.log("character",this.character.healthBarMaterial)
        for(var i = 0 ; i < this.towerArray.length ; i++ ){ //loop through all the towers
            for(var j = 0 ; j < this.waveOfMonsters.length ; j++ ){// loop through all the monsters

                this.towerArray[i].distance = this.towerArray[i].mesh.position.distanceTo(this.waveOfMonsters[j].mesh.position);//character Vector

                if(this.towerArray[i].distance < 2.5){
                    this.towerArray[i].mesh.traverse((child) => {
                        if(child.name === 'Turret'){
                            child.lookAt(this.waveOfMonsters[j].mesh.position.x, 2.6 , this.waveOfMonsters[j].mesh.position.z )
                            this.getDir(child)
                        }
                    })
                    this.waveOfMonsters[j].health -= .005
 
                    this.createBullets()
                 }
            }


            // this.towerArray[i].mesh.traverse((child) => {
            //     if(child.name === 'Turret'){
            //         child.lookAt(this.character.model.position.x, 2.6 , this.character.model.position.z  )
            //         this.getDir(child)
            //     }
            // })
           
            
        }
    }

    getDir(turret){
        const objectsWorldPosition = new THREE.Vector3()
        this.pos = turret.getWorldPosition(objectsWorldPosition)
        this.pos.y += .3

        const objectsWorldQuaternion = new THREE.Quaternion
        this.quat = turret.getWorldQuaternion(objectsWorldQuaternion)
     

        const objectsWorldirection = new THREE.Vector3()
        this.direction = turret.getWorldDirection(objectsWorldirection)
    }

    createBullets = async() =>{
       
        let plasmaBall = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 4), new THREE.MeshBasicMaterial({color: 'black'}));
        plasmaBall.scale.set(.2, .2, .2)
        plasmaBall.position.copy(this.pos); // start position - the tip of the weapon
        plasmaBall.quaternion.copy(this.quat); // apply towers quaternion
        this.scene.add(plasmaBall);
        this.plasmaBalls.push(plasmaBall);
    }

    pause(ms) { 
        return new Promise(resolve => setTimeout(resolve, ms))
    };
    update = async(delta) =>{
        if(this.towerArray.length > 0){
            this.getDistanceToEnemy()
            
            if(this.plasmaBalls.length > 0){
                this.plasmaBalls.forEach((b) => {
                    b.translateZ(50 * delta * .0005);
                    // setTimeout(() => {
                    //     // b.visible = false
                    // }, 50);
                });   
            }
        }
        
    }
 }