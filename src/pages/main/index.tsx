import {useNavigate, useParams} from 'react-router-dom'
import {Image} from 'antd'
import './main.styl'
// @ts-ignore
import {apiReqs, goto} from '../../api/index'
// @ts-ignore
import Header from '../../compoments/header/index'
import Module from "../../compoments/module";
import CB from "../../compoments/CheckBox";
import {useEffect, useState} from "react";
import {Button, Drawer} from "antd";

function Main() {
    const [open, setOpen] = useState(false)

    const navigate = useNavigate()
    const param = useParams();
    const [moduleList, setModuleList] = useState([{key: '1', index: '1', tags: ['a', 'b']}])
    const [datasetID, setDatasetID] = useState(0)
    const [weightID, setWeightID] = useState(0)
    const [modelName, setModelName] = useState('')
    useEffect(() => {
            apiReqs.getModelDetail({
                data: {
                    userID: param.userID,
                    modelID: param.modelID,
                },
                success: (res: any) => {
                    setModuleList(res.modules)
                    setDatasetID(res.datasetID)
                    setWeightID(res.weightID)
                    setModelName(res.modelname)
                    //console.log(res)
                }
            })
        },
        [])
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
        <div className="P-main">
            <Header/>
            {/*<div className="M-img"><Image*/}
            {/*    width={500}*/}
            {/*    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"*/}
            {/*/></div>*/}
            <center>
                <Button type="primary" onClick={showDrawer} style={{marginTop: '20px'}}>
                    Add Module
                </Button>
            </center>
            <div className="M-module"><Module data={moduleList}/></div>
            <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open} size={'large'}>
                <div className="M-CB"><CB datasetID={datasetID} modelName={modelName} weightID={weightID}></CB></div>
            </Drawer>

        </div>
    )
}

export default Main