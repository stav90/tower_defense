import * as THREE from 'three'
import Experience from '../Experience'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'

export default class Obstacles {
    constructor () {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.objects = []
        // this.setupText()
        this.loadObstacles()
    }
    
    loadObstacles() {
        const obstacleText = [
            'Make It Pop More',
            'I’ll know What I Want Once I see it.',
            "That Doesn't Look Premium",
            'Needs To Be More Playful',
            "Thats A Font Not A Logo",
            ,
            
        ]
        for(let i = 0; i < 5; i++){
            const textureLoader = new THREE.TextureLoader()
            const matcapTexture = textureLoader.load(`textures/matcaps/${i + 1}.png`)

            const fontLoader = new FontLoader()

            fontLoader.load(
                '/fonts/helvetiker_regular.typeface.json',
                (font) =>
                {
                    // Material
                    const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

                    // Text
                    const textGeometry = new TextGeometry(
                        obstacleText[i],
                        {
                            font: font,
                            size: 1.5,
                            height: .5,
                            curveSegments: 12,
                            bevelEnabled: true,
                            bevelThickness: 0.03,
                            bevelSize: 0.02,
                            bevelOffset: 0,
                            bevelSegments: 5
                        }
                    )
                    textGeometry.center()

                    const text = new THREE.Mesh(textGeometry, textMaterial)
                    text.position.y = .75

                    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
                    text.position.z = -10 + (i * random(-10, -8))
                    const box = new THREE.Box3();
                    box.setFromObject(text);
                    const helper = new THREE.Box3Helper( box, 0xffff00 );
                    // this.scene.add( helper );

                    this.obj = {
                        mesh: text,
                        box: box,
                    }
                    
                    this.objects.push(this.obj)
                    this.scene.add(text)

                }
            )
   
        }
       
      
        // this.scene.add(this.objects)
    }

    update(time) {
        this.objects.forEach(obj => {
            if(!this.experience.gameOver){
                obj.mesh.position.z += .1 
            }else{
                // obj.mesh.position.z += .05 
            }
            
            // console.log(this.time.elapsed)
            obj.box.copy( obj.mesh.geometry.boundingBox ).applyMatrix4( obj.mesh.matrixWorld );

            // if(obj.mesh.position.z > 50){
            //     this.loadObstacles()
            // }
        });

        
    }
}