import React, { } from "react";
import { useLayout } from '../providers/layout-provider';
import { Layout } from 'antd';
import { Header, MobileHeader } from '../components';

const ApplicationLayout = ({ children }) => {
    const [isMobileLayout] = useLayout();

    return (
        <Layout className="site-layout">
            {isMobileLayout ? <MobileHeader /> : <Header />}
            {children}
        </Layout>
    );
}

export default ApplicationLayout;