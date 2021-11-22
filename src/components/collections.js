import React, { createRef, useState, useEffect } from 'react'
import { useLayout } from '../providers/layout-provider';
import { Typography, Button, Row, Col, Empty, Popover, Divider, Tag } from 'antd';
import { FileSearchOutlined, PlusCircleOutlined, FileAddOutlined, PlusOutlined, MoreOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import mixpanelService from '../services/mixpanel-service';
import { renameCollection, deleteCollection, createCollection } from '../redux/actions';
import dummyImage from '../images/dummy.jpg';

const { Title, Text, Paragraph } = Typography;

const CollectionItem = ({ columnWidth, collection }) => {
    const history = useHistory();
    const width = columnWidth / 100 * 65;
    const smallWidth = columnWidth - width;
    const height = columnWidth / 100 * 85;
    const smallHeight = height / 2;
    const [firstImage, setFirstImage] = useState(dummyImage);
    const [secondImage, setSecondImage] = useState(dummyImage);
    const [thirdImage, setThirdImage] = useState(dummyImage);
    const [editable, setEditable] = useState(false);
    let itemsCount = collection.items.length || 0;
    const dispatch = useDispatch();

    const goToCollectionDetail = (key) => {
        localStorage.setItem('key', collection.key)
        history.push({ pathname: `/my-collection-list` });
    }

    const renderImages = (itemsCount) => {
        if (itemsCount > 0) {
            return (
                <div style={{ display: 'flex', justifyContent: 'space-equally' }} onClick={() => goToCollectionDetail()}  >
                    <img style={{ width: `${width}px`, height: `${height}px`, borderRadius: '8px 0px 0px 8px', objectFit: 'cover' }} src={firstImage} alt="" />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-equally' }}>
                        <img style={{ width: `${smallWidth}px`, height: `${smallHeight}px`, borderRadius: '0px 8px 8px 0px', objectFit: 'cover' }} alt="" src={secondImage} />
                        <div style={{ width: `${smallWidth}px`, height: `${smallHeight}px`, borderRadius: '0px 8px 8px 0px', objectFit: 'cover', background: `url(${thirdImage})` }}  >
                            <span className="overlay" style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px', color: '#fff' }}  >
                                {collection.items.length - 3 < 0 ? '+0' : (`+${collection.items.length - 3}`)}
                            </span>
                        </div>
                    </div>
                </div>
            );
        } else {
            const height = columnWidth / 100 * 80;

            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: `${columnWidth}px`, height: `${height}px`, borderRadius: '8px', backgroundColor: '#f0f0f0' }} onClick={() => goToCollectionDetail()} >
                    <Empty
                        description={
                            <span>
                                No items added
                            </span>
                        }
                    />
                </div>

            );
        }
    }

    useEffect(() => {

        if (collection != null) {

            let { items } = collection;

            if (items.length > 0) {
                let fImage = items[0].item_image.thumbnail;
                let sImage = items[1] !== undefined ? items[1].item_image.thumbnail : dummyImage;
                let tImage = items[2] !== undefined ? items[2].item_image.thumbnail : dummyImage;

                setFirstImage(fImage);
                setSecondImage(sImage);
                setThirdImage(tImage);
            }
        }
    }, []);

    const removeCollection = (key) => {
        dispatch(deleteCollection({ key }))
    }

    const rename = (name) => {
        dispatch(renameCollection({ key: collection.key, name }));
        setEditable(false);
    }

    const content = (
        <div>
            <div style={{ cursor: 'pointer' }} onClick={() => setEditable(true)} >Rename</div>
            <Divider style={{ marginTop: '10px', marginBottom : '10px' }}  />
            <div style={{ cursor: 'pointer' }} onClick={() => removeCollection(collection.key)}>Delete</div>
        </div>
    );

    const renderBadge = (hasNew) => {
        if (hasNew) {
            return <Tag color="#cd201f" >NEW</Tag>
        }
    }


    let editableControl = {
        onChange: (e) => rename(e),
        onCancel: () => setEditable(false),
        editing: editable,
        icon: null,
        tooltip: false
    }

    return (
        <div style={{ width: columnWidth - 24 }} style={{ cursor: 'pointer' }} >
            {renderImages(itemsCount)}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '80%' }}>
                    <Paragraph strong style={{ marginBottom: '0px' }} >
                        <Text editable={editableControl} >{collection.name}</Text>
                        {renderBadge(collection.hasNew)}
                    </Paragraph>
                    <Paragraph type="secondary" style={{ fontSize: '14px' }} >{collection.items.length} products</Paragraph>
                </div>
                <Popover placement="topRight" content={content} trigger="click">
                    <MoreOutlined style={{ fontSize: '24px' }} />
                </Popover>
            </div>
        </div >
    );
}

