import './header.styl'
import React,{useState} from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';


// @ts-ignore
import Logo from '../../common/image/logo.png'
import {goto} from "../../api";

const items:MenuProps['items']=[
    {
        key: 'home',
        label: 'home',
        icon: <MailOutlined />,
    },
    {
        key: 'list',
        label: 'list',
        icon: <AppstoreOutlined />,
    },
    {
        key: 'merge',
        label: 'merge',
        icon: <SettingOutlined />,
    }
]
function Header() {
    const [current, setCurrent] = useState('mail')
    const handleClick = (e: any) => {
        console.log('click ', e);
        setCurrent(e.key)

        goto('/'+e.key+'/'+localStorage.getItem("UserID"))
    }

    return (<div className="M-header">
        <img src={Logo} alt="" className="M-logo" />
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" items={items} className="M-menu" />
    </div>)
}

export default Header