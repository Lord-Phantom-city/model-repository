import React from 'react';
import ReactDOM from 'react-dom/client';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
//import App from './App';
// @ts-ignore
import App from './App';
import '@/common/style/frame.styl';

const antdConfig = {
    locale: zhCN,
}
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <ConfigProvider {...antdConfig}>
        <App/>
    </ConfigProvider>
);

