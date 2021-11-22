import React, { useState, useEffect, createRef } from 'react'
import { Typography, Col } from 'antd';
import { useHistory } from "react-router-dom";

const { Text } = Typography;

const ProductTile = ({ item, size, isMobileLayout }) => {

    let history = useHistory();
    const container = createRef();
    const [imageDimension, setImageDimension] = useState(150);
    const [font, setFont] = useState(25);
    const styles = isMobileLayout ? { padding: '8px' } : { maxWidth: '20%', flex: '0 0 20%', cursor: 'pointer' };

    let { design_group_name, design_group_image } = item._source;

    const goToProduct = () => {

        history.push({ pathname: `/search/design-group/` + design_group_name });
    }

    useEffect(() => {

        let width = size > 0 ? size : container.current.clientWidth;


        if (isMobileLayout) {
            width = width - 12;
            setFont(20)
        }

        setImageDimension(width);

    }, [container, isMobileLayout, size]);

    return (
        <Col span={4} xs={12} lg={4} style={styles} >
            <div ref={container} onClick={goToProduct}>
                <div style={{ borderRadius: '15px', width: imageDimension, height: imageDimension, backgroundImage: `url(${design_group_image.thumbnail})`, backgroundSize: 'cover', margin: '0px auto' }} className="card-item" >
                    <div className="overlay" >
                        <Text ellipsis={true} style={{ fontSize: `${font}px` }}  >{design_group_name}</Text>
                    </div>
                </div>
            </div>
        </Col>

    )
}

export default ProductTile
