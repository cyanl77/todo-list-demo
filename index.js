var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 代办项目添加组件
 */
var AddingBoard = function (_React$Component) {
    _inherits(AddingBoard, _React$Component);

    function AddingBoard(props) {
        _classCallCheck(this, AddingBoard);

        var _this = _possibleConstructorReturn(this, (AddingBoard.__proto__ || Object.getPrototypeOf(AddingBoard)).call(this, props));

        _this.state = {
            newItemDes: ''
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.addItem = _this.addItem.bind(_this);
        return _this;
    }

    _createClass(AddingBoard, [{
        key: 'handleChange',
        value: function handleChange(e) {
            this.setState({ newItemDes: e.target.value });
        }
    }, {
        key: 'addItem',
        value: function addItem() {
            this.props.onAddItem('add', this.state.newItemDes);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'adding-board' },
                React.createElement('input', { value: this.state.newItemDes,
                    onChange: this.handleChange }),
                React.createElement(
                    'button',
                    { onClick: this.addItem },
                    '\u6DFB\u52A0'
                )
            );
        }
    }]);

    return AddingBoard;
}(React.Component);

/**
 * 代办项目展示组件
 * ListItem 每一个展示项组件
 * ListBoard 展示列表组件
 */


var ListItem = function (_React$Component2) {
    _inherits(ListItem, _React$Component2);

    function ListItem(props) {
        _classCallCheck(this, ListItem);

        return _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).call(this, props));
    }

    _createClass(ListItem, [{
        key: 'finishItems',
        value: function finishItems(id) {
            this.props.onItemChange('status', id);
        }
    }, {
        key: 'deleteItems',
        value: function deleteItems(id) {
            this.props.onItemChange('delete', id);
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'li',
                null,
                React.createElement(
                    'span',
                    null,
                    this.props.description
                ),
                React.createElement(
                    'button',
                    { onClick: this.finishItems.bind(this, this.props.id) },
                    ' ',
                    this.props.status === 'done' ? 'motify' : 'done',
                    ' '
                ),
                React.createElement(
                    'button',
                    { onClick: this.deleteItems.bind(this, this.props.id) },
                    'delete'
                )
            );
        }
    }]);

    return ListItem;
}(React.Component);

var ListBoard = function (_React$Component3) {
    _inherits(ListBoard, _React$Component3);

    function ListBoard(props) {
        _classCallCheck(this, ListBoard);

        var _this3 = _possibleConstructorReturn(this, (ListBoard.__proto__ || Object.getPrototypeOf(ListBoard)).call(this, props));

        _this3.listChange = _this3.listChange.bind(_this3);
        return _this3;
    }

    _createClass(ListBoard, [{
        key: 'listChange',
        value: function listChange(method, id) {
            this.props.onListChange(method, id);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var list = this.props.list;
            var listItems = Object.keys(list).map(function (id) {
                return React.createElement(ListItem, { key: id,
                    id: id,
                    status: list[id].status,
                    description: list[id].description,
                    onItemChange: _this4.listChange });
            });
            return React.createElement(
                'div',
                { className: 'list-board' },
                React.createElement(
                    'ol',
                    null,
                    listItems
                )
            );
        }
    }]);

    return ListBoard;
}(React.Component);

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


var count = 0;

var TodoListApp = function (_React$Component4) {
    _inherits(TodoListApp, _React$Component4);

    function TodoListApp() {
        _classCallCheck(this, TodoListApp);

        var _this5 = _possibleConstructorReturn(this, (TodoListApp.__proto__ || Object.getPrototypeOf(TodoListApp)).call(this));

        _this5.state = {
            list: {}
        };
        _this5.handleListChange = _this5.handleListChange.bind(_this5);
        return _this5;
    }

    //处理列表数据更新，method取值：'add'/'status'/'delete'


    _createClass(TodoListApp, [{
        key: 'handleListChange',
        value: function handleListChange(method) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            var newList = JSON.parse(JSON.stringify(this.state.list));
            if (method === 'add') {
                //添加代办项目, data为新项目的描述
                var newId = count++;
                newList[newId] = {
                    id: newId,
                    status: 'incomplete',
                    description: data
                };
            } else if (method === 'status') {
                //更改代办项目进度，data为项目id
                newList[data].status = newList[data].status == 'incomplete' ? 'done' : 'incomplete';
            } else if (method === 'delete') {
                //删除代办项目，data为项目id
                delete newList[data];
            }
            this.setState({
                list: newList
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(AddingBoard, { onAddItem: this.handleListChange }),
                React.createElement(ListBoard, { list: this.state.list,
                    onListChange: this.handleListChange })
            );
        }
    }]);

    return TodoListApp;
}(React.Component);

ReactDOM.render(React.createElement(TodoListApp, null), document.getElementById('root'));