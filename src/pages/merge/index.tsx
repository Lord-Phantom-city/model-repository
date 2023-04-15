import React, {useEffect, useState} from 'react';
import {Button, Space, Table, Tag, Input} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import './merge.styl';
import Header from "../../compoments/header";
import {apiReqs, goto} from "../../api";

interface DataType {
    key: React.Key;
    combinedModuleID: string;
    classnames: string[];
}

const detail = (item: any) => {
    goto('/index/' + localStorage.getItem("UserID") + '/' + 0 + '/' + item.combinedModuleID + '/')
}



const columns: ColumnsType<DataType> = [
    {
        title: 'Module ID',
        dataIndex: 'combinedModuleID',
    },
    {
        title: 'Tags',
        dataIndex: 'classnames',
        ellipsis: true,
        render: (_, {classnames}) => (
            <>
                {classnames.map((tag) => {
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
                <a onClick={(e) => detail(record)}>Detail</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

// const data: DataType[] = [];
// for (let i = 1; i < 46; i++) {
//     data.push({
//         key: i,
//         id: `Module ${i}`,
//         tags: ['nice', 'developer', 'good', 'ni', 'hao'],
//     });
// }

const Merge: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);
    const {Search} = Input;
    const start = () => {
        console.log(selectedRowKeys)
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };
    useEffect(() => {
        apiReqs.searchCombinationModule({
                data: {
                    classes:"",
                    flag:0,
                },
                success: (res: any) => {
                    setData(res.combinedModuleList)
                }
            }
        )
    }, [])
    const onSearch = (value: string) => {
        apiReqs.searchCombinationModule({
            data: {
                classes: value,
                flag: 1
            },
            success: (res: any) => {
                setData(res.combinedModuleList)
            }
        })
        console.log(value)
    }
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
        <div className="P-merge">
            <Header></Header>
            <center>
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                    style={{
                        width: 800,
                    }}
                />

            </center>
            <div style={{margin: 20}}>
                <div style={{marginBottom: 16}}>
                    <span style={{marginLeft: 8}}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} style={{height: 350}}/>
            </div>
        </div>
    );
};

export default Merge;