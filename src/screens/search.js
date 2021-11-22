import React from 'react'
import { useLayout } from '../providers/layout-provider';
import ApplicationLayout from '../layout';
import { ScrollableCategories, SearchStackGrid } from '../components';
import { Layout } from 'antd';
import { useParams } from "react-router-dom";


const { Content } = Layout;

const Search = () => {

    let { term, type } = useParams();
    const [isMobileLayout] = useLayout();

    return (
        <ApplicationLayout>
            <Content>
                <ScrollableCategories isMobileLayout={isMobileLayout} />
                <SearchStackGrid isMobileLayout={isMobileLayout} term={term} type={type} />
            </Content>
        </ApplicationLayout>
    )
}

export default Search
