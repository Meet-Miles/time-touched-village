import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const End: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<'title' | 'tip1' | 'tip2' | 'tip3'>('title');

    const clickSoundRef = useRef<HTMLAudioElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const musicRef = useRef<HTMLAudioElement>(null);
    const [isNarrationPlaying, setIsNarrationPlaying] = useState(false);
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
        }, 0); // Delay for 2 seconds
    }, []);

    const router = useRouter()

    useEffect(() => {
        switch (currentStep) {
            case 'title':
                setTimeout(() => {
                    if (audioRef.current) {
                        audioRef.current.src = '/audio/ending/intro.mp3';
                        setIsNarrationPlaying(true);
                        audioRef.current.play();
                        audioRef.current.onended = () => {
                            setIsNarrationPlaying(false);
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
                <div className="bg-black/100 w-full h-full absolute top-0 right-0 left-0 bottom-0"></div>
            </div>
            <img src="/dinoguide.svg" className={`  fixed top-8 right-1/2 left-1/2 -ml-16 animate-[bounce_0.7s_ease-in-out_infinite]  z-50 w-32 h-32 transition-all duration-500 ${isNarrationPlaying ? `opacity-100` : `opacity-0`}`} alt="" />

            {/* card */}
            <div className="relative flex flex-col items-center gap-8">
                <img src="/logo-white.svg" alt="Logo" className=" h-32 " />
                <h1 className="text-6xl text-red">Farewell, Time-Touched Village</h1>
                <p className="text-white/75 text-3xl max-w-2xl text-center">Wow, adventurers, you&apos;ve done an amazing job! Look at the village we&apos;ve created together - a safe and thriving prehistoric world for our Triceratops family and other residents. It&apos;s almost time to bid farewell to our Time-Touched Village. But before we go, let&apos;s capture this moment.</p>
            </div>

            <div className="relative flex gap-8">
                <Link href="/end/capturing" >
                    <div className="button bg-green text-darkGreen" onMouseDown={() => {
                        playClickSound();
                    }}>
                        Capture this Moment
                    </div>
                </Link>
            </div>

            {/* audio refs */}
            <audio ref={audioRef} />
            <audio ref={clickSoundRef} />
            <audio ref={musicRef} loop />
        </div>
    );
}

export default End;