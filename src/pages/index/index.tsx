import {useNavigate,useParams} from 'react-router-dom'
import { Button, message ,notification,Divider,Typography} from 'antd';
import {useState,useEffect} from "react";
import './index.styl'
// @ts-ignore
import {apiReqs, goto} from '../../api/index'
// @ts-ignore
import Header from '../../compoments/header/index'
import Module from "../../compoments/module";
import Upload from "../../compoments/upload";

function Index() {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';
    const {Title,Paragraph,Text}=Typography;

    const [username, setUsername] = useState("")
    const [moduleClasses, setModuleClass] = useState("")
    const [datasetID, setDatasetID] = useState(0)
    const [datasetName, setDatasetName] = useState("")
    const [classes,setClasses]=useState("")
    const [result,setResult]=useState(0)

    const param=useParams();
    const test = () => {
        apiReqs.testModule({
            data:{
                userID: param.userID,
                moduleID: param.moduleID,
                target_classes_idx:moduleClasses,
            },
            success: (res: any) => {
                let ans=res.classes.slice(1,-1).split(",")
                console.log(ans[0])
                setResult(ans[0])
                //setModuleList(res.mudules)
                //console.log(res)
            }
        })

    }
    useEffect(() => {
        apiReqs.getModuleDetail({
            data:{
                userID: param.userID,
                moduleID: param.moduleID,
            },
            success: (res: any) => {
                setModuleClass(res.moduleClasses)
                setDatasetID(res.datasetID)
                setDatasetName(res.datasetName)
                setUsername(res.username)
                //console.log(res)
            }
        })
        apiReqs.getDatasetDetail({
            data:{
                userID: param.userID,
                datasetID: datasetID,
            },
            success: (res: any) => {
                setClasses(res.classes)
                //console.log(res)
            }
        })
    })
    const openMessage = () => {
        test();
        console.log(result)
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
        });
        setTimeout(() => {
            let ans=classes.split(",")
            console.log(ans)
            messageApi.open({
                key,
                type: 'success',
                //content: 'Loaded!',
                content: 'classes:'+ans[result],
                duration: 2,
            });
        }, 1000);
    };
    const openNotification = () => {
        notification.open({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };
    // @ts-ignore
    return (
        <div className="P-main">
            {contextHolder}
            <Header/>
            <Typography>
                <Title>Model</Title>
                <Paragraph>
                    <Text strong>
                        username:&nbsp;&nbsp;{username}&nbsp;&nbsp;
                        moduleClasses:&nbsp;&nbsp;{moduleClasses}&nbsp;&nbsp;
                        datasetID:&nbsp;&nbsp;{datasetID}&nbsp;&nbsp;
                        datasetName:&nbsp;&nbsp;{datasetName}&nbsp;&nbsp;
                    </Text>
                    <br></br>
                    <Text>
                        classes:&nbsp;&nbsp;{classes}
                    </Text>
                </Paragraph>
            </Typography>
            <Upload flag={3} />
            <Button type="primary" onClick={openMessage}>
                Commit
            </Button>
        </div>
    )
}

export default Index