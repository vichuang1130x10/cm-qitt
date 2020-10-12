import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'react-bootstrap'
import ModelTrend from '../../Visualization/ModelTrend'

import DefectTable from '../../Components/DefectTable'
import {
    getSevenDayBoundary,
    outputDate,
} from '../../ParsingData/ParsingHelpFunction'
// import Plato from '../Visualizations/Plato'
// import Button from '../Component/Button'
import { navigate } from '@reach/router'
import { Link } from '@reach/router'
import { Table } from 'react-bootstrap'
import connect from './connect'

const Nav = styled.div`
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`

const NavHeader = styled.div`
    max-width: 1200px;
    padding: 20px 20px 5px 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
`

const NavTitle = styled.div`
    margin: 20px 0 10px 0;
    padding: 0 64px;
    font-family: 'Oswald', sans-serif;
`

const DataRange = styled.div`
    padding: 20px 64px;
`

const ModelName = styled.div`
    padding: 0 64px;
`

const TableContainer = styled.div`
    padding: 12px 64px;
`

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

const timeUnits = ['mo','weekly', 'monthly']
const timeUnitsWithoutMo = ['weekly', 'monthly']

const timeUnitMapping = (str) =>{
    switch (str){
        case 'MO':
            return 'mo'
        case 'Week':
            return 'weekly'
        case 'Month':
            return 'monthly'
        default:
            return ""            

    }
}

