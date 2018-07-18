import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

const coinList = ['BTC', 'ETH', 'EOS']

const TokenNotExist = (symbol) => (
    <div className="coin-not-exist">
        The Crypto {{ symbol }} you find is not listed in Dasdaq.
        <br /> We are sorry for the incovience.
    </div>
)

const coinMapping = { BTC: "1", "ETH": "1027" }

class SimpleMarketView extends Component {
    constructor() {
        super()
        this.state = {
            chartData: [],
            price: 0,
            marketData: {},
            datetime: 0
        }
    }
    async componentDidMount() {
        const { match } = this.props
        const { symbol, fiat } = match.params
        // query api about market
        const ticketCode = coinMapping[symbol]

        const { data } = await axios.get(`https://api.coinmarketcap.com/v2/ticker/${ticketCode}/`, {
            params: {
                convert: fiat
            }
        })
        const marketData = data.data
        const { timestamp } = data.metadata
        const datetime = new Date(timestamp * 1000).toDateString()
        const { price } = marketData.quotes[fiat]
        this.setState({ marketData, price, datetime })
    }
    render() {
        // React Router will inject `match`
        const { match } = this.props
        // get symbol from params
        console.log(JSON.stringify(match.params))
        const { symbol, fiat } = match.params
        const { price, datetime } = this.state
        if (coinList.indexOf(symbol) === -1) {
            return (<TokenNotExist symbol={symbol} />)
        } else {
            return (
                <div className="market-chart">
                    <h1 className="title"> Market Data for {symbol}-{fiat} @ {datetime}   </h1>
                    <br />
                    <h1 className="title"> Current Price: {price}   </h1>
                </div>
            )
        }
    }
}

export default withRouter(SimpleMarketView)