import React, { } from "react";
import { useLayout } from '../providers/layout-provider';
import { Layout } from 'antd';
import { Header, MobileHeader } from '../components';
import BottomNavigationBar from "../navigation/bottom-navbar";
const ApplicationLayout = ({ children }) => {
    const [isMobileLayout] = useLayout();

    return (
        <Layout className="site-layout">
            {isMobileLayout ? <MobileHeader /> : <Header />}
            {/* <BottomNavigationBar/> */}
            {isMobileLayout ? <BottomNavigationBar className='bottom-navBar' /> :null}
            {children}
        </Layout>
    );
}

export default ApplicationLayout;