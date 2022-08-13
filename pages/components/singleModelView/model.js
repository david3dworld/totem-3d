import { useFrame } from "@react-three/fiber";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { AnimationMixer, Audio, AudioAnalyser, AudioListener, AudioLoader, Vector3 } from "three"

// eslint-disable-next-line react/display-name
const ModelGroup = forwardRef(({ groupRef, itemGroup, animations }, ref) => {

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

        setMixer(new AnimationMixer(itemGroup));

    }, [itemGroup]);

    useEffect(() => {
        loadMusic().then(rs => {
            setMusic(rs);
            console.log("Music", rs)
        })
    }, [])

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
            if(music) {
                music.stop();
            }
            setIsPlaying(false);
        }
    };

    const loadMusic = () => {
        return new Promise(resolve => {
            const listener = new AudioListener()
            const music = new Audio(listener)
            const loader = new AudioLoader()

            loader.load('/SOUND_STORM_ANIMATION.mp3', buffer => {
                music.setBuffer(buffer)
                music.setLoop(true)
                music.setVolume(0.1)

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