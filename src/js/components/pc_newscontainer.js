import React from 'react';
import {Row, Col} from 'antd';
import {Tabs, Carousel} from 'antd';
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
import PCProducts from './pc_products';

const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component {
  render() {
    const settings = {
      dots:true,
      infinite:true,
      speed: 500,
      slidesToShow:1,
      autoplay: true,
    }
    return(
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} className="container">
            <div className="leftContainer">
              <div className="carousel">
                <Carousel {...settings}>
                  <div><img src="./src/images/carousel_1.jpg"/></div>
                  <div><img src="./src/images/carousel_2.jpg"/></div>
                  <div><img src="./src/images/carousel_3.jpg"/></div>
                  <div><img src="./src/images/carousel_4.jpg"/></div>
                </Carousel>
              </div>
              <PCNewsImageBlock count={6} type="guoji" width="400px" cardTitle="国际头条" imageWidth="112px"/>
            </div>
            <Tabs className="tabs_news">
              <TabPane tab="头条" key="1">
                <PCNewsBlock count={22} type="top" width="100%" bordered="fase"/>
              </TabPane>
              <TabPane tab="国际" key="2">
                <PCNewsBlock count={22} type="guoji" width="100%" bordered="fase"/>
              </TabPane>
              <TabPane tab="娱乐" key="3">
                <PCNewsBlock count={22} type="yule" width="100%" bordered="fase"/>
              </TabPane>
              <TabPane tab="体育" key="4">
                <PCNewsBlock count={22} type="tiyu" width="100%" bordered="fase"/>
              </TabPane>
              <TabPane tab="科技" key="5">
                <PCNewsBlock count={22} type="keji" width="100%" bordered="fase"/>
              </TabPane>
            </Tabs>
            <Tabs className="tabs_product">
              <TabPane tab = "News 产品" key="1">
                <PCProducts />
              </TabPane>
            </Tabs>
            <div>
              <PCNewsImageBlock count={14} type="guonei" width="100%" cardTitle="国际" imageWidth="132px"/>
              <PCNewsImageBlock count={14} type="yule" width="100%" cardTitle="娱乐" imageWidth="132px"/>
            </div>
          </Col>
          <Col span={2}></Col>

        </Row>
      </div>
    )
  }
}
