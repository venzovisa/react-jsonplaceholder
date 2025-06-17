import React, { useState } from 'react';
import { MailOutlined, DashboardTwoTone } from '@ant-design/icons';
import { Link } from 'react-router';
import type { MenuProps } from 'antd/es/menu';
import Menu from 'antd/es/menu';

const Navigation: React.FC = () => {
    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" style={{ marginBottom: '1rem' }}>
        <Menu.Item key="home" icon={<MailOutlined />}>
            <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="tasks" icon={<DashboardTwoTone />}>
            <Link to="/tasks">Tasks</Link>
        </Menu.Item>
    </Menu>
};

export default Navigation;