import React from "react"
import { Button, Col, Row, Tabs, Card } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, View } from "bizcharts";
import axios from "axios";
import DataSet from "@antv/data-set";
import data from "./fakeData.json";
import Slider from "bizcharts-plugin-slider";

const TabPane = Tabs.TabPane;

const ds = new DataSet({
    state: {
        start: '2015-04-07',
        end: '2015-07-28'
    }
});
const dv = ds.createView();
dv.source(data)
    .transform({
        type: 'filter',
        callback: obj => {
            const date = obj.time;
            return date <= ds.state.end && date >= ds.state.start;
        }
    })
    .transform({
        type: 'map',
        callback: obj => {
            obj.trend = (obj.start <= obj.end) ? '上涨' : '下跌';
            obj.range = [obj.start, obj.end, obj.max, obj.min];
            return obj;
        }
    });

class MarketDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            historyData: []
        }
    }
    onChange(obj) {
        const { startText, endText } = obj;
        ds.setState('start', startText);
        ds.setState('end', endText);
    }

    async componentDidMount() {
        const api = 'https://min-api.cryptocompare.com/data/histominute?&'
        const { data } = await axios.get(api, {
            params: {
                fsym: 'BTC',
                tsym: 'CNY',
                limit: 1440,
                aggregate: 15,
                extraParams: "Cryptocurrency_Market"
            }
        })
        console.info(data)
        this.setState({ historyData: data })
    }

    renderContent() {
        const cols = {
            'time': {
                type: 'timeCat',
                nice: false,
                range: [0, 1]
            },
            trend: {
                values: ['上涨', '下跌']
            },
            'volumn': { alias: '成交量' },
            'start': { alias: '开盘价' },
            'end': { alias: '收盘价' },
            'max': { alias: '最高价' },
            'min': { alias: '最低价' },
            'range': { alias: '股票价格' }
        }
        return (
            <div>
                <Chart height={500} animate={false} padding={[10, 40, 40, 40]} data={dv} scale={cols} forceFit>
                    <Legend offset={20} />
                    <Tooltip showTitle={false} itemTpl='<li data-index={index}><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}{value}</li>' />
                    <View end={{ x: 1, y: 0.5 }} data={dv}>
                        <Axis name="time" />
                        <Axis name="range" />
                        <Geom
                            type='schema'
                            position="time*range"
                            color={['trend', val => {
                                if (val === '上涨') {
                                    return '#f04864';
                                }

                                if (val === '下跌') {
                                    return '#2fc25b';
                                }
                            }]}
                            tooltip={['time*start*end*max*min', (time, start, end, max, min) => {
                                return {
                                    name: time,
                                    value: '<br><span style="padding-left: 16px">开盘价：' + start + '</span><br/>'
                                        + '<span style="padding-left: 16px">收盘价：' + end + '</span><br/>'
                                        + '<span style="padding-left: 16px">最高价：' + max + '</span><br/>'
                                        + '<span style="padding-left: 16px">最低价：' + min + '</span>'
                                };
                            }]}
                            shape="candle"
                        />
                    </View>
                    <View height="0.1rem" start={{ x: 0, y: 0.65 }} data={dv} scale={{ volumn: { tickCount: 2 } }}>
                        <Axis name="volumn" label={{
                            formatter: function (val) {
                                return parseInt(val / 1000, 10) + 'k';
                            }
                        }} />
                        <Axis name="time" tickLine={null} label={null} />
                        <Geom
                            type='interval'
                            position="time*volumn"
                            color={['trend', val => {
                                if (val === '上涨') {
                                    return '#f04864';
                                }

                                if (val === '下跌') {
                                    return '#2fc25b';
                                }
                            }]}
                            tooltip={['time*volumn', (time, volumn) => {
                                return {
                                    name: time,
                                    value: '<br/><span style="padding-left: 16px">成交量：' + volumn + '</span><br/>'
                                };
                            }]}
                            shape="candle"
                        />
                    </View>
                </Chart>
                <div>
                    <Slider padding={[20, 40, 20, 40]} width='auto' height={26} start={ds.state.start} end={ds.state.end}
                        xAxis="time" yAxis='volumn' scales={{ time: { type: 'timeCat', nice: false, } }} data={data}
                        onChange={this.onChange.bind(this)}
                    />
                </div>
            </div>
        )
    }

    callback(key) {
        console.log(key);
    }

    render() {
        return (
            <div>
                <Card style={{ marginRight: '20px', marginLeft: '20px', boxShadow: '3px 3px 6px #00000030', verticalAlign: 'middle' }}>
                    <Col md={4} sm={24}>
                        <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                            <img alt="logo" style={{ height: '32px', marginRight: '16px' }} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                        </div>
                        <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                            <div>btc</div>
                            <div>统统二十块</div>
                        </div>
                    </Col>
                    <Col md={4} sm={24}>
                        <div>btc</div>
                        <div>统统二十块</div>
                    </Col>
                    <Col md={4} sm={24}>
                        <div>btc</div>
                        <div>统统二十块</div>
                    </Col>
                    <Col md={4} sm={24}>
                        <div>btc</div>
                        <div>统统二十块</div>
                    </Col>
                    <Col md={4} sm={24}>
                        <div>btc</div>
                        <div>统统二十块</div>
                    </Col>
                    <Col md={4} sm={24}>
                        <div>btc</div>
                        <div>统统二十块</div>
                    </Col>
                </Card>
                <Row>
                    <Col md={6} sm={24} style={style.content}>
                        <Card style={{ boxShadow: '3px 3px 6px #00000030' }}>
                            啥也没
                        </Card>
                    </Col>
                    <Col md={12} sm={24} style={style.content}>
                        <Card style={{ boxShadow: '3px 3px 6px #00000030' }}>
                            {this.renderContent()}
                        </Card>
                    </Col>
                    <Col md={6} sm={24} style={style.content}>
                        <Card style={{ boxShadow: '3px 3px 6px #00000030' }}>
                            啥也没
                        </Card>
                    </Col>
                    {/* <Col md={18} sm={24} style={style.content}> */}
                        {/* <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="关于" key="1">项目信息</TabPane>
                    <TabPane tab="人员" key="2">参与人员详情</TabPane>
                    <TabPane tab="应用" key="3">对接第一方的应用（水浒、签名、隐秘世界）</TabPane>
                    <TabPane tab="K线图" key="4">{this.renderContent()}</TabPane>
                  </Tabs> */}
                    {/* </Col> */}
                </Row>
            </div>
        )
    }
}

const style = {
    topheader: {
        height: '300px',
        backgroundColor: '#ebebeb',
        position: 'relative',
    },
    topbtn: {
        marginTop: '30px',
        marginBottom: '30px'
        // top: '50%',
        // transform: 'translateY(-50%)',
    },
    toptext: {
        marginTop: '30px',
        marginBottom: '30px'
        // top: '50%',
        // transform: 'translateY(-50%)',
    },
    content: {
        padding: '20px'
    },
    avatar: {
        borderRadius: '50%'
    }
};

export default MarketDetail;
