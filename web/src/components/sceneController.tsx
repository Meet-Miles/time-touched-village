
import { useState } from 'react';
import { Choice } from '../types/scene';
import Scene from './scene';

interface SceneControllerProps {
    scenes: Scene[];
}

const SceneController: React.FC<SceneControllerProps> = ({ scenes }) => {
    const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);

    const handleChoiceSelected = (choice: Choice) => {
        // Move to the next scene and reset to the title step
        setCurrentSceneIndex(prevIndex => (prevIndex + 1) % scenes.length);
    }

    return (
        <div className="relative">
            {/* breadcrumb */}
            <header className={`z-50 fixed top-0 right-0 left-0 flex p-8 justify-between items-center bg-gradient-to-b ${currentSceneIndex === 6 ? `from-red to-red/0` : `from-black to-black/0`}`}>
                <div className='flex gap-2'>
                    {scenes.map((scene, i) => {
                        const isActive = scene.sceneNumber === currentSceneIndex + 1;
                        const isCompleted = i < currentSceneIndex;

                        let bgColor = 'bg-white';
                        let textColor = 'text-black';

                        if (scene.sceneNumber === 7) {
                            bgColor = 'bg-red';
                            textColor = 'text-white';
                        } else if (isCompleted) {
                            bgColor = 'bg-green';
                            textColor = 'text-darkGreen';
                        }

                        return (
                            <div key={i} className={`w-12 h-12 ${bgColor} ${textColor} rounded-full flex items-center justify-center ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                                <p>{scene.sceneNumber}</p>
                            </div>
                        );
                    })}

                </div>
                <img src="/logo-white.svg" className='h-14' alt="" />
            </header>
            <Scene data={scenes[currentSceneIndex]} onChoiceSelected={handleChoiceSelected} />
        </div>
    )
}

export default SceneController;