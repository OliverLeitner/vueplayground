// three.js helper for the raycaster
import * as THREE from "three";
import { Object3D, Scene } from "three"

export class PickHelper {
    raycaster: THREE.Raycaster;
    pickedObject;
    pickedObjectSavedColor;
    camera;
    scene;
    renderer;
    position;

    constructor(position, camera, scene, renderer) {
        this.raycaster = new THREE.Raycaster();
        this.pickedObject = null;
        this.pickedObjectSavedColor = 0;
        this.position = position
        this.camera = camera
        this.scene = scene
        this.renderer = renderer
    }

    // from: https://github.com/SaFrMo/vue-three-wrap/blob/master/src/extras/raycaster.js
    cast(coordinates = null, camera = null) {
        if (!this.raycaster)
            return

        coordinates = coordinates || {
            x: this.position.x,
            y: this.position.y
        }

        camera = camera || this.camera

        this.raycaster.setFromCamera(
            new THREE.Vector2(coordinates.x, coordinates.y),
            camera
        )
    }

    protected sceneChildrenToTargetObjects(scene: Scene): Object3D[] {
        // console.log(this.raycaster) // lets find out
        console.log(this.position) // mousepos
        /*scene.children.forEach((child: Object3D) => {
            console.log(child.position) // mesh pos
        });*/
        return scene.children;
    }

    pick(time) {

        // get the list of objects the ray intersected
        this.cast(this.position, this.camera) // set this.raycaster

        // custom intersect
        // this.sceneChildrenToTargetObjects(this.scene)

        // restore the color if there is a picked object
        if (this.pickedObject) {
            this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
            this.pickedObject = undefined;
        }

        // TODO: find out, why no object selected, though we have children
        const intersectedObjects = this.raycaster.intersectObjects(this.scene.children, true);

        console.log(intersectedObjects)

        if (intersectedObjects.length) {
            // pick the first object. It's the closest one
            this.pickedObject = intersectedObjects[intersectedObjects.length].object;
            // console.log(this.pickedObject)
            this.pickedObject.material.wireframe = true
            this.renderer.render(this.scene, this.camera);
            // save its color
            // this.pickedObjectSavedColor = this.pickedObject.material.color.getHex();
            // console.log(this.pickedObjectSavedColor)
            // set its emissive color to flashing red/yellow
            // this.pickedObject.material.emissive.setHex((time * 8) % 2 > 1 ? 0xFFFF00 : 0xFF0000);
        }
    }
}