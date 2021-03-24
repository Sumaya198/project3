// packages
import React, { useContext, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

//images
import Logo from '../../images/sortedOrange-01.png';

// styles
import './NavBar.css';

// context
import LoggedInContext from '../../context/LoggedInContext';
import MediaContext from '../../context/MediaContext';


const NavBar = () => {
  const { loggedIn } = useContext(LoggedInContext);

  const { isMobileDevice, isSmallScreen, isTabletDevice, isDesktopDevice, isLargeScreen } = useContext(MediaContext);
  const content = useRef(null);
  // state
  const [activeState, setActiveState] = useState('');
  const [contentHeight, setContentHeight] = useState('');

  const toggelCollapse = () => {

    setActiveState(activeState === '' ? 'active' : '');
    // console.log(content.current.scrollHeight);

    // if setActive is equal to active. 
    // true: the function will change setHeight to 0px. 
    // Else, if it’s already 0px it will change to the value of the contentscrollHeight.
    setContentHeight(
      activeState === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
  }

  return (
    <nav id='main-nav' >
      <NavLink to="/"><img id="logo" src={Logo} alt='sorted' /></NavLink>
      {
        (isTabletDevice || isDesktopDevice || isLargeScreen) &&
        (<>
          <NavLink className="navLink" to='/'>Home</NavLink>
          <NavLink className="navLink" to='/about'>About</NavLink>
          <NavLink className="navLink" to="/instructions">Instructions</NavLink>
          { loggedIn
            ? <NavLink className="navLink" to='/logIn'>My Households </NavLink>
            : <NavLink className="navLink" to='/logIn'>Log In </NavLink>
          }
          <NavLink className="navLink" to='/signUp'>Sign Up</NavLink>
        </>)
      }
      {
        (isMobileDevice) && (<>
          <button
            id='collapsed-menu'
            className={`collapsible ${activeState}`}
            onClick={toggelCollapse}
          >
            Menu
          </button>
          <div
            ref={content}
            style={{ maxHeight: `${contentHeight}` }}
            className="collapse-content"
          >
            <NavLink className="navLink" to='/'>Home</NavLink>
            <NavLink className="navLink" to='/about'>About</NavLink>
            <NavLink className="navLink" to="/instructions">Instructions</NavLink>
            {loggedIn
              ? <NavLink className="navLink" to='/logIn'>My Households </NavLink>
              : <NavLink className="navLink" to='/logIn'>Log In </NavLink>
            }
            <NavLink className="navLink" to='/signUp'>Sign Up</NavLink>
          </div>
        </>)
      }
    </nav>
  );
}


export default NavBar;