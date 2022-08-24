import React, { useRef, useState, Suspense, useEffect } from "react";
import {
  Engine,
  Scene,
  useBeforeRender,
  useClick,
  useHover,
  Model, 
  useScene,
  useCamera,
  Skybox
} from "react-babylonjs";
import '@babylonjs/loaders'
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { SceneLoader, Animation, SineEase, EasingFunction, Color4, ShadowGenerator } from "@babylonjs/core"
import Image from 'next/image'
import PlayIcon from '../../../images/play.png'
import ResetIcon from '../../../images/stop-359-1180646.png'
import RotateIcon from '../../../images/rotate-icon-5-removebg-preview.png'
import MultiImageIcon from '../../../images/MultiImageIcon.png'
import { AnimationMixer, Audio, AudioAnalyser, AudioListener, AudioLoader, Object3D } from "three"
const DefaultScale = new Vector3(1, 1, 1);
const BiggerScale = new Vector3(1.25, 1.25, 1.25);

const frames_per_second = 24
const total_frames = 1 * frames_per_second
  
export function retarget_and_move_camera (scene, camera, new_target, new_position = null)
{
    const diff = new_target.subtract(camera.target)
    new_position = new_position || camera.position.add(diff)


    const animation_camera_target = new Animation(
        "animation_camera_target",
        "target",
        frames_per_second,
        Animation.ANIMATIONTYPE_VECTOR3,
        Animation.ANIMATIONLOOPMODE_CYCLE
    )

    const animation_camera_position = new Animation(
        "animation_camera_position",
        "position",
        frames_per_second,
        Animation.ANIMATIONTYPE_VECTOR3,
        Animation.ANIMATIONLOOPMODE_CYCLE
    )


    const animation_keys_camera_target = [
        { frame: 0, value: camera.target.clone() },
        { frame: total_frames, value: new_target },
    ]

    const animation_keys_camera_position = [
        { frame: 0, value: camera.position.clone() },
        { frame: total_frames, value: new_position },
    ]


    animation_camera_target.setKeys(animation_keys_camera_target)
    animation_camera_position.setKeys(animation_keys_camera_position)


    const ease_position = new SineEase()
    ease_position.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT)
    animation_camera_target.setEasingFunction(ease_position)
    animation_camera_position.setEasingFunction(ease_position)

    
    scene.beginDirectAnimation(camera, [
        animation_camera_target,
        animation_camera_position,
    ], 0, total_frames, false)
}
export function retarget_and_move_camera_to_include_mesh (scene, camera, mesh, boundingSphere)
{
    const field_of_view_angle = camera.fov
    const mesh_sphere = boundingSphere
    const size = mesh_sphere.radiusWorld
    const distance = (size) / Math.tan(field_of_view_angle/2)

    let new_position = camera.position.subtract(camera.target)
    let normal = new Vector3(0,0,1)
    new_position = normal.scale(distance)
    new_position.addInPlace(mesh_sphere.centerWorld)

    camera.setTarget(mesh_sphere.centerWorld)
    camera.setPosition(new_position)
}

