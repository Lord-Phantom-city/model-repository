import { Avatar, List } from 'antd';
import React from 'react';
import {goto} from "../../api";

type selfProps = {
    data:
        {
            moduleID: number;
            moduleClass: string;
        }[]
    ;
}
// const data = [
//     {
//         title: 'Ant Design Title 1',
//     },
//     {
//         title: 'Ant Design Title 2',
//     },
//     {
//         title: 'Ant Design Title 3',
//     },
//     {
//         title: 'Ant Design Title 4',
//     },
// ];
const detail = (item:any) => {
    goto('/index/'+localStorage.getItem("UserID")+'/'+localStorage.getItem("ModelID")+'/'+item.moduleID+'/')
}
const Module: React.FC<selfProps> = (props) => (

    <List
        itemLayout="horizontal"
        dataSource={props.data}
        renderItem={(item, index) => (
            <List.Item onClick={(e)=>detail(item)}>
                <List.Item.Meta
                    avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
                    title={<a href="#">{item.moduleID}</a>}
                    description={"Model Class:"+item.moduleClass}
                />
            </List.Item>
        )}
    />
);

export default Module;