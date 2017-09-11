import React from 'react';
import { Row, Col} from 'antd';
import {Menu, Icon, Tabs, message, Form, Input, Button, CheckBox, Modal, Card, notification} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class CommonComments extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: ""
    };
  };

    componentDidMount(){
      let myFetchOptions = {
        method: 'GET'
      };
      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions)
      .then(response => response.json())
      .then(json => this.setState({comments: json}))
    }

    handleSubmit(e) {
      e.preventDefault();//静止冒泡
      let myFetchOptions = {
        method: 'GET'
      };
      var formdata = this.props.form.getFieldsValue();
      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey +"&commnet=" + formdata.remark, myFetchOptions)
      .then(response => response.json())
      .then(json => {
        this.componentDidMount();
      })
    }

    addUserCollection() {
      let myFetchOptions = {
        method: "GET"
      };
      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey, myFetchOptions)
      .then(response => response.json())
      .then(json => {
        notification["success"]({message: "News提醒", description: "收藏文章成功"});
      });
    }

    render() {
      let {getFieldProps} = this.props.form;//当前窗体
      const {comments} = this.state;
      const commentsList = comments.length
      ?
      comments.map((comment, index)=>(
        <Card key={index} title={comment.UserName} extra={<a herf="#">发布于 {comment.datetime}</a>}>
          <p>{comment.Comments}</p>
        </Card>
      ))
      :
      '没有加载到任何评论'
      return(
        <div className="comment">
          <Row>
            <Col span={24}>
              {commentsList}
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="留下您的评论">
                  <Input type="textarea" placeholder="随便写些啥吧" {...getFieldProps('remark',{initialValue: ''})}/>
                </FormItem>
                <Button type="primary" htmlType="submit">提交评论</Button>
                &nbsp;&nbsp;
                <Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
              </Form>
            </Col>
          </Row>
        </div>
      );
    };
  }

export default CommonComments = Form.create({})(CommonComments);
