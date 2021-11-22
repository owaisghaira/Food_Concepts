import React, { useEffect } from 'react'
import { Input, Layout, Menu, Tag } from 'antd';
import "antd/dist/antd.css";
import { SearchOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import OpenSearchService from '../services/opensearch-service';
import { importCollection } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const { Header } = Layout;

const LayoutHeader = () => {

    let history = useHistory();
    const dispatch = useDispatch();
    const collections = useSelector((state) => state.collections);

    const handleClick = async (event) => {
        history.push({ pathname: '/search/term/' + event.target.value });
    }

    const goToHome = () => {
        history.push({ pathname: '/' });
    }

    const goToExplore = () => {
        history.push({ pathname: '/explore' });
    }

    const goToMyCollection = () => {
        history.push({ pathname: '/my-collection' });
    }

    const renderBadge = () => {
        const arrayColumn = collections.map(x => x.hasNew);

        let display = arrayColumn.some((element) => element);

        if (display) {
            return <Tag color="#cd201f" >NEW</Tag>
        }
    }

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

    return (
        <Header className="site-layout-background" >
            <div className="logo cotton-concepts" onClick={goToHome} >Food Concepts</div>
            <div className="searchbar">
                <Input size="large" placeholder="search for anything" style={{ width: '38em', borderRadius: '8px' }} prefix={<SearchOutlined />} onPressEnter={handleClick} />
            </div>
            <Menu mode="horizontal" className="top-menu">
                <Menu.Item key="explore-top" onClick={goToExplore} >
                    Explore
                </Menu.Item>
                <Menu.Item key="my-collection-top" onClick={goToMyCollection} >
                    My Collection {renderBadge()}
                </Menu.Item>
            </Menu>
        </Header>
    )
}

export default LayoutHeader
