
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { getGameDetails } from "../redux/gameSlice";
import "../css/GameDetail.css";

function GameDetail() {
    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();
    const { GameDetails, error } = useSelector(
        (store: RootState) => store.game
    );

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (id) dispatch(getGameDetails(id));
    }, [id, dispatch]);

    if (error) {
        return <p className="gd-state">{error}</p>;
    }

    if (!GameDetails) {
        return null;
    }

    const year = GameDetails.released?.slice(0, 4);
    const percent = Math.min(100, (GameDetails.rating / 5) * 100);

    const images = [
        GameDetails.background_image,
        GameDetails.background_image_additional,
    ].filter((src): src is string => Boolean(src));

    return (
        <div className="gd">
            <div className="gd-main">
                <button
                    className="gd-back"
                    onClick={() => navigate(-1)}
                >
                    <span className="gd-back-arrow" aria-hidden="true">
                        ←
                    </span>{" "}
                    Go Back
                </button>

                <p className="gd-eyebrow">
                    <span>FEATURED RELEASE</span> {year}
                </p>

                <h1 className="gd-title">{GameDetails.name}</h1>
                <p className="gd-meta">★ {GameDetails.rating} RAWG</p>

                <section className="gd-about">
                    <h3 className="gd-label">ABOUT THE GAME</h3>
                    <p className="gd-desc">
                        {GameDetails.description_raw}
                    </p>
                </section>

                <section>
                    <h3 className="gd-label">GALLERY</h3>
                    <div className="gd-gallery">
                        {images.map((src, i) => (
                            <img
                                key={i}
                                src={src}
                                alt={`${GameDetails.name} ${i + 1}`}
                            />
                        ))}
                    </div>
                </section>
            </div>

            <aside className="gd-card">
                <h3 className="gd-label">GAME INFORMATION</h3>

                <div className="gd-row">
                    <span>Release date</span>
                    <strong>{GameDetails.released}</strong>
                </div>

                <div className="gd-rating">
                    <div className="gd-rating-top">
                        <span>RAWG rating</span>
                        <strong>{GameDetails.rating}</strong>
                    </div>

                    <div className="gd-bar">
                        <div
                            className="gd-bar-fill"
                            style={{ width: `${percent}%` }}
                        />
                    </div>
                </div>
            </aside>
        </div>
    );
}

export default GameDetail;
