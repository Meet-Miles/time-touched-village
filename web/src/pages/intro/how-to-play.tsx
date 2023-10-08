import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const HowToPlay: React.FC = () => {
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
                musicRef.current.src = '/audio/intro/music-3.mp3';
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
                        audioRef.current.src = '/audio/intro/how-to-play.mp3';
                        setIsNarrationPlaying(true);
                        audioRef.current.play();
                        audioRef.current.onended = () => {
                            setCurrentStep('tip1');
                        };
                    }
                }, 500);
                break;
            case 'tip1':
                setTimeout(() => {
                    if (audioRef.current) {
                        audioRef.current.src = '/audio/intro/tip-1.mp3';
                        setIsNarrationPlaying(true);
                        audioRef.current.play();
                        audioRef.current.onended = () => {
                            setCurrentStep('tip2');
                        };
                    }
                }, 500);
                break;
            case 'tip2':
                setTimeout(() => {
                    if (audioRef.current) {
                        audioRef.current.src = '/audio/intro/tip-2.mp3';
                        setIsNarrationPlaying(true);
                        audioRef.current.play();
                        audioRef.current.onended = () => {
                            setCurrentStep('tip3');
                        };
                    }
                }, 500);
                break;
            case 'tip3':
                setTimeout(() => {
                    if (audioRef.current) {
                        audioRef.current.src = '/audio/intro/tip-3.mp3';
                        audioRef.current.play();
                        audioRef.current.onended = () => {
                            setIsNarrationPlaying(false);
                            setCurrentStep('tip3');
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
            <div className="absolute w-full h-full overflow-hidden">
                <div className="bg-black/100 w-full h-full absolute top-0 right-0 left-0 bottom-0"></div>
            </div>
            <img src="/dinoguide.svg" className={` animate-[bounce_0.7s_ease-in-out_infinite] fixed top-32 right-8  z-50 w-32 h-32 transition-all duration-500 ${isNarrationPlaying ? `opacity-100` : `opacity-0`}`} alt="" />
            <img src="/logo-white.svg" alt="Logo" className="fixed h-16 top-8 left-8 z-50" />

            {/* card */}
            <div className="relative flex flex-col items-center gap-8">
                <img src="/compass.svg" className="w-16 h-16" alt="" />
                <h1 className="text-6xl text-red">How To Play?</h1>
                <div className="grid grid-cols-2 items-center gap-8 p-8 max-w-7xl m-auto">
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-8">
                            <img className="w-[100px] " src="/buttons.svg" alt="" />
                            <p className={`transition-all ${currentStep === 'tip1' ? `text-white/100` : `text-white/50`} text-3xl`}>Use the multiple choice buttons to make a choice.</p>
                        </div>
                        <div className="flex items-center gap-8">
                            <img className="w-[100px] " src="/collaborate-group.svg" alt="" />
                            <p className={`transition-all ${currentStep === 'tip2' ? `text-white/100` : `text-white/50`} text-3xl`}>When you see this icon, talk to your team!</p>
                        </div>
                        <div className="flex items-center gap-8">
                            <img className="w-[100px]  " src="/dino-info-group.svg" alt="" />
                            <p className={`transition-all ${currentStep === 'tip3' ? `text-white/100` : `text-white/50`} text-3xl`}>With this icon you will receive small tips and information about what you see.</p>
                        </div>
                    </div>
                    <div>
                        <img className="aspect-video w-full" src={`/${currentStep === 'tip1' ? 'tip1' : currentStep === "tip2" ? `tip2` : currentStep === 'tip3' ? 'tip3' : 'tip1'}.png`} alt="" />
                    </div>
                </div>
            </div>

            <div className="relative flex gap-8">
                <Link href='/intro'>

                    <div className="button bg-black" onMouseDown={() => {
                        playClickSound();
                    }}>
                        <img src="/arrow.svg" alt="" />
                    </div>
                </Link>
                <Link href='/game' onMouseDown={() => {
                    playClickSound();
                }}>
                    <div className="button bg-green text-darkGreen" onMouseDown={() => {
                        playClickSound();
                    }}>
                        Let&apos;s Start
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

export default HowToPlay;