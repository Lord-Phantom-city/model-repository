import {useNavigate,Link} from 'react-router-dom'
import {useState} from "react";
import {apiReqs, goto} from "../../api";
import {Button, Input} from 'antd'
// @ts-ignore
import imgLogo from './logo.jpeg'
import './login.styl'

function Register() {
    const navigate = useNavigate()
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')

    const login = () => {
        let userID = "0";
        userID= apiReqs.signIn({
            data: {
                email:account,
                password:password,
            },
        })
        goto('/home/'+userID+'')
        localStorage.setItem('userID',userID)
        //console.log(userID)
    }

    return (
        <div className="P-login">
            <img src={imgLogo} alt="" className="logo"/>
            <div className="ipt-con">
                <Input placeholder="邮箱" value={account} onChange={(e)=>{setAccount(e.target.value)}}/>
            </div>
            {/*<div className="ipt-con">*/}
            {/*    <Input placeholder="昵称" value={nickname} onChange={(e)=>{setNickname(e.target.value)}}/>*/}
            {/*</div>*/}
            <div className="ipt-con">
                <Input.Password placeholder="密码" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <Link to="/register">去注册</Link>
            <div className="ipt-con">
                <Button type="primary" block={true} onClick={login}>
                    登录
                </Button>
            </div>
        </div>
    )
}

export default Register