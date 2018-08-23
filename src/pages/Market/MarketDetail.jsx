import React from "react"
import { Col, Row, Card, Table, Tabs } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, View} from "bizcharts";
import axios from "axios";
import DataSet from "@antv/data-set";
import data from "./fakeData.json";
import Slider from "bizcharts-plugin-slider";
import coinPrice from "./CoinPrices.json";

const TabPane = Tabs.TabPane;
const data20 = data.slice(0,20);
const ds = new DataSet({
    state: {
        start: '2015-04-07',
        end: '2015-07-28'
    }
});
const columns = [{
    title: '名称',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '价格',
    dataIndex: 'USD',
    key: 'USD',
    sortOrder: 'ascend',
    sorter: (a, b) => parseInt(a.USD, 10) - parseInt(b.USD, 10),
}];
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
            symbolname: '',
            exchangename: '',
            historyData: [],
            coinPrice:[]
        }
    }
    onChange(obj) {
        const { startText, endText } = obj;
        ds.setState('start', startText);
        ds.setState('end', endText);
    }

    async componentDidMount() {
        var {symbol, exchange} = this.props.match.params
        if (exchange == null || exchange === '') exchange = 'BTC';//默认为BTC
        this.setState({ symbolname:symbol , exchangename:exchange})
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
                            <div>{this.state.symbolname}/{this.state.exchangename}</div>
                            <div>比特币</div>
                        </div>
                    </Col>
                    <Col md={4} sm={24}>
                        <div>Last Price</div>
                        <div style={data[0].change> 0 ? { color: "#f50" } : { color: "#87d068" }}>
                            {data[0].money}
                        </div> 
                    </Col>
                    <Col md={4} sm={24}>
                        <div>24H Change</div>
                        <div style={data[0].change> 0 ? { color: "#f50" } : { color: "#87d068" }}>
                            {(data[0].change > 0 ? "+" : "") + data[0].change + "%"}
                        </div> 
                    </Col>
                    <Col md={4} sm={24}>
                        <div>24H High</div>
                        <div>{data[0].max}</div>
                    </Col>
                    <Col md={4} sm={24}>
                        <div>24H Low</div>
                        <div>{data[0].min}</div>
                    </Col>
                    <Col md={4} sm={24}>
                        <div>24H Volume</div>
                        <div>{data[0].volumn}</div>
                    </Col>
                </Card>
                <Row>
                    <Col md={6} sm={24} style={style.content}>
                        <Card title="价格表" style={{ boxShadow: '3px 3px 6px #00000030' }}>
                            <Col md={8} sm={24}>
                                <p>日期</p>
                                {data20.map((Prices) => {
                                    return (
                                        <p style={Prices.end > Prices.start ? { color: "#f50" } : { color: "#87d068" }}>{Prices.time.slice(5,10)}</p>
                                    )
                                })}
                            </Col>
                            <Col md={8} sm={24}>
                                <p>start</p>
                                {data20.map((Prices) => {
                                    return (
                                        <p style={Prices.end > Prices.start ? { color: "#f50" } : { color: "#87d068" }}>{Prices.start}</p>
                                    )
                                })}
                            </Col>
                            <Col md={8} sm={24}>
                                <p>end</p>
                                {data20.map((Prices) => {
                                    return (
                                        <p style={Prices.end > Prices.start ? { color: "#f50" } : { color: "#87d068" }}>{Prices.end}</p>
                                    )
                                })}
                            </Col>
                        </Card>
                    </Col>
                    <Col md={18} sm={24}>
                        <Col md={16} sm={24} style={{paddingTop: '20px', paddingBottom: '20px'}}>
                            <Card style={{ boxShadow: '3px 3px 6px #00000030' }}>
                                {this.renderContent()}
                            </Card>
                        </Col>
                        <Col md={8} sm={24} style={style.content}>
                            <Card style={{ boxShadow: '3px 3px 6px #00000030' }}>
                                <Table dataSource={coinPrice} columns={columns} 
                                    onRow={(record) => {
                                    return {
                                        onClick: () => {window.location.href="/marketdetail/"+record.name},       // 点击行
                                    };
                                }}/>
                            </Card>
                        </Col>
                        <Col md={24} sm={24} style={{paddingRight: '20px'}}>
                            <Card style={{ boxShadow: '3px 3px 6px #00000030' }}>
                                <Tabs defaultActiveKey="1" type="card">
                                    <TabPane tab="限价交易" key="1">
                                        
                                    </TabPane>
                                    <TabPane tab="市价交易" key="2">

                                    </TabPane>
                                </Tabs>
                            </Card>
                        </Col>
                    </Col>
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
