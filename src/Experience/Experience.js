import * as THREE from 'three'

import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'
import Resources from './Utils/Resources'
import Debug from './Utils/Debug'
import sources from './sources'

let instance  = null

export default class Experience
{
    constructor(canvas) {
        if(instance){
            return instance
        }
        instance = this
        //Global access
        window.experience = this
        
        //Options
        this.canvas = canvas
        // console.log(this.canvas)

        //Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        
        
        this.setUpGUI()
        // this.points = []

        //Sizes resize event
        this.sizes.on('resize', () => {
            this.resize()
        })
        //Time tick event
        this.time.on('tick', () => {
            this.update()
        })
    }
    setUpGUI(){
       this.points = [
        {
            position: new THREE.Vector3(6, 7, -6),
            element: document.querySelector('.point-0')
        },
        {
            position: new THREE.Vector3(8, 7, -8),
            element: document.querySelector('.point-1')
        },
        {
            position: new THREE.Vector3(-4, 1, -10),
            element: document.querySelector('.point-2')
        }
        ]
    }


    resize() {
        this.camera.resize()
        
        this.renderer.resize()

    }

    update() {
        this.camera.update()
        this.world.update()
        this.renderer.update()
     
          // Go through each point
        for(const point of this.points)
        {
  
            const screenPosition = point.position.clone()
            screenPosition.project(this.camera.instance)
            // console.log(screenPosition.x)
            const translateX = screenPosition.x * this.sizes.width * 0.5
            const translateY = - screenPosition.y * this.sizes.height * 0.5
            point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }

    }
}