import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from '../components/SidebarData';
import './Navbar.css';
import logo from '../components/common/Logo_nonebackground.png'
/* 아이콘 컬러 전체 변경 기능 */
import { IconContext } from 'react-icons';
function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  // const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      {/* 아이콘 컬러 전체 변경 기능 */}
      <IconContext.Provider value={{ color: '#fff' }}>
        {/* 네비게이션 토글 코드*/}
        <div className="navbar">
          <Link to="#" className="menu-bars">
            {/* <FaIcons.FaBars onClick={showSidebar} /> */}
          </Link>
          <Link to="/" style={{width:"300px"}}>
            <img src={logo} style={{width:"100%", marginLeft:"-100%"}}/>
          </Link>

          <div style={{marginRight:"3%", textDecorationLine:"none"}}>
          <Link to="/" className="menu-bars Z" style={{color:"rgb(237,69,69)", textDecoration:"none", fontSize:"25px"}}>
            Home
          </Link>
          <Link to="#" className="menu-bars Z" style={{color:"rgb(243,240,237)", textDecoration:"none", fontSize:"25px"}}>
            Explorer
          </Link>
          <Link to="#" className="menu-bars Z" style={{color:"rgb(243,240,237)", textDecoration:"none", fontSize:"25px"}}>
            Exchange
          </Link>
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" >
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                {/* <AiIcons.AiOutlineClose /> */}
              </Link>
            </li>
            {/* SidebarData를 순서대로 담기*/}
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
export default Navbar;