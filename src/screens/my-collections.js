import React from 'react'
import ApplicationLayout from '../layout';
import { Collections } from '../components';
import { Layout } from 'antd';

const { Content } = Layout;

const MyCollections = () => {

    return (
        <ApplicationLayout>
            <Content>
                <Collections />
            </Content>
        </ApplicationLayout>
    )
}

export default MyCollections
