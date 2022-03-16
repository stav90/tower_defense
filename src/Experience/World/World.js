import Experience from "../Experience";
import Environment from './Environment'
import * as THREE from 'three'
import Floor from "./Floor";
import Cube from "./DefaultCube";
import Map from "./Map";
import Obstacles from './Obstacles'
import SpawnManager from "./SpawnManager";
import Cursor from "./3DCursor";
import TowerManager from './TowerManager.js'
import Tower from './Tower.js'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        
        this.clickableObjs =  new Array();
        this.tower_mesh = undefined; 
        this.cursorValid = false;
       
        this.resources.on('ready', () => {
             //Setup
            this.floor = new Floor()

            this.map = new Map(this.clickableObjs)
            // this.createTowerMesh()
            this.spawnManager = new SpawnManager()
            this.cube = new Cube()
            this.tower = new Tower(this.spawnManager)
            this.towerManager = new TowerManager(this.spawnManager);
            this.cursor = new Cursor(this.clickableObjs, this.towerManager, this.cursorValid, this.tower)
            // this.obstacles = new Obstacles()
              
            this.environment = new Environment()
            
        })
       
       
    }

    
    update() {
        if( this.spawnManager){
            this.spawnManager.update()
            this.towerManager.update(this.time.delta)
            this.tower.update(this.time.delta)
            
        }
        
    }
}