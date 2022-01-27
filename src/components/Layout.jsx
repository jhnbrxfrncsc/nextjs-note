import React from 'react';

// next
import Head from 'next/head';

// components
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Note App</title>
            </Head>
            <Navbar />
            { children }
        </>
    )
}

export default Layout;
