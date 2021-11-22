import React, { useEffect, useState, createRef } from 'react';
import { Row, Typography } from 'antd';
import { DesignTile } from '../components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { RightCircleTwoTone, LeftCircleTwoTone } from '@ant-design/icons';

const { Text, Title } = Typography;

const chunk = (a, n) => [...Array(Math.ceil(a.length / n))].map((_, i) => a.slice(n * i, n + n * i));

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

const ArrowFix = (arrowProps) => { const { carouselState, children, ...restArrowProps } = arrowProps; return (<div {...restArrowProps}> {children} </div>); };


const DesignExplorer = ({ designs, isMobileLayout }) => {

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

    const renderGrid = (designs) => {
        return (
            <Row gutter={gutter} className="product-grid-row"  >
                {
                    designs.map((design, index) => {
                        return <DesignTile item={design} key={'design-tile-' + index} isMobileLayout={isMobileLayout} size={size} />
                    })
                }
            </Row>
        );
    }

    const renderMobileGrid = (designs,name) => {
        return (
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: 0, width: 'inherit' }} >
                {
                    designs.map((design, index) => {
                        return <DesignTile item={design} key={`design-tile-${name}-${index}`} isMobileLayout={isMobileLayout} size={size} />
                    })
                }
            </div>
        );
    }

    const renderDesigns = () => {
        if (toggle) {
            if (isMobileLayout) {
                return renderMobileGrid(designs,'grid');
            }else{
                return renderGrid(designs);
            }
        } else {
            if (isMobileLayout) {

                let chunks = chunk(designs, 4);

                return (
                    <Carousel
                        responsive={responsive}
                        showDots={true}
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
                        showDots={true}
                        infinite={true}
                        itemClass="c-item"
                        renderDotsOutside={true}
                        customRightArrow={<ArrowFix><div className="right-arrow"><RightCircleTwoTone twoToneColor="#f0f0f0" style={{ fontSize: '32px' }} /></div></ArrowFix>}
                        customLeftArrow={<ArrowFix><div className="left-arrow"><LeftCircleTwoTone twoToneColor="#f0f0f0" style={{ fontSize: '32px' }} /></div></ArrowFix>}
                    >
                        {
                            designs.map((design, index) => {
                                return <div key={'design-carousel-tile-' + index}><DesignTile item={design} isMobileLayout={isMobileLayout} size={size} /></div>
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
                    <Title level={4}>Explore by designs</Title>
                    <Text onClick={() => setToggle(!toggle)} style={{ cursor: 'pointer' }} >{toggle ? "Collapse" : "View All"}</Text>
                </div>
            </div>
            <div className={isMobileLayout ? "p15" : "p60"} style={{ marginTop: '20px', marginBottom: '30px' }} ref={container} >
                {renderDesigns()}
            </div>

        </>
    )
}

export default DesignExplorer