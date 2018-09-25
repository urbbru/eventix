import * as React from 'react'
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
                <Form>

                        <FormItem label="Choose your base pizza">  
                            <RadioGroup>
                                <RadioButton value={'base.value'}>{'base.value'}</RadioButton>
                            </RadioGroup>
                        </FormItem>

                        <FormItem label="Choose your sauce">  
                            <RadioGroup onChange={props.onChange}>
                                <RadioButton value={'base.value'}>{'base.value'}</RadioButton>
                            </RadioGroup>
                        </FormItem>

                        <FormItem label="Choose your toppings(max 3)">
                            <Select
                                mode="multiple"
                                placeholder="Please select"
                            >
                                <Option key={'base.value'}>{'base.value'}</Option>
                            </Select>
                        </FormItem>

                        <FormItem label="Turbo drone delivery?(This will increase the total price with 10%)">  
                            <Switch onChange={props.onChange}/>
                        </FormItem>

                        <Button>Submit</Button>

                    </Form>
                </Col>
        </div>
    )  
}