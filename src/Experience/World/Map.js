import Experience from '../Experience'
import * as THREE from 'three'
import {map0_data} from '../sources'
import { sRGBEncoding } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


 export default class Map {
    constructor(clickableObjects) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.mapdata = map0_data
        
        this.clickableObjs = clickableObjects;
        // this.setGeometry()
        // this.setTextures()
        // this.setMaterial()
        // this.setMesh()
        
        this.loadMap( )
        this.loadMapModel()
    }
    loadMap() {
        var size_Y = this.mapdata.data.length;
        var size_X = this.mapdata.data[0].length;


        const material = new THREE.MeshLambertMaterial();
        const geometry = new THREE.BoxGeometry(1.99,1.99,1.99);
        var basic_cube = new THREE.Mesh(geometry, material);

        const road_material = new THREE.MeshLambertMaterial({color : 0x2c3e50});
        var road_cube = new THREE.Mesh(geometry, road_material);

        for(var x  = 0 ; x < size_X ; x++)
        {
            for(var y = 0 ; y < size_Y ;  y++)
            {
                var posx = (x*2) - (size_X/2)*2;
                var posy = (y*2) - (size_Y/2)*2;

                switch(this.mapdata.data[y][x])
                {
                case 0:
                    var tmpbloc = basic_cube.clone();
                    tmpbloc.position.set(posx, 0 , posy);
                    this.scene.add(tmpbloc);
                    // This element is targetable by Raycaster
                    this.clickableObjs.push(tmpbloc); 
             
                break;

                case 1 :
                    var tmpbloc = road_cube.clone();
                    tmpbloc.scale.y = 0.8;
                    tmpbloc.position.set(posx, -0.2 , posy);
                    // this.scene.add(tmpbloc);
                    // console.log(tmpbloc)
                break;
                }
            }
        }
    }
    loadMapModel() {
        const gltfLoader = new GLTFLoader()
        const bakedTexture = new THREE.TextureLoader().load('/models/Fox/glTF/baked.jpg')
        bakedTexture.flipY = false
        bakedTexture.encoding = sRGBEncoding
  
        const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture})
        gltfLoader.load(
            '/models/Fox/glTF/tower_defense_arena.glb',
            (gltf) =>
            {   

                gltf.scene.traverse((child) =>
                {
                    child.material = bakedMaterial
                })
             

                let arena = gltf.scene;
                arena.scale.set(2,2,2);
                arena.position.set(-1,-.9,-1);
                arena.rotation.y = Math.PI ;
                this.scene.add(arena)
            }
        )
    }
    setGeometry() {
        this.geometry = new THREE.CircleGeometry(5, 64)
    }
    setTextures() {

    }
    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            normalMap: this.textures.normal
        })
    }
    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * .5
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
 }



