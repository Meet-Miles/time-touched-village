import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const End: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<'title' | 'tip1' | 'tip2' | 'tip3'>('title');

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
                musicRef.current.src = '/audio/ending/music.mp3';
                musicRef.current.volume = 0.2;  // Reset the volume
                musicRef.current.play();
            }
        }, 500); // Delay for 2 seconds
    }, []);

    const router = useRouter()

    useEffect(() => {
        switch (currentStep) {
            case 'title':
                setTimeout(() => {
                    if (audioRef.current) {
                        audioRef.current.src = '/audio/ending/intro.mp3';
                        audioRef.current.play();
                        audioRef.current.onended = () => {
                            setCurrentStep('tip1');
                        };
                    }
                }, 500);
                break;

            default:
        }
    }, [currentStep])
    return (
        <div className="h-screen flex flex-col gap-8 justify-center items-center relative">

            {/* background */}
            <div className="absolute w-full h-full">
                <video autoPlay muted loop className="w-full h-full object-cover " src="/video/trailer.mp4"></video>
                <div className="bg-black/80 w-full h-full absolute top-0 right-0 left-0 bottom-0"></div>
            </div>

            {/* card */}
            <div className="relative flex flex-col items-center gap-8">
                <img src="/logo-white.svg" alt="Logo" className=" h-32 " />
                <h1 className="text-6xl text-red">Farewell, Time-Touched Village</h1>
                <p className="text-white/75 text-3xl max-w-2xl text-center">Wow, adventurers, you&apos;ve done an amazing job! Look at the village we&apos;ve created together - a safe and thriving prehistoric world for our Triceratops family and other residents. It&apos;s almost time to bid farewell to our Time-Touched Village. But before we go, let&apos;s capture this moment.</p>
            </div>

            <div className="relative flex gap-8">
                <button className="button bg-green text-darkGreen" onClick={() => {
                    playClickSound();
                    setTimeout(() => {
                        router.push("/end/capturing");
                    }, 1000)
                }}>
                    Capture this Moment
                </button>
            </div>

            {/* audio refs */}
            <audio ref={audioRef} />
            <audio ref={clickSoundRef} />
            <audio ref={musicRef} loop />
        </div>
    );
}

export default End;