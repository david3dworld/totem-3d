import { useFrame, useThree } from "@react-three/fiber";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { AnimationMixer, Audio, AudioAnalyser, AudioListener, AudioLoader, BoxHelper, Group, Vector3 } from "three"

// eslint-disable-next-line react/display-name
const ModelGroup = forwardRef(({ groupRef, itemGroup, animations }, ref) => {

    // const { scene } = useThree();

    useImperativeHandle(ref, () => ({
        play: () => onPlayAnimation(),
        reset: () => onResetAnimation(),
        isPlaying: isPlaying
    }));

    const [mixer, setMixer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [music, setMusic] = useState(null);

    useEffect(() => {
        if (!itemGroup) return;
        // scene.children = scene.children.filter(item => item.type != "BoxHelper")
        // console.log("scene", scene, itemGroup)
        // const meshhh = animations.length > 0 ? getAllMeshes(itemGroup).filter((item, idx) => item.isSkinnedMesh) : getAllMeshes(itemGroup)
        // console.log("scene", meshhh)

        // for(const m of meshhh) {
        //     m.updateMatrixWorld();
        //     scene.add(new BoxHelper(m))
        // }

        // const newG = new Group();
        // newG.children = meshhh;
        // scene.add(new BoxHelper(newG))
        setMixer(new AnimationMixer(itemGroup));

    }, [itemGroup, animations]);

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

    useEffect(() => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464

        if(!itemGroup || !itemGroup.userData.name) return

        if(itemGroup.userData.name.includes(`PopeyeSpinash_AnimationWeb_1661160655674`)) {
            loadMusic('/POPEYE_PREMIUM_AUDIO.mp3').then(rs => {
                setMusic(rs);
            })
        }
        else if(itemGroup.userData.name.includes(`Strormtrooper_AnimationWeb_1661158885806`)) {
            loadMusic('/SOUND_STORM_ANIMATION.mp3').then(rs => {
                setMusic(rs);
            })
        }
    }, [itemGroup])

    useEffect(() => {
        return () => {
            if(music && music.isPlaying) {
                music.stop()
            }
        }
    }, [music])
<<<<<<< HEAD
=======
=======
        loadMusic().then(rs => {
            setMusic(rs);
        })
    }, [])
>>>>>>> origin

    useEffect(() => {
        return () => {
            if(music && music.isPlaying) {
                music.stop()
            }
        }
    }, [music])
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464

    const onPlayAnimation = () => {
        if (mixer && animations.length > 0) {
            mixer.clipAction(animations[0]).play();
            if(music) {
                music.play();
            }
            setIsPlaying(true);
        }
    };

    const onResetAnimation = () => {
        if (mixer && animations.length > 0) {
            mixer.clipAction(animations[0]).stop();
            if(music && music.isPlaying) {
                music.stop();
            }
            setIsPlaying(false);
        }
    };

    const loadMusic = (url = '/SOUND_STORM_ANIMATION.mp3') => {
        return new Promise(resolve => {
            const listener = new AudioListener()
            const music = new Audio(listener)
            const loader = new AudioLoader()

<<<<<<< HEAD
            loader.load(url, buffer => {
=======
<<<<<<< HEAD
            loader.load(url, buffer => {
=======
            loader.load('/POPEYE_PREMIUM_AUDIO.mp3', buffer => {
>>>>>>> origin
>>>>>>> 3c83c2462043cc83fe6088eefcd360dfecdc6464
                music.setBuffer(buffer)
                music.setLoop(true)
                music.setVolume(1)

                // const analyser = new AudioAnalyser(music, 128)
                // music.play()

                resolve(music)
            })
        })
    }

    useFrame((state, delta) => {
        if (mixer) {
            mixer.update(delta);
        }
    });

    return <primitive
        ref={groupRef}
        object={itemGroup}
        position={new Vector3(0, 0, 0)}
    />
})

export default ModelGroup;