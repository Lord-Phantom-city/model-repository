import {useNavigate,useParams} from 'react-router-dom'
import {Image} from 'antd'
import './main.styl'
// @ts-ignore
import {apiReqs, goto} from '../../api/index'
// @ts-ignore
import Header from '../../compoments/header/index'
import Module from "../../compoments/module";
import {useEffect,useState} from "react";

function Main() {
    const navigate = useNavigate()
    const param=useParams();
    const [moduleList, setModuleList] = useState([{moduleID:1,moduleClass:"1"}] )
    useEffect(() => {
        apiReqs.getModelDetail({
            data:{
                userID: param.userID,
                modelID: param.modelID,
            },
            success: (res: any) => {
                setModuleList(res.mudules)
                //console.log(res)
            }
        })
    })
    return (
        <div className="P-main">
            <Header/>
            <div className="M-img"><Image
                width={500}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            /></div>
            <div className="M-module"><Module data={moduleList}/></div>

        </div>
    )
}

export default Main