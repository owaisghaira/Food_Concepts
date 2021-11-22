import React, { useEffect, createRef, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { useLayout } from '../providers/layout-provider';
import ApplicationLayout from '../layout';
import { Button, Layout, Typography, Space, Popover, Spin, Image } from 'antd';
import OpenSearchService from '../services/opensearch-service';
import { BulbOutlined, InfoCircleOutlined, SyncOutlined } from '@ant-design/icons';
import StackGrid, { transitions } from "react-stack-grid";
import { Card, PopoverBtn } from '../components';
import ReactResizeDetector from 'react-resize-detector';
import { useHistory } from "react-router-dom";
import dummyImage from '../images/blank.jpg';


const { scaleDown } = transitions;
const { Content } = Layout;
const { Paragraph, Title, Text } = Typography
let items = [];


function paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}


const Product = () => {

    const { state } = useLocation();
    const [isMobileLayout] = useLayout();
    const [thumbnailHeight, setThumbnailHeight] = useState(150);
    const [products, setProducts] = useState([]);
    const [columnWidth, setColumnWidth] = useState();
    const [gutterWidth, setGutterWidth] = useState();
    const [start, setStart] = useState(1);
    const similiarProductsContianer = createRef();
    const imageContianer = createRef();
    const gridContianer = createRef();
    const stackGridContianer = useRef();

    let history = useHistory();

    let {
        item_website_design_code,
        id,
        item_product_group,
        item_design_group,
        item_product_type,
        item_image,
        item_short_description,
        item_long_description,
        item_measurements,
        item_sample_lead_time,
        item_lower_moq,
        item_moq,
        item_color,
        item_fabric,
        item_blacklist_country,
    } = state._source;

    const colors = item_color != null ? item_color.map(color => color.color_name) : [];
    const fabrics = item_fabric != null ? item_fabric.map(fabric => fabric.fabric_name) : [];
    const imgStyles = isMobileLayout ? {} : { paddingLeft: '65px', paddingRight: '65px' }
    const blacklistCountries = item_blacklist_country.length > 0 ? item_blacklist_country.map(c => c.country_name) : [/*'Canada', 'United Kingdom'*/];

    const MOQ = (
        <ul>
            <li>You can request a lower MOQ if you group this order with 3 more items.</li>
            <li>Add item to your collection and request a price quote to learn more.</li>
        </ul>
    );
    const country = (countries) => {
        return (
            <ul>
                <li>If you are from {countries.join(',')}, add item to your collection and
                    request a price quote,we can help you choose from best of the available alternatives.
                </li>
            </ul>
        )
    };

    const handleScroll = (e) => {
        const bottom = window.pageYOffset + window.innerHeight > document.body.clientHeight - 100;

        if (bottom) {
            setStart((start) => start + 1);
        }
    }

    const handleClick = (tag) => {
        OpenSearchService.trackProductTag();
        history.push({ pathname: '/search/term/' + tag });
    }

    const renderCountry = (fontSize) => {
        if (blacklistCountries.length > 0) {
            return (
                <Popover content={country(blacklistCountries)} >
                    <InfoCircleOutlined /> <Text type='secondary' underline italic={true} style={{ fontSize: fontSize }} >This item is not available in {blacklistCountries.join(',')}</Text>
                </Popover>
            );
        }
    }

    const renderItem = (title, data, height = 70) => {
        if (data != null && data.length > 0) {
            return (
                <div style={{ flex: '0 0 33.333333%', height: `${height}px` }} >
                    <Paragraph type="secondary" style={{ marginBottom: '0px' }} >{title}</Paragraph>
                    <Paragraph strong >{data}</Paragraph>
                </div>
            )
        }
    }

    const renderMOQ = (moq) => {
        if (moq != null) {
            return (
                <div style={{ display: 'flex', justifyContent: 'left', flex: '0 0 66.666666%' }}>
                    <span>
                        <Paragraph type="secondary" style={{ marginBottom: '0px' }} >MOQ </Paragraph>
                        <Paragraph strong>{item_moq}</Paragraph>
                    </span>
                    {renderMOQMessage(item_lower_moq)}
                </div>

            );
        }
    }

    const renderMOQMessage = (item_lower_moq) => {
        if (item_lower_moq) {
            return (
                <Popover content={MOQ}  >
                    <Text type="secondary" italic={true} underline style={{ paddingLeft: '5px' }} > <BulbOutlined />This item may be eligible for lower MOQ</Text>
                </Popover>
            );
        }
    }

    const renderTags = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'left', marginTop: '10px' }}>
                <Space wrap>
                    {
                        item_product_type.map((ipt, index) => <Button key={`ipt-${index}`} style={{ background: '#e7e7e7', borderRadius: '5px' }} onClick={() => handleClick(ipt.product_type_name)} >{ipt.product_type_name}</Button>)
                    }

                    {
                        item_design_group.map((idg, index) => <Button key={`idg-${index}`} style={{ background: '#e7e7e7', borderRadius: '5px' }} onClick={() => handleClick(idg.design_group_name)} >{idg.design_group_name}</Button>)
                    }

                    {
                        item_product_group.map((pgn, index) => <Button key={`pgn-${index}`} style={{ background: '#e7e7e7', borderRadius: '5px' }} onClick={() => handleClick(pgn.product_group_name)} >{pgn.product_group_name}</Button>)
                    }
                </Space>
            </div>
        );
    }

    const renderInfo = () => {
        if (!isMobileLayout) {
            return (
                <>
                    <Title level={2}> {item_short_description}</Title>
                    <Paragraph className='pb-3' type="secondary">{item_long_description}</Paragraph>
                    <div style={{ display: 'flex', justifyContent: 'left', width: '100%', 'flexWrap': 'wrap' }}>
                        {renderItem('Measurment', item_measurements)}
                        {renderItem('Colours', colors.join(','))}
                        {renderItem('Fabric', fabrics.join(','))}
                        {renderItem('Sample lead time', item_sample_lead_time)}
                        {renderMOQ(item_moq, item_lower_moq)}
                    </div>
                    {renderCountry(16)}
                    <br />
                    <PopoverBtn item={state._source} quick={false} >
                        <Button style={{ background: '#303d4e', border: 'none', color: '#fff', borderRadius: '5px', height: '45px', marginTop: '50px', marginBottom: '50px' }} type='primary' size="large" >Add to collection</Button>
                    </PopoverBtn>
                    {renderTags()}
                </>
            );
        } else {
            return (
                <>
                    <Title level={4}> {item_short_description}</Title>
                    <Paragraph type="secondary">{item_long_description}</Paragraph>
                    <div style={{ display: 'flex', justifyContent: 'left', width: '100%', 'flexWrap': 'wrap', fontSize: '12px', height: 120 }}>
                        {renderItem('Measurment', item_measurements, 60)}
                        {renderItem('Fabric', fabrics.join(','), 60)}
                        {renderItem('Colours', colors.join(','), 60)}
                        {renderItem('Sample lead time', item_sample_lead_time, 60)}
                        {renderMOQ(item_moq, item_lower_moq, 60)}
                    </div>
                    {renderCountry(13)}
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <PopoverBtn item={state._source} quick={false} >
                            <Button style={{ background: '#303d4e', border: 'none', color: '#fff', borderRadius: '5px', height: '45px', marginTop: '20px', marginBottom: '20px' }} type='primary' size="large" >Add to collection</Button>
                        </PopoverBtn>
                    </div>
                    {renderTags()}
                </>
            );
        }
    }

    useEffect(() => {
        setStart(1)
        setProducts([])

        OpenSearchService.getProductDetail(item_website_design_code, id);

        const getSimilarProducts = async () => {

            if (state._source !== undefined && state._source !== null) {

                let product_group_name, design_group_name, product_type_name = state._source;

                if (item_product_group.length > 0) {
                    product_group_name = item_product_group[0].product_group_name;
                }
                if (item_design_group.length > 0) {
                    design_group_name = item_design_group[0].design_group_name;
                }
                if (item_product_type.length > 0) {
                    product_type_name = item_product_type[0].product_type_name;
                }

                let response = await OpenSearchService.getSimilarProducts({ product_group_name, design_group_name, product_type_name });

                if (response.status === 200 && response.data !== null) {
                    items = response.data.hits.hits;
                    let stacks = paginate(items, 8, start);
                    setProducts(stacks);
                    setStart((start) => start + 1);
                }
            }
        }

        getSimilarProducts();

        let imageWidth = imageContianer.current.clientWidth - 130

        setThumbnailHeight(isMobileLayout ? imageContianer.current.clientWidth : imageWidth);

        let width = similiarProductsContianer.current.clientWidth;
        let size = isMobileLayout ? width / 2 - 25 : width / 5 - 50;

        let gutterWidth = isMobileLayout ? 10 : 30;

        setColumnWidth(size);
        setGutterWidth(gutterWidth);

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);

    }, [state])

    useEffect(() => {
        setProducts([...products, ...paginate(items, 8, start)]);
    }, [start])

    // let { item_moq, item_image, item_long_description, item_design_group
    //     , item_product_group, item_product_type, item_lower_moq, item_sample_lead_time,
    //     item_short_description, item_measurements } = state._source;
    return (
        <ApplicationLayout>
            <Content>
                <div className={isMobileLayout ? "p15" : "p110"} style={{ marginTop: '20px', marginBottom: '80px' }} ref={gridContianer} >
                    <div className=' row m-1'>
                        <div className='col-lg-6 col-md-6 col-12' ref={imageContianer} style={imgStyles}>
                            {/* <img src={item_image.original} style={{ borderRadius: '9px', width: thumbnailHeight, objectFit: 'cover' }} alt="" className="img-fluid" /> */}

                            {/* <ProgressiveImage 
                                src={item_image.original}
                                overlaySrc={dummyImage}
                                className={'img-fluid'}
                                style={{ borderRadius: '9px', width: thumbnailHeight, objectFit: 'cover' }}
                            /> */}


                            <Image
                                src={item_image.original}
                                style={{ borderRadius: '9px', width: thumbnailHeight, height:thumbnailHeight, objectFit: 'cover' }}
                                alt=""
                                className={ isMobileLayout ? "img-fluid" : '' }
                                preview={true}
                                placeholder={
                                        // <Image
                                        //     preview={false}
                                        //     src={dummyImage}
                                        //     style={{ objectFit: 'cover', width: '100%' }}
                                        //     width={'100%'}
                                        // />
                                        <div className="loader" style={{ backgroundImage : `url(${dummyImage})`  }} >
                                            <SyncOutlined spin style={{ fontSize: '60px', color: '#000' }} />
                                        </div>
                                }
                            />
                        </div>
                        <div className='col-lg-6 col-md-6 col-12 pt-2 '>
                            {renderInfo()}
                        </div>
                    </div>
                </div>
                <div className={isMobileLayout ? "p15" : "p35"} style={{ marginTop: '20px', marginBottom: '80px' }} ref={similiarProductsContianer} >
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <Title level={isMobileLayout ? 4 : 2}>Similiar Products</Title>
                    </div>

                    <StackGrid
                        ref={stackGridContianer}
                        columnWidth={columnWidth}
                        appear={scaleDown.appear}
                        appearDelay={2000}
                        gutterWidth={gutterWidth}
                        gutterHeight={gutterWidth + 20}
                    >
                        {
                            products.map((pin, index) => {
                                return (
                                    <ReactResizeDetector
                                        key={'pin-' + index}
                                        handleWidth
                                        handleHeight
                                        onResize={() => {
                                            if (stackGridContianer) {
                                                stackGridContianer.current.updateLayout();
                                            }
                                        }}>
                                        <Card item={pin} size="small" key={'pin-' + index} hover={!isMobileLayout} />
                                    </ReactResizeDetector>

                                );
                            })
                        }
                    </StackGrid>
                </div>

            </Content>
        </ApplicationLayout>
    )
}


export default Product
