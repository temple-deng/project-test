import React from 'react';
import ReactDOM from 'react-dom';


// 添加栏组件
class AddSec extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    //输入事件
    handleChange(){
        this.props.onUserInput(this.refs.itemName.value);
    }

    //提交
    handleClick(){
        const name = this.refs.itemName.value.trim();
        if(!name){
            return;
        }
        const now = new Date();
        const createTime = now.toLocaleDateString().replace(/\//g,"-");
        const status = "not start";
        const startTime = null;
        const endTime = null;
        const operation = {
            start: false,
            finished: false,
            delete: true
        };

        const listItem = {
            name,
            createTime,
            status,
            startTime,
            endTime,
            operation
        };

        this.props.onSubmit(listItem);
    }

    render(){
        return (
            <div className="add-sec">
                <input type="text" ref="itemName" placeholder="添加一条任务" value={this.props.itemName} onChange={this.handleChange} />
                <span className="sub-btn" onClick={this.handleClick}>添加</span>
            </div>
        )
    }
}

// 操作按钮组件
class OperationBtn extends React.Component {
    constructor(){
        super();
        this.handleDelete = this.handleDelete.bind(this);
        this.handleStartMission = this.handleStartMission.bind(this);
        this.handleFinMission = this.handleFinMission.bind(this);
    }

    //开始按钮点击
    handleStartMission(){
        const index = this.props.index;
        this.props.onStartMission(index);
    }

    //完成按钮点击
    handleFinMission(){
        const index = this.props.index;
        this.props.onFinMission(index);
    }

    //删除按钮点击
    handleDelete(){
        const index = this.props.index;
        this.props.onItemDelete(index);
    }

    render(){
        const startStatus = this.props.btnStatus.start?<button type="button" disabled>开始</button>
                            :<button type="button" onClick={this.handleStartMission}>开始</button>;

        const finStatus = this.props.btnStatus.start?(this.props.btnStatus.finished?<button type="button" disabled>完成</button>:<button type="button" onClick={this.handleFinMission}>完成</button>)
                            :<button type="button" disabled>完成</button>;
        return (
            <span>
                {startStatus}
                {finStatus}
                <button type="button" onClick={this.handleDelete}>删除</button>
            </span>
        )
    }
}

// 任务条目组件
class ListItem extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        var statusObj = {
            "not start": "未开始",
            "started": "进行中",
            "finished": "完成"
        };

        return (
            <tr>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.createTime}</td>
                <td>{statusObj[this.props.item.status]}</td>
                <td>{this.props.item.startTime?this.props.item.startTime:''}</td>
                <td>{this.props.item.endTime?this.props.item.endTime:''}</td>
                <td>
                    <OperationBtn btnStatus={this.props.item.operation} index={this.props.index} onItemDelete={this.props.onItemDelete}
                        onStartMission = {this.props.onStartMission} onFinMission = {this.props.onFinMission}
                    />
                </td>
            </tr>
        )
    }
}

// 任务表格组件
class ListTable extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        var rows = [];
        var self = this;
        this.props.list.forEach(function(value, index,arr){
            rows.push(<ListItem key={value.name} item={value} index={index} onItemDelete={self.props.onItemDelete}
                        onStartMission={self.props.onStartMission} onFinMission = {self.props.onFinMission} />);
        });
        return (
            <table className="list-table">
                <thead>
                    <tr>
                        <th>任务名</th>
                        <th>创建时间</th>
                        <th>状态</th>
                        <th>开始时间</th>
                        <th>完成时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class ListBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            itemName: "",
            list: []
        };
        this.handleInput = this.handleInput.bind(this);    //用户输入任务
        this.handleSubmit = this.handleSubmit.bind(this);  //提交任务
        this.handleItemDelete = this.handleItemDelete.bind(this);   //删除任务
        this.objToUrlencoded = this.objToUrlencoded.bind(this);      //处理URL参数
        this.handleStartMission = this.handleStartMission.bind(this);  //开始任务
        this.handleFinMission = this.handleFinMission.bind(this);       //完成任务
    }

    handleInput(name) {
        this.setState({itemName:name});
    }

    /*添加任务，获取服务器响应
     * @param item
     */
    handleSubmit(item) {
        this.setState({itemName:''});
        const xhr = new XMLHttpRequest();
        const url = this.props.url;
        xhr.open('POST', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                this.loadDataFromServer();
            }
            else if (xhr.readyState == 4 && xhr.status !== 200) {
                alert(xhr.responseText);
            }
        }.bind(this);

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        const urlStr = this.objToUrlencoded(item);
        xhr.send(urlStr);
    }

    /*将对象内容编码成url字符串
     *  @param obj  object 要转换的对象
     *  @return string 转换完成后的字符串
     */
    objToUrlencoded(obj) {
        const keysArr = Object.keys(obj);
        const self = this;
        let urlencodedStr = '';
        keysArr.forEach((value)=>{
            if(typeof obj[value] === 'object' && obj[value] !== null) {
                const subUrlencodedStr = self.objToUrlencoded(obj[value]);
                const subUrlencodedArr = subUrlencodedStr.split('&');
                subUrlencodedArr.forEach((val) =>{
                    urlencodedStr += value + '[' + val.split('=')[0] + ']=' +val.split('=')[1] + '&';
                });
            }
            else{
                urlencodedStr += value + '=' + obj[value] + '&';
            }
        });
        urlencodedStr = urlencodedStr.slice(0, urlencodedStr.length-1);
        return urlencodedStr;
    }


    /*处理删除任务的事件
     * @param itemIndex number  需要删除任务的数组索引
    */
    handleItemDelete(itemIndex){
        const xhr = new XMLHttpRequest();
        const url = this.props.url;
        xhr.open('DELETE', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.loadDataFromServer();
            }
            else if (xhr.readyState === 4 && xhr.status !== 200) {
                alert(xhr.responseText);
            }
        }.bind(this);

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(`index=${itemIndex}`);
    }

    //从服务器加载JSON数据
    loadDataFromServer(){
        const url = this.props.url;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.setState({
                    list: JSON.parse(xhr.responseText)
                });
            }
        }.bind(this);
        xhr.send(null);
    }

    /*
     * 开始任务
     * @param itemIndex number 任务索引
     */
    handleStartMission(itemIndex){
        const xhr = new XMLHttpRequest();
        const url = this.props.url;
        xhr.open('POST', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.loadDataFromServer();
            }
            else if (xhr.readyState === 4 && xhr.status !== 200) {
                alert(xhr.responseText);
            }
        }.bind(this);

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(`index=${itemIndex}&operation=start`);
    }

    /* 处理完成任务的事件
     * @param itemIndex number 需要完成任务的索引
     */
    handleFinMission(itemIndex) {
        const xhr = new XMLHttpRequest();
        const url = this.props.url;
        xhr.open('POST', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.loadDataFromServer();
            }
            else if (xhr.readyState === 4 && xhr.status !== 200) {
                alert(xhr.responseText);
            }
        }.bind(this);

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(`index=${itemIndex}&operation=finished`);
    }

    //  在组件渲染后加载数据
    componentDidMount() {
        this.loadDataFromServer();
    }


    render() {
        return (
            <div id="listBox">
                <AddSec itemName={this.state.itemName} onUserInput={this.handleInput}
                    onSubmit={this.handleSubmit}
                />
                <ListTable list={this.state.list} onItemDelete={this.handleItemDelete}
                onStartMission={this.handleStartMission} onFinMission = {this.handleFinMission}
                />
            </div>
        );
    }
}

ReactDOM.render(<ListBox url="/api/list" />, document.getElementById('container'));
