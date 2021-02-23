<template>
  <div>
    <div id="scene-container" ref="sceneContainer" v-bind="config"></div>
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

export interface IConfig {
  camPerspective: IPerspectiveCamera
  camPosition: IVector,
  mainLightPosition: IVector
}

export class ConfigData implements IConfig {
  constructor(
    public camPerspective: PerspectiveCameraData = new PerspectiveCameraData(5, 0.1, 300),
    public camPosition: VectorData = new VectorData(),
    public mainLightPosition: VectorData = new VectorData(10, 10, 10)
  ) {}
}

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
    config: <ConfigData>{
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
  config: ConfigData = new ConfigData(
    this.camPerspective,
    this.camPosition,
    this.mainLightPosition
  )
  gtfLoader: GLTFLoader = new GLTFLoader();
  // TODO: fix draco with vuejs 3
  // dracoLoader: DRACOLoader = new DRACOLoader();
  container: HTMLDivElement;
  scene: Scene; // normally id do new Scene() here, however, that breask functionality
  camera: PerspectiveCamera;
  renderer: WebGLRenderer = new WebGLRenderer({ antialias: true, alpha: true });
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
      // TODO: camPerspective inputs to value out
      this.camPerspective.fov, // field of view
      this.container.clientWidth / this.container.clientHeight, // aspect ratio 
      this.camPerspective.near,  // near clipping plane
      this.camPerspective.far // far clipping plane
    );
    this.camera.position.set(
      this.config.camPosition.x,
      this.config.camPosition.y,
      this.config.camPosition.z
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
      // TODO: mainlightpositions to config out
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

    // this aint gonna work with current three scene def
    /*if ( this.renderer instanceof THREE.WebGLRenderer ) {
      this.scene.__lights = { length: 0, push: function(){}, indexOf: function (){ return -1 }, splice: function(){} }
      this.scene.__objectsAdded = { length: 0, push: function(){}, indexOf: function (){ return -1 }, splice: function(){} }
      this.scene.__objectsRemoved = { length: 0, push: function(){}, indexOf: function (){ return -1 }, splice: function(){} }
    }*/

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
    this.renderer.renderLists.dispose()
    this.gtfLoader = new GLTFLoader();
    // this.dracoLoader.dispose;
    this.container = undefined;
    if (this.scene)
      this.scene.children.forEach((child) => {
        this.scene.remove(child)
      })
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
    // this.gcCleanup()
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