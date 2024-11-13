import React from 'react';
import './header.css';
import NetflixLogo from '../../assets/images/Netflix_Logo_PMS.png';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';



const Header = () => {
  return (
    <div className="header_outer_container">
      <div className="header_container">
        <div className="header_left">
          <ul className="nav_list">
            <li><a href="/"><img src={NetflixLogo} alt="Netflix Logo" width="100" /></a></li>
            <li><a href="/">Netflix</a></li>
            <li><a href="/">Home</a></li>
            <li><a href="/">TV Shows</a></li>
            <li><a href="/">Movies</a></li>
            <li><a href="/">Latest</a></li>
            <li><a href="/">My List</a></li>
            <li><a href="/">Browse by Languages</a></li>
          </ul>
        </div>
        <div className="header_right">
          <ul className="icon_list">
            <li><SearchIcon /></li>
            <li><NotificationsNoneIcon /></li>
            <li><AccountBoxIcon /></li>
            <li><ArrowDropDownCircleIcon /></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
