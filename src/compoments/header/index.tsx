import './header.styl'
import React,{useState} from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';


// @ts-ignore
import Logo from '../../common/image/logo.png'

const items:MenuProps['items']=[
    {
        key: 'mail',
        label: 'Navigation One',
        icon: <MailOutlined />,
    },
    {
        key: 'app',
        label: 'Navigation Two',
        icon: <AppstoreOutlined />,
    },
    {
        key: 'setting',
        label: 'Navigation Three',
        icon: <SettingOutlined />,
    }
]
function Header() {
    const [current, setCurrent] = useState('mail')
    const handleClick = (e: any) => {
        console.log('click ', e);
        setCurrent(e.key)
    }

    return (<div className="M-header">
        <img src={Logo} alt="" className="M-logo" />
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" items={items} className="M-menu" />
    </div>)
}

export default Header