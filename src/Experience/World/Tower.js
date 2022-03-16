import Experience from '../Experience'
import * as THREE from 'three'
import gsap from 'gsap'
import { MeshBasicMaterial } from 'three'

 export default class Tower {
    constructor(spawnManager) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.distance = 0.0
        this.waveOfMonsters = spawnManager.waveOfMonsters
        this.bullets = []
        this.turret = null
        this.setInitialMesh()
        this.createTowerMesh()
        // this.setUpTurret()
    }

    setInitialMesh() {
        this.mesh = undefined;
    }
    createTowerMesh(){
        this.resource = this.resources.items.tower
        this.towerModel = this.resource.scene
        this.towerModel.scale.set(.5, .5, .5 );
        this.tower_mesh = this.towerModel
    }
    // setUpTurret(){
    //     const textureLoader = new THREE.TextureLoader()
    //     const muzzleTexture = textureLoader.load( '/textures/muzzle.png' );
	// 	const muzzleMaterial = new THREE.SpriteMaterial( { map: muzzleTexture } );
	// 	this.muzzle = new THREE.Sprite( muzzleMaterial );
    //     this.muzzle.position.y = .6
    //     this.muzzle.position.z = 2.5
    //     this.muzzle.scale.set(1.5,1.5,1.5)
    //     this.muzzle.visible = true
    //     this.tower_mesh.traverse((child) => {
    //         if(child.name === 'Turret'){
    //             this.turret = child
    //             child.add(this.muzzle)
    //         }
    //     })
    // }
    pause(ms) { 
        return new Promise(resolve => setTimeout(resolve, ms))
    };

    rotateMuzzle = async() =>{
        this.muzzle.material.rotation = Math.random() * Math.PI;
        
    }

    getDistanceToEnemy = () => {
            for(var i = 0 ; i < this.waveOfMonsters.length ; i++ ){// loop through all the monsters
                if( this.tower_mesh != undefined){
                    this.distance = this.tower_mesh.position.distanceTo(this.waveOfMonsters[i].mesh.position);//character Vector
                    if(this.distance < 2){
                        if(this.muzzle != undefined){
                            this.rotateMuzzle()  
                            
                        }         
                    }
                }
            }
    }

    update() {
        if(this.monsters !== 'undefined') {
          
        //    this.getDistanceToEnemy()
        }
    }
 }