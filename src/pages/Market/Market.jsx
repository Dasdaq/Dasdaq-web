import React, { Component } from "react";
import { Chart, Geom, Axis, Tooltip, Legend, View } from "bizcharts";
import axios from "axios-jsonp-pro";
import DataSet from "@antv/data-set";
import data from "./fakeData.json";
import Slider from "bizcharts-plugin-slider";
import { Table } from 'antd';

/*const CoinPrices = [
    { key: "1", name: "USD", BTC: "3333783.0000", ETH: "33335533.0000", EOS: "333333273.0000" },
    { key: "2", name: "CNY", BTC: "3334433.0000", ETH: "33773333.0000", EOS: "333354533.0000" },
    { key: "3", name: "JPY", BTC: "3223333.0000", ETH: "33354333.0000", EOS: "3333353434.0000" },
]*/
const columns = [{
    title: '名称',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '兑换为BTC',
    dataIndex: 'BTC',
    key: 'BTC',
    defaultSortOrder: 'descend',
    sorter: (a, b) => parseInt(a.BTC, 10) - parseInt(b.BTC, 10),
}, {
    title: '兑换为ETH',
    dataIndex: 'ETH',
    key: 'ETH',
    defaultSortOrder: 'descend',
    sorter: (a, b) => parseInt(a.ETH, 10) - parseInt(b.ETH, 10),
}, {
    title: '兑换为EOS',
    dataIndex: 'EOS',
    key: 'EOS',
    defaultSortOrder: 'descend',
    sorter: (a, b) => parseInt(a.EOS, 10) - parseInt(b.EOS, 10),
}];

// const ListStyle = {
//     listStyle: 'none',
//     display: 'flex',
//     justifyContent: 'space-around',
//     width: "96%",
//     borderBottom: '1px',
//     borderBottomStyle: 'solid',
//     marginLeft: '2%'
// };
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
        const api = 'https://min-api.cryptocompare.com/data/histominute?&'
        const { data } = await axios.get(api, {
            params: {
                fsym: 'BTC',
                tsym: 'ETH',
                limit: 1440,
                aggregate: 15,
                extraParams: "Cryptocurrency_Market"
            }
        })
        console.info(data)
        this.setState({ historyData: data })
        var thiz = this;
        const url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,EOS&tsyms=USD,CNY,JPY";
         axios.get(url)
             .then(function (resp) {
                 let data =resp.data;
             let values= [
                     { key: "1", name: "USD", BTC: data.BTC.USD, ETH: data.ETH.USD, EOS: data.EOS.USD },
                     { key: "2", name: "CNY", BTC: data.BTC.CNY, ETH: data.ETH.CNY, EOS: data.EOS.CNY },
                     { key: "3", name: "JPY", BTC: data.BTC.JPY, ETH: data.ETH.JPY, EOS: data.EOS.JPY },
                 ]
                 thiz.setState({coinPrice:values});
             })
             .catch(function (err) {
                 console.info(err)
             })
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
        const {coinPrice} = this.state;
        return (
            <div className="market">
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
                        <Table dataSource={coinPrice} columns={columns} />
                    </div>

                </div>
            </div>
        )
    }
}

export default MarketPage;