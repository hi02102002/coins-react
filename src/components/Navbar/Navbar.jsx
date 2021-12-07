import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IMG, NAVS } from 'constants/index';
import './Navbar.scss';

const Navbar = () => {
  useEffect(() => {
    const links = document.querySelectorAll('.nav__list-link');
    const line = document.querySelector('.line');
    const linkActive = document.querySelector('.nav__list-link.active');

    line.style.height = `${linkActive.offsetHeight}px`;
    line.style.top = `${linkActive.offsetTop}px`;

    const moveLine = e => {
      const item = e.target.closest('.nav__list-link');
      line.style.top = `${item.offsetTop}px`;
    };

    links.forEach(link => {
      link.addEventListener('click', moveLine);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', moveLine);
      });
    };
  });

  return (
    <nav className="nav">
      <div className="logo__container">
        <Link to="/" className="logo">
          <img src={IMG.logo} alt="logo" />
        </Link>
      </div>
      <ul className="nav__list">
        {NAVS.map(item => (
          <li key={item.name} className="nav__list-item">
            <NavLink
              activeclassname="active"
              to={item.url}
              className="nav__list-link"
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
        <div className="line"></div>
      </ul>
      <div className="nav__img">
        <img src={IMG.safetyBox} alt="" />
      </div>
    </nav>
  );
};

export default Navbar;
