import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const PostCards: React.FC = () => {
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
                        audioRef.current.src = '/audio/ending/mid.mp3';
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
        <div className="h-screen overflow-hidden flex flex-col gap-8 justify-center items-center relative">

            {/* background */}
            <div className="absolute w-full h-full">
                <video autoPlay muted loop className="w-full h-full object-cover " src="/video/trailer.mp4"></video>
                <div className="bg-black/80 w-full h-full absolute top-0 right-0 left-0 bottom-0"></div>
            </div>

            {/* card */}
            <div className="relative flex flex-col items-center gap-8">
                <img src="/logo-white.svg" alt="Logo" className=" h-16 " />
                <p className="text-white/75 text-3xl max-w-4xl text-center">What a sight to behold! This adventure was a great success, thanks to your thoughtful decisions. You can get a screenshot of our Time-Touched Village sent to your email to keep as a memento of this fantastic journey.</p>
                <p className="text-white/75 text-3xl max-w-4xl text-center">Just enter your email address below, and we&apos;ll send it right over to you!</p>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-8">
                <input type="email" placeholder="Your e-mail address..." className="bg-white rounded-full text-center px-8 py-4 text-6xl placeholder:opacity-40 outline-none" />
                <div className="flex gap-4">
                    <button className="button bg-white text-black" onClick={() => {
                        playClickSound();
                        setTimeout(() => {
                            router.push("/end/farewell");
                        }, 1000)
                    }}>
                        Skip

                    </button>
                    <button className="button bg-green text-darkGreen" onClick={() => {
                        playClickSound();
                        setTimeout(() => {
                            // router.push("/end/capturing");
                        }, 1000)
                    }}>
                        Send it!
                        {/* re_eXy8ADHj_6FvCGjHHRiJDGEtkynu3D8aB */}
                    </button>
                </div>

            </div>

            <img src="/postcards.png" className="w-full max-w-7xl m-auto fixed -bottom-[10%]" alt="" />
            {/* audio refs */}
            <audio ref={audioRef} />
            <audio ref={clickSoundRef} />
            <audio ref={musicRef} loop />
        </div>
    );
}

export default PostCards;