const BabylonModelView = (
    {
        modelUrl = '',
        loadingWidth = "50%",
        loadingHeight = "35%",
        radius = '',
        isHasControl = true,
        allowChangeBackground = true,
    }
) => {
    const scene = useScene()
    const [loadingPercent, setLoadingPercent] = useState(0);
    const [currentLOD, setCurrentLOD] = useState()
    const cameraRef = useRef()
    const sceneRef = useRef()
    const canvasRef = useRef()
    const [loading, setLoading] = useState(true);
    const [animations, setAnimations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isRotate, setIsRotate] = useState(false);
    const inputUploadFile = useRef()
    const [backgroundBase64, setBackgroundBase64] = useState(null)
    const boundingBoxSphere = useRef()
    const currentRootMesh = useRef()
    const [music, setMusic] = useState(null);
    const directionalLightRef = useRef()

    useEffect(() => {
        const lodNames = ["Low", "Medium", "High"];

        let lodNext = null;

        SceneLoader.ShowLoadingScreen = true

        SceneLoader.OnPluginActivatedObservable.addOnce(function (loader) {
            if (loader.name !== "gltf") return;
            loader.useRangeRequests = true;
            loader.onExtensionLoadedObservable.add(function (extension) {
                if (extension.name !== "MSFT_lod") return;

                lodNext = 0;

                extension.on
                extension.onMaterialLODsLoadedObservable.add(function (index) {
                    setCurrentLOD("Viewing '" + lodNames[index] + "' LOD")
                    lodNext = index + 1;
                });

                extension.onNodeLODsLoadedObservable.add(function (index) {
                    setCurrentLOD("Viewing '" + lodNames[index] + "' LOD")
                    lodNext = index + 1;
                });
            });
        });

        loadMusic().then(rs => {
            setMusic(rs);
        })
    }, [])

    const loadMusic = () => {
        return new Promise(resolve => {
            const listener = new AudioListener()
            const music = new Audio(listener)
            const loader = new AudioLoader()

            loader.load('/SOUND_STORM_ANIMATION.mp3', buffer => {
                music.setBuffer(buffer)
                music.setLoop(true)
                music.setVolume(0.1)

                resolve(music)
            })
        })
    }

    const onPlayResetAnimation = () => {
        if(animations.length > 0){
            animations.forEach(el => {
                if(!el._isStarted){
                    el.start(true, 1.0, el.from, el.to, false);       
                    if(music) {
                        music.play();
                    }     
                } else {
                    el.stop()
                    if(music) {
                        music.stop();
                    }
                    
                }
            })
        }
    }
    const onResetGroup = () => {
        setIsRotate(false)
        retarget_and_move_camera_to_include_mesh(sceneRef.current, cameraRef.current, currentRootMesh.current, boundingBoxSphere.current)
    }

    const onUploadFile = (e) => {
        if (!e.target.files || !e.target.files[0]) return;

        const FR = new FileReader();
        FR.addEventListener("load", function (evt) {

            setBackgroundBase64(evt.target.result)
        });
        FR.readAsDataURL(e.target.files[0]);
    }

    const upLoadIconClick = () => {
        if(inputUploadFile.current){
            inputUploadFile.current.click()
        }
    }

    const onRemoveBg = () => { 
        setBackgroundBase64(null)
    }

    return (
        <>
            <Engine antialias adaptToDeviceRatio canvasId="babylon-canvas" style={{borderRadius: radius ? radius : '', outline: 'none'}}>
                <Scene clearColor={ new Color4(255,255,255,1)} 
                onSceneMount={(e) => {
                    sceneRef.current = e.scene
                    canvasRef.current = e.canvas
                }}
                onPrePointerObservable={(e) => {
                    e.event.preventDefault()
                }}
                >
                    <arcRotateCamera
                        ref={cameraRef}
                        name="camera1"
                        setActiveOnSceneIfNoneActive={true}
                        useAutoRotationBehavior={isRotate}
                        alpha={Math.PI / 2} beta={Math.PI / 2}
                        radius={0.05} target={Vector3.Zero()} minZ={0.001}
                        lowerRadiusLimit={1}
                        wheelPrecision={10}
                        idleRotationSpeed={Math.PI / 2}
                    />
                    <hemisphericLight
                        name="light1"
                        intensity={0.005}
                        position={new Vector3(10, 10, 10)}
                        direction={Vector3.Down()}
                    />
                    <hemisphericLight
                        name="light1"
                        intensity={0.005}
                        position={new Vector3(10, -10, 10)}
                        direction={Vector3.Up()}
                    />
                    <directionalLight ref={directionalLightRef} intensity={0.015} position={new Vector3(3, 10, 10)} direction={new Vector3(0, -1, 0)} shadowEnabled={true}/>
                    {/* <ground width={10} height={10} receiveShadows={true}>
                        <standardMaterial specularColor={new Color3(0, 0, 0)} emissiveColor={new Color3(0.2, 0.2, 0.2)}>

                        </standardMaterial>
                    </ground> */}
                    {backgroundBase64 && <layer isBackground={true} imgUrl={backgroundBase64}/>}
                    {modelUrl && <Suspense fallback={null} >
                        <Model
                            rootUrl={modelUrl}
                            pluginExtension=".glb" 
                            alwaysSelectAsActiveMesh={true}
                            onLoadProgress={
                                (e) => {
                                    setLoadingPercent(Math.floor(event.loaded / event.total * 100))
                                }
                            }
                            onModelLoaded={
                                (e) => {
                                    setLoading(false)
                                    boundingBoxSphere.current = e.boundingInfo.boundingSphere
                                    e.meshes.forEach(o => {
                                        if(o.name.toLowerCase().includes('pod') || o.name.toLowerCase().includes('ground')){
                                            o.receiveShadows = true;
                                        } else {
                                            var shadowGenerator00 = new ShadowGenerator(512, directionalLightRef.current);
                                            shadowGenerator00.getShadowMap().renderList.push(o);
                                            shadowGenerator00.useContactHardeningShadow = true;
                                            shadowGenerator00.contactHardeningLightSizeUVRatio = 0.0075;
                                        }
                                    })
                                    if(sceneRef.current.animationGroups.length > 0){
                                        setAnimations([sceneRef.current.animationGroups[0]])
                                        if(sceneRef.current.animationGroups[0]._isStarted){
                                            sceneRef.current.animationGroups[0].stop()
                                        }
                                    }
                                    currentRootMesh.current = e.rootMesh
                                    sceneRef.current.materials.forEach(el => {
                                        el._albedoColor = new Color3(255, 255, 255)
                                    })
                                    retarget_and_move_camera_to_include_mesh(sceneRef.current, cameraRef.current, e.rootMesh, boundingBoxSphere.current)
                                }
                            }
                        />
                    </Suspense>}
                </Scene>
            </Engine>
            {
               (!loading && isHasControl) && <div
                    className="control-group"
                >
                    {
                        animations && animations.length > 0 && <div className="control__control-group" style={{ margin: 0 }} onClick={onPlayResetAnimation}>
                            <Image className="reset" alt="" src={PlayIcon} style={{ opacity: 0.3 }} />
                        </div> 
                    }
                    <div className="control__control-group" onClick={onResetGroup} style={ animations && animations.length > 0 ? {} : {margin: 0}}>
                        <Image className="reset" alt="" src={ResetIcon} style={{opacity: 0.3}}/>
                    </div>
                    {
                        allowChangeBackground && <div className="control__control-group"
                        onClick={() => setShowModal(true)}
                         >
                            <Image className="reset" alt="" src={MultiImageIcon} style={{ opacity: 0.3 }} />
                        </div>
                    }
                    <input type='file' onChange={e => onUploadFile(e)} ref={inputUploadFile} accept="image/png, image/jpeg, image/jpg" hidden/>
                    <div className="control__control-group" onClick={() => setIsRotate(!isRotate)}>
                        <Image alt="" src={RotateIcon} style={{opacity: 0.3}}/>
                    </div>
                </div>
            }
            {
                loading && <div className="loading-spin__container" style={{ borderRadius: radius }}>
                    {/* {
                        modelUrl && <><ReactLoading type={'bars'} color={'black'} height={'20%'} width={'20%'} />
                            <div>{`${loadedPercent}%`}</div></>
                    } */} 
                    {
                        modelUrl && <div className="loading-spin__img" style={{ border: radius, width: loadingWidth, height: loadingHeight }}></div>
                    }
                    {
                        !modelUrl && <div>No item</div>
                    }
                    
                </div>
            }
            {
                showModal && <>
                <div style={{
                width: '100%',
                height: '100%',
                zIndex: 3,
                position: 'absolute',
                top: 0,
                left: 0,
                background: 'white',
                borderRadius: radius,
                opacity: 0.5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            </div>
            <div style={{
                width: '100%',
                height: '100%',
                zIndex: 3,
                position: 'absolute',
                top: 0,
                left: 0,
                borderRadius: radius,
                opacity: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}
            onClick={() => setShowModal(false)}>
                <div className="btn-update-bg" onClick={upLoadIconClick}>Add Background</div>
                {
                    backgroundBase64 && <div className="btn-update-bg" style={{ marginTop: 25}} onClick={onRemoveBg}>Remove Background</div>
                }
            </div></>
            }
            {/* <div style={{position: 'absolute', bottom: '10px', color: 'black'}}>
                {loadingPercent}
            </div>
            <div style={{position: 'absolute', bottom: '10px', color: 'black', right: 0}}>
                {currentLOD}
            </div> */}
        </>
    )
}
export default BabylonModelView;