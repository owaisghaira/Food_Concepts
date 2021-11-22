import React, { useState } from 'react'
import { Popover, Button, Typography } from 'antd';
import { CheckOutlined, EditFilled } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { createCollection, addItemToCollection, removeItemFromCollection } from '../redux/actions';
import mixpanelService from '../services/mixpanel-service';

const { Text } = Typography;

const Buttons = ({ item, quick }) => {

    const collections = useSelector((state) => state.collections);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const addNewCollection = (name, item) => {
        dispatch(createCollection({ name, item }));
        setIsEditing(false)
        mixpanelService.quickAddNewCollection();
    }

    const addToCollection = (key, item) => {
        dispatch(addItemToCollection({ key, item }));
        if (quick) {
            mixpanelService.quickAddToCollection(item.id, item.item_website_design_code)
        } else {
            mixpanelService.addToCollection(item.id, item.item_website_design_code)
        }
    }

    const removeItem = (key, item) => {
        dispatch(removeItemFromCollection({ key, id: item.id }));
        mixpanelService.removeFromCollection(item.id, item.item_website_design_code);
    }

    const toggle = (exist, key, item) => {
        if (exist) {
            removeItem(key, item)
        } else {
            addToCollection(key, item)
        }
    }

    const renderCheck = (exist) => {
        if (exist) {
            return <CheckOutlined />
        }
    }

    let editableControl = {
        onChange: (e) => addNewCollection(e, item),
        tooltip: false,
        editing: isEditing,
        icon: null,
        //onCancel: setIsEditing(false),
        //onEnd: setIsEditing(false),
    }

    const iconClicked = (e) => {
        setIsEditing(true)
        console.log('clicked')
        e.stopPropagation()
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text strong style={{ marginBottom: '10px' }} >Add to collection</Text>
            {
                collections.map((collection, index) => {
                    let { name, items, key } = collection;

                    let exists = items.length > 0 ? items.filter(i => i.id === item.id) : [];

                    return (
                        <Button onClick={() => toggle(exists.length > 0, key, item)} key={`button-${index}`} style={{ background: '#303d4e ', border: 'none', width: '260px', height: 'auto', color: '#FFF', textAlign: 'left', borderRadius: '8px', marginTop: '10px' }} type="primary">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }} title={name} >
                                <div style={{ width: '85%' }}>
                                    <Text level={5} ellipsis={true} className="collection-btn-title"  >{name}</Text><br />
                                    <Text className="collection-products-count" >{items.length} products</Text>
                                </div>
                                <span style={{ paddingTop: '10px' }}>
                                    {renderCheck(exists.length > 0)}
                                </span>
                            </div>
                        </Button>
                    );
                })
            }

            <div onClick={() => addNewCollection('New Collection', item)} style={{ width: '260px', textAlign: 'left', height: '43px', borderRadius: '8px', marginTop: '10px', border: '2px dashed #000', padding: '10px', cursor: 'pointer' }} >
                <Text editable={editableControl} className="create-collection" style={{ float: 'left', width: '93%' }}>Create a new collection</Text>
                <EditFilled style={{ color: '#000', zIndex: 999, display: 'block !important', paddingTop: '5px', float: 'right' }} onClick={(e) => iconClicked(e)} className="custom-edit" />
            </div >

            {/* <Button type="dashed" style={{ width: '250px', textAlign: 'left', height: '43px', borderRadius: '8px', marginTop: '10px' }} onClick={() => addNewCollection(item)} >
                Create a new collection
            </Button> */}

        </div >
    );
}


const PopoverBtn = ({ item, children, quick }) => {
    return (
        <Popover placement="bottom" content={<Buttons item={item} quick={quick} />} trigger="click">
            {children}
        </Popover>
    )
}

export default PopoverBtn;