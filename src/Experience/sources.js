export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMap/px.jpg',
            'textures/environmentMap/nx.jpg',
            'textures/environmentMap/py.jpg',
            'textures/environmentMap/ny.jpg',
            'textures/environmentMap/pz.jpg',
            'textures/environmentMap/nz.jpg'
        ]
    },
    {
        name: 'grassColorTexture',
        type: 'texture',
        path: 'textures/dirt/color.jpg'
    },
    {
        name: 'grassNormalTexture',
        type: 'texture',
        path: 'textures/dirt/normal.jpg'
    },
    {
        name: 'mikModel',
        type: 'gltfModel',
        path: '/models/Fox/glTF/mik-char4.gltf'
    },
    {
        name: 'target',
        type: 'gltfModel',
        path: '/models/Fox/glTF/target.gltf'
    },
    {
        name: 'tower',
        type: 'gltfModel',
        path: '/models/Fox/glTF/tower_defense_turret.gltf'
    },
    {
        name: 'alien',
        type: 'gltfModel',
        path: '/models/Monsters/alien.gltf'
    },
    {
        name: 'demon',
        type: 'gltfModel',
        path: '/models/Monsters/Demon.gltf'
    },
    {
        name: 'pig',
        type: 'gltfModel',
        path: '/models/Monsters/Pig.gltf'
    },
    {
        name: 'yeti',
        type: 'gltfModel',
        path: '/models/Monsters/Yeti.gltf'
    },
    {
        name: 'cyclops',
        type: 'gltfModel',
        path: '/models/Monsters/Cyclops.gltf'
    }
]

export const map0_data = {
    "data" : [
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
    ]
  }