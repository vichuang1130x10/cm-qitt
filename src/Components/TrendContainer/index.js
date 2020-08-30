import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import connect from './connect'
import DashboardTrendChart from '../../Visualization/DashboardTrend'
import {
    categoryArray,
    pickUpStationByCMVendor,
} from '../../ParsingData/ParsingHelpFunction'
const ChartContainer = styled.div`
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    & .content-category {
        font-size: 14px;
        color: #641130;
    }
    & .content-title {
        font-size: 12px;
    }
`

const timeUnits = ['weekly', 'monthly']
const cates = ['MB', 'BPN', 'OTHER']

function App(props) {
    const { vendor, MBData, BPNData, OtherData } = props.appState
    const stations = pickUpStationByCMVendor(vendor)
    const [station, setStation] = useState(stations[stations.length - 1])
    const [category, setCategory] = useState('MB')
    const [timeUnit, setTimeUnit] = useState('weekly')
    const [chartData, setChartData] = useState([])
    useEffect(() => {
        const chartData = MBData[station][timeUnit]
        console.log('use effect is called')
        setChartData(chartData)
    }, [station, category, timeUnit, MBData])

    const updateCategory = (str) => {
        setCategory(str)
    }

    const updateStation = (str) => {
        setStation(str)
        // setChartData(data[str])
    }

    const updateTimeUnit = (str) => {
        setTimeUnit(str)
    }

    return (
        <div>
            <ChartContainer>
                <h6> className="content-category" {category}</h6>
                <h6 className="content-title">
                    {timeUnit === 'weekly'
                        ? `last 10 Weeks trend`
                        : `Monthly trend`}
                </h6>
                <div>
                    <label htmlFor="category">
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => updateCategory(e.target.value)}
                            onBlur={(e) => updateCategory(e.target.value)}
                        >
                            {cates.map((cat) => (
                                <option value={cat} key={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label htmlFor="station">
                        <select
                            id="station"
                            value={station}
                            onChange={(e) => updateStation(e.target.value)}
                            onBlur={(e) => updateStation(e.target.value)}
                        >
                            {stations
                                ? stations.map((station) => (
                                      <option value={station} key={station}>
                                          {station}
                                      </option>
                                  ))
                                : null}
                        </select>
                    </label>
                    <label htmlFor="timeUnit">
                        <select
                            id="timeUnit"
                            value={timeUnit}
                            onChange={(e) => updateTimeUnit(e.target.value)}
                            onBlur={(e) => updateTimeUnit(e.target.value)}
                        >
                            {timeUnits.map((t) => (
                                <option value={t} key={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </ChartContainer>

            <DashboardTrendChart data={chartData} />
        </div>
    )
}

export default connect(App)
