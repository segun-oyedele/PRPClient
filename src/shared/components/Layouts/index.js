import Head from 'next/head';
import PropTypes from 'prop-types';
import { Header } from '../';
import { Sidebar } from '../';

export const Layout = ({ children, headTitle }) => {
  return (
    <>
      <Sidebar />
      <Head>
        <title>{`Partner Reporting Package - ${ headTitle }`}</title>
        <meta name="description" content="CDL Last Mile partner reporting package" />
        <link rel="apple-touch-icon" sizes="152x152" href={`${process.env.iisPath}/apple-touch-icon.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${process.env.iisPath}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${process.env.iisPath}/favicon-16x16.png`} />
        <link rel="manifest" href={`${process.env.iisPath}/site.webmanifest`} />
        <link rel="mask-icon" href={`${process.env.iisPath}/safari-pinned-tab.svg`} color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <Header />

      <div className="container px-4">
        {children}
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  headTitle: PropTypes.string.isRequired
};
