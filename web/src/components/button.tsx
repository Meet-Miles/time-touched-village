import { useRef } from "react";

export function Button({ label }: { label: string }) {
    const clickSoundRef = useRef<HTMLAudioElement>(null);
    const playClickSound = () => {
        if (clickSoundRef.current) {
            clickSoundRef.current.src = "/audio/click.mp3";
            clickSoundRef.current.play();
        }
    };

    return (
        <>
            <audio ref={clickSoundRef} />
            <button onClick={() => {

                playClickSound();

            }}>
                {label}
            </button>
        </>
    )
}