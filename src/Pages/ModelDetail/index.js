import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container,} from 'react-bootstrap'
import ModelTrend from '../../Visualization/ModelTrend'
import DetailHeader from '../../Components/DetailHeader'
import DetialRepairRow from '../../Components/DetailRepairRow'
import {
    parsingToQty,
    parsingRootCause
} from '../../ParsingData/ParsingHelpFunction'
// import { navigate } from '@reach/router'
// import { Link } from '@reach/router'
import connect from './connect'

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

    > .select-input {
        margin-left: 20px;

        & select {
            width: 180px;
            height: 30px;
            padding: 4px 12px;
        }
    }
    margin-top: 20px;
`

const SectionTitle = styled.div`
    background: #666;
    padding: 6px 10px;
    color: #fff;
    width: 90%;
    margin: 0 auto;
`

const ChartContainerContent = styled.div`
    margin: 0 auto;
    padding: 0;
    width: 640px;
    height: 400px;
    margin-top: 20px;
`
const DataWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    margin-top: 20px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid transparent;
`

const PlatoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    text-align: center;

    margin-top: 10px;
`

const timeUnits = ['mo', 'weekly', 'monthly']
const timeUnitsWithoutMo = ['weekly', 'monthly']
const getNElement = (arr) => arr.length > 3 ? 3 : arr.length



function Detail(props) {
    const { modelName, stations } = props.location.state
    const [dModel, setModel] = useState({})
    const [dRepair, setRepair] = useState({})
    const [dStartDate, setStartDate] = useState('')
    const [dEndDate, setEndate] = useState('')
    const [dStations, setStations] = useState([])
    const [station, setStation] = useState(stations[0])
    const [chartData, setChartData] = useState({})
    const [timeUnit, setTimeUnit] = useState('weekly')
    const [timeUnitArray, setTimeUnitArray] = useState([])
    const [sortFailure, setSortFailure] = useState([])
    const [fourteenDaysFailure, setFourteenDaysFailure] = useState([])
    useEffect(() => {
        const { appState, repairData } = props
        const { startDate, endDate } = appState
        const modelObject = appState.models.filter(
            m => m.model === modelName
        )[0]
        const repairObject = repairData[modelName]
        setRepair(repairObject)
        setModel(modelObject)
        setStartDate(startDate)
        setEndate(endDate)
        setStations(stations)
        const sortFailureData = parsingToQty(repairObject, station, false,endDate)
        const fourteenDaysFailure = parsingToQty(repairObject, station, true,endDate)
        setSortFailure(sortFailureData)
        setFourteenDaysFailure(fourteenDaysFailure)
        let tArray = []
        switch (appState.vendor) {
            case 'USI':
            case 'USISZ':
            case 'OSE':
                tArray = timeUnits
                break
            default:
                tArray = timeUnitsWithoutMo
                break
        }
        setTimeUnitArray(tArray)

        const chartData = modelObject[station][timeUnit]
        setChartData(chartData)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dModel, dStartDate, dEndDate, dStations, station, timeUnit])

    const updateStation = str => {
        setStation(str)
    }

    const updateTimeUnit = str => {
        setTimeUnit(str)
    }


    // gotoDefectMapping = () => {
    //     const { modelName, startDate, endDate, errorAnalysis } = this.state
    //     navigate(`/defect-mapping`, {
    //         state: { modelName, startDate, endDate, errorAnalysis },
    //     })
    // }

    return dStartDate ? (
        <>
            <DetailHeader
                dStartDate={dStartDate}
                dEndDate={dEndDate}
                dModel={dModel}
                dStations={dStations}
            />
            <Container>
                <DataWrapper>
                    <ChartContainerTitle>
                        <h6 className="content-title">Product Trend Chart</h6>
                        <div className="select-input">
                            <label htmlFor="station">
                                <select
                                    id="station"
                                    value={station}
                                    onChange={e =>
                                        updateStation(e.target.value)
                                    }
                                    onBlur={e => updateStation(e.target.value)}
                                >
                                    {dStations
                                        ? dStations.map(station => (
                                              <option
                                                  value={station}
                                                  key={station}
                                              >
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
                                    onChange={e =>
                                        updateTimeUnit(e.target.value)
                                    }
                                    onBlur={e => updateTimeUnit(e.target.value)}
                                >
                                    {timeUnitArray.map(t => (
                                        <option value={t} key={t}>
                                            {t}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </ChartContainerTitle>

                    <ChartContainerContent>
                        <ModelTrend data={chartData} unit={timeUnit} />
                    </ChartContainerContent>
                    <SectionTitle>
                        <h6>Defect Symptom Analysis History:</h6>
                    </SectionTitle>

                    <DetialRepairRow
                        station={station}
                        dStartDate={dStartDate}
                        dEndDate={dEndDate}
                        sortFailure={sortFailure}
                        fourteenDaysFailure={fourteenDaysFailure}
                        description={'-LAST 14 DAYS DEFECT SYMPTOM'}
                    />

                    <SectionTitle>
                        <h6>TOP 3 ROOT CAUSES HISTORY:</h6>
                    </SectionTitle>
                    {
                        sortFailure.length &&  sortFailure.slice(0,getNElement(sortFailure)).map(
                            (s,i) => <DetialRepairRow 
                                      key={i}
                                      station={station}
                                      dStartDate={dStartDate}
                                      dEndDate={dEndDate}
                                      sortFailure={parsingRootCause(
                                        s.defectName,
                                        dRepair,
                                        station,
                                       false,
                                       dEndDate
                                    )}
                                      fourteenDaysFailure={parsingRootCause(
                                        s.defectName,
                                        dRepair,
                                        station,
                                        true,
                                        dEndDate
                                    )}
                                      description={'-LAST 14 Repair Record'}
                                      failureName={s.defectName}
                                      fourteenfailureName={(fourteenDaysFailure[i] && fourteenDaysFailure[i].defectName) || ""}
                            
                            />
                        )
                    }
                
                </DataWrapper>
            </Container>
        </>
    ) : null
}

export default connect(Detail)

