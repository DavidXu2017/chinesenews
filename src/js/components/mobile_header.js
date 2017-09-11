import React from 'react';
import { Row, Col} from 'antd';
import {Menu, Icon, Tabs, message, Form, Input, Button, CheckBox, Modal} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class MobileHeader extends React.Component {

  constructor() {
    super();
    this.state = {
      current: 'top',
      modalVisiable: false,
      action: 'login',
      hasLogined: false,
      userNickName: '',
      userid: 0,
      userInfo: false,
    };
  }

  componentWillMount() {
    if (localStorage.userid!='') {
      this.setState({hasLogined: true});
      this.setState({userNickName: localStorage.userNickName, userid: localStorage.userid});
    }
  }

  setModalVisible(value) {
    this.setState({modalVisiable: value});
  }

  handleClick(e) {
    if (e.key == "register") {
      this.setState({curent: 'register'});
      this.setModalVisible(true);
    } else {
      this.setState({current: e.key});
    }
  }

  handleSubmit(e) {
    //connect with API
    e.preventDefault();//阻止事件冒泡
    var myFetchOptions = {
      method: 'GET'
    };
    var formData= this.props.form.getFieldsValue();
    console.log(formData);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
    + "&username=" + formData.userName + "&password=" + formData.password
    + "&r_userName="+formData.r_userName+"&r_password="
    +formData.r_password+"&r_confirmPassword="
    +formData.r_confirmPassword,myFetchOptions)
    .then(response => response.json())
    .then(json=>{
      console.log('json',json);
      this.setState({userNickName: json.NickUserName, userid: json.UserId});
      localStorage.userid=json.UserId;
      localStorage.userNickName=json.NickUserName;
    });
    if (this.state.action=="login") {
      this.setState({hasLogined:true});
    }
    message.success("请求成功");
    this.setModalVisible(false);
  }

  login() {
    this.setModalVisible(true);
  }

  callback(key) {
    if (key==1) {
      this.setState({action: 'login'});
    } else if (key == 2) {
      this.setState({action: 'register'});
    }
  }

  setUserInfoVisible(value) {
    this.setState({userInfo: value});
  }

  // loginin() {
  //   this.setUserInfoVisible(true);
  // }

  handleLogout(){
    localStorage.userid="";
    localStorage.userNickName="";
    this.setUserInfoVisible(false);
    this.setState({hasLogined: false});
  }

  render() {
    let {getFieldDecorator} = this.props.form;
    const userShow = this.state.hasLogined
    ?
      <Link to={'/usercenter'}>
        <Icon type="inbox" />
      </Link>
    :
    <Icon type="setting" onClick={this.login.bind(this)} />

    return (

      <div id="mobileheader">
        <header>
          <a href="/">
          <img src="./src/images/logo.png" alt="logo" />
          </a>
          <span>ReactNews</span>
          {userShow}
        </header>

        <Modal title="User Center" wrapClassName="userSignup" visible={this.state.modalVisiable} footer={[<Button key="back" size="large" onClick={()=>this.setModalVisible(false)}>Return</Button>]}>
          <Tabs type="card" onChange={this.callback.bind(this)}>
            <TabPane tab="登入" key="1">
              <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                  )}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                  )}
                </FormItem>
                <Button type="primary" htmlType="submit">登入</Button>
              </Form>
            </TabPane>
            <TabPane tab="注册" key="2">
              <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                <FormItem label="账户">
                  {getFieldDecorator('r_userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                  )}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator('r_password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                  )}
                </FormItem>
                <FormItem label="确认密码">
                  {getFieldDecorator('r_confirmPassword', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                  )}
                </FormItem>
                <Button type="primary" htmlType="submit">注册</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>


        <Modal title="User Center" wrapClassName="userInfo" visible={this.state.userInfo} footer={[<Button key="back" size="large" onClick={()=>this.setUserInfoVisible(false)}>Return</Button>]}>
              <Form horizontal>
                <FormItem>
                  <Button type="primary" htmlType="button" >
                    {this.state.userNickName}
                  </Button>
                </FormItem>
                <FormItem>
                  <Button type="dashed" htmlType="button">
                  个人中心
                  </Button>
                </FormItem>
                <Button type="primary" htmlType="button" onClick={this.handleLogout.bind(this)}>登出</Button>
              </Form>
        </Modal>


      </div>
    );
  };
}

export default MobileHeader = Form.create({})(MobileHeader)
