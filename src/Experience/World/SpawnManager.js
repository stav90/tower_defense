import * as THREE from 'three'
import Experience from '../Experience'
import Obstacles from './Obstacles'
import {getObstacleColliders2} from './Obstacles'
import gsap from 'gsap'

import Monster from './Monster'



export default class SpawnManager {
    
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
        this.allWavesOfMonsters = []
        //Debug
        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('mik-character')
        }

        //Setup 
        this.resource = this.resources.items.mikModel
        // this.createHealthBar()
        
        this.spawnBtnListener()
    }
    pause(ms) { 
        return new Promise(resolve => setTimeout(resolve, ms))
    };

    spawnBtnListener = async() => {
        const spawnBtn = document.querySelector('#spawnBtn')
        spawnBtn.addEventListener('click', (event) => {
            this.spawnWave()
            spawnBtn.style.display = 'none'
        })
        
      
    }
    spawnWave = async() =>{
        
        await this.createAllWavesOfMonsters()
        //spawn 1st wave if button is clicked
        // for(let j = 0; j < this.allWavesOfMonsters.length; j++){
        //     let waveCount = 0

            for(let i = 0; i < this.waveOfMonsters.length; i++){
                let model = this.waveOfMonsters[i].model.scene
                // console.log(this.waveOfMonsters[i])
                model.position.y = .8
                model.position.x = -8
                model.position.z = -10    
                model.scale.set(1,1,1)    
                this.scene.add(model)
                this.animateAlongPath(this.waveOfMonsters[i])
                // waveCount ++
                await this.pause(1000 + Math.random()* 2000)
            }

        // }
        
    }

    createWaveOfMonsters() {
        //create a single wave of 5 monsters
        for(let i = 0; i < 5; i++){
            let monster = new Monster(this.monsters[i])  
            this.waveOfMonsters.push(monster)     
        }
        return this.waveOfMonsters
        // console.log(this.waveOfMonsters)
        
    }
    createAllWavesOfMonsters() {
        //create 10 waves of 5 monsters
   
        const newWave = this.createWaveOfMonsters() 
            for(let i = 0; i < 10; i++){  
                this.allWavesOfMonsters.push(newWave)
            }

        console.log(this.allWavesOfMonsters)
    }

    animateAlongPath  = (monster) => {
        // function difference(num1 , num2) {
        //     return Math.abs(num1-num2);
        //  } 
        monster.environmentRouteAnimation = gsap.timeline({defaults: { ease: "linear"}})
        monster.environmentRouteAnimation.to(monster.model.scene.position, { x: -8, z: -6, duration: 4/3})
        monster.environmentRouteAnimation.to(monster.model.scene.rotation, {duration: .2, y: Math.PI * .5}, '-=.2')
        monster.environmentRouteAnimation.to(monster.model.scene.position, { x: 4, z: -6, duration: 8/3})
        monster.environmentRouteAnimation.to(monster.model.scene.rotation, {duration: .2, y: 0}, '-=.2')
        monster.environmentRouteAnimation.to(monster.model.scene.position, { x: 4, z: 0, duration: 6/3})
        monster.environmentRouteAnimation.to(monster.model.scene.rotation, {duration: .2, y: Math.PI * -.5}, '-=.2')
        monster.environmentRouteAnimation.to(monster.model.scene.position, { x: -6, z: 0, duration: 10/3})
        monster.environmentRouteAnimation.to(monster.model.scene.rotation, {duration: .2, y: 0}, '-=.2')
        monster.environmentRouteAnimation.to(monster.model.scene.position, { x: -6, z: 6, duration: 6/3})
        monster.environmentRouteAnimation.to(monster.model.scene.rotation, {duration: .2, y: Math.PI * .5}, '-=.2')
        monster.environmentRouteAnimation.to(monster.model.scene.position, { x: 6, z: 6, duration: 12/3})
        monster.environmentRouteAnimation.to(monster.model.scene.rotation, {duration: .2, y: 0}, '-=.2')
        monster.environmentRouteAnimation.to(monster.model.scene.position, { x: 6, z: 8, duration: 2/3})

       

    }
    hideCharacter = () =>{
        let scoreText = 9
        document.getElementById('lives-text').innerText = scoreText;
        this.waveOfMonsters.forEach(monster => {
            if(monster.mesh.position.x == 6 && monster.mesh.position.z == 8){
                this.scene.remove(monster.mesh)
                
                scoreText -= 1
                document.getElementById('lives-text').innerText = scoreText;
            }
        });
    }
    killCharacter() {
        let moneyText = 1000
        document.getElementById('money-text').innerText = moneyText;
        this.waveOfMonsters.forEach(monster => {
            if(monster.health < 0){
                
                monster.environmentRouteAnimation.pause();

                monster.deathAnimation = gsap.timeline({defaults: {ease: "linear"}})
                monster.deathAnimation.to(monster.model.scene.position, { y: 5})
               
                this.scene.remove(monster.mesh)
                moneyText += 500
                document.getElementById('money-text').innerText = moneyText;
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