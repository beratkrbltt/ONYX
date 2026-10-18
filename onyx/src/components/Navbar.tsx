import { CiSearch } from "react-icons/ci";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { FaWolfPackBattalion } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import type { NavbarProps } from "../types/type";
import "../css/Navbar.css";

function Navbar({ onMenuClick, search, setSearch }: NavbarProps) {
    return (
        <nav className="navbar">
            <a className="logo-link" href="/">
                <FaWolfPackBattalion size={40} color="#3b0c6d" />
                <span className="logo-text">ONYX</span>
            </a>

            <div className="navbar-btn">
                <TextField
                    className="navbar-search"
                    placeholder="Search Games..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CiSearch />
                                </InputAdornment>
                            ),
                        },
                    }}
                    variant="outlined"
                    size="small"
                />
            </div>

            <button type="button" className="navbar-menu" onClick={onMenuClick} aria-label="Menüyü aç">
                <IoIosMenu />
            </button>
        </nav>
    );
}

export default Navbar;