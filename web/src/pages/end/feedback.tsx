import { useRouter } from "next/router";
import { useRef } from "react";

const Feedback: React.FC = () => {

    const clickSoundRef = useRef<HTMLAudioElement>(null);

    const playClickSound = () => {
        if (clickSoundRef.current) {
            console.log(clickSoundRef.current);

            clickSoundRef.current.src = "/audio/click.mp3";
            clickSoundRef.current.play();
        }
    };

    const router = useRouter()

    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">Feedback!</h1>
            <button onClick={() => {
                playClickSound();
                setTimeout(() => {

                }, 1000)
            }}>
                Share Opnion
            </button>


            {/* audio refs */}
            <audio ref={clickSoundRef} />
        </div>
    );
}

export default Feedback;