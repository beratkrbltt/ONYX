import type { GameType } from '../types/type'
import '../css/FeturedGame.css'
import { Link } from "react-router-dom";

function FeturedGame({ game }: { game: GameType }) {
    const { name, background_image, background_image_additional, rating, released, metacritic } = game
    const image = background_image_additional || background_image
    return (
        <article
            className="fg"
            style={image ? { backgroundImage: `url("${image}")` } : undefined}
        >
            <div className="fg-overlay" />

            <div className="fg-content">
                <span className="fg-badge">FEATURED GAME</span>

                <h2 className="fg-title">{name}</h2>

                <div className="fg-info">
                    <span className="fg-rating">★ {rating ? rating.toFixed(1) : 'N/A'}</span>

                    {metacritic != null && (
                        <span className="fg-meta">Metacritic {metacritic}</span>
                    )}

                    {released && (
                        <span className="fg-year">{released.slice(0, 4)}</span>
                    )}
                </div>

                <Link to={`/games/${game.id}`} className="fg-button">
                    View Game <span aria-hidden="true">→</span>
                </Link>
            </div>
        </article>
    )
}

export default FeturedGame