import * as THREE from 'three'
import Experience from '../Experience'
import Obstacles from './Obstacles'
import {getObstacleColliders2} from './Obstacles'
import gsap from 'gsap'

import Monster from './Monster'



export default class MikCharacter {
    
    constructor () {
        this.experience = new Experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.position_ = new THREE.Vector3(0, 0, 0);
        this.velocity_ = 0.0;
        this.health = 1
        this.waveOfMonsters = []
        this.monsters = ['alien', 'yeti', 'pig','demon','cyclops']

        //Debug
        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('mik-character')
        }

        //Setup 
        this.resource = this.resources.items.mikModel
        // this.createHealthBar()
        this.createMonsters()
        this.spawnWave() 
    }
    pause(ms) { 
        return new Promise(resolve => setTimeout(resolve, ms))
    };

    spawnWave = async() => {
        for(let i = 0; i < 5; i++){
            let model = this.waveOfMonsters[i].model.scene
            model.position.y = .8
            model.position.x = -8
            model.position.z = -10    
            model.scale.set(1.3,1.3,1.3)    
            this.scene.add(model)
            this.animateAlongPath(model)
            await this.pause(1000 + Math.random()* 2000)
        }
    }

    createMonsters() {
        for(let i = 0; i < 5; i++){
            let monster = new Monster(this.monsters[i])
            // console.log(monster.model)    
            this.waveOfMonsters.push(monster)
        }
    }

 


    animateAlongPath (monster) {
        function difference(num1 , num2) {
            return Math.abs(num1-num2);
         } 
        const followPathTimeline = gsap.timeline({defaults: { ease: "linear"}})
        // console.log(difference(this.model.position.z, -6))
        followPathTimeline.to(monster.position, { x: -8, z: -6, duration: 4/3})
        followPathTimeline.to(monster.rotation, {duration: .2, y: Math.PI * .5}, '-=.2')
        followPathTimeline.to(monster.position, { x: 4, z: -6, duration: 8/3})
        followPathTimeline.to(monster.rotation, {duration: .2, y: 0}, '-=.2')
        followPathTimeline.to(monster.position, { x: 4, z: 0, duration: 6/3})
        followPathTimeline.to(monster.rotation, {duration: .2, y: Math.PI * -.5}, '-=.2')
        followPathTimeline.to(monster.position, { x: -6, z: 0, duration: 10/3})
        followPathTimeline.to(monster.rotation, {duration: .2, y: 0}, '-=.2')
        followPathTimeline.to(monster.position, { x: -6, z: 6, duration: 6/3})
        followPathTimeline.to(monster.rotation, {duration: .2, y: Math.PI * .5}, '-=.2')
        followPathTimeline.to(monster.position, { x: 6, z: 6, duration: 12/3})
        followPathTimeline.to(monster.rotation, {duration: .2, y: 0}, '-=.2')
        followPathTimeline.to(monster.position, { x: 6, z: 8, duration: 2/3})

    }
    hideCharacter = () =>{
        this.waveOfMonsters.forEach(char => {
            if(char.mesh.position.x == 6 && char.mesh.position.z == 8){
                this.scene.remove(char.mesh)
            }
        });
    }
    killCharacter() {
        this.waveOfMonsters.forEach(char => {
            if(char.health < 0){
                this.scene.remove(char.mesh)
            }
        });
    }

    update() {
        if(this.waveOfMonsters.length > 0){
            this.waveOfMonsters.forEach((monster) => {
                monster.update()
            });  
        }
            // this.animation.mixer.update(this.time.delta * 0.001)

        // this.healthBarMaterial.uniforms.health.value = this.health;
        this.killCharacter()
        this.hideCharacter()
  
    }

}