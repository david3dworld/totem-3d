import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react"
import { AnimationMixer, Vector3 } from "three"

const ModelGroup = ({ groupRef, itemGroup, animations }) => {
    const [runAnimation, setRunAnimation] = useState(false);
    const [mixer, setMixer] = useState(null);

    useEffect(() => {
        if (!itemGroup) return;

        setMixer(new AnimationMixer(itemGroup));

    }, [itemGroup])

    useEffect(() => {

        if(!mixer) return;

        if(runAnimation) {
            // run animation
            onPlayAnimation();
        }
        else {
            // reset animation and stop
            onResetAnimation();
        }
    }, [runAnimation, mixer, animations])

    const onPlayAnimation = () => {
        if (mixer && animations.length > 0) {
            mixer.clipAction(animations[0]).play();
        }
    };

    const onResetAnimation = () => {
        if (mixer && animations.length > 0) {
            mixer.clipAction(animations[0]).stop();
        }
    };

    useFrame((state, delta) => {
        if (mixer) {
            mixer.update(delta);
        }
    });

    return <primitive
        onClick={() => setRunAnimation(!runAnimation)}
        ref={groupRef}
        object={itemGroup}
        position={new Vector3(0, 0, 0)}
    />
}

export default ModelGroup;