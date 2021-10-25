import { Layout } from 'antd';
import React, { useEffect } from 'react';
import TopBar from './TopBar';
import { CustomFooter as Footer } from './Footer';
import { useReferrer } from '../utils/referrer';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { notify } from '../utils/notifications';
import { CustomSidebar as Sidebar } from './Sidebar';
import { H5Header } from './H5Head';
const { Header, Content } = Layout;

export default function BasicLayout({ children }) {
  const { refCode, setRefCode, allowRefLink } = useReferrer();
  const { search } = useLocation();
  const parsed = queryString.parse(search);

  useEffect(() => {
    if (!!parsed.refCode && parsed.refCode !== refCode && allowRefLink) {
      notify({ message: `New referrer ${parsed.refCode} added` });
      setRefCode(parsed.refCode);
    }
  }, [parsed, refCode, setRefCode, allowRefLink]);

  return (
    <React.Fragment>
      <H5Header />
      <Layout
        className="basic-layout-container"
        style={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'row',
          // background: '#000',
        }}
      >
        {/* <Sidebar /> */}
        <div style={{ flex: 1 }}>
          {/* <Header style={{ padding: 0, minHeight: 64, height: 'unset' }}>
            <TopBar />
          </Header> */}
          <Content>{children}</Content>
        </div>

        {/* <Footer /> */}
      </Layout>
    </React.Fragment>
  );
}
