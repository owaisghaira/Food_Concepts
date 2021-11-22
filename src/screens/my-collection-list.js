import React, { createRef, useState, useEffect } from 'react'
import ApplicationLayout from '../layout';
import { useLayout } from '../providers/layout-provider';
import { Layout, Button, Typography, Empty, Popover, Image } from 'antd';
import { DeleteOutlined, InfoCircleOutlined, EditFilled } from '@ant-design/icons';
import { FormModal, SuccessModal, Footer } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { removeItemFromCollection, renameCollection, visitedCollection } from '../redux/actions'
import mixpanelService from '../services/mixpanel-service';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const CollectionItemCard = ({ isMobileLayout, collectionKey, item }) => {

    const imageContianer = createRef();
    let {
        id,
        item_image,
        item_short_description,
        item_long_description,
        item_measurements,
        item_sample_lead_time,
        item_moq,
        item_color,
        item_fabric,
        item_website_design_code
    } = item;

    const colors = item_color != null ? item_color.map(color => color.color_name) : [];
    const fabrics = item_fabric != null ? item_fabric.map(fabric => fabric.fabric_name) : [];
    const dispatch = useDispatch();
    const imageContainer = createRef();
    const [imageHeight, setImageHeight] = useState();

    const renderItem = (title, data, height = 60) => {
        if (data != null && data.length > 0) {
            return (
                <div style={{ flex: '0 0 33.333333%', height: `${height}px` }} >
                    <Paragraph type="secondary" style={{ marginBottom: '0px' }} >{title}</Paragraph>
                    <Paragraph strong >{data}</Paragraph>
                </div>
            )
        }
    }

    const removeItem = (id) => {
        dispatch(removeItemFromCollection({ key: collectionKey, id }));
        mixpanelService.removeFromCollection(id, item_website_design_code);
    }

    useEffect(() => {
        if (imageContainer && imageContainer.current) {

            const imageWidth = imageContainer.current.clientWidth;
            setImageHeight(imageWidth);
        }

    }, [isMobileLayout, item])

    if (!isMobileLayout) {
        return (
            <div className='row my-5'>
                <div className='col-lg-4' ref={imageContainer}>
                    <Image src={item_image.thumbnail} style={{ borderRadius: '9px',  width: imageHeight,height:imageHeight }} className="img-fluid" ref={imageContainer} />
                </div>
                <div className='col-lg-8' style={{ position: 'relative' }}>
                    <Title level={2}> {item_short_description}</Title>
                    <Text type="secondary" style={{ fontSize: '14px' }} >Item reference code: #{item_website_design_code} <Popover placement="bottom" content={'You can use this reference code to specify your requirements when contacting us'}><InfoCircleOutlined /></Popover> </Text>
                    <Paragraph type="secondary" style={{ marginTop: '10px' }} >{item_long_description} </Paragraph>

                    <div style={{ display: 'flex', justifyContent: 'left', 'flexWrap': 'wrap' }}>
                        {renderItem('Measurment', item_measurements)}
                        {renderItem('Colours', colors.join(','))}
                        {renderItem('Fabric', fabrics.join(','))}
                        {renderItem('Sample lead time', item_sample_lead_time)}
                        {renderItem('MOQ', item_moq)}
                    </div>
                    <span style={{ position: 'absolute', bottom: '0' }} onClick={() => removeItem(id)}  >
                        <DeleteOutlined className='svg-icon' />
                        <Text className='p-1 btn' >Delete</Text>
                    </span>
                </div>
            </div>
        )
    } else {
        return (
            <div className='row my-3'>
                <div className='col-4' ref={imageContianer}>
                    <Image src={item_image.thumbnail} style={{ borderRadius: '9px', objectFit: 'cover', height: imageHeight, width: '100%' }} className="fluid-mobile-img" ref={imageContainer} />
                </div>
                <div className='col-8'>
                    <Title level={3}>{item_short_description}</Title>
                    <Text type="secondary" style={{ fontSize: '14px' }} >Item reference code: #{item_website_design_code} <Popover placement="bottom" content={'You can use this reference code to specify your requirements when contacting us'}><InfoCircleOutlined /></Popover> </Text>
                    <Paragraph type="secondary" style={{ marginTop: '10px' }} >{item_long_description} </Paragraph>
                </div>
                <div className='col-12' style={{ display: 'flex', justifyContent: 'left', 'flexWrap': 'wrap' }}>
                    {renderItem('Measurment', item_measurements)}
                    {renderItem('Colours', colors.join(','))}
                    {renderItem('Fabric', fabrics.join(','))}
                    {renderItem('Sample lead time', item_sample_lead_time)}
                    {renderItem('MOQ', item_moq)}
                </div>
                <span onClick={() => removeItem(id)} style={{ marginTop: '10px' }}>
                    <DeleteOutlined className='svg-icon' />
                    <Text className='p-1 btn' >Delete</Text>
                </span>
            </div>
        )
    }
}

