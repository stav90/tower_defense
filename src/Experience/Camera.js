import Experience from './Experience'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        
        this.setInstance()
        this.setOrbitControls()
    }

    setInstance() {
        // this.instance = new THREE.PerspectiveCamera(35, this.sizes.width /this.sizes.height, 0.1, 100)
        // this.instance.position.set(12, 14, 18)
        // this.scene.add(this.instance)


        // ---------------- CAMERA ----------------
        const aspect = window.innerWidth / window.innerHeight;
        const frustumSize = 15;
        this.instance = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );
        this.instance.position.set( -15, 10, -15 );
        this.instance.lookAt(new THREE.Vector3(0,0,0));
        this.scene.add( this.instance );
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        this.controls.update()
    }
}