import Experience from '../Experience'
import * as THREE from 'three'
import gsap from 'gsap'

 export default class Cube {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }
    setGeometry() {
        this.geometry = new THREE.BoxGeometry(1, 1, 1)
  
        
    }
    setTextures() {
        this.textures = {}
        this.textures.color = this.resources.items.grassColorTexture
        this.textures.color.encoding = THREE.sRGBEncoding
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping
        
        this.textures.normal = this.resources.items.grassNormalTexture
        this.textures.normal.repeat.set(1.5, 1.5)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping
    }
    setMaterial() {
        this.material = new THREE.MeshBasicMaterial({
           
        })
        this.material.color = {r: 1, g: 0, b:1}
    }
    setMesh() {
        // this.mesh = new THREE.Mesh(this.geometry, this.material)
        // this.mesh.position.y = 12
        // this.mesh.position.x = -16
        // this.mesh.receiveShadow = true
        // this.scene.add(this.mesh)

        this.resource = this.resources.items.heart
        this.heartModel = this.resource.scene
        this.heartModel.position.x = 6
        this.heartModel.position.y = 7
        this.heartModel.position.z = -6
        // this.heartModel.position.x = -18
        // this.heartModel.position.z = 10
        // this.heartModel.rotation.y = Math.PI * .1
        // console.log(this.heartModel)
        // this.heartModel.traverse((child)=> {
        //     child.material = this.material
        // })
        this.heartModel.scale.set(.25,.25,.25)  
        gsap.to(this.heartModel.rotation, {duration: 3, y: Math.PI * 2, repeat: -1, ease: 'linear'})
        this.scene.add(this.heartModel)

        this.resource2 = this.resources.items.coin
        this.coinModel = this.resource2.scene
        this.coinModel.position.x = 8
        this.coinModel.position.y = 7
        this.coinModel.position.z = -8
        this.coinModel.scale.set(.6,.6,.6) 
        gsap.to(this.coinModel.rotation, {duration: 7, y: Math.PI * 2, repeat: -1, ease: 'linear'})
        this.scene.add(this.coinModel)

    }
 }