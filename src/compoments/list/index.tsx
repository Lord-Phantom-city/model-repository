import React from 'react';

class List extends React.Component{
    constructor(props:any){
        super(props);
        this.state = {
            listData: ["原始列表数据"],
            list2show: []
        }
    }

    // 实时更改渲染列表的数据
    search(event:any){
        let keyword = event.target.value

        if(keyword){
            // @ts-ignore
            let listData = this.state.listData
            // @ts-ignore
            let list2show = this.state.list2show
            for (let i=0; i<listData.length; i++){
                if(listData[i].match(keyword)){
                    list2show = [...list2show, listData[i]]
                }
            }

            this.setState({
                list2show: list2show
            })
        }
        else{
            this.setState({
                // @ts-ignore
                list2show: this.state.listData
            })
        }
    }

    render(){
        // 使用渲染列表的数据，而不是原始列表
        // @ts-ignore
        const Item = this.state.list2show.map((item, index) =>
            <p key={index}>item</p> // 不建议使用index作为key，最好元素本身带有key
        )

        return(
            <div>
                <input onChange={this.search.bind(this)}/> // 搜索框
                <ul>{Item}</ul>
            </div>
        )
    }
}

export default List;