import {Card,Avatar} from "antd";
import { EditOutlined,EllipsisOutlined,SettingOutlined } from '@ant-design/icons';
import {goto} from "../../api";

const { Meta } = Card;
type selfProps = {
    id: number;
    name: string;
}
function Model(prop: selfProps) {
    const set=()=>{
        localStorage.setItem("ModelID",prop.id.toString())
        console.log(localStorage.getItem("UserID"))
        goto('/main/'+localStorage.getItem("UserID")+'/'+prop.id+'')
    }
    return(
        <Card
            style={{ width: 300 }}
            cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
            actions={[
                <SettingOutlined key="setting" onClick={set}/>,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Meta
                avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
                title={prop.name}
                description="This is the description"
            />
        </Card>
    )

}

export default Model;