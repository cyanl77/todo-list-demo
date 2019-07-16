/**
 * 代办项目添加组件
 */
class AddingBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newItemDes: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    handleChange(e) {
        this.setState({newItemDes: e.target.value})
    }

    addItem() {
        this.props.onAddItem('add', this.state.newItemDes);
    }

    render () {
        return (
            <div className='adding-board'>
                <input value={this.state.newItemDes}
                       onChange={this.handleChange} />
                <button onClick={this.addItem}>添加</button>
            </div>
        );
    }
}

/**
 * 代办项目展示组件
 * ListItem 每一个展示项组件
 * ListBoard 展示列表组件
 */
class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    finishItems(id) {
        this.props.onItemChange('status', id);
    }

    deleteItems(id) {
        this.props.onItemChange('delete', id);
    }

    render() {
        return (
            <li>
                <span>{this.props.description}</span>
                <button onClick={this.finishItems.bind(this, this.props.id)}> {this.props.status === 'done'? 'motify' : 'done'} </button>
                <button onClick={this.deleteItems.bind(this, this.props.id)}>delete</button>
            </li>
        )
    }
}

class ListBoard extends React.Component {
    constructor(props) {
        super(props);
        this.listChange = this.listChange.bind(this);
    }

    listChange(method, id){
        this.props.onListChange(method, id);
    }

    render() {
        let list = this.props.list;
        let listItems = Object.keys(list).map(id => 
            <ListItem key={id}
                      id={id}
                      status={list[id].status}
                      description={list[id].description} 
                      onItemChange={this.listChange} />        
        ) 
        return (
            <div className="list-board">
                <ol>
                    {listItems}
                </ol>
            </div> 
        );
    }
}

/**
 * 根应用
 * 代办项目数据对应数据结构：
 * {
 *     {
 *         id: 0,
 *         status: 'incomplete' / 'done',
 *         description: 'doing something'
 *     }
 * }
 */
let count = 0;
class TodoListApp extends React.Component {
    constructor() {
        super();
        this.state = {
            list: {}
        }
        this.handleListChange = this.handleListChange.bind(this);
    }

    //处理列表数据更新，method取值：'add'/'status'/'delete'
    handleListChange(method, data = '') {
        let newList = JSON.parse(JSON.stringify(this.state.list));
        if(method === 'add') {
            //添加代办项目, data为新项目的描述
            let newId = count++;
            newList[newId] = {
                id: newId,
                status: 'incomplete',
                description: data
            }
        } else if(method === 'status') {
            //更改代办项目进度，data为项目id
            newList[data].status = newList[data].status == 'incomplete'? 'done' : 'incomplete';
        } else if(method === 'delete') {
            //删除代办项目，data为项目id
            delete newList[data];
        }
        this.setState({
            list: newList
        })
    }
    
    render() {
        return (
            <div>
                <AddingBoard onAddItem={this.handleListChange}/>
                <ListBoard list={this.state.list} 
                           onListChange={this.handleListChange} />
            </div>
        );
    }
}

ReactDOM.render(
    <TodoListApp />,
    document.getElementById('root')
);