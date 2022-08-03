import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import {
    ContactShadows,
    Environment,
    useGLTF,
    OrbitControls,
    Html,
    useCamera
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
import { Box3, BufferGeometry, Color, Group, sRGBEncoding, TextureLoader, Vector3, Texture, LoadingManager } from "three";
import Image from 'next/image'
import ResetIcon from '../../../images/stop-359-1180646.png'
import RotateIcon from '../../../images/rotate-icon-5-removebg-preview.png'
import MultiImageIcon from '../../../images/MultiImageIcon.png'
import { CameraControls } from "./cameraControls";
import RemoveBGIcon from '../../../images/remove-bg.png'

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
    modelUrl = "/popeye.glb",
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
    allowChangeBackground = true
    }) => {
    const [models, setModels] = useState(null);
    const inputUploadFile = useRef();
    const [backgroundBase64, setBackgroundBase64] = useState(null)
    const loadingProgress = useRef(0);
    const cameraRef = useRef();

    const loadModel = (url) => {
        return new Promise(resolve => {

            const manager = new LoadingManager();

            // Set up loading manager (in constructor of class)
            manager.onProgress = function ( item, loaded, total ){
                if(loaded != 1) {
                    loadingProgress.current = (loaded / total * 100).toFixed(0);
                    if(onLoading) {
                        if(loadingProgress.current == 100) {
                            setTimeout(() => {
                                onLoading(index, loadingProgress.current)         
                            }, 800);
                        }
                        else {
                            onLoading(index, loadingProgress.current)
                        }
                    }
                }
            };

            
            const loader = new GLTFLoader(manager)
            loader.load(url, function(data){
                data.scene.traverse((o) => {
                    if (o.isMesh) {
                        o.material.roughness = 0.4
                        o.material.transparent = true;
                        o.material.opacity = 0.1;
                        o.material.flatShading = false;
                    }
                });
                data.scene.userData = {...data.scene.userData, name: url}
                resolve(data.scene)
            })
        })
    }

    useEffect(() => {
        if(modelUrl != null) {
            loadModel(modelUrl).then(models => {
            
                models.traverse((o) => {
                    if (o.isMesh) {
                        o.material = o.material.clone();
                        o.material.color = new Color("white");
                        o.material.transparent = true;
                        o.material.opacity = 1;
                    }
                });
                setModels([models])
                onSelectModel(models)
            })
        }
    }, [modelUrl])

    useEffect(() => {
        if(groupRef.current) {
            groupRef.current.rotation.y = hoverRotateAngle;
        }
    }, [hoverRotateAngle])

    const [itemGroup, setItemGroup] = useState(null);
    const [canvasConfig, setCanvasConfig] = useState(initCanvasConfig);
    const controlRef = useRef();
    const groupRef = useRef();
    const [isRotate, setIsRotate] = useState(false);

    const onSelectModel = (object) => {
        if (itemGroup) {
            if(controlRef.current)
                controlRef.current.reset();
            setItemGroup(null);
            return;
        }
        
        if(controlRef.current)
            controlRef.current.saveState();

        setItemGroup(new Group().add(object));
    }

    const onResetGroup = () => {
        setIsRotate(false)
        if(groupRef.current) {
            groupRef.current.rotation.x = 0
            groupRef.current.rotation.y = 0
            groupRef.current.rotation.z = 0
        }

        if(controlRef.current) {
            cameraRef.current.reset(true);
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

    if(isShowProgress && loadingProgress.current != 100) {
        return
    }

    return (
        <>
            <Canvas
                orthographic={canvasConfig.orthographic}
                shadows={canvasConfig.shadows}
                camera={{ zoom: zoom, fov: 80 }}
                style={{borderRadius: radius ? radius : '0'}}
            >
                {
                    isHasBackground && <color attach="background" args={["white"]} />
                }
                <ambientLight intensity={0.06} />
                <hemisphereLight
                    intensity={0.7}
                    angle={0.1}
                    penumbra={1}
                    position={[10, 15, 10]}
                />
                <spotLight
                    intensity={1}
                    angle={0.1}
                    penumbra={1}
                    position={[10, 15, 10]}
                    castShadow
                />
                <Background base64={backgroundBase64} />
                {modelUrl != null && itemGroup && (
                    <mesh
                    ref={groupRef}
                     position={new Vector3(0, -2, 0)}
                        scale={new Vector3(figureConfig.defaultScale + figureConfig.addMaxScale, figureConfig.defaultScale + figureConfig.addMaxScale, figureConfig.defaultScale + figureConfig.addMaxScale)}>
                        <primitive
                            object={itemGroup}
                            position={new Vector3(0, 0, 0)}
                        />
                    </mesh>
                )}
                {
                   (modelUrl != null && itemGroup) && <ControlGroup group={groupRef.current} isRotate={isRotate}/>
                }
                 {
                   (modelUrl != null && itemGroup) && <CameraControls ref={cameraRef}/>
                }
                {/* <Environment
                    files={"envTexturepng.hdr"}
                    preset={null}
                    encoding={sRGBEncoding} /> */}
                {/* <ContactShadows
                    position={[0, -0.8, 0]}
                    opacity={0.25}
                    scale={10}
                    blur={1.5}
                    far={0.8}
                /> */}
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
                        backgroundBase64 &&
                        <div className="control__control-group" onClick={onRemoveBg}>
                            <Image className="reset" alt="" src={RemoveBGIcon} style={{ opacity: 0.3 }} />
                        </div>
                    }
                    <div className="control__control-group" onClick={onResetGroup}>
                        <Image className="reset" alt="" src={ResetIcon} style={{opacity: 0.3}}/>
                    </div>
                    {
                        allowChangeBackground && <div className="control__control-group" onClick={upLoadIconClick}>
                            <Image className="reset" alt="" src={MultiImageIcon} style={{ opacity: 0.3 }} />
                        </div>
                    }
                    <input type='file' onChange={e => onUploadFile(e)} ref={inputUploadFile} accept="image/png, image/jpeg, image/jpg" hidden/>
                    <div className="control__control-group" onClick={() => setIsRotate(!isRotate)}>
                        <Image alt="" src={RotateIcon} style={{opacity: 0.3}}/>
                    </div>
                </div>
            }
        </>
    );
};

export default SingleModelView;