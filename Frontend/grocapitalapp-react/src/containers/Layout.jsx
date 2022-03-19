
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const LayoutContainer = (props) => {
    const [DEVICE_VIEW, setDEVICE_VIEW] = useState({
        IsMobile: false,
        IsTablet: false,
        IsDesktop: true,
    });
    const resize = () => {
        setDEVICE_VIEW({
            IsMobile: window.innerWidth <= 719,
            IsTablet: window.innerWidth >= 720 && window.innerWidth < 1051,
            IsDesktop: window.innerWidth >= 1051,
        });
    };
    useEffect(() => {
        window.addEventListener('resize', resize);
        resize();
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);
    return (
        <Layout {...props} deviceview={DEVICE_VIEW} />
    );
};
export default LayoutContainer;