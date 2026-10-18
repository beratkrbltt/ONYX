export interface StateType {
    loading: boolean;
    error: string | null;
    games: GameType[];
    gamesCategory: GameCategoryType[];
    featuredGames: GameType[];
    GamesByCategory: Record<string, GameType[]>;
    searchResults: GameType[];
    GameDetails: GameDetailsType | null;
}

export interface GameType {
    id: number;
    slug: string;
    name: string;
    background_image: string | null;
    background_image_additional?: string | null;
    description?: string;
    rating: number;
    released: string | null;
    metacritic: number | null;
    parent_platforms?: { platform: { id: number; name: string; slug: string } }[];
    genres?: { id: number; name: string; slug: string }[];
}
export interface GameCategoryType {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string | null;
}

export type GenreType = string;

export type SidebarProps = {
    genre: string | null;
    setGenre: (genre: string | null) => void;
    isOpen: boolean;
    onClose: () => void;
};

export interface HomeProps {
    genre: string | null;
    setGenre: (genre: string | null) => void;
    search: string;
    setSearch: (value: string) => void;
};
export type NavbarProps = {
    onMenuClick: () => void;
    search: string;
    setSearch: (value: string) => void;
};


export interface GameDetailsType {
    id: number;
    slug: string;
    name: string;
    description: string;
    description_raw: string;
    background_image: string | null;
    background_image_additional: string | null;
    released: string | null;
    rating: number;
    rating_top: number;
    metacritic: number | null;
    website: string;
    playtime: number;
    genres: {
        id: number;
        name: string;
        slug: string;
    }[];
    platforms: {
        platform: {
            id: number;
            name: string;
            slug: string;
        };
    }[];
    developers: {
        id: number;
        name: string;
        slug: string;
    }[];
    publishers: {
        id: number;
        name: string;
        slug: string;
    }[];
}