function Detail(props) {
    const { modelName, stations } = props.location.state
    const [dModel, setModel] = useState({})
    const [dStartDate, setStartDate] = useState('')
    const [dEndDate, setEndate] = useState('')
    const [dStations, setStations] = useState([])
    const [station,setStation] = useState(stations[0])
    const [chartData, setChartData] = useState({})
    const [timeUnit, setTimeUnit] = useState('weekly')
    const [timeUnitArray,setTimeUnitArray] = useState([])
    useEffect(() => {
       
        const { appState, repairData } = props
        const { startDate, endDate } = appState
        const modelObject = appState.models.filter(
            (m) => m.model === modelName
        )[0]
        console.log(modelObject)

        setModel(modelObject)
        setStartDate(startDate)
        setEndate(endDate)
        setStations(stations)
    
       
        let tArray = []
        switch(appState.vendor){
            case 'USI':
            case 'USISZ':
            case 'OSE':
                tArray = timeUnits
                break;
            default:
                tArray = timeUnitsWithoutMo
                break;        
        }
        setTimeUnitArray(tArray)
        console.log('station',station)
        console.log('timeUnit',timeUnit)
        console.log('modelObject',modelObject)
        const chartData = modelObject[station][timeUnit]
        console.log('chartData',chartData)
        setChartData(chartData)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dModel, dStartDate, dEndDate, dStations,station,timeUnit])

    const updateStation = (str) => {
        setStation(str)
    }

    const updateTimeUnit = (str) => {
        setTimeUnit(str)
    }

    // udpateStation = (str) => {
    //     this.setState({
    //         station: str,
    //         trendData: this.state.modelDetail[str].mo,
    //         sortFailure: this.parsingToQty(this.state.errorAnalysis, str),
    //         sevenDaysFailure: this.parsingToSevenDayQty(
    //             this.state.errorAnalysis,
    //             str
    //         ),
    //     })
    // }

    // parsingToSevenDayQty = (e, str) => {
    //     console.log('parsing')
    //     console.log(e)
    //     if (e === undefined || e === null) {
    //         return []
    //     }
    //     const allDefects = {}
    //     // const { station } = this.state;

    //     const inTheSevenDaysData = e[str].ErorrDescriptions.filter(
    //         (obj) =>
    //             new Date(obj.date) > getSevenDayBoundary(this.state.endDate)
    //     )

    //     inTheSevenDaysData.forEach((defect) => {
    //         if (
    //             allDefects[defect.description] === null ||
    //             allDefects[defect.description] === undefined
    //         ) {
    //             allDefects[defect.description] = 1
    //         } else {
    //             allDefects[defect.description] += 1
    //         }
    //     })

    //     console.log('all defects', allDefects)

    //     let sortable = []
    //     for (let defect in allDefects) {
    //         sortable.push([defect, allDefects[defect]])
    //     }

    //     sortable.sort(function (a, b) {
    //         return b[1] - a[1]
    //     })
    //     const totalDefects = sortable.reduce((acc, elem) => acc + elem[1], 0)
    //     const result = []
    //     let accumulate = 0
    //     sortable.forEach((d) => {
    //         const indiv = parseInt((d[1] / totalDefects) * 100)
    //         accumulate += d[1]
    //         result.push({
    //             defectName: d[0],
    //             qty: d[1],
    //             indiv: indiv,
    //             accu: parseInt((accumulate / totalDefects) * 100),
    //         })
    //     })
    //     // const arr = this.state.errorAnalysis[this.state.station].ErorrDescriptions;
    //     // console.log(arr);

    //     return result
    // }

    // parsingToQty = (e, str) => {
    //     console.log('parsing')
    //     console.log(e)
    //     if (e === undefined || e === null) {
    //         return []
    //     }
    //     const allDefects = {}
    //     // const { station } = this.state;
    //     e[str].ErorrDescriptions.forEach((defect) => {
    //         if (
    //             allDefects[defect.description] === null ||
    //             allDefects[defect.description] === undefined
    //         ) {
    //             allDefects[defect.description] = 1
    //         } else {
    //             allDefects[defect.description] += 1
    //         }
    //     })

    //     console.log('all defects', allDefects)

    //     let sortable = []
    //     for (let defect in allDefects) {
    //         sortable.push([defect, allDefects[defect]])
    //     }

    //     sortable.sort(function (a, b) {
    //         return b[1] - a[1]
    //     })
    //     const totalDefects = sortable.reduce((acc, elem) => acc + elem[1], 0)
    //     const result = []
    //     let accumulate = 0
    //     sortable.forEach((d) => {
    //         const indiv = parseInt((d[1] / totalDefects) * 100)
    //         accumulate += d[1]
    //         result.push({
    //             defectName: d[0],
    //             qty: d[1],
    //             indiv: indiv,
    //             accu: parseInt((accumulate / totalDefects) * 100),
    //         })
    //     })
    //     // const arr = this.state.errorAnalysis[this.state.station].ErorrDescriptions;
    //     // console.log(arr);

    //     return result
    // }

    // parsingRootCause = (failureName, e, str) => {
    //     const result = []
    //     const rootCause = {}
    //     const failures = e[str].ErorrDescriptions

    //     const f = failures.filter(
    //         (failure) => failure.description === failureName
    //     )
    //     f.forEach((reason) => {
    //         result.push(`${reason.reasons[0].reason}/${reason.reasons[0].item}`)
    //     })

    //     console.log(result)

    //     result.forEach((item) => {
    //         if (rootCause[item] === null || rootCause[item] === undefined) {
    //             rootCause[item] = 1
    //         } else {
    //             rootCause[item] += 1
    //         }
    //     })

    //     let sortable = []
    //     for (let defect in rootCause) {
    //         sortable.push([defect, rootCause[defect]])
    //     }

    //     sortable.sort(function (a, b) {
    //         return b[1] - a[1]
    //     })

    //     const totalDefects = sortable.reduce((acc, elem) => acc + elem[1], 0)
    //     const rootCauseResult = []
    //     let accumulate = 0
    //     sortable.forEach((d) => {
    //         const indiv = parseInt((d[1] / totalDefects) * 100)
    //         accumulate += d[1]
    //         rootCauseResult.push({
    //             defectName: d[0],
    //             qty: d[1],
    //             indiv: indiv,
    //             accu: parseInt((accumulate / totalDefects) * 100),
    //         })
    //     })
    //     return rootCauseResult
    // }

    // parsingSevenDayRootCause = (failureName, e, str) => {
    //     const result = []
    //     const rootCause = {}
    //     const failures = e[str].ErorrDescriptions.filter(
    //         (obj) =>
    //             new Date(obj.date) > getSevenDayBoundary(this.state.endDate)
    //     )

    //     const f = failures.filter(
    //         (failure) => failure.description === failureName
    //     )
    //     f.forEach((reason) => {
    //         result.push(`${reason.reasons[0].reason}/${reason.reasons[0].item}`)
    //     })

    //     console.log(result)

    //     result.forEach((item) => {
    //         if (rootCause[item] === null || rootCause[item] === undefined) {
    //             rootCause[item] = 1
    //         } else {
    //             rootCause[item] += 1
    //         }
    //     })

    //     let sortable = []
    //     for (let defect in rootCause) {
    //         sortable.push([defect, rootCause[defect]])
    //     }

    //     sortable.sort(function (a, b) {
    //         return b[1] - a[1]
    //     })

    //     const totalDefects = sortable.reduce((acc, elem) => acc + elem[1], 0)
    //     const rootCauseResult = []
    //     let accumulate = 0
    //     sortable.forEach((d) => {
    //         const indiv = parseInt((d[1] / totalDefects) * 100)
    //         accumulate += d[1]
    //         rootCauseResult.push({
    //             defectName: d[0],
    //             qty: d[1],
    //             indiv: indiv,
    //             accu: parseInt((accumulate / totalDefects) * 100),
    //         })
    //     })
    //     return rootCauseResult
    // }

    // gotoDefectMapping = () => {
    //     const { modelName, startDate, endDate, errorAnalysis } = this.state
    //     navigate(`/defect-mapping`, {
    //         state: { modelName, startDate, endDate, errorAnalysis },
    //     })
    // }

    return dStartDate ? (
        <>
            <Nav>
                <NavHeader>
                    <NavTitle>
                        <h3>PRODUCT DETAIL</h3>
                    </NavTitle>
                    <DataRange>
                        <h6>
                            Date Range :
                            {`${outputDate(dStartDate)} ~ ${outputDate(
                                dEndDate
                            )}`}
                        </h6>
                    </DataRange>
                    <ModelName>
                        <h4>Model: {dModel.model}</h4>
                    </ModelName>

                    <TableContainer>
                        <Table
                            striped
                            bordered
                            hover
                            size="sm"
                            style={{ fontSize: '16px' }}
                        >
                            <thead>
                                <tr>
                                    <th>Station</th>
                                    <th>{dStations[0]}</th>
                                    <th>{dStations[1]}</th>
                                    <th>{dStations[2]}</th>
                                    <th>{dStations[3]}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>YIELD</th>
                                    <td>{dModel.station0FTY}%</td>
                                    <td>{dModel.station1FTY}%</td>
                                    <td>{dModel.station2FTY}%</td>
                                    <td>{dModel.station3FTY}%</td>
                                </tr>
                                <tr>
                                    <th>INPUT</th>
                                    <td>{dModel[dStations[0]].Total}</td>
                                    <td>{dModel[dStations[1]].Total}</td>
                                    <td>{dModel[dStations[2]].Total}</td>
                                    <td>{dModel[dStations[3]].Total}</td>
                                </tr>
                                <tr>
                                    <th>PASS</th>
                                    <td>{dModel[dStations[0]].Pass}</td>
                                    <td>{dModel[dStations[1]].Pass}</td>
                                    <td>{dModel[dStations[2]].Pass}</td>
                                    <td>{dModel[dStations[3]].Pass}</td>
                                </tr>
                                <tr>
                                    <th>FAIL</th>
                                    <td>{dModel[dStations[0]].Fail}</td>
                                    <td>{dModel[dStations[1]].Fail}</td>
                                    <td>{dModel[dStations[2]].Fail}</td>
                                    <td>{dModel[dStations[3]].Fail}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </TableContainer>
                </NavHeader>
            </Nav>
            <Container>
               <Row>
               <ChartContainerTitle>
                <h6 className="content-title">
                  Product Trend Chart
                </h6>
                <div>
                 
                    <label htmlFor="station">
                        <select
                            id="station"
                            value={station}
                            onChange={(e) => updateStation(e.target.value)}
                            onBlur={(e) => updateStation(e.target.value)}
                        >
                            {dStations
                                ? dStations.map((station) => (
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
                            {timeUnitArray.map((t) => (
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
               </Row>
                    {/* <Row style={{ margin: '20px' }}>
                        <Button onClick={() => this.gotoDefectMapping()}>
                            Defect Mapping Page
                        </Button>
                    </Row>
                    <br />
                    <h4 className="section-style">Defect Symptom Analysis:</h4>
                    <Row>
                        <Col>
                            <h5 className="subtitle-text">{`${startDate}~${endDate}`}</h5>
                            <Plato data={sortFailure} />
                        </Col>
                        <Col>
                            <h5 className="subtitle-text">
                                LAST 14 DAYS DEFECT SYMPTOM
                            </h5>
                            <Plato data={sevenDaysFailure} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div style={{ width: '100%' }}>
                                <DefectTable sortFailure={sortFailure} />
                            </div>
                        </Col>
                        <Col>
                            <div style={{ width: '100%' }}>
                                <DefectTable sortFailure={sevenDaysFailure} />
                            </div>
                        </Col>
                    </Row>

                    <h4 className="section-style">TOP 3 Root Cause:</h4>

                    <Row>
                        <Col>
                            <h5 className="subtitle-text">{`${startDate}~${endDate}`}</h5>
                            {sortFailure.length ? (
                                <div>
                                    <h6>{sortFailure[0].defectName}</h6>
                                    <Plato
                                        data={this.parsingRootCause(
                                            sortFailure[0].defectName,
                                            errorAnalysis,
                                            station
                                        )}
                                    />
                                </div>
                            ) : null}
                        </Col>
                        <Col>
                            <h5 className="subtitle-text">
                                LAST 14 DAYS REPAIR RECORD
                            </h5>
                            {sevenDaysFailure.length ? (
                                <div>
                                    <h6>{sevenDaysFailure[0].defectName}</h6>
                                    <Plato
                                        data={this.parsingSevenDayRootCause(
                                            sevenDaysFailure[0].defectName,
                                            errorAnalysis,
                                            station
                                        )}
                                    />
                                </div>
                            ) : null}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            {sortFailure.length ? (
                                <div>
                                    <h6>{sortFailure[0].defectName}</h6>
                                    <DefectTable
                                        sortFailure={this.parsingRootCause(
                                            sortFailure[0].defectName,
                                            errorAnalysis,
                                            station
                                        )}
                                    />
                                </div>
                            ) : null}
                        </Col>
                        <Col>
                            {sevenDaysFailure.length ? (
                                <div>
                                    <h6>{sevenDaysFailure[0].defectName}</h6>
                                    <DefectTable
                                        sortFailure={this.parsingSevenDayRootCause(
                                            sevenDaysFailure[0].defectName,
                                            errorAnalysis,
                                            station
                                        )}
                                    />
                                </div>
                            ) : null}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            {sortFailure[1] ? (
                                <div>
                                    <h6>{sortFailure[1].defectName}</h6>
                                    <Plato
                                        data={this.parsingRootCause(
                                            sortFailure[1].defectName,
                                            errorAnalysis,
                                            station
                                        )}
                                    />
                                </div>
                            ) : null}
                        </Col>
                        <Col>
                            {sevenDaysFailure[1] ? (
                                <div>
                                    <h6>{sevenDaysFailure[1].defectName}</h6>
                                    <Plato
                                        data={this.parsingSevenDayRootCause(
                                            sevenDaysFailure[1].defectName,
                                            errorAnalysis,
                                            station
                                        )}
                                    />
                                </div>
                            ) : null}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            {sortFailure[1] ? (
                                <div>
                                    <h6>{sortFailure[1].defectName}</h6>
                                    <DefectTable
                                        sortFailure={this.parsingRootCause(
                                            sortFailure[1].defectName,
                                            errorAnalysis,
                                            station
                                        )}
                                    />
                                </div>
                            ) : null}
                        </Col>
                        <Col>
                            {sevenDaysFailure[1] ? (
                                <div>
                                    <h6>{sevenDaysFailure[1].defectName}</h6>
                                    <DefectTable
                                        sortFailure={this.parsingSevenDayRootCause(
                                            sevenDaysFailure[1].defectName,
                                            errorAnalysis,
                                            station
                                        )}
                                    />
                                </div>
                            ) : null}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            {sortFailure[2] ? (
                                <div>
                                    <h6>{sortFailure[2].defectName}</h6>
                                    <Plato
                                        data={this.parsingRootCause(
                                            sortFailure[2].defectName,
                                            errorAnalysis,
                                            station
                                        )}
                                    />
                                </div>
                            ) : null}
                        </Col>
                        <Col>
                            {sevenDaysFailure[2] ? (
                                <div>
                                    <h6>{sevenDaysFailure[2].defectName}</h6>
                                    <Plato
                                        data={this.parsingSevenDayRootCause(
                                            sevenDaysFailure[2].defectName,
                                            errorAnalysis,
                                            station
                                        )}
                                    />
                                </div>
                            ) : null}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            {sortFailure[2] ? (
                                <div>
                                    <h6>{sortFailure[2].defectName}</h6>
                                    <DefectTable
                                        sortFailure={this.parsingRootCause(
                                            sortFailure[2].defectName,
                                            errorAnalysis,
                                            station
                                        )}
                                    />
                                </div>
                            ) : null}
                        </Col>
                        <Col>
                            {sevenDaysFailure[2] ? (
                                <div>
                                    <h6>{sevenDaysFailure[2].defectName}</h6>
                                    <DefectTable
                                        sortFailure={this.parsingSevenDayRootCause(
                                            sevenDaysFailure[2].defectName,
                                            errorAnalysis,
                                            station
                                        )}
                                    />
                                </div>
                            ) : null}
                        </Col>
                    </Row> */}

                
            </Container>
        </>
    ) : null
}

export default connect(Detail)
