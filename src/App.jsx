import './App.css'
import {
  ContactsOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
import { FcDepartment } from "react-icons/fc";
import { MdDashboard } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { Link, Outlet } from 'react-router-dom';
const { Header, Sider, Content } = Layout;



function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handlelogout = ()=>{
    localStorage.clear();
    alert("Logouted Successfully")
  }

  return (
    <>
      <Layout className='h-screen'>
        <Sider className='overflow-y-scroll sidebarHidden' trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <MdDashboard />,
                label: <Link to='/Dashboard'>Dashboard</Link>
              },
              {
                key: '2',
                icon: <UserOutlined />,
                label: <Link to='/Appointment'>Appointment</Link>
              },
              {
                key: '3',
                icon: <FcDepartment />,
                label: <Link to='/Department'>Department</Link>
              },
              {
                key: '4',
                icon: <FaUserDoctor />,
                label: <Link to='/Doctors'>Doctors</Link>
              },
              {
                key: '5',
                icon: <ContactsOutlined />,
                label: <Link to='/Contact'>Contact</Link>
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer ,display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '50px'}}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <div className='flex gap-3'>
            <Button onClick={handlelogout} type="primary">
              Logout
            </Button>
            <Button type="primary">
              <Link to="/Login">Login</Link>
            </Button>
            </div>
            
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default App
