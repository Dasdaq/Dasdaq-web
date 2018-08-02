import React, { Component } from "react";
import { Chart, Geom, Axis, Tooltip, Legend, View } from "bizcharts";
import axios from "axios";
import DataSet from "@antv/data-set";
import data from "./fakeData.json";
import Slider from "bizcharts-plugin-slider";
import { Table , Tag , Icon } from 'antd';
/* <img alt="活动 24h" src="https://dappradar-activity.s3.amazonaws.com/449.png"> */
const CoinPrices = [
{   key: "1", 
    name: "隐秘世界", 
    coin: "eth",// not used
    type: "game",
    balance: 118.06, 
    userperday: {value: 94, change: 2.6}, 
    chargeperday: {value: 292.34, change: -1.36}, 
    chargeperweek: 1706.03, 
    transperday: 3586, 
    transperweek: 23704, 
    chart: 0 },
]
const columns = [{
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
        <span class="icon-ethereum">
          <a>{record.name}</a>
        </span>
    ),
}, {
    title: "类型",
    dataIndex: 'type',
    key: 'type',
    sorter: (a, b) => a.localeCompare(b),
    render: (text, record) => {
        if (record.type === "game"){
            return (<Tag color="red">游戏</Tag>)
        }
    },
}, {
    title: "余额",
    dataIndex: 'balance',
    key: 'balance',
    sorter: (a, b) => parseInt(a.balance, 10) - parseInt(b.balance, 10),
    render: (text,record) => (<span><Icon type="bank"/>{record.balance}</span>),
    //icon is going to change to eth, nas, or eos
}, {
    title: "用户 24小时",
    dataIndex: 'userperday',
    key: 'userperday',
    defaultSortOrder: 'descend',
    sorter: (a, b) => parseInt(a.userperday.value, 10) - parseInt(b.userperday.value, 10),
    render: (text, record) => ( <div>
                                    <div>{record.userperday.value}</div>
                                    <div style={ record.userperday.change > 0 ? {color: "#f50"} : {color: "#87d068"} }>
                                        {(record.userperday.change > 0 ? "+" : "") + record.userperday.change}
                                    </div>
                                </div>),
}, {
    title: "成交量 24小时",
    dataIndex: 'chargeperday',
    key: 'chargeperday',
    sorter: (a, b) => parseInt(a.chargeperday.value, 10) - parseInt(b.chargeperday.value, 10),
    render: (text, record) => ( <div>
        <div><Icon type="bank"/>{record.chargeperday.value}</div>
        <div style={ record.chargeperday.change > 0 ? {color: "#f50"} : {color: "#87d068"} }>
            {(record.chargeperday.change > 0 ? "+" : "") + record.chargeperday.change}
        </div>
    </div>),
}, {
    title: "成交量 7天" ,
    dataIndex: 'chargeperweek',
    key: 'chargeperweek',
    sorter: (a, b) => parseInt(a.chargeperweek, 10) - parseInt(b.chargeperweek, 10),
}, {
    title: "交易 24小时" ,
    dataIndex: 'transperday',
    key: 'transperday',
    sorter: (a, b) => parseInt(a.transperday, 10) - parseInt(b.transperday, 10),
}, {
    title: "交易 7天" ,
    dataIndex: 'transperweek',
    key: 'transperweek',
    sorter: (a, b) => parseInt(a.transperweek, 10) - parseInt(b.transperweek, 10),
}, {
    title: "活动 7天" ,
    // dataIndex: 'transperweek',
    // key: 'transperweek',
    render: (text, record) => (<img alt="actimg" src="/165.png"></img>),
}];
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

class MarketPage extends Component {
    constructor() {
        super()
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

    render() {
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
                <Chart height={window.innerHeight / 2 - 50} animate={false} padding={[10, 40, 40, 40]} data={dv} scale={cols} forceFit>
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
                           <div>
                        <div>
                            <Table dataSource={CoinPrices} columns={columns} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MarketPage;