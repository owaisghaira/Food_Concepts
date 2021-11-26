import React, { useEffect, useState } from 'react'
import ApplicationLayout from '../layout';
import { Layout } from 'antd';
import OpenSearchService from '../services/opensearch-service';
import { useLayout } from '../providers/layout-provider';
import { ShopsExplorer, DesignExplorer } from '../components';

const { Content } = Layout;

const Explore = () => {
    const [isMobileLayout] = useLayout();
    const [products, setProducts] = useState([]);
    const [designs, setDesigns] = useState([]);

    useEffect(() => {

        const getExploreItems = async () => {

            let services = [
                OpenSearchService.getExploreProducts(),
                OpenSearchService.getExploreDesigns(),
                OpenSearchService.trackExplore(),
            ];

            let [productsResponse, designsResponse] = await Promise.all(services);

            if (productsResponse.status === 200 && productsResponse.data !== null) {
                setProducts(productsResponse.data.hits.hits);
            }

            if (designsResponse.status === 200 && designsResponse.data !== null) {
                setDesigns(designsResponse.data.hits.hits);
            }
        }

        // getExploreItems();
    }, [])

    return (
        <ApplicationLayout>
            <Content>
                <ShopsExplorer products={products} isMobileLayout={isMobileLayout} />
                <DesignExplorer designs={designs} isMobileLayout={isMobileLayout} />
                <div style={{ marginTop: '30px', marginBottom: '150px' }}></div>
            </Content>
        </ApplicationLayout>
    )
}

export default Explore
