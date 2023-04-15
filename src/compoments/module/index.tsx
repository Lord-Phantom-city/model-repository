import React, {useEffect, useState} from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {goto} from "../../api";

type selfProps = {
    data:
        {
            key: string;
            index: string;
            tags: string[];
        }[]
    ;
}

interface DataType {
    key: string;
    index: string;
    tags: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Module Index',
        dataIndex: 'index',
        key: 'index',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',

        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a onClick={(e)=>detail(record)}>Detail</a>
                <a>Delete</a>
            </Space>
        ),
    },
];


const detail = (item:any) => {
    goto('/index/'+localStorage.getItem("UserID")+'/'+localStorage.getItem("ModelID")+'/'+item.key+'/')
}
const Module: React.FC<selfProps> = (props) => (

    // <List
    //     itemLayout="horizontal"
    //     dataSource={props.data}
    //     renderItem={(item, index) => (
    //         <List.Item onClick={(e)=>detail(item)}>
    //             <List.Item.Meta
    //                 avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
    //                 title={<a href="#">{item.moduleID}</a>}
    //                 description={"Model Class:"+item.moduleClass}
    //                 ellipsis={true}
    //             />
    //         </List.Item>
    //     )}
    // />
    <Table columns={columns} dataSource={props.data} />
);

export default Module;