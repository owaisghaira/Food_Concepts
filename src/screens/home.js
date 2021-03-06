import React, { useState,useEffect } from 'react'
import { useLayout } from '../providers/layout-provider';
import ApplicationLayout from '../layout';
import { ScrollableCategories, StackGrid, ShopsExplorer } from '../components';
import ajaxService from '../services/ajax-service';
import { Layout } from 'antd';

const { Content } = Layout;

const Home = () => {
    //    let { product_group_name, product_group_image } = item._source;

    const [isMobileLayout] = useLayout();
    const [products, setProducts] = useState([
        { BrandID: 1, Name: 'Mirchi Hut', Image: 'https://nurserynature.com/1539-large_default/red-chilli-achari-laal-mirch-hybrid-seeds-10-gm.jpg' },
        { BrandID: 2, Name: 'Burger Hub', Image: 'https://cdn.logojoy.com/wp-content/uploads/2018/05/01105934/1855-768x591.png' },
        { BrandID: 3, Name: 'Pizzania', Image: 'https://res.cloudinary.com/growsurf-prod/image/upload/v1623916702/production/kgxfnxw5pmfbfq3ehjra.png' },
        { BrandID: 1, Name: 'Mirchi Hut', Image: 'https://nurserynature.com/1539-large_default/red-chilli-achari-laal-mirch-hybrid-seeds-10-gm.jpg' },
        { BrandID: 2, Name: 'Burger Hub', Image: 'https://cdn.logojoy.com/wp-content/uploads/2018/05/01105934/1855-768x591.png' },
        { BrandID: 3, Name: 'Pizzania', Image: 'https://res.cloudinary.com/growsurf-prod/image/upload/v1623916702/production/kgxfnxw5pmfbfq3ehjra.png' }
    ])
    useEffect(() => {

        const getHomeData = async () => {
 
            let response = await ajaxService.get('Brand');

            if (response != undefined && response.status === 200) {
                 console.log('>>', response.data.Payload)
                // items = response.data.Payload;
                // setProduct(items);
            }
        }

        getHomeData();

    }, []);

    return (
        <ApplicationLayout>
            <Content>
                <ShopsExplorer products={products} isMobileLayout={isMobileLayout} />
                <ScrollableCategories isMobileLayout={isMobileLayout} />
                <StackGrid isMobileLayout={isMobileLayout} />
            </Content>
        </ApplicationLayout>
    )
}

export default Home
