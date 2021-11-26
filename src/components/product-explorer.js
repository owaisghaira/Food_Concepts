import React, { useEffect, useState, createRef } from 'react';
import { Row, Typography } from 'antd';
import { ProductTile } from '../components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { RightCircleTwoTone, LeftCircleTwoTone } from '@ant-design/icons';

const { Text, Title } = Typography;

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const chunk = (a, n) => [...Array(Math.ceil(a.length / n))].map((_, i) => a.slice(n * i, n + n * i));

const ArrowFix = (arrowProps) => { const { carouselState, children, ...restArrowProps } = arrowProps; return (<div {...restArrowProps}> {children} </div>); };

const ProductExplorer = ({ products, isMobileLayout }) => {

    const [gutter, setGutter] = useState([36, 48]);
    const [size, setSize] = useState(150);
    const [toggle, setToggle] = useState(false);

    const container = createRef();

    useEffect(() => {

        let width = container.current.clientWidth;

        let tileSize = isMobileLayout ? width / 2 - 20 : width / 5 - 60;
        setSize(tileSize);

        let gutters = isMobileLayout ? [24, 24] : [36, 48];
        setGutter(gutters);

    }, [size]);

    const renderGrid = (products) => {
        return (
            <Row gutter={gutter} className="product-grid-row">
                {
                    products.map((product, index) => {
                        return <ProductTile item={product} key={'product-tile-' + index} isMobileLayout={isMobileLayout} size={size} />
                    })
                }
            </Row>
        );
    }

    const renderMobileGrid = (products, name) => {
        return (
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 0, width: 'inherit' }} >
                {
                    products.map((product, index) => {
                        return <ProductTile item={product} key={`product-tile-${name}-${index}`} isMobileLayout={isMobileLayout} size={size} />
                    })
                }
            </div>
        );
    }


    const renderProducts = () => {
        if (toggle) {
            if (isMobileLayout) {
                return renderMobileGrid(products, 'grid');
            } else {
                return renderGrid(products);
            }
        } else {
            if (isMobileLayout) {

                let chunks = chunk(products, 2);

                return (
                    <Carousel
                        responsive={responsive}
                        showDots={false}
                        //itemClass="c-item"
                        renderDotsOutside={true}
                        removeArrowOnDeviceType={['mobile']}
                    >
                        {
                            chunks.map((chunk) => {
                                return renderMobileGrid(chunk, 'carousel');
                            })
                        }
                    </Carousel>
                );
            } else {
                return (
                    <Carousel
                        responsive={responsive}
                        showDots={false}
                        infinite={true}
                        itemClass="c-item"
                        renderDotsOutside={true}
                        customRightArrow={<ArrowFix><div className="right-arrow"><RightCircleTwoTone twoToneColor="#f0f0f0" style={{ fontSize: '32px' }} /></div></ArrowFix>}
                        customLeftArrow={<ArrowFix><div className="left-arrow"><LeftCircleTwoTone twoToneColor="#f0f0f0" style={{ fontSize: '32px' }} /></div></ArrowFix>}
                    >
                        {
                            products.map((product, index) => {
                                return <div key={index}  ><ProductTile item={product} isMobileLayout={isMobileLayout} size={size} /></div>
                            })
                        }
                    </Carousel>
                );
            }
        }
    }

    return (
        <>
            <div className={isMobileLayout ? "p15" : "p60"} style={{ marginTop: '20px', marginBottom: '20px' }} >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Title level={4}>Explore by Restaurants</Title>
                    <Text onClick={() => setToggle(!toggle)} style={{ cursor: 'pointer' }}  >{toggle ? "Collapse" : "View All"}</Text>
                </div>
            </div>
            <div className={isMobileLayout ? "p15" : "p60"} style={{ marginTop: '20px', marginBottom: '30px' }} ref={container} >
                {renderProducts()}
            </div>

        </>
    )
}

export default ProductExplorer