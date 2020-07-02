import React,{ Component } from 'react';
import {Table, Input, InputNumber, Popconfirm, Form, message} from 'antd';
import axios from 'axios';
import qs from 'qs';

const data = [];
const EditableContext = React.createContext();

class EditableCell extends Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}
/*
*
*
*
*
*
*
* */
class EditableTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data,
            editingKey: '',
            start: 1
        };
        this.columns = [
            {
                title: '时间',
                dataIndex: 'time',
                width: '15%',
                editable: true,
            },
            {
                title: '内容',
                dataIndex: 'content',
                width: '55%',
                editable: true,
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: '10%',
                editable: true,
            },
            {
                title: 'Operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
              <EditableContext.Consumer>
                {form => (
                    <a
                        onClick={() => this.save(form, record.id)}
                        style={{ marginRight: 8 }}
                    >
                        Save
                    </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.id)}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
                    ) : (
                        <a disabled={editingKey !== ''} onClick={() => this.edit(record.id)}>
                            Edit
                        </a>
                    );
                },
            },
        ];
    }

    isEditing = record => record.id === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, id) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => id === item.id);
            if (index > -1) {
                const item = newData[index];
                let newly = newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                axios.post('/thisblog/api/EditTimelineInfo',qs.stringify({
                    id: newly[0].id,
                    time: newly[0].time,
                    content: newly[0].content,
                    status: newly[0].status,
                }),{ timeout: 180000 })
                    .then(response=>{
                        if (response.data === "2") message.success("修改成功")
                        else message.error("修改失败")
                    })
                    .catch(error=>{
                        message.error(error.response.status);
                    })
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
        // axios.post('/thisblog/api/EditTimelineInfo')
    }

    edit(id) {
        this.setState({ editingKey: id });
    }
    getTimeline=()=>{
        let start = this.state.start;
        axios.get('/thisblog/api/GetTimeline',{
            timeout: 180000
        })
            .then(response=>{
                this.setState({
                    data: response.data
                })
            })
            .catch(error=>{
                message.error(error.response.status);
            })
    }
    componentDidMount() {
        this.getTimeline();
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <EditableContext.Provider value={this.props.form}>
                <Table
                    components={components}
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: this.cancel,
                    }}
                />
            </EditableContext.Provider>
        );
    }
}
export default Form.create()(EditableTable);
