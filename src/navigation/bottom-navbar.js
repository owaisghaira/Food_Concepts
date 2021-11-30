import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { HomeOutlined, ShopOutlined, ShoppingCartOutlined, HistoryOutlined } from '@ant-design/icons';
import { CartModal } from '../components';

export default function BottomNavigationBar() {
    const [value, setValue] = useState('recents');
    const [isModalVisible, setIsModalVisible] = useState(false);
    let history = useHistory();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <div className='bottom-navBar'>
            <BottomNavigation value={value} onChange={handleChange}>
                <BottomNavigationAction
                    label="Home"
                    value="home"
                    icon={<HomeOutlined />}
                    onClick={() => history.push({ pathname: '/home' })}

                />
                <BottomNavigationAction
                    label="Shops"
                    value="shops"
                    icon={<ShopOutlined />}
                    onClick={() => history.push({ pathname: '/home' })}

                />
                <BottomNavigationAction
                    label="Cart"
                    value="cart"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => setIsModalVisible(true)}
                />
                <BottomNavigationAction
                    label="Track"
                    value="track"
                    icon={<HistoryOutlined />}
                    onClick={() => history.push({ pathname: '/track-order' })}

                />
            </BottomNavigation>
            <CartModal displayModal={isModalVisible} toggleModal={setIsModalVisible} />
        </div>
    );
}