const MyCollectionList = () => {
    const collectionKey = localStorage.getItem('key');
    const [displayFormModal, setDisplayFormModal] = useState(false);
    const [displaySuccessModal, setDisplaySuccessModal] = useState(false);
    const [isMobileLayout] = useLayout();
    const collections = useSelector((state) => state.collections);
    const collection = collections.filter(collection => collection.key === collectionKey)[0];
    const [collectionId, setCollectionId] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(visitedCollection({ key: collectionKey }));
    }, [])

    useEffect(() => {
        if (collectionId.length > 0) {
            setDisplaySuccessModal(true)
        }
    }, [collectionId])

    const openModal = () => {
        mixpanelService.requestQuoteForm(collection.items.length)
        setDisplayFormModal(true)
    }

    const rename = (name) => {
        dispatch(renameCollection({ key: collectionKey, name }));
    }

    let editableControl = {
        onChange: (e) => rename(e),
        //onCancel: () => setEditable(false),
        //editing: editable,
        icon: <EditFilled style={{ color: '#000' }} />,
        tooltip: false
    }

    const renderSection = () => {
        const { name, items, key } = collection;

        if (items.length > 0) {
            return (
                <>
                    <div className='row'>
                        <div className='col-9 col-lg-3 collection-name'>
                            <Title level={3} className='collection' editable={editableControl} >{name}</Title>
                            <Text style={{ fontSize: '12px' }} type="secondary">{items.length} Products</Text>
                        </div>
                        <div className='col-3 col-lg-9'>

                        </div>
                    </div>
                    {
                        items.map((item, index) => <CollectionItemCard isMobileLayout={isMobileLayout} collectionKey={key} key={`item-${index}`} item={item} />)
                    }
                    <div className='d-flex justify-content-center'>
                        <Button onClick={() => openModal()} style={{ background: '#303d4e', border: 'none', color: '#fff' }}>Request a price quote</Button>
                    </div>
                    <FormModal displayModal={displayFormModal} toggleModal={setDisplayFormModal} collection={collection} setCollectionId={setCollectionId} />
                    <SuccessModal displayModal={displaySuccessModal} toggleModal={setDisplaySuccessModal} collectionId={collectionId} />
                </>
            );

        } else {
            return (
                <div>
                    <div className='row'>
                        <div className='col-9 col-lg-3 collection-name '>
                            <Title level={3} className='collection' editable={editableControl} >{name}</Title>
                            <Text style={{ fontSize: '12px' }} type="secondary">{items.length} Products</Text>
                        </div>
                        <div className='col-3 col-lg-9'>

                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '600px' }}>
                        <Empty />
                    </div>
                </div>
            );
        }
    }

    return (

        <ApplicationLayout>
            <Content>
                <div className={isMobileLayout ? "p15" : "p60"} style={{ marginTop: '20px', marginBottom: '80px' }} >
                    {renderSection()}
                </div>
                <Footer />
            </Content>
        </ApplicationLayout>
    )
}

export default MyCollectionList
