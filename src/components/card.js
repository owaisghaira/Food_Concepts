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


    let { item_image, item_short_description, item_title } = item._source;

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
    }, [width, height, item,hover]);


    const renderTitleBar = () => {
        if (!hover) {
            return (
                <div className="mobile-title-bar" >
                    <Text ellipsis={true} >{item_title}</Text>
                    <PopoverBtn item={item._source} quick={true} >
                        <Button style={{ background: '#303d4e', border: 'none' }} type="primary" icon={<PlusOutlined />} size='middle' />
                    </PopoverBtn>
                </div>
            );
        } else {
            return (
                <div className="card-overlay" style={{ width: width, height: height }} onClick={handleClick} >
                    <div className="title-bar">
                        <Text ellipsis={true} >{item_title}</Text>
                        <PopoverBtn item={item._source} >
                            <Button style={{ background: '#303d4e', border: 'none' }} type="primary" icon={<PlusOutlined />} size='middle' />
                        </PopoverBtn>
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
                <img src={item_image.thumbnail} style={{ borderRadius: '9px', objectFit:'cover', width: '100%' }} alt={item_title} onClick={goToProduct} ref={imageContianer} />
                {renderTitleBar()}
                {/* <p className="truncate" onClick={goToProduct} >{item_short_description}</p> */}
                <Text ellipsis={true} onClick={goToProduct} style={{ marginTop: '5px' }} >{item_short_description}</Text>
            </div>
        </div>
    )
}
const styles = {
    card: {
        margin: '0px 10px',
        padding: 0,
        borderRadius: '16px',
        position: 'relative'
    },

    small: {
        gridRowEnd: 'span 26',
    },
    medium: {
        gridRowEnd: 'span 33'
    },
    large: {
        gridRowEnd: 'span 38'
    }
}

export default CardItem
