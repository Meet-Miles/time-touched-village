import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const Capturing: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<'title' | 'tip1' | 'tip2' | 'tip3'>('title');
    const [showButton, setShowButton] = useState(false); // Add state to control button appearance

    const clickSoundRef = useRef<HTMLAudioElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const musicRef = useRef<HTMLAudioElement>(null);

    const playClickSound = () => {
        if (clickSoundRef.current) {
            console.log(clickSoundRef.current);

            clickSoundRef.current.src = "/audio/click.mp3";
            clickSoundRef.current.play();
        }
    };

    useEffect(() => {
        setTimeout(() => {
            if (musicRef.current) {
                musicRef.current.src = '/audio/ending/capturing.mp3';
                musicRef.current.volume = 0.5;  // Reset the volume
                musicRef.current.play();
            }
        }, 500); // Delay for 2 seconds

        // Set timeout to show button after 15 seconds
        const buttonTimeout = setTimeout(() => {
            setShowButton(true);
        }, 15000);

        // Cleanup on unmount
        return () => {
            clearTimeout(buttonTimeout);
        }
    }, []);

    const router = useRouter()

    return (
        <div className="h-screen flex flex-col gap-8 justify-center items-center relative">

            {/* background */}
            <div className="absolute w-full h-full">
                <video autoPlay muted loop className="w-full h-full object-cover " src="/video/trailer.mp4"></video>
            </div>

            <div className="relative flex gap-8">
                <button
                    style={{
                        opacity: showButton ? 1 : 0,
                        transition: 'all 1s ease' // Add transition effect for 1 second
                    }}
                    className="button bg-white text-black" onClick={() => {
                        playClickSound();
                        setTimeout(() => {
                            router.push("/end/postcards");
                        }, 1000)
                    }}>
                    Skip
                </button>
            </div>

            {/* audio refs */}
            <audio ref={musicRef} loop />
        </div>
    );
}

export default Capturing;