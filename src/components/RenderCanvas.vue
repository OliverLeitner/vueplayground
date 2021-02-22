<template>
  <div>
    <!-- for some reason, if i dont have the following line
         i wont get the updated val into this component -->
    <p style="display: none">{{camPosition}}</p>
    <div id="scene-container" ref="sceneContainer"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import * as THREE from "three"; // TODO: solve caching in another way
import Stats from "stats.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// DRACO doesnt seem to work with current vuejs
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  DirectionalLight,
  HemisphereLight,
  sRGBEncoding,
  Color,
} from "three";

export interface IPerspectiveCamera {
  fov: number
  aspect?: number
  near: number
  far: number
}

export class PerspectiveCameraData implements IPerspectiveCamera {
  constructor(
    public fov: number = 5,
    public aspect?: number,
    public near: number = 0.1,
    public far: number = 300
  ) {}
}

export interface IVector {
  x: number,
  y: number,
  z: number
}

export class VectorData implements IVector {
  constructor(
    public x: number = 5,
    public y: number = 5,
    public z: number = 5
  ) {}
}

@Options({
  name: "RenderCanvas",
  props: {
    camPerspective: <PerspectiveCameraData>{
      fov: 5,
      near: 0.1,
      far: 300
    },
    camPosition: <VectorData>{
      x: 5,
      y: 5,
      z: 5
    },
    mainLightPosition: <VectorData>{
      x: 10,
      y: 10,
      z: 10
    }
  },
  methods: {
    // the following has to be in here
    // if i place it in the ts class, it fails badly
    render() {
      this.renderer.render(this.scene, this.camera);
      this.stats.update();
    },
  },
})
export default class RenderCanvas extends Vue {
  camPerspective: PerspectiveCameraData = new PerspectiveCameraData()
  camPosition: VectorData = new VectorData()
  mainLightPosition: VectorData = new VectorData(10, 10, 10)
  gtfLoader: GLTFLoader = new GLTFLoader();
  // TODO: fix draco with vuejs 3
  // dracoLoader: DRACOLoader = new DRACOLoader();
  container: HTMLDivElement;
  scene: Scene; // normally id do new Scene() here, however, that breask functionality
  camera: PerspectiveCamera;
  renderer: WebGLRenderer = new WebGLRenderer({ antialias: true });
  controls: OrbitControls;
  stats: Stats = new Stats();

  protected loadMyData() {
    // DRACO seems to be broken with current vuejs, no compressed glb's for now
    /*this.dracoLoader.setDecoderPath(
      "/node_modules/three/examples/js/libs/draco/gltf/"
    );
    this.dracoLoader.setDecoderConfig({ 
      type: 'js',
    })
    this.dracoLoader.setWorkerLimit(100);
    this.dracoLoader.preload();
    this.gtfLoader.setDRACOLoader(<DRACOLoader>this.dracoLoader);*/
    this.gtfLoader.setCrossOrigin("anonymous");
    this.gtfLoader.load(
      "three-models/BarramundiFish.glb",
      (gltf) => {
        // console.log(gltf);
        this.scene.add(gltf.scene/*.children[0]*/);
        // Release decoder resources.
        // this.dracoLoader.dispose();
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );
  }

  // adding the camera
  protected addCamera() {
    this.camera = new PerspectiveCamera(
      this.camPerspective.fov, // field of view
      this.container.clientWidth / this.container.clientHeight, // aspect ratio 
      this.camPerspective.near,  // near clipping plane
      this.camPerspective.far // far clipping plane
    );
    this.camera.position.set(
      this.camPosition.x,
      this.camPosition.y,
      this.camPosition.z
    );
  }

  // add lights
  protected addLights() {
    const ambientLight = new HemisphereLight(
      0xffffff, // bright sky color
      0x222222, // dim ground color
      1 // intensity
    );
    const mainLight = new DirectionalLight(0xffffff, 4.0);
    mainLight.position.set(
      this.mainLightPosition.x, 
      this.mainLightPosition.y, 
      this.mainLightPosition.z
    );
    this.scene.add(ambientLight, mainLight);
  }

  // renderer preparation
  protected prepRenderer() {
    this.renderer.dispose()
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.gammaFactor = 2.2;
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.shadowMap.enabled = true;
    this.renderer.physicallyCorrectLights = true;
    this.container.appendChild(this.renderer.domElement);
  }

  init() {
    // cleanup existing container data
    this.gcCleanup()

    // set container
    this.container = <HTMLDivElement>this.$refs.sceneContainer;

    // enable caching
    THREE.Cache.enabled = true;

    // append frame stats top-left
    this.container.appendChild(this.stats.dom);

    // add camera
    this.addCamera();

    // create a fresh scene
    this.scene = new Scene();
    // define the background color, current is navy
    this.scene.background = <Color>new Color(0x4275c7);

    // add lights
    this.addLights();

    // add controls
    this.controls = new OrbitControls(this.camera, this.container);

    // create renderer
    this.prepRenderer();

    // prepping the loader
    this.loadMyData();

    // and showing things in output
    this.renderer.setAnimationLoop(() => {
      this.render();
    });
  }

  // cleanup
  protected gcCleanup() {
    this.renderer.dispose()
    this.gtfLoader = new GLTFLoader();
    // this.dracoLoader.dispose;
    this.container = undefined;
    this.scene = new Scene();
  }

  // main
  mounted() {
    if (!this.container) this.init();
  }

  beforeUnmount() {
    this.gcCleanup()
  }

  // on value received from parent
  updated() {
    this.gcCleanup()
    this.init()
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