
import { useState } from 'react'
import '../css/GameCard.css'
import type { GameType } from '../types/type'
import { Link } from 'react-router-dom'

const platformLabels: Record<string, string> = {
    pc: 'PC',
    playstation: 'PS',
    xbox: 'Xbox',
    nintendo: 'Switch',
    mac: 'Mac',
    linux: 'Linux',
    ios: 'iOS',
    android: 'Android',
    web: 'Web',
}

function GameCard({ game }: { game: GameType }) {
    const {
        name,
        background_image,
        rating,
        released,
        metacritic,
        parent_platforms,
        genres,
    } = game

    const [imageFailed, setImageFailed] = useState(false)

    const year = released ? released.slice(0, 4) : 'TBA'

    const platforms = (parent_platforms ?? [])
        .map(p => platformLabels[p.platform.slug] ?? p.platform.name)
        .slice(0, 3)

    const genreText = (genres ?? [])
        .slice(0, 2)
        .map(g => g.name)
        .join(' · ')

    return (
        <article className="gc">
            <div className="gc-media">
                {background_image && !imageFailed ? (
                    <img
                        className="gc-img"
                        src={background_image}
                        alt={name}
                        loading="lazy"
                        decoding="async"
                        onError={() => setImageFailed(true)}
                    />
                ) : (
                    <div className="gc-placeholder">
                        No image
                    </div>
                )}

                <div className="gc-overlay">
                    <div className="gc-platforms">
                        {platforms.map(p => (
                            <span key={p}>{p}</span>
                        ))}
                    </div>
                    <span className="gc-year">{year}</span>
                </div>
            </div>

            <div className="gc-body">
                <div className="gc-top">
                    <h3 className="gc-title" title={name}>
                        {name}
                    </h3>
                    {metacritic != null && (
                        <span className="gc-score">{metacritic}</span>
                    )}
                </div>

                <div className="gc-meta">
                    <span className="gc-rating">
                        ★ {(rating ?? 0).toFixed(1)}
                    </span>
                    {genreText && (
                        <span className="gc-genres">{genreText}</span>
                    )}
                </div>

                <div className="gc-actions">
                    <Link
                        to={`/games/${game.id}`}
                        className="gc-button"
                    >
                        View Details <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </article>
    )
}

export default GameCard
