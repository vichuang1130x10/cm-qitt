import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import connect from './connect'
import DashboardTrendChart from '../../Visualization/DashboardTrend'
import {
    categoryArray,
    pickUpStationByCMVendor,
} from '../../ParsingData/ParsingHelpFunction'
const ChartContainerTitle = styled.div`
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    & .content-category {
        margin-left: 8px;
        font-size: 18px;
        color: #6fa4e3;
        font-weight: 700;
    }
    & .content-title {
        font-size: 18px;
    }
`
const ChartContainerContent = styled.div`
    margin: 0 auto;
    padding: 0;
    width: 440px;
    height: 240px;
`

const timeUnits = ['Week', 'Month']
const cates = ['MB', 'BPN', 'OTHER']

function App(props) {
    // here need to be reconstructor
    const { vendor } = props.appState
    const stations = pickUpStationByCMVendor(vendor)

    const [station, setStation] = useState(stations[stations.length - 1])
    const [category, setCategory] = useState('MB')
    const [timeUnit, setTimeUnit] = useState('Week')
    const [chartData, setChartData] = useState([])
    useEffect(() => {
        // fetch data from props( redux store) and set the value for each state
        console.log('use effect is called')
        const { MBData, BPNData, OtherData } = props.appState

        const unit = timeUnit === 'Week' ? 'weekly' : 'monthly'

        let chartData = {}
        switch (category) {
            case 'MB':
                chartData = (MBData[station] && MBData[station][unit]) || {}
                break
            case 'BPN':
                chartData = (BPNData[station] && BPNData[station][unit]) || {}
                break
            case 'OTHER':
                chartData =
                    (OtherData[station] && OtherData[station][unit]) || {}
                break
            default:
                break
        }
        // const chartData = MBData[station][timeUnit]

        setChartData(chartData)
    }, [station, category, timeUnit])

    const updateCategory = (str) => {
        setCategory(str)
    }

    const updateStation = (str) => {
        setStation(str)
    }

    const updateTimeUnit = (str) => {
        setTimeUnit(str)
    }

    return (
        <div>
            <ChartContainerTitle>
                <h6 className="content-category">{category}</h6>
                <h6 className="content-title">
                    {timeUnit === 'Week'
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
            </ChartContainerTitle>
            <ChartContainerContent>
                <DashboardTrendChart data={chartData} unit={timeUnit} />
            </ChartContainerContent>
        </div>
    )
}

export default connect(App)
