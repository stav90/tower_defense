import Experience from '../Experience'
import * as THREE from 'three'
import vertexShader from '../../shaders/healthShader/vertex.glsl'
import fragmentShader from '../../shaders/healthShader/fragment.glsl'

 export default class Monster {
    constructor(monster) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.model = this.resources.items[monster]//entire model object
        this.mesh = this.model.scene
        this.health = 1
        this.pathTimeline = null
        this.setAnimation()
        this.createHealthBar()
        this.setModelPosition()
      
    }
    setModelPosition() {
        this.mesh.position.y = .8
        this.mesh.position.x = -8
        this.mesh.position.z = -10 
    }

    //x: 6, z: 8,
    createHealthBar() {
        const uniforms = {
            colour: {
              value: new THREE.Color(0, 1, 0),
            },
            health: {
              value: 1.0,
            },
          };
   
        this.healthBarMaterial = new THREE.ShaderMaterial({
            uniforms,
            side: THREE.DoubleSide,
            fragmentShader: fragmentShader,
            vertexShader: vertexShader,
            })

        const healthBarGeometry = new THREE.PlaneGeometry(.8, .1)
        const heathBarMesh = new THREE.Mesh(healthBarGeometry, this.healthBarMaterial)
        heathBarMesh.position.y = 2
        this.model.scene.add(heathBarMesh)
    }
    setAnimation() {
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model.scene)

        this.animation.actions = {}
        this.animation.actions.idle = this.animation.mixer.clipAction(this.model.animations[8])
        this.animation.actions.run = this.animation.mixer.clipAction(this.model.animations[1])
        this.animation.actions.jump = this.animation.mixer.clipAction(this.model.animations[2])
        // console.log( this.animation.actions)

        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        this.animation.play = (name) => {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            if(!this.experience.gameOver){
                newAction.crossFadeFrom(oldAction, .4)
            }else{
                newAction.crossFadeFrom(oldAction, 0)
            }
            this.animation.actions.current = newAction
        }

        //Debug
        // if(this.debug.active) {
        //     const debugObject = {
        //         playIdle: () => {this.animation.play('idle')},
        //         playRun: () => {this.animation.play('run')},
        //         playJump: () => {this.animation.play('jump')}
        //     }
        //     this.debugFolder.add(debugObject, 'playIdle')
        //     this.debugFolder.add(debugObject, 'playRun')
        //     this.debugFolder.add(debugObject, 'playJump')

        // }
 
    }
    // killCharacter() {
    //     if(this.health < 0){
    //         this.scene.remove(this.model.mesh)
    //     }
    // }

    update() {     
        this.animation.mixer.update(this.time.delta * 0.001)
        this.healthBarMaterial.uniforms.health.value = this.health;
        // this.killCharacter()
        // this.hideCharacter()
    }

 
 }