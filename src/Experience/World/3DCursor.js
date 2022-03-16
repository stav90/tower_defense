import Experience from '../Experience'
import * as THREE from 'three'
import {createTowerGui_open, createTowerGui_close , infoTowerGui_open, infoTowerGui_close} from '../Utils/Gui'

 export default class Cursor {
    constructor(clickableObjects, towerManager, cursorValid, towerMesh) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer.instance
        this.resources = this.experience.resources
        this.camera = this.experience.camera.instance
        this.clickableObjs = clickableObjects
        this.towerManager = towerManager
        this.cursorValid = cursorValid
        this.towerMesh = towerMesh.tower_mesh

        this.resource = this.resources.items.target
        // console.log(this.resource)
        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMouseEventListeners()
        this.setMesh()
        this.setModel()
        this.guiOptions()
    }
    setGeometry() {
        this.geometry = new THREE.BoxGeometry( 0.5, 4, 0.5 ); // height 4
    }
    setTextures() {

    }
    setMaterial() {
        this.material = new THREE.MeshLambertMaterial({ transparent : true , opacity : 0 , color : 0xc0392b});
    }
    setMouseEventListeners(){
        // document.addEventListener( 'pointerdown', this.onMouseDown, false );
        // document.addEventListener( 'pointerup', this.onMouseUp, false ); 

        this.renderer.domElement.addEventListener('pointerdown', this.onMouseDown, false);
        this.renderer.domElement.addEventListener('pointerup', this.onMouseUp, false);
    }
    setModel() {
        this.cursorTarget = this.resource.scene
        this.cursorTarget.position.set( 0,.5,0 );
        this.cursorTarget.scale.set(.5, .5, .5 );
        this.scene.add(this.cursorTarget)
        
        this.cursorTarget.traverse((child) => {
            if(child instanceof THREE.Mesh){
                child.castShadow = true
                child.material = this.material
                // console.log(child.material)
            }
        })
        
    }
    guiOptions = () => {
        document.getElementById("buttonyes").addEventListener('click', (event) => {
            event.stopPropagation();
        
            var tmpTower = this.towerManager.newTowerMeshToCreate;
            // console.log( this.towerManager.newTowerMeshToCreate)
            this.scene.add(tmpTower);
            this.towerManager.addTower(tmpTower);
            this.towerManager.newTowerMeshToCreate = undefined;
            createTowerGui_close();
        });

        document.getElementById("buttonno").addEventListener('click', (event) =>{
            event.stopPropagation();
            this.towerManager.newTowerMeshToCreate = undefined;
            createTowerGui_close();
        });

        document.getElementById("buttondelete").addEventListener('click', (event) =>{
            event.stopPropagation();
            this.towerManager.deleteTower(this.towerManager.selectedTower);
            this.scene.remove(this.towerManager.selectedTower.mesh);
            infoTowerGui_close();
            this.towerManager.selectedTower = undefined;
        });

        document.getElementById("buttonclose").addEventListener('click', (event) =>{
            event.stopPropagation();
            infoTowerGui_close();
        });
    }
    onMouseUp = (event) => {
        // console.log('pointerup')
        this.material.emissive.g = 0;
        // console.log(this.towerManager.newTowerMeshToCreate)
        this.towerManager.newTowerMeshToCreate = undefined;
        this.towerManager.selectedTower = undefined;

        if( this.cursorValid) {
            var checkTower =  this.towerManager.getTowerAtPosition(this.cursorTarget.position.x, this.cursorTarget.position.z);
            // var checkDistance = this.towerManager.getDistanceToEnemy()
            // console.log("distance", checkDistance)
            if(checkTower == null){
                    
                    var newtower = this.towerMesh.clone();
                    // console.log("this.towermesh", this.towerManager)
                    newtower.position.set( this.cursorTarget.position.x, 1 , this.cursorTarget.position.z);
                    this.towerManager.newTowerMeshToCreate = newtower;
                    infoTowerGui_close();
                    createTowerGui_open();
                }
        }
        if(checkTower == null) {

        }
        else 
        {
            this.towerManager.selectedTower = checkTower;
            createTowerGui_close();
            infoTowerGui_open(checkTower.mesh.position.x, checkTower.mesh.position.z);
        }

        
    }
  
    onMouseDown = (event) => {

        event.preventDefault();
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        
        // Checking if the mouse projection is targeting a valid block in the clickableObjs array
        this.raycaster.setFromCamera( this.mouse, this.camera);
        // console.log(this.clickableObjs)
        var intersects = this.raycaster.intersectObjects( this.clickableObjs ); // get the list of targetable objects currently intersecting with raycaster
        // console.log(intersects)

        if ( intersects.length > 0 ) {// If there is a match mouse/block (if the array is not empty)
        
            var SelectedBloc = intersects[ 0 ].object; // we choose the first targetable element
            
            this.cursorTarget.position.set(SelectedBloc.position.x, SelectedBloc.position.y + 1, SelectedBloc.position.z);
            this.material.opacity = 0.5;
            this.material.emissive.g = 0.5;

            this.cursorValid = true;

        }
        else {// no valid block is targeted
            this.material.opacity = 0;
            this.cursorValid = false;
        }
        // console.log('pointerdown')

        
    }
    setMesh() {
        this.cursor_cube = new THREE.Mesh( this.geometry, this.material );
        // this.scene.add(this.cursor_cube);
    }

 }

 


