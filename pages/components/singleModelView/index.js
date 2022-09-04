import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import {
    ContactShadows,
    Environment,
    useGLTF,
    OrbitControls,
    Html,
    useCamera,
    Bounds
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
    forwardRef,
    Suspense,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { Box3, BufferGeometry, Color, Group, sRGBEncoding, TextureLoader, Vector3, Texture, LoadingManager, TextureEncoding, AnimationMixer, DoubleSide, BackSide, FrontSide } from "three";
import Image from 'next/image'
import ResetIcon from '../../../images/stop-359-1180646.png'
import RotateIcon from '../../../images/rotate-icon-5-removebg-preview.png'
import MultiImageIcon from '../../../images/MultiImageIcon.png'
import CameraControls from "./cameraControls";
import RemoveBGIcon from '../../../images/remove-bg.png'
import ReactLoading from 'react-loading';
import ModelGroup from "./model";
import PlayIcon from '../../../images/play.png'

const figureConfig = {
    defaultScale: 0.35,
    addMaxScale: 0.2,
    addStepScale: 0.02
}

const ControlGroup = ({group, isRotate}) => {

    useFrame(() => {
        if(isRotate) {
            if(group){
                group.rotation.y += Math.PI/300
            }
        }
    })

    // function getAllMeshes(parent, visibleOnly = false) {
    //     let meshes = [];
    //     if (parent.children && parent.children.length > 0) {
    //       for (let child of parent.children) {
    //         if (child.isMesh) {
    //           if (!visibleOnly || (visibleOnly && child.visible)) {
    //             meshes.push(child);
    //           }
    //         }
    //         if (child.children && child.children.length > 0) {
    //           let childMeshes = getAllMeshes(child, visibleOnly);
    //           meshes.push(...childMeshes);
    //         }
    //       }
    //     }
    //     return meshes;
    //   }

    //   function fitCameraToObject(controls, sceneMeshes, fitToVisibleOnly = false) {

    //     sceneMeshes.updateMatrixWorld()
    //     const box = new Box3();

    //     let objects = getAllMeshes(sceneMeshes, fitToVisibleOnly);

    //     if(objects.length === 0){
    //         return;
    //     }

    //     for (const object of objects){
    //         box.expandByObject(object);
    //     }
    //     control.fitToBox(box, false, padding);
    //     control.saveState();
    // }

    // useEffect(() => {
    //     if(!control || !fitZoom || !group) return;
    //     fitCameraToObject(control, group, padding, true);
    // }, [fitZoom, control, group])

    return null;
}
const Background = ({base64}) => {
    const { scene } = useThree();

    function downloadImg(imgSrc) {
        return new Promise((resolve, reject) => {
          const img = document.createElement('img');
          img.crossOrigin = true;
          img.onerror = (e) => reject(e);
          img.onload = () => resolve(img);
          img.src = imgSrc;
        });
      }
    
    useEffect(() => {
      if(base64) {
        downloadImg(base64).then(img => {
            let texture = new Texture();
            texture.image = img;
            texture.needsUpdate = true;
            scene.background = texture;
        })
      }
      else {
        scene.background = null;
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [base64])
    return null;
  }

const SingleModelView = ({
    modelUrl = '',
    isHasBackground = true,
    zoom = 50,
    radius = '',
    isHasControl = true,
    hoverRotateAngle = 0,
    initCanvasConfig = {
        orthographic: true,
        shadows: true,
        orbitControls: {
            enableZoom: true,
            enablePan: true,
            enableRotate: true,
            minPolarAngle: -Math.PI,
            maxPolarAngle: Math.PI
        },
    },
    isShowProgress = false,
    onLoading,
    index,
    allowChangeBackground = true,
    isFitZoom = false,
    padding = {
        paddingTop: 0,
        paddingLeft: 0,
        paddingBottom: 0,
        paddingRight: 0
    },
    loadingWidth = "50%",
    loadingHeight = "35%",
    showLoadedPecent = false,
    loadingBackgroundUrl = ''
    }) => {
    // const [models, setModels] = useState(null);
    const inputUploadFile = useRef();
    const [backgroundBase64, setBackgroundBase64] = useState(null)
    const loadingProgress = useRef(0);
    const cameraRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [loadedPercent, setLoadedPercent] = useState(0);
    const [itemGroup, setItemGroup] = useState(null);
    const [canvasConfig, setCanvasConfig] = useState(initCanvasConfig);
    const controlRef = useRef();
    const groupRef = useRef();
    const modelRef = useRef();
    const [isRotate, setIsRotate] = useState(false);
    const [animations, setAnimations] = useState([]);

    const loadModel = (url) => {
        return new Promise(resolve => {

            const manager = new LoadingManager();
            const loader = new GLTFLoader(manager);
            let countLoad = 1;
            loader.load(url, function (data) {
                if(data.animations) {
                    setAnimations(data.animations)
                }

                data.scene.traverse((o) => {
                    if (o.isMesh) {
<<<<<<< HEAD
                        o.material.roughness = 0.8
=======
<<<<<<< HEAD
                        o.material.roughness = 0.8
=======
                        o.material.roughness = 1
>>>>>>> origin
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
                        o.material.transparent = true;
                        o.material.opacity = 0.1;
                        o.material.flatShading = false;
                        o.material.envMapIntensity = 0.1
                        o.position.set(0,o.position.y,0)
                        o.material.metalness = 0.8
                        
                        o.receiveShadow = true;
                        o.castShadow = true;

<<<<<<< HEAD
                        o.material.shadowSide = BackSide
=======
<<<<<<< HEAD
                        o.material.shadowSide = BackSide
=======
                        o.material.side = FrontSide
>>>>>>> origin
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
                    }
                });
                // data.scene.receiveShadow = true;
                // data.scene.castShadow = true;
                data.scene.userData = { ...data.scene.userData, name: url }
                resolve(data.scene)
            }, (e) => {
                if(e.total) {
                    setLoadedPercent(+(((e.loaded / e.total) * 100).toFixed(0)))

                    if(onLoading) {
                        if(countLoad == 1) {
                            loadingProgress.current = +(((e.loaded / e.total) * 100).toFixed(0));
                            onLoading(index, +(((e.loaded / e.total) * 100).toFixed(0)));
                        }
                    }

                    if(((e.loaded / e.total) * 100).toFixed(0) == "100") {
                        countLoad++;
                    }                    
                }
            })
        })
    }

    useEffect(() => {
        setLoadedPercent(0);
        // setModels(null);
        setItemGroup(null);
        if(modelUrl != null && !modelUrl.toLowerCase().includes("undefined")) {
            loadModel(modelUrl).then(models => {
            
                models.traverse((o) => {
                    if (o.isMesh) {
                        o.material = o.material.clone();
                        o.material.color = new Color("white");
                        o.material.transparent = true;
                        o.material.opacity = 1;
                    }
                });
                // setModels([models])
                onSelectModel(models)
            })
        }
    }, [modelUrl])

    useEffect(() => {
        if(groupRef.current) {
            groupRef.current.rotation.set(0,hoverRotateAngle,0)
        }
    }, [hoverRotateAngle, groupRef])

    useEffect(() => {
        if(cameraRef.current && initCanvasConfig) {
            if(!initCanvasConfig.orbitControls.enableZoom 
                && !initCanvasConfig.orbitControls.enableRotate
                && !initCanvasConfig.orbitControls.enablePan) {
                cameraRef.current.enabled = false;
            }
        }
    }, [cameraRef, initCanvasConfig])

    const itvRef = useRef();

    useEffect(() => {
        if(itemGroup) {
            itvRef.current = setInterval(() => {
                if(!isFitZoom || !cameraRef || !cameraRef.current) return;
                clearInterval(itvRef.current);
                setTimeout(() => {
                    fitCameraToObject(cameraRef.current, itemGroup, padding, true);
                }, 500);
            }, 100)
        }
    }, [itemGroup, animations])

    function getAllMeshes(parent, visibleOnly = false) {
        let meshes = [];
        if (parent.children && parent.children.length > 0) {
          for (let child of parent.children) {
            if (child.isMesh) {
              if (!visibleOnly || (visibleOnly && child.visible)) {
                meshes.push(child);
              }
            }
            if (child.children && child.children.length > 0) {
              let childMeshes = getAllMeshes(child, visibleOnly);
              meshes.push(...childMeshes);
            }
          }
        }
        return meshes;
      }

      function fitCameraToObject(controls, sceneMeshes,padding, fitToVisibleOnly = false) {

        sceneMeshes.updateMatrixWorld()
        const box = new Box3();
        let objects = animations.length > 0 ? getAllMeshes(sceneMeshes, fitToVisibleOnly).filter((item, idx) => item.isSkinnedMesh) : getAllMeshes(sceneMeshes, fitToVisibleOnly);

        if(objects.length === 0){
            return;
        }


        for (const object of objects){
            box.expandByObject(object);
        }

        const modelWidth = box.max.z - box.min.z;
        const modelHeight = box.max.y - box.min.y;
        const fitPadding = {
            paddingTop: padding.paddingTop * modelHeight,
            paddingLeft: padding.paddingLeft * modelWidth,
            paddingBottom: padding.paddingBottom * modelHeight,
            paddingRight: padding.paddingRight * modelWidth
        }

        if(controls){
            controls.fitToBox(box, false, fitPadding);
        }
        const minZoom = 93.52 / modelWidth
        controls.minZoom = minZoom

        setTimeout(() => {
            controls.saveState();
        }, 100);
    }

    const onSelectModel = (object) => {
        if (itemGroup) {
            if(controlRef.current)
                controlRef.current.reset();
            setItemGroup(null);
            return;
        }
        
        if(controlRef.current)
            controlRef.current.saveState();

        setItemGroup(object);
    }

    const onResetGroup = () => {
        setIsRotate(false)
        if(groupRef.current) {
            groupRef.current.rotation.x = 0
            groupRef.current.rotation.y = 0
            groupRef.current.rotation.z = 0
        }

        if(controlRef.current) {
            cameraRef.current.reset(false);
            controlRef.current.reset();
        }
    }

    const onRemoveBg = () => { 
        setBackgroundBase64(null)
    }

    const upLoadIconClick = () => {
        if(inputUploadFile.current){
            inputUploadFile.current.click()
        }
    }

    const onUploadFile = (e) => {
        if (!e.target.files || !e.target.files[0]) return;

        const FR = new FileReader();
        FR.addEventListener("load", function (evt) {
            setBackgroundBase64(evt.target.result)
        });
        FR.readAsDataURL(e.target.files[0]);
    }

    const onPlayResetAnimation = () => {
        if(modelRef.current) {
            if(modelRef.current.isPlaying) {
                modelRef.current.reset();
            }
            else {
                modelRef.current.play();
            }
        }
    }

    return (
        <>
            <Canvas
                orthographic={canvasConfig.orthographic}
                shadows={canvasConfig.shadows}
                camera={{ zoom: zoom, fov: 80, near: -10 }}
                style={{borderRadius: radius ? radius : '0'}}
            >
                {
                    isHasBackground && <color attach="background" args={["white"]} />
                }
                {/* <hemisphereLight
                    intensity={0.1}
                    angle={0.1}
                    penumbra={1}
                    position={[10, 15, 10]}
                /> */}
                <directionalLight intensity={0.8} position={[4.2, 9, 5.8]} castShadow={true}/>
                <Background base64={backgroundBase64} />
                {modelUrl != null && itemGroup && (
                    <ModelGroup
                    ref={modelRef}
                    groupRef={groupRef} 
                    itemGroup={itemGroup}
                    animations={animations}></ModelGroup>
                    )}
                {
                   (modelUrl != null && itemGroup) && <ControlGroup 
                    group={groupRef.current} 
                    isRotate={isRotate}/>
                }
               <CameraControls ref={cameraRef}/>
                    <Environment
                    background={false}
                    files={'simple_strongrim_symetric_key_a (3).hdr'}
                    path={'/'}
                />
                <OrbitControls
                    ref={controlRef}
                    enableZoom={canvasConfig.orbitControls.enableZoom}
                    enablePan={canvasConfig.orbitControls.enablePan}
                    enableRotate={canvasConfig.orbitControls.enableRotate}
                    minPolarAngle={canvasConfig.orbitControls.minPolarAngle}
                    maxPolarAngle={canvasConfig.orbitControls.maxPolarAngle}
                />
            </Canvas>
            {
               (modelUrl != null && isHasControl && itemGroup) && <div
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
                        //  onClick={upLoadIconClick}
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
                !itemGroup && <div className="loading-spin__container" style={loadingBackgroundUrl ?{ borderRadius: radius, backgroundImage: `url(${loadingBackgroundUrl})`, backgroundSize: '100% 100%' } :{ borderRadius: radius, background: 'rgba(255,255,255,1)' }}>
                    {
                        modelUrl && showLoadedPecent && <>
                            <div className="loading-model-3D">{ `LOADING 3D MODEL...${loadedPercent}%`}</div>
                        </>
                    } 
                    {
                        modelUrl && !showLoadedPecent && <div className="loading-spin__img" style={{ border: radius, width: loadingWidth, height: loadingHeight }}></div>
                    }
                    {
                        !modelUrl && <div className="loading-spin__img" style={{ border: radius, width: loadingWidth, height: loadingHeight }}></div>
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
        </>
    );
};

export default SingleModelView;