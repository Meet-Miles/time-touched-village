import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const Home: React.FC = () => {

  const clickSoundRef = useRef<HTMLAudioElement>(null);
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
        musicRef.current.src = '/audio/intro/music.mp3';
        musicRef.current.volume = 0.2;  // Reset the volume
        musicRef.current.play();
      }
    }, 1000); // Delay for 2 seconds
  }, []);

  const router = useRouter()

  return (
    <div className="h-screen flex justify-center items-center relative">

      {/* background */}
      <div className="absolute w-full h-full">
        <video autoPlay muted loop className="w-full h-full object-cover " src="/video/trailer.mp4"></video>
        <div className="bg-black/50 w-full h-full absolute top-0 right-0 left-0 bottom-0"></div>
      </div>

      {/* card */}
      <div className="relative bg-white rounded-2xl p-8 flex flex-col items-center gap-8 max-w-xl">
        <img src="/logo-colour.svg" alt="Logo" className="" />
        <img src="/intro.svg" alt="Logo" className="w-[50%]" />
        <button className="button bg-yellow text-darkYellow" onClick={() => {
          playClickSound();
          setTimeout(() => {
            router.push("/intro");
          }, 1000)
        }}>
          New Village
        </button>
      </div>

      {/* audio refs */}
      <audio ref={clickSoundRef} />
      <audio ref={musicRef} loop />
    </div>
  );
}

export default Home;