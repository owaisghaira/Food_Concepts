import React, { useEffect } from 'react'
import { Input, Layout, Menu, Tag } from 'antd';
import "antd/dist/antd.css";
import { SearchOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import ajaxService from '../services/ajax-service.js';
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

                //let response = await ajaxService.get('Category/Index');
                // if (response.Success) {
                    
                //     let { Brands } = response.Payload;
                //     console.log(Brands);
                //     // 
                //     let brand = { BrandID : 1, Name : 'Mirchi Hut', Image : 'wru0893ru09dfje0f9e.jpg'}
                // }

                /*
                   public int CategoryId { get; set; }
        public string Keyword { get; set; }
        public bool SortAscending { get; set; }
        public int SortBy { get; set; }
        public double MinimumPrice { get; set; }
        public double MaximumPrice { get; set; }
        public int SearchType { get; set; }
        public int StoreId { get; set; }
        public int Length { get; set; }
        public int Start { get; set; }
        public int[] Brands { get; set; }
        public int[] Attributes { get; set; }
                */

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
                    My Collection 
                    {/* {renderBadge()} */}
                </Menu.Item>
            </Menu>
        </Header>
    )
}

export default LayoutHeader
