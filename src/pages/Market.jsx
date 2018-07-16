import React, { Component } from "react";
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View } from "bizcharts";
import axios from "axios";
import DataSet, { DataView } from "@antv/data-set";
import data from "./fakeData.json";
import Slider from "bizcharts-plugin-slider";
const CoinPrices = [
    {name:"Bit",USD:"3333783.0000",CNY:"33335533.0000",JPY:"333333273.0000"},
    {name:"Eth",USD:"3334433.0000",CNY:"33773333.0000",JPY:"333354533.0000"},
    {name:"EOS",USD:"3223333.0000",CNY:"33354333.0000",JPY:"3333353434.0000"},
]
const ListStyle = {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    width: "96%",
    borderBottom: '1px',
    borderBottomStyle: 'solid',
    marginLeft: '2%'
};
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
                        <ul style ={ListStyle}>
                            <li>name</li>
                            <li>USD</li>
                            <li>JPY</li>
                            <li>CNY</li>
                        </ul>
                        {CoinPrices.map((Prices) => {
                        return (
                            <ul style ={ListStyle}>
                              <li>{Prices.name}</li>
                              <li>{Prices.USD}</li>
                              <li>{Prices.JPY}</li>
                              <li>{Prices.CNY}</li>
                           </ul>
          )
        })}

                    </div>

                </div>
            </div>
        )
    }
}

export default MarketPage;