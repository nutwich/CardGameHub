import { useParams } from "react-router-dom";

const GamePage = () => {
  const { id } = useParams();

  return (
    <div className="game-page">
      <h2>Game {id}</h2>
      <p>This is the page for game {id}. You can implement the actual game here.</p>
    </div>
  );
};

export default GamePage;
