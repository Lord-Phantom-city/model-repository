import React, {useEffect, useState} from 'react';
import {Checkbox, Divider, Button} from 'antd';
import type {CheckboxChangeEvent} from 'antd/es/checkbox';
import type {CheckboxValueType} from 'antd/es/checkbox/Group';
import './checkbox.styl';
import {apiReqs} from "../../api";

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Classes:', 'Apple', 'Pear', 'Orange', 'Banana', 'Mango', 'Pineapple', 'Strawberry']
const defaultCheckedList = ['Classes:', 'Apple', 'Orange'];

type selfProps = {
    datasetID: number;
    weightID: number;
    modelName: string;

}
const CB: React.FC<selfProps> = (props) => {
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>();
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);
    const [classes, setClasses] = useState([""]);
    const [datasetName, setDatasetName] = useState("");
    const getDataset = () => {
        console.log(props.datasetID);
        apiReqs.getDatasetDetail({
            data: {userID: localStorage.getItem("UserID"), datasetID: props.datasetID}, success: (res: any) => {
                setClasses(res.classes)
                setDatasetName(res.datasetname)
            }
        })
    };
    const onChange = (list: CheckboxValueType[]) => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };
    useEffect(() => {
        getDataset();
    },[])
    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    const build = () => {
        console.log({
            weightID: props.weightID,
            userID: localStorage.getItem("UserID"),
            classes: checkedList,
            modelName: props.modelName,
            datasetName: datasetName,

        });
        apiReqs.generateModule({
            data: {
                weightID: props.weightID,
                userID: localStorage.getItem("UserID"),
                classes: checkedList,
                modelName: props.modelName,
                datasetName: datasetName,

            }
        })
    }

    return (
        <>
            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                Check all
            </Checkbox>
            <Divider/>
            <CheckboxGroup options={classes} value={checkedList} onChange={onChange} style={{
                maxHeight: '500px',
                overflow: 'scroll',
                display: 'grid',
                border: '2px solid #497BB1',
                textAlign: 'center',
                padding: '10px',
                boxShadow: '5px 5px 10px -4px red, 5px -5px 10px -4px red'
            }}/>
            <Button type="primary" block style={{marginTop: '20px'}} onClick={build}>
                Confirm
            </Button>
        </>
    );
};

export default CB;