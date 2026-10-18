import "../css/Sidebar.css";
import { useEffect } from "react";
import { MdHome, MdCheck } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getGamesCategory } from "../redux/gameSlice";
import type { AppDispatch, RootState } from "../redux/store";
import type { SidebarProps } from "../types/type";

function Sidebar({ genre, setGenre, isOpen, onClose }: SidebarProps) {
    const dispatch = useDispatch<AppDispatch>();

    const { gamesCategory } = useSelector(
        (store: RootState) => store.game
    );

    useEffect(() => {
        dispatch(getGamesCategory());
    }, [dispatch]);

    return (
        <>
            {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

            <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
                <div className="sidebar-section">
                    <span className="sidebar-heading">MENU</span>

                    <button
                        type="button"
                        className={`sidebar-link ${genre === null ? "active" : ""}`}
                        onClick={() => {
                            setGenre(null);
                            onClose();
                        }}
                    >
                        <MdHome className="sidebar-link-icon" />
                        <span>Home</span>
                    </button>

                    <div className="sidebar-genres">
                        <span className="sidebar-heading">GENRES</span>

                        <div className="genre-list">
                            {gamesCategory.map((item) => (
                                <label key={item.id} className="genre-item">
                                    <input
                                        type="checkbox"
                                        className="genre-input"
                                        checked={genre === item.slug}
                                        onChange={() => {
                                            setGenre(genre === item.slug ? null : item.slug);
                                            onClose();
                                        }}
                                    />

                                    <span className="genre-box">
                                        <MdCheck className="genre-check" />
                                    </span>

                                    <span className="genre-label">{item.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="sidebar-bottom">
                    <div className="sidebar-version">
                        ONYX <span>v1.0</span>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;