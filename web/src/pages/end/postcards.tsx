import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const PostCards: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<'title' | 'sent'>('title');
    const [isLoading, setLoading] = useState(false);
    const [isSubmitted, setSubmitted] = useState(false);
    const [isNarrationPlaying, setIsNarrationPlaying] = useState(false);
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
        }, 0); // Delay for 2 seconds
    }, []);

    const router = useRouter()

    useEffect(() => {
        switch (currentStep) {
            case 'title':
                setTimeout(() => {
                    if (audioRef.current) {
                        audioRef.current.src = '/audio/ending/mid.mp3';
                        audioRef.current.play();

                    }
                }, 500);
                break;

            default:
        }
    }, [currentStep])

    // Handles the submit event on form submit.
    const handleSubmit = async (event: any) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
        setLoading(true);

        // Get data from the form.
        const data = {
            email: event.target.email.value,
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = '/api/form'

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()

        // Set the email endpoint
        const emailEndpoint = '/api/send'

        // Set the email request options
        const emailOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
            }) // modify this according to your need
        }

        // Send the email
        const emailResponse = await fetch(emailEndpoint, emailOptions)
        const emailResult = await emailResponse.json()

        if (emailResponse.status === 200) {
            console.log('Email sent successfully:', emailResult);
            setLoading(false);
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.src = '/audio/ending/postcards.mp3';
                    setIsNarrationPlaying(true);
                    audioRef.current.play();
                    audioRef.current.onended = () => {
                        setIsNarrationPlaying(false);
                    };
                }
            }, 0);
            setSubmitted(true);
            setTimeout(() => {
                router.push('/end/farewell')
            }, 4000);
        } else {
            console.error('Error sending email:', emailResult);
            setLoading(false);
        }

        return result
    }

    return (
        <div className="h-screen overflow-hidden flex flex-col gap-8 justify-center items-center relative">

            {/* background */}
            <div className="absolute w-full h-full overflow-hidden">
                <div className="bg-black/100 w-full h-full absolute top-0 right-0 left-0 bottom-0"></div>
            </div>
            <img src="/dinoguide.svg" className={` animate-[bounce_0.7s_ease-in-out_infinite] fixed top-32 right-8  z-50 w-32 h-32 transition-all duration-500 ${isNarrationPlaying ? `opacity-100` : `opacity-0`}`} alt="" />
            {/* card */}
            <div className="relative flex flex-col items-center gap-8">
                <img src="/logo-white.svg" alt="Logo" className=" h-16 " />
                <p className="text-white/75 text-3xl max-w-4xl text-center">What a sight to behold! This adventure was a great success, thanks to your thoughtful decisions. You can get a screenshot of our Time-Touched Village sent to your email to keep as a memento of this fantastic journey.</p>
                <p className="text-white/75 text-3xl max-w-4xl text-center">Just enter your email address below, and we&apos;ll send it right over to you!</p>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col items-center gap-8">
                <input type="email" name="EMAIL" required id="email" placeholder="Your e-mail address..." className="bg-white rounded-full text-center px-8 py-4 text-6xl placeholder:opacity-40 outline-none" />
                <div className="flex gap-4">
                    <Link href={"/end/farewell"}>
                        <div className="button bg-white text-black" onClick={() => {
                            playClickSound();

                        }}>
                            Skip
                        </div>
                    </Link>
                    <input type="submit" value={'Send!'} className='button bg-green text-darkGreen' />

                </div>
                {isLoading && <p className="text-white/75 text-3xl max-w-4xl text-center">Sending...</p>}
                {isSubmitted && <p className="text-white/75 text-3xl max-w-4xl text-center">Postcards sent!</p>}
            </form>

            <img src="/postcards.webp" className="w-full max-w-7xl m-auto fixed -bottom-[10%]" alt="" />
            {/* audio refs */}
            <audio ref={audioRef} />
            <audio ref={clickSoundRef} />
            <audio ref={musicRef} loop />
        </div>
    );
}

export default PostCards;

