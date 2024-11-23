import GameCard from "../components/GameCard";

const HomePage = () => {
  const games = [
    { id: 1, name: "Poker", description: "Multiplayer poker game.", image: "/images/poker.jpg" },
    { id: 2, name: "Blackjack", description: "Beat the dealer in Blackjack.", image: "/images/blackjack.jpg" },
    { id: 3, name: "Solitaire", description: "Enjoy classic Solitaire.", image: "/images/solitaire.jpg" },
  ];

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to Card Game Hub</h1>
        <p>Discover exciting card games!</p>
      </header>
      <section className="game-section">
        <h2>Popular Games</h2>
        <div className="game-list">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
