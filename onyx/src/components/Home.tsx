import type { HomeProps } from '../types/type'
import type { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "swiper/css";
import '../css/Home.css'
import FeturedGame from './FeturedGame';
import GameCard from './GameCard';
import { getFeaturedGames, getGameByCategory, searchGames } from '../redux/gameSlice';

const defaultCategories = [
    'action',
    'sports',
    'strategy',
    'role-playing-games-rpg',
];

function Home({ genre, setGenre, search, setSearch }: HomeProps) {
    const category = genre;

    const { featuredGames, GamesByCategory, gamesCategory, searchResults } = useSelector(
        (store: RootState) => store.game
    );

    const dispatch = useDispatch<AppDispatch>();

    // Öne çıkan oyunları ve varsayılan kategorileri yükle
    useEffect(() => {
        dispatch(getFeaturedGames());

        defaultCategories.forEach((slug) => {
            dispatch(getGameByCategory(slug));
        });
    }, [dispatch]);

    // Seçili kategori varsayılanlarda yoksa onu da yükle
    useEffect(() => {
        if (category && !defaultCategories.includes(category)) {
            dispatch(getGameByCategory(category));
        }
    }, [dispatch, category]);

    // Arama: kullanıcı yazmayı bıraktıktan 500ms sonra istek at
    useEffect(() => {
        const query = search.trim();
        if (!query) return;

        const timer = setTimeout(() => {
            dispatch(searchGames(query));
        }, 500);

        return () => clearTimeout(timer);
    }, [dispatch, search]);

    const selectedGenre = gamesCategory.find((item) => item.slug === category);
    const selectedGames = category ? GamesByCategory[category] ?? [] : [];

    return (
        <div className='home-main'>
            <section className='homeHero'>
                <span>Curated for you</span>
                <div>
                    <h1>Find your next obsession.</h1>
                    <p>Explore unforgettable worlds, selected around the games you love.</p>
                </div>
            </section>

            <section>
                <div className="project-slider">
                    <Swiper
                        modules={[Pagination]}
                        slidesPerView={1}
                        spaceBetween={0}
                        loop={featuredGames.length > 1}
                        pagination={{ clickable: true }}
                    >
                        {featuredGames?.map((game) => (
                            <SwiperSlide key={game.id}>
                                <FeturedGame game={game} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            <section className='game-section'>
                <div>
                    <span>What players love</span>
                    <h4>Trending now</h4>
                    <p>The games everyone is talking about this week.</p>
                </div>
            </section>

            <section className="game-section">
                {search.trim() ? (
                    <div className="category-section">
                        <div className="category-header">
                            <h2>Results for "{search.trim()}"</h2>
                            <button
                                type="button"
                                className="clear-filter-btn"
                                onClick={() => setSearch("")}
                            >
                                ✕ Clear Search
                            </button>
                        </div>

                        <div className="game-grid">
                            {searchResults.map((game) => (
                                <GameCard key={game.id} game={game} />
                            ))}
                        </div>
                    </div>
                ) : category ? (

                    <div className="category-section">
                        <div className="category-header">
                            <h2>{selectedGenre?.name ?? category}</h2>
                            <button
                                type="button"
                                className="clear-filter-btn"
                                onClick={() => setGenre(null)}
                            >
                                ✕ Clear Filter
                            </button>
                        </div>

                        <div className="game-grid">
                            {selectedGames.map((game) => (
                                <GameCard key={game.id} game={game} />
                            ))}
                        </div>
                    </div>
                ) : (
                    defaultCategories.map((slug) => {
                        const genreInfo = gamesCategory.find((g) => g.slug === slug);
                        const games = GamesByCategory[slug] ?? [];

                        return (
                            <div key={slug} className="category-section">
                                <h2>{genreInfo?.name ?? slug}</h2>
                                <div className="game-grid">
                                    {games.map((game) => (
                                        <GameCard key={game.id} game={game} />
                                    ))}
                                </div>
                            </div>
                        );
                    })
                )}
            </section>
        </div>
    )
}

export default Home