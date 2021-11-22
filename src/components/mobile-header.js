import React, { useEffect } from 'react'
import { AlignLeftOutlined, SearchOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { Input, Badge } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import OpenSearchService from '../services/opensearch-service';
import { importCollection } from '../redux/actions';

const MobileHeader = () => {

    let history = useHistory();
    const collections = useSelector((state) => state.collections);
    const dispatch = useDispatch();

    useEffect(() => {

        const getCollection = async () => {

            const urlSearchParams = new URLSearchParams(window.location.search);
            const params = Object.fromEntries(urlSearchParams.entries());

            if (params.collection_id !== undefined) {

                let response = await OpenSearchService.getCollection(params.collection_id);

                if (response && response.data != null) {
                    let { collection_items, collection_name, id } = response.data;

                    let items = [];

                    if (collection_items !== undefined && collection_items.length > 0) {
                        collection_items.map(i => {
                            items.push(i._source);
                            return i;
                        });
                    }

                    dispatch(importCollection({ items, collection_name, id }));
                    history.push({ pathname: '/my-collection' });
                }

            }
        }

        getCollection();

    }, [])

    const goToExplore = () => {
        history.push({ pathname: '/explore' });
    }

    const handleClick = async (event) => {
        history.push({ pathname: '/search/term/' + event.target.value });
    }

    const goToHome = () => {
        history.push({ pathname: '/' });
    }

    const goToMyCollection = () => {
        history.push({ pathname: '/my-collection' });
    }

    const renderBadge = () => {
        const arrayColumn = collections.map(x => x.hasNew);

        let display = arrayColumn.some((element) => element);

        if (display) {
            return <Badge color='#cd201f' />
        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: 15 }}>
                <div data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <AlignLeftOutlined /> {renderBadge()}
                </div>

                <h4 style={{ fontFamily: "Swissa Piccola Regular" }} onClick={goToHome} >Food Concepts</h4>
                <div data-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample1">
                    <SearchOutlined />
                </div>

            </div>
            <div className="collapse" id="collapseExample" style={{ margin: '15px' }}>
                <p onClick={goToExplore}> Explore</p>
                <p onClick={goToMyCollection}> My Collection {renderBadge()} </p>
            </div>
            <div className="collapse" id="collapseExample1" style={{ margin: '15px' }}>
                <Input size="large" placeholder="search for anything" prefix={<SearchOutlined />} onPressEnter={handleClick} style={{ borderRadius: '8px' }} />
            </div>
        </>
    )
}

export default MobileHeader
