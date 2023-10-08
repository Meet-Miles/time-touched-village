import MuxPlayer from '@mux/mux-player-react';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { Choice, Scene } from '../types/scene'; // Adjust paths if necessary

interface SceneProps {
    data: Scene;
    onChoiceSelected: (choice: Choice) => void;
}

const Scene: React.FC<SceneProps> = ({ data, onChoiceSelected }) => {
    const [currentStep, setCurrentStep] = useState<'title' | 'introduction' | 'choices' | 'incorrectChoice' | 'videoStep' | 'correctAnswer'>('title');
    const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
    const [sceneKey, setSceneKey] = useState(0);
    const [isNarrationPlaying, setIsNarrationPlaying] = useState(false);

    const fadeOut = (audioElement: HTMLAudioElement, duration: number) => {
        if (!audioElement) return;

        let volume = audioElement.volume;
        const step = volume / (duration * 60); // Assuming 60fps
        const fadeOutInterval = setInterval(() => {
            volume = Math.max(0, volume - step); // Ensure volume doesn't go negative
            audioElement.volume = volume;

            if (volume <= 0) {
                audioElement.pause();
                clearInterval(fadeOutInterval);
            }
        }, 1000 / 60); // 60fps
    };

    useEffect(() => {
        if (musicRef.current && !musicRef.current.paused) {
            fadeOut(musicRef.current, 2); // Fading out over 2 seconds
        }

        setSceneKey(prevKey => prevKey + 1);
        setCurrentStep('title');
    }, [data]);

    const victoryRef = useRef<HTMLAudioElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const musicRef = useRef<HTMLAudioElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const clickSoundRef = useRef<HTMLAudioElement>(null);

    const playClickSound = () => {
        if (clickSoundRef.current) {
            clickSoundRef.current.src = "/audio/click.mp3";
            clickSoundRef.current.play();
        }
    };

    useEffect(() => {
        setTimeout(() => {
            if (musicRef.current) {
                musicRef.current.src = data.music;
                musicRef.current.volume = 0.2;  // Reset the volume
                musicRef.current.play();
            }
        }, 2000); // Delay for 2 seconds
    }, [data.music]);

    useEffect(() => {
        // Reset audio playback whenever the scene data changes
        if (audioRef.current) {
            audioRef.current.src = ''; // Clear the audio src
            audioRef.current.pause(); // Pause any current playback
            audioRef.current.currentTime = 0; // Reset the playback time to the beginning
        }
    }, [data]);


    useEffect(() => {
        let currentAudio = audioRef.current;

        const resetOnEnded = () => {
            if (currentAudio) {
                currentAudio.onended = null;  // Remove the listener
            }
        };
        switch (currentStep) {
            case 'title':
                setTimeout(() => {
                    if (audioRef.current) {
                        audioRef.current.src = data.titleNarration;
                        setIsNarrationPlaying(true);
                        audioRef.current.play();
                        audioRef.current.onended = () => {
                            setIsNarrationPlaying(false);
                            setCurrentStep('introduction');
                        };
                    }
                }, 500);
                break;

            case 'introduction':
                if (audioRef.current) {
                    audioRef.current.src = data.introductionNarration;
                    setIsNarrationPlaying(true);
                    audioRef.current.play();
                    audioRef.current.onended = () => {
                        setIsNarrationPlaying(false);
                        setCurrentStep('choices');
                    };
                }
                break;

            case 'choices':
                if (audioRef.current) {
                    audioRef.current.src = data.choicesNarration;
                    setIsNarrationPlaying(true);
                    audioRef.current.play();
                    audioRef.current.onended = () => {
                        setIsNarrationPlaying(false);
                    }
                }
                break;

            case 'incorrectChoice':
                if (currentAudio && selectedChoice) {
                    currentAudio.src = selectedChoice.narration;
                    setIsNarrationPlaying(true);
                    currentAudio.play();
                    currentAudio.onended = () => {
                        console.log("Incorrect choice narration ended, transitioning to choices.");
                        setIsNarrationPlaying(false);
                        setCurrentStep('choices');
                        resetOnEnded();  // Reset the onended listener
                    };
                }
                break;

            case 'videoStep':
                if (videoRef.current) {
                    setIsNarrationPlaying(false);
                    videoRef.current.play();
                    videoRef.current.onended = () => {
                        console.log("Video ended, transitioning to correctAnswer.");
                        setCurrentStep('correctAnswer');
                    };
                }
                break;

            case 'correctAnswer':
                if (currentAudio) {
                    currentAudio.src = data.correctAnswerNarration;
                    setIsNarrationPlaying(true);
                    if (data.sceneNumber === 7) {
                        if (musicRef.current) {
                            musicRef.current.pause();
                        }

                        if (victoryRef.current) {
                            victoryRef.current.src = '/audio/ending/fx.mp3';
                            victoryRef.current.volume = 0.2;
                            victoryRef.current?.play();
                        }
                    }
                    currentAudio.play();
                    currentAudio.onended = () => {
                        setIsNarrationPlaying(false);
                        resetOnEnded;  // Reset the onended listener
                    }
                }
                break;

            default:
        }
        return resetOnEnded;
    }, [currentStep, data, selectedChoice]);

    useEffect(() => {
        console.log("Transitioning to step:", currentStep);
    }, [currentStep]);

    const handleChoiceClick = (choice: Choice) => {
        setSelectedChoice(choice);
        if (choice.correct) {
            setCurrentStep('videoStep'); // Transition to video step for correct choice
        } else {
            setCurrentStep('incorrectChoice'); // For incorrect choice, play incorrect choice narration then return to choices
        }
    };

    const router = useRouter()


    return (
        <div key={sceneKey} className='h-screen relative' style={{
            backgroundImage: `url(${currentStep === 'correctAnswer' ? data.endImage : data.startImage})`,
            backgroundSize: '120%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }}>
            <div className={`absolute ${data.sceneNumber === 7 ? `bg-red/75` : `bg-black/50`} w-full h-full`}></div>
            <img src="/dinoguide.svg" className={` animate-[bounce_0.7s_ease-in-out_infinite] fixed top-32 right-8  z-50 w-32 h-32 transition-all duration-500 ${isNarrationPlaying ? `opacity-100` : `opacity-0`}`} alt="" />
            {currentStep !== 'correctAnswer' && (
                <div className='relative h-full w-full flex flex-col gap-8 items-center justify-center' >
                    {currentStep !== 'videoStep' && currentStep !== 'incorrectChoice' && (
                        <div className='flex flex-col gap-8 items-center justify-center'>
                            <p className={`text-4xl ${data.sceneNumber === 7 ? `bg-darkRed` : `bg-red`} text-white rounded-full p-4 w-16 h-16 flex items-center justify-center`}>{data.sceneNumber}</p>
                            <h1 className={`text-6xl ${data.sceneNumber === 7 ? `text-darkRed` : `text-red`}`}>{data.title}</h1>
                            <p className='text-3xl text-white/75 text-center max-w-2xl'>{data.introductionText}</p>
                            {data.collaborate && (
                                <div className='flex flex-col gap-4 items-center justify-center'>
                                    <img src="/collaborate.svg" className='w-16 h-16' alt="" />
                                    <p className='text-white text-2xl'>Talk it over together!</p>
                                </div>
                            )}
                        </div>
                    )}
                    {currentStep === 'choices' && (
                        <div className='flex items-start gap-8'>
                            {data.choices.map((choice, i) => {
                                return (
                                    <div key={i} className='flex flex-col items-center text-center w-[300px] gap-8'>
                                        <button className={`button w-32 h-32 ${choice.letter === 'A' ? `bg-green text-darkGreen` : choice.letter === 'B' ? `bg-yellow text-darkYellow` : `bg-blue text-darkBlue`}`} key={choice.letter} onClick={() => {
                                            playClickSound();
                                            handleChoiceClick(choice);
                                        }}>
                                            {choice.letter}
                                        </button>
                                        <p className='text-white text-4xl'>{choice.title}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                    {/* Video element */}
                    {currentStep === 'videoStep' && selectedChoice && (
                        <div className='relative w-full h-full'>
                            <div className='flex flex-col items-center text-center gap-4 w-full absolute z-50 top-8 right-1/2 left-1/2 -translate-x-1/2'>
                                <div className={`w-16 h-16 flex justify-center items-center rounded-full px-8 py-4 text-4xl font-bold ${selectedChoice.letter === 'A' ? `bg-green text-darkGreen` : selectedChoice.letter === 'B' ? `bg-yellow text-darkYellow` : `bg-blue text-darkBlue`}`}>{selectedChoice.letter}</div>
                                <h1 className="text-4xl text-white  ">{selectedChoice.title}</h1>
                            </div>
                            <MuxPlayer
                                className='mux-player'
                                streamType="on-demand"
                                playbackId={data.playbackId}
                                autoPlay={true}
                                thumbnailTime={0.2}
                                onEnded={() => {
                                    setCurrentStep('correctAnswer');
                                }}
                            />
                            {/* <video ref={videoRef} className='h-full w-full object-cover object-center' src={data.video} onEnded={() => {
                                setCurrentStep('correctAnswer');
                            }}></video> */}
                        </div>
                    )}
                    {currentStep === 'incorrectChoice' && selectedChoice && (
                        <div className='h-full w-full flex flex-col gap-8 justify-center items-center relative'>
                            <div className={`w-32 h-32 flex justify-center items-center rounded-full px-8 py-4 text-6xl font-bold ${selectedChoice.letter === 'A' ? `bg-green text-darkGreen` : selectedChoice.letter === 'B' ? `bg-yellow text-darkYellow` : `bg-blue text-darkBlue`}`}>{selectedChoice.letter}</div>
                            <h1 className="text-6xl text-white">{selectedChoice.title}</h1>
                            <img src="/dino-info.svg" className='w-32 h-32' alt="" />
                            <p className='text-3xl text-white/75 text-center max-w-2xl'>{selectedChoice.hint}</p>
                        </div>
                    )}
                </div>
            )}

            {currentStep === 'correctAnswer' && (
                <div className='h-full w-full flex flex-col gap-8 justify-center items-center relative'>
                    <img src={
                        data.choices.find(c => c.correct)?.letter === 'A' ? '/correct-a.svg' :
                            data.choices.find(c => c.correct)?.letter === 'B' ? '/correct-b.svg' :
                                '/correct-c.svg'
                    } className='w-32 h-32' alt="" />
                    <h1 className="text-6xl text-white">{data.choices.find(c => c.correct)?.title}</h1>
                    <img src="/dino-info.svg" className='w-32 h-32' alt="" />
                    <p className='text-3xl text-white/75 text-center max-w-2xl'>{data.correctAnswerText}</p>

                    {data.sceneNumber === 7 ?
                        <button className='button bg-white text-black' onClick={async () => {
                            playClickSound();
                            // Fade out music before transitioning
                            if (musicRef.current && !musicRef.current.paused) {
                                fadeOut(musicRef.current, 2); // Fading out over 2 seconds
                                // Wait for fade out to complete
                                await new Promise(resolve => setTimeout(resolve, 2000));
                            }

                            router.push("/end");
                        }}>
                            Leave my Village
                        </button>
                        :
                        <button className='button bg-green text-darkGreen' onClick={async () => {
                            playClickSound();
                            // Fade out music before transitioning
                            if (musicRef.current && !musicRef.current.paused) {
                                fadeOut(musicRef.current, 2); // Fading out over 2 seconds

                                // Wait for fade out to complete
                                await new Promise(resolve => setTimeout(resolve, 2000));
                            }

                            // Logic for transitioning to the next scene.
                            const correctChoice = data.choices.find(c => c.correct);
                            if (correctChoice) {
                                onChoiceSelected(correctChoice);
                            }
                        }}>
                            Continue
                        </button>
                    }

                </div>
            )}

            {/* Audio elements for narrations, music, and button click */}
            <audio ref={victoryRef} />
            <audio ref={audioRef} />
            <audio ref={musicRef} loop />
            <audio ref={clickSoundRef} />
        </div>
    );
}

export default Scene;