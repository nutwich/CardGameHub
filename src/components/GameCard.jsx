import { Link } from "react-router-dom";

const GameCard = () => {
  return (
    <div className="game-card">
      <img  className="game-image" />
      <h3> </h3>
      <p>{}</p>
      <Link to={`/game/`} className="btn btn-primary">Play Now</Link>
    </div>
  );
};

export default GameCard;
