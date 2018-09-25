import * as React from 'react'
import logo from '../logo.svg'
import { 
    Row, Col, Button, Select, Form, 
    InputNumber, Switch, Radio, Icon 
} from 'antd'
const FormItem = Form.Item
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button
const Option = Select.Option;



export default function Home(props) {
    return (
        <div>
                <Col span={10}>
                    <div id="errMsg"></div>
                </Col>
                <Col span={10}>
                </Col>
        </div>
    )  
}