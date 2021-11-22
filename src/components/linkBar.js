import React from 'react'
import { Menu } from 'antd';


const LinkBar = () => {
    let navLinks = ['All', 'Curtains', 'Cushions', 'Carpet', 'Bedsheet', 'Wallpaper', 'Pillow Cover', 'Mats', 'Table Cloth', 'Bags', 'Aprons', 'Towels', 'Potbags', 'Interior', 'Towels','Linen']
    return (
        <div className="navbar navbar-expand-lg navbar-light">
            <Menu
                // onClick={this.handleClick}
                // selectedKeys={[current]}
                mode="horizontal"
                className="main-menu"
            >
                {navLinks.map((link, index) => {
                    return (
                        <Menu.Item key={`link-${index}`} >
                            {link}
                        </Menu.Item>
                    )
                })}
            </Menu>



            {/* <ul className="navbar-nav">
                {navLinks.map((link, index) => {
                    return (
                        <li className="nav-item mx-2" key={`link-${index}`} >
                            <p className="nav-link" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {link}
                            </p>
                        </li>
                    )
                })}
            </ul> */}
        </div>
    )
}

export default LinkBar;
