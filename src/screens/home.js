import React, { useEffect } from 'react'
import { useLayout } from '../providers/layout-provider';
import ApplicationLayout from '../layout';
import { ScrollableCategories, StackGrid } from '../components';
import { Layout } from 'antd';

const { Content } = Layout;

const Home = () => {

    const [isMobileLayout] = useLayout();

    return (
        <ApplicationLayout>
            <Content>
                <ScrollableCategories isMobileLayout={isMobileLayout} />
                <StackGrid isMobileLayout={isMobileLayout} />
            </Content>
        </ApplicationLayout>
    )
}

export default Home
