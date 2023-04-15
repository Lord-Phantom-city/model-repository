import {useNavigate,Link} from 'react-router-dom'
import {useState} from "react";
import {apiReqs} from "../../api";
import {Button, Input} from 'antd'
// @ts-ignore
import imgLogo from './logo.jpeg'
import './register.styl'
import {goto} from "../../api";

function Login() {
    const navigate = useNavigate()
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')
    const [code, setCode] = useState('')

    const register = () => {
        apiReqs.register({
            data: {
                nickname:nickname,
                password:password,
                email:account,
                code:code,
            },
        })
    }
    const getCode = () => {
        apiReqs.registerEmail({
            data: {
                email:account,
            },
        })
    }
    const login = () => {
        goto('/login')
    }
    return (
        <div className="P-register">
            <img src={imgLogo} alt="" className="logo"/>
            <div className="ipt-con">
                <Input placeholder="邮箱" value={account} onChange={(e)=>{setAccount(e.target.value)}}/>
            </div>
            <div className="ipt-con">
                <Button type="primary" block={true} onClick={register}>
                    验证
                </Button>
            </div>
            <div className="ipt-con">
                <Input placeholder="昵称" value={nickname} onChange={(e)=>{setNickname(e.target.value)}}/>
            </div>
            <div className="ipt-con">
                <Input.Password placeholder="密码" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div className="ipt-con">
                <Input placeholder="验证码" value={code} onChange={(e)=>{setCode(e.target.value)}}/>
            </div>
            <div className="ipt-con">
                <Button type="link" block onClick={login} style={{color:'white'}}>已有账号？</Button>
            </div>
            <div className="ipt-con">
                <Button type="primary" block={true} onClick={register}>
                    注册
                </Button>
            </div>
        </div>
    )
}

export default Login