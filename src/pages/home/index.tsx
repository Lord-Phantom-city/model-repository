import {useNavigate} from 'react-router-dom'
import {useState,useEffect} from "react";
import {Button, Input} from 'antd'
import {apiReqs} from "../../api";
import './home.styl'
// @ts-ignore
import {goto} from '../../api/index'
import Header from "../../compoments/header";
import Model from "../../compoments/model";
import Form from "../../compoments/form";

function Home() {
    const [modelList, setModelList] = useState([]   )
    const navigate = useNavigate()
    const {Search} = Input;

    useEffect(() => {
        apiReqs.getModelList({
            data:{
                classes: "all",
                flag: 0,},
            success: (res: any) => {
                setModelList(res.modelList)
            }
        })
    })

    const onSearch = (value: string) => {
        let flag = 1;
        let config;
        apiReqs.getModelList(
            {
                data: {
                    classes: value,
                    flag: flag,
                },
                success: (res: any) => {
                    console.log(res)
                    setModelList(res.modelList)
                },
            }
        )
        //console.log(apiReqs.getModelList())
        //setModelList(apiReqs.searchModel({data: {classes: value, flag: flag}}));
        //setModelList(apiReqs.getModelList());
        //console.log(modelList)
        //console.log({modelList:modelList})
    };
    const [value, setValue] = useState({})
    function getValue(param: any) {
        setValue(param)
    }

    function printValue(){
        console.log(value)
    }
    // @ts-ignore
    // @ts-ignore
    return (
        <div className="P-home">
            <Header/>
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
            <h1>Home Page</h1>
            <div className="M-model">
                {
                    modelList.map((item: any,index) => {
                        return <Model key={index} id={item.modelID} name={item.modelName}></Model>
                    })
                }
            </div>
            <div className="M-form"> <Form onSendValue={getValue}></Form></div>
            <div className="ipt-con">
                <Button onClick={() => {
                    goto('/login')
                }}>组件外跳转</Button>
            </div>
            <div className="ipt-con">
                <Button onClick={() => {
                    navigate('/login')
                }}>返回登录</Button>
            </div>
            {/*<button onClick={printValue}>打印value</button>*/}
        </div>
    )
}

export default Home