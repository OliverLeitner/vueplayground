<template>
  <div id="scene-container" ref="sceneContainer"></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import * as THREE from "three"
import Stats from "stats.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
// DRACO doesnt seem to work with current vuejs
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { Scene } from "three"

/*export interface IPerspectiveCamera {
  fov: Number
  aspect: Number
  near: Number
  far: Number
}*/

@Options({
  name: "RenderCanvas",
  methods: {
    // the following has to be in here
    // if i place it in the ts class, it fails badly
    render() {
      this.renderer.render(this.scene, this.camera)
      this.stats.update()
    },
  },
})
export default class RenderCanvas extends Vue {
  gtfLoader: GLTFLoader = new GLTFLoader()
  dracoLoader: DRACOLoader = new DRACOLoader()
  container: HTMLDivElement
  scene: any
  camera: any
  renderer: any
  controls: any
  stats: any

  protected loadMyData() {
    // DRACO seems to be broken with current vuejs, no compressed glb's for now
		this.dracoLoader.setDecoderPath('../../node_modules/draco3d/')
    this.dracoLoader.setDecoderConfig({ 
      type: 'js',
    })
    this.dracoLoader.setWorkerLimit(100)
    this.dracoLoader.preload()
		this.gtfLoader.setDRACOLoader(this.dracoLoader)
    this.gtfLoader.setCrossOrigin('anonymous')
    this.gtfLoader.load(
        'three-models/BarramundiFish.glb',
        gltf => {
          // console.log(gltf)
          this.scene.add(gltf.scene.children[0])
          // Release decoder resources.
				  this.dracoLoader.dispose();
        },
        undefined,
        undefined
    )
  }

  // adding the camera
  protected addCamera() {
    const fov = 5 // Field of view
    const aspect = this.container.clientWidth / this.container.clientHeight
    const near = 0.1 // the near clipping plane
    const far = 300 // the far clipping plane
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(5, 5, 5)
    this.camera = camera
  }

  // add lights
  protected addLights() {
    const ambientLight = new THREE.HemisphereLight(
      0xffffff, // bright sky color
      0x222222, // dim ground color
      1 // intensity
    )
    const mainLight = new THREE.DirectionalLight(0xffffff, 4.0)
    mainLight.position.set(10, 10, 10)
    this.scene.add(ambientLight, mainLight)
  }

  // renderer preparation
  protected prepRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.caching = true
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    )
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.gammaFactor = 2.2
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.shadowMap.enabled = true
    this.renderer.physicallyCorrectLights = true
    this.container.appendChild(this.renderer.domElement)
  }

  init() {
    // set container
    this.container = <HTMLDivElement>this.$refs.sceneContainer
    THREE.Cache.enabled = true // caching

    // add stats
    this.stats = new Stats();
    this.container.appendChild(this.stats.dom)

    // add camera
    this.addCamera()

    // create scene
    this.scene = new THREE.Scene()
   
    // garbage collection
    this.scene.__lights = { length: 0, push: function(){}, indexOf: function (){ return -1 }, splice: function(){} }
    this.scene.__objectsAdded = { length: 0, push: function(){}, indexOf: function (){ return -1 }, splice: function(){} }
    this.scene.__objectsRemoved = { length: 0, push: function(){}, indexOf: function (){ return -1 }, splice: function(){} }

    this.scene.background = new THREE.Color(0x4275c7) // define the background color

    // add lights
    this.addLights()

    // add controls
    this.controls = new OrbitControls(this.camera, this.container)

    // create renderer
    this.prepRenderer()

    // set aspect ratio to match the new browser window aspect ratio
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    )

    // prepping the loader
    this.loadMyData()

    this.renderer.setAnimationLoop(() => {
      this.render()
    })
  }

  // main
  mounted() {
    if (!this.container) this.init()
  }

  // garbage collection pt 2
  beforeUnmount() {
    this.gtfLoader = new GLTFLoader()
    this.dracoLoader.dispose
    this.container = undefined
    this.scene = new Scene()
  }
}
</script>

<style scoped lang="less">
#scene-container {
  height: 500px;
  width: 600px;
  margin: auto;
}
</style>