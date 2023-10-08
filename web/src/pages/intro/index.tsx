import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const Intro: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<'introduction' | 'ready'>('introduction');

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
                musicRef.current.src = '/audio/intro/music-2.mp3';
                musicRef.current.volume = 0.2;  // Reset the volume
                musicRef.current.play();
            }
        }, 0); // Delay for 2 seconds
    }, []);

    const router = useRouter()

    useEffect(() => {
        switch (currentStep) {
            case 'introduction':
                setTimeout(() => {
                    if (audioRef.current) {
                        audioRef.current.src = '/audio/intro/intro.mp3';
                        audioRef.current.play();
                        audioRef.current.onended = () => {
                            setCurrentStep('ready');
                        };
                    }
                }, 2000);
                break;
            case 'ready':
                setTimeout(() => {
                    if (audioRef.current) {
                        audioRef.current.src = '/audio/intro/ready-to-begin.mp3';
                        audioRef.current.play();
                    }
                }, 1000);
                break;
        }
    }, [currentStep])
    return (
        <div className="h-screen flex flex-col gap-8 justify-center items-center relative">

            {/* background */}
            <div className="absolute w-full h-full">
                <video autoPlay muted loop className="w-full h-full object-cover " src="/video/trailer.mp4"></video>
                <div className="bg-black/50 w-full h-full absolute top-0 right-0 left-0 bottom-0"></div>
            </div>

            <img src="/logo-white.svg" alt="Logo" className="fixed h-16 top-8 left-8 z-50" />

            {/* card */}
            <div className="relative bg-white rounded-2xl p-8 flex flex-col items-center gap-8 max-w-xl">
                <img src="/compass.svg" className="w-16 h-16" alt="" />
                <h1 className="text-6xl text-red">Hey Adventurers</h1>
                <p className="medium text-center">Are you ready for an epic journey back in time? Put on your explorer hats because you&apos;re about to create your very own prehistoric world! But wait, it&apos;s not just about making it look cool. You&apos;ll need to think like a true paleontologist to make sure your Triceratops family stays happy and safe.</p>
                <p className="medium text-center">Oh, and keep an eye out—adventure (and maybe even a little danger) awaits!</p>
                <p className="leading text-center font-bold">Ready to begin? Let&apos;s make history!</p>
            </div>

            <div className="relative flex gap-8">
                <button className="button bg-black" onClick={() => {
                    playClickSound();
                    setTimeout(() => {
                        router.push("/");
                    }, 1000)
                }}>
                    <img src="/arrow.svg" alt="" />
                </button>
                <button className="button bg-yellow text-darkYellow" onClick={() => {
                    playClickSound();
                    setTimeout(() => {
                        router.push("/intro/how-to-play");
                    }, 1000)
                }}>
                    Next
                </button>
            </div>

            {/* audio refs */}
            <audio ref={audioRef} />
            <audio ref={clickSoundRef} />
            <audio ref={musicRef} loop />
        </div>
    );
}

export default Intro;