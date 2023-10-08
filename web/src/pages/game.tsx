import SceneController from "@/components/sceneController";
import { scenes } from "@/scenes";

const Game: React.FC = () => {
    return (
        <div>
            <SceneController scenes={scenes} />
        </div>
    );
}

export default Game;