const Collections = () => {
    const history = useHistory();
    const gridContianer = createRef();
    const [isMobileLayout] = useLayout();
    const [columnWidth, setColumnWidth] = useState();
    const [gap, setGap] = useState(110);
    const collections = useSelector((state) => state.collections);
    const dispatch = useDispatch();

    const addNewCollection = () => {
        dispatch(createCollection({ name: 'New Collection', items: [] }));
        // mixpanelService.addNewCollection();
    }

    const goToHome = () => {
        history.push({ pathname: `/` })
    }

    useEffect(() => {
        let width = gridContianer.current.clientWidth;
        let size = isMobileLayout ? width - 45 : width / 3 - 120;
        setColumnWidth(size);
        let remainingSpace = width - size * 3;
        setGap(remainingSpace / 2 - 70);

        // mixpanelService.trackCollection();
    }, []);

    return (
        <>
            <div className={isMobileLayout ? "p15" : "p60"} style={{ marginTop: '20px', marginBottom: '20px' }} >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <Title className='collection' level={4}>My Collection </Title>
                        <Text style={{ fontSize: '12px' }} type="secondary">{collections.length} Collections</Text>
                    </div>
                    <div className='m-2'>
                        <Button onClick={addNewCollection}>
                            <Text type="secondary"><PlusOutlined className='svg-icon' /> Create a new collection</Text>
                        </Button>
                    </div>
                </div>
            </div>
            <div className={isMobileLayout ? "p15" : "p60"} style={{ marginTop: '40px', marginBottom: '20px' }} ref={gridContianer}  >
                <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: gap }} >
                    {collections.map((collection, index) => <CollectionItem key={`collection-${index}`} columnWidth={columnWidth} collection={collection} />)}
                </div>
            </div>
            <div className={isMobileLayout ? "p15" : "p60"} style={{ marginTop: '40px', marginBottom: '20px' }} ref={gridContianer}  >
                <div className='bg-light m-3 p-3' style={{ borderRadius: '15px' }}>
                    <div className='d-flex justify-content-center m-3'>
                        <Title level={3} type="secondary">Follow a simple 3-step process</Title>
                    </div>
                    <Row>
                        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                            <div style={{ display: 'flex', flexDirection: 'colum', margin: '10px' }}>
                                <div className='m-2'><FileSearchOutlined className='icon' /></div>
                                <div><Text type="secondary">Search for products from<br /> a vast range of products</Text></div>
                            </div>
                        </Col>
                        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                            <div style={{ display: 'flex', flexDirection: 'colum', margin: '10px' }}>
                                <div className='m-2'><PlusCircleOutlined className='icon' /></div>
                                <div> <Text type="secondary">Add into your collection<br />  by clicking on the + icon</Text></div>
                            </div>
                        </Col>
                        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                            <div style={{ display: 'flex', flexDirection: 'colum', margin: '10px' }}>
                                <div className='m-2'><FileAddOutlined className='icon' /></div>
                                <div><Text type="secondary">Fill out a from to place<br />  on enquiry</Text></div>
                            </div>
                        </Col>
                    </Row>


                </div>
            </div>
            <div className={isMobileLayout ? "p15" : "p60"} style={{ marginTop: '20px', marginBottom: '20px' }} >
                <div className='d-flex justify-content-center'>
                    <Button onClick={goToHome} style={{ background: '#303d4e', border: 'none', color: '#fff', margin: '10px 25px', borderRadius: '5px' }}>Explore More Product</Button>
                </div>
            </div>
        </>

    )
}

export default Collections;
