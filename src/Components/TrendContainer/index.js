import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import connect from './connect'
import DashboardTrendChart from '../../Visualization/DashboardTrend'
import {
    category,
    pickUpStationByCMVendor,
} from '../../ParsingData/ParsingHelpFunction'
const ChartContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0 auto;
`

const timeUnitDictionary = { Week: 'weekly', Month: 'monthly' }

function App(props) {
    const { vendor, MBData, BPNData, OtherData } = props.appState
    const stations = pickUpStationByCMVendor(vendor)
    const [station, setStation] = useState([stations[stations.length - 1]])
    const [category, setCategory] = useState('MB')
    const [timeUnit, setTimeUnit] = useState('weekly')
    const [chartData, setChartData] = useState([])
    useEffect(() => {
        const chartData = MBData[station][timeUnit]
        console.log(chartData)
        setChartData(chartData)
    }, [station, category, timeUnit])

    // const updateStation = (str) => {
    //     setStation(str)
    //     setChartData(data[str])
    // }

    return (
        <div>
            <label htmlFor="station">
                <pre>
                    <code>{JSON.stringify(chartData, null, 4)}</code>
                </pre>
                {/* <ChartContainer>
                    <h4>
                        <span style={{ color: '#6FA4E3' }}>{title}</span> last
                        10 weeks trend
                    </h4>
                    <select
                        id="station"
                        value={station}
                        onChange={(e) => updateStation(e.target.value)}
                        onBlur={(e) => updateStation(e.target.value)}
                        style={{ marginBottom: '0px' }}
                    >
                        {['SMT2', 'FCT'].map((station) => (
                            <option value={station} key={station}>
                                {station}
                            </option>
                        ))}
                    </select>
                </ChartContainer> */}
            </label>
            {/* <DashboardTrendChart data={chartData} /> */}
        </div>
    )
}

export default connect(App)
