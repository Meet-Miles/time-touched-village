import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const Farewell: React.FC = () => {
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
                        audioRef.current.src = '/audio/ending/outro.mp3';
                        audioRef.current.play();

                    }
                }, 500);
                break;

            default:
        }
    }, [currentStep])
    return (
        <div className="h-screen flex flex-col gap-32 justify-center items-center relative">

            {/* background */}
            <div className="absolute w-full h-full">
                <div className="bg-black/100 w-full h-full absolute top-0 right-0 left-0 bottom-0"></div>
            </div>

            {/* card */}
            <div className="relative flex flex-col items-center gap-32">
                <img src="/logo-white.svg" alt="Logo" className=" h-32 " />
                <h1 className="text-6xl text-white/75 max-w-4xl">Thank you for playing! We hope to see you again in the realms of time!</h1>
            </div>

            <div className="relative flex flex-col gap-8">
                <div className="flex gap-4">
                    <Link href="/">
                        <div className="button bg-white text-black" onClick={() => {
                            playClickSound();

                        }}>
                            Go Home

                        </div>
                    </Link>
                    <Link href="/intro/how-to-play" >
                        <div className="button bg-green text-darkGreen" onClick={() => {
                            playClickSound();

                        }}>
                            Play Again
                        </div>
                    </Link>
                </div>
                <p className="text-white/75 hover:text-white/100 transition-all cursor-pointer underline text-4xl text-center mt-16">What did you think?</p>
            </div>

            {/* audio refs */}
            <audio ref={audioRef} />
            <audio ref={clickSoundRef} />
            <audio ref={musicRef} loop />
        </div>
    );
}

export default Farewell;