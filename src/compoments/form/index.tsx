import React, {useState} from 'react';
// @ts-ignore
import {Button, Modal, Input,Select} from 'antd';
import {apiReqs} from "../../api";
import Upload from "../upload";

type selfProps = {
    onSendValue: (value: any) => void;
}
const Form: React.FC<selfProps> = (props) => {
    const {onSendValue} = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [type, setType] = useState(0);
    const [status, setStatus] = useState(0);
    const [modelName, setModelName] = useState('');
    const [classes, setClasses] = useState('');
    const [dataSetName, setDataSetName] = useState('');
    const [datasetID, setDatasetID] = useState(0);
    const [weightID, setWeightID] = useState(0);
    const [flag, setFlag] = useState(0);
    //const [value, setValue] = useState({modelName: modelName, classes: classes, dataSetName: dataSetName});

    //const [sonValue, setValue] = useState({modelName: '', model: '', classes: '', weight: '', dataSetName: '', dataSet: ''});

    const uploadModel = () => {
        let data = {userID: window.localStorage.getItem("UserID"), modelName: modelName,type:type,status:status};
        apiReqs.uploadModel({data: data});
    };

    const uploadWeight = () => {
        let data = {userID: window.localStorage.getItem("UserID"), modelName: modelName, datasetName: dataSetName};
        apiReqs.uploadWeight({
                data: data, success: (res: any) => {
                    console.log(res.weightID);
                    console.log('lyx')
                    setWeightID(res.weightID)
                }
            }
        );
        generateModule();
    }

    const uploadDataSet = () => {
        let data = {userID: window.localStorage.getItem("UserID"), datasetName: dataSetName, classes: classes};
        apiReqs.uploadDataSet({
                data: data, success: (res: any) => {
                    setDatasetID(res.datasetID)
                }
            }
        );
    }

    const generateModule = () => {
        let ans = classes.split(",");
        let len = ans.length;
        let cl = "";
        for (let i = 0; i < len; i++) {
            cl = cl + i + ",";
        }
        console.log(weightID);
        apiReqs.generateModule({
            data: {
                weightID: weightID,
                userID: window.localStorage.getItem("UserID"),
                classes: cl,
                modelName: modelName,
                dataSetName: dataSetName
            }
        });
    }

    const showModal = () => {
        setIsModalOpen(true);

        clear();
    };

    const handleOk = () => {
        setIsModalOpen(false);
        sendValue({modelName: modelName, classes: classes, dataSetName: dataSetName});
        uploadDataSet();
        uploadModel();
        uploadWeight();
        clear();
    };
    const handleChange = (value: string) => {

        console.log(`selected ${value}`);
    };

    const handChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        clear();
    };

    const {TextArea} = Input;

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
            <Button type="primary" onClick={showModal} style={{width:"100px",height:"40px",marginLeft:"10px"}}>
                Add Model
            </Button>
            <Modal title="Add Model" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                   style={{marginTop: -50}}>
                <p>Model Name:&nbsp;&nbsp;<Input placeholder="name" style={{width: 200}} value={modelName}
                                                 onChange={(e) => (setModelName(e.target.value))}></Input></p>
                <p>Framework:&nbsp;&nbsp;<Select
                    defaultValue='0'
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                        { value: '0', label: 'pytorch' },
                        { value: '1', label: 'mindspore' },
                    ]}
                /></p>
                <p>Modified:&nbsp;&nbsp;<Select
                    defaultValue="1"
                    style={{ width: 120 }}
                    onChange={handChange}
                    options={[
                        { value: '1', label: 'yes' },
                        { value: '0', label: 'no' },
                    ]}
                ></Select></p>
                <p>Model:</p>
                <Upload flag={0} height={80}></Upload>
                <p>Classes:</p>
                <TextArea rows={1} placeholder="Please ensure that each class name is separated by a comma"
                          value={classes} onChange={(e) => (setClasses(e.target.value))}/>
                <p>Weight:</p>
                <Upload flag={2} height={80}/>
                <p>Data Set Name:&nbsp;&nbsp;<Input placeholder="name" style={{width: 200}} value={dataSetName}
                                                    onChange={(e) => (setDataSetName(e.target.value))}></Input></p>
                <p>Data Set:</p>
                <Upload flag={1} height={80}></Upload>

            </Modal>
        </>
    );
};

export default Form;
