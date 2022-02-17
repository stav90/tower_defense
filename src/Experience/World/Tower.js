import Experience from '../Experience'
import * as THREE from 'three'

 export default class Tower {
    constructor(character) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.distance = 0.0
        this.character = character
        this.bullets = []
        this.turret = null
        this.setInitialMesh()
        this.createTowerMesh()
        this.setUpTurret()
        
      
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
    setUpTurret(){
        this.tower_mesh.traverse((child) => {
            if(child.name === 'Turret'){
                // child.lookAt(this.character.model.position.x, 2.6 , this.character.model.position.z  )
                // this.getDir(child)
                this.turret = child
            }
        })
        // console.log(this.turret)
        

    }


    update() {
        if(this.character !== 'undefined') {
            
           
            // console.log("character pos",this.character)
            // this.towerModel.children[1].lookAt(this.character.model.position.x, 2.6 , this.character.model.position.z  )
        }
    }
 }