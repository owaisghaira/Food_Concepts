import React, { useState, useEffect, useRef } from 'react'
import { PopoverBtn } from '../components';
import { Typography, Button } from 'antd';
import { useHistory } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;

const CardItem = ({ item, size, hover }) => {

    let history = useHistory();
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const imageContianer = useRef(null);

    let { Images, SellingPrice, Name } = item;
    const goToProduct = () => {
        history.push({ pathname: `/product`, state: item });
    }

    const handleClick = (e) => {
        if (e.target.className === 'card-overlay') {
            goToProduct();
            window.scrollTo(0, 0)
        }
    }

    useEffect(() => {
        if (hover) {
            setTimeout(() => {
                if (imageContianer.current != null) {
                    setWidth(imageContianer.current.clientWidth);
                    setHeight(imageContianer.current.clientHeight);
                }
            }, 1000)
        }
    }, [width, height, item, hover]);


    const renderTitleBar = () => {
        if (!hover) {
            return (
                <div className="mobile-title-bar" >
                    {/* <Text ellipsis={true} >{Name}</Text> */}
                    {/* <PopoverBtn item={item._source} quick={true} > */}
                        <Button style={{ background: '#303d4e', border: 'none' }} type="primary" icon={<PlusOutlined />} size='middle' />
                    {/* </PopoverBtn> */}
                </div>
            );
        } else {
            return (
                <div onClick={handleClick} >
                    <div className="title-bar">
                        {/* <Text ellipsis={true} >{Name}</Text> */}
                        {/* <PopoverBtn item={item._source} > */}
                            <Button style={{ background: '#303d4e', border: 'none' }} type="primary" icon={<PlusOutlined />} size='middle' />
                        {/* </PopoverBtn> */}
                    </div>
                </div>
            );
        }
    }

    return (
        <div style={{
            ...styles.card,
            ...styles[size]
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }} className="card-item" >
                <img src={Images} style={{ borderRadius: '9px', objectFit: 'cover', width: '100%' }} alt={Images} onClick={goToProduct} ref={imageContianer} />
                {renderTitleBar()}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px', fontWeight: 'bold' }}>
                    <p >{Name}</p>
                    <p >RS.{SellingPrice}</p>
                </div>
            </div>
        </div>
    )
}
const styles = {
    card: {
        margin: '0px 10px',
        padding: 0,
        borderRadius: '10px',
        position: 'relative',
        boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.1)'
    },

    // small: {
    //     gridRowEnd: 'span 26',
    // },
    // medium: {
    //     gridRowEnd: 'span 33'
    // },
    // large: {
    //     gridRowEnd: 'span 38'
    // }
}

export default CardItem
