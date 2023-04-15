import React, {useState} from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

import { message, Upload } from 'antd';

const { Dragger } = Upload;
type selfProps = {
    flag: number;
    height: number;
}
// @ts-ignore
const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'http://192.168.3.242/back/module/uploadFile/',
    data: {
        type: 0,
        userID: 0,
    },
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            console.log(info.file.response);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
            console.log(info.file.response);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
    headers: {
        // @ts-ignore
        'X-Requested-With': null,
    }
};
const UploadFile: React.FC<selfProps> = (prop) => {
    props.data={type:prop.flag,userID:0};
    return (<Dragger {...props} height={prop.height} >
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        {/*<p className="ant-upload-hint">*/}
        {/*    Support for a single or bulk upload. Strictly prohibit from uploading company data or other*/}
        {/*    band files*/}
        {/*</p>*/}
    </Dragger>)
};

export default UploadFile