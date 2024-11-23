import { Link } from "react-router-dom";

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <img src={game.image} alt={game.name} className="game-image" />
      <h3>{game.name}</h3>
      <p>{game.description}</p>
      <Link to={`/game/${game.id}`} className="btn btn-primary">Play Now</Link>
    </div>
  );
};

export default GameCard;
