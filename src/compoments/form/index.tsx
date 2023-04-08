import React, { useState } from 'react';
// @ts-ignore
import { Button, Modal ,Input} from 'antd';
import {apiReqs}   from "../../api";
import Upload from "../upload";
type selfProps = {
    onSendValue: (value: any) => void;
}
const Form: React.FC <selfProps> = (props) => {
    const {onSendValue} = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [modelName, setModelName] = useState('');
    const [classes, setClasses] = useState('');
    const [dataSetName, setDataSetName] = useState('');
    const [flag, setFlag] = useState(0);
    //const [value, setValue] = useState({modelName: modelName, classes: classes, dataSetName: dataSetName});

    //const [sonValue, setValue] = useState({modelName: '', model: '', classes: '', weight: '', dataSetName: '', dataSet: ''});

    const uploadModel = () => {
        let data={userID:1,modelName:modelName};
        apiReqs.uploadModel({data:data});
    };

    const generateModule = () => {
        apiReqs.generateModule({data:{weightID:1,userID:window.localStorage.getItem("UserID"),classes:classes,modelName:modelName,dataSetName:dataSetName}});
    }

    const showModal = () => {
        setIsModalOpen(true);

        clear();
    };

    const handleOk = () => {
        setIsModalOpen(false);
        sendValue({modelName: modelName, classes: classes, dataSetName: dataSetName});
        uploadModel();
        generateModule();
        clear();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        clear();
    };

    const {TextArea}=Input;

    function clear() {
        setModelName('');
        setClasses('');
        setDataSetName('');
    }
    function sendValue(value: any) {
        props.onSendValue(value);
        console.log(value);
    }
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Add Model
            </Button>
            <Modal title="Add Model" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{marginTop:-50}}>
                <p>Model Name:&nbsp;&nbsp;<Input placeholder="name" style={{width:200}} value={modelName} onChange={(e)=>(setModelName(e.target.value))}></Input></p>
                <p>Model:</p>
                <Upload flag={0}></Upload>
                <p>Classes:</p>
                <TextArea rows={1} placeholder="Please ensure that each class name is separated by a comma" value={classes} onChange={(e)=>(setClasses(e.target.value))}/>
                <p>Weight:</p>
                <Upload flag={2}/>
                <p>Data Set Name:&nbsp;&nbsp;<Input placeholder="name" style={{width:200}} value={dataSetName} onChange={(e)=>(setDataSetName(e.target.value))}></Input></p>
                <p>Data Set:</p>
                <Upload flag={1}></Upload>

            </Modal>
        </>
    );
};

export default Form ;
