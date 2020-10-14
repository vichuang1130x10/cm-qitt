import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'react-bootstrap'
import ModelTrend from '../../Visualization/ModelTrend'
import DetailHeader from '../../Components/DetailHeader'
import DefectTable from '../../Components/DefectTable'
import {
    getSevenDayBoundary,
    outputDate,
} from '../../ParsingData/ParsingHelpFunction'

import { navigate } from '@reach/router'
import { Link } from '@reach/router'
import Plato from '../../Visualization/Plato'
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
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    width:100%;
    text-align:center;
  
    margin-top:10px;

`

const timeUnits = ['mo', 'weekly', 'monthly']
const timeUnitsWithoutMo = ['weekly', 'monthly']

function Detail(props) {
    const { modelName, stations } = props.location.state
    const [dModel, setModel] = useState({})
    const [dRepair,setRepair] = useState({})
    const [dStartDate, setStartDate] = useState('')
    const [dEndDate, setEndate] = useState('')
    const [dStations, setStations] = useState([])
    const [station, setStation] = useState(stations[0])
    const [chartData, setChartData] = useState({})
    const [timeUnit, setTimeUnit] = useState('weekly')
    const [timeUnitArray, setTimeUnitArray] = useState([])
    const [sortFailure,setSortFailure] = useState([])
    const [fourteenDaysFailure,setFourteenDaysFailure] = useState([])
    useEffect(() => {
        const { appState, repairData } = props
        const { startDate, endDate } = appState
        const modelObject = appState.models.filter(
            (m) => m.model === modelName
        )[0]
        const repairObject = repairData[modelName]
        setRepair(repairObject)
       
        setModel(modelObject)
        setStartDate(startDate)
        setEndate(endDate)
        setStations(stations)
        const sortFailureData = parsingToQty(repairObject,station)
        const fourteenDaysFailure = parsingToFourteenDayQty(repairObject,station)
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

    const parsingToFourteenDayQty = (e, str) => {
        
    
        if (e === undefined || e === null) {
            return []
        }
        const allDefects = {}
        // const { station } = this.state;

        const inTheSevenDaysData = e[str].ErorrDescriptions.filter(
            (obj) =>
                new Date(obj.date) > getSevenDayBoundary(dEndDate,14)
        )

        inTheSevenDaysData.forEach((defect) => {
            if (
                allDefects[defect.description] === null ||
                allDefects[defect.description] === undefined
            ) {
                allDefects[defect.description] = 1
            } else {
                allDefects[defect.description] += 1
            }
        })

        console.log('all defects', allDefects)

        let sortable = []
        for (let defect in allDefects) {
            sortable.push([defect, allDefects[defect]])
        }

        sortable.sort(function (a, b) {
            return b[1] - a[1]
        })
        const totalDefects = sortable.reduce((acc, elem) => acc + elem[1], 0)
        const result = []
        let accumulate = 0
        sortable.forEach((d) => {
            const indiv = parseInt((d[1] / totalDefects) * 100)
            accumulate += d[1]
            result.push({
                defectName: d[0],
                qty: d[1],
                indiv: indiv,
                accu: parseInt((accumulate / totalDefects) * 100),
            })
        })
        // const arr = this.state.errorAnalysis[this.state.station].ErorrDescriptions;
        // console.log(arr);

        return result
    }

    const parsingToQty = (e, str) => {
         
         if (e === undefined || e === null) {
             return []
         }
         const allDefects = {}
         
         e[str].ErorrDescriptions.forEach((defect) => {
             if (
                 allDefects[defect.description] === null ||
                 allDefects[defect.description] === undefined
             ) {
                 allDefects[defect.description] = 1
             } else {
                 allDefects[defect.description] += 1
             }
         })


         let sortable = []
         for (let defect in allDefects) {
             sortable.push([defect, allDefects[defect]])
         }

         sortable.sort(function (a, b) {
             return b[1] - a[1]
         })
         const totalDefects = sortable.reduce((acc, elem) => acc + elem[1], 0)
         const result = []
         let accumulate = 0
         sortable.forEach((d) => {
             const indiv = parseInt((d[1] / totalDefects) * 100)
             accumulate += d[1]
             result.push({
                 defectName: d[0],
                 qty: d[1],
                 indiv: indiv,
                 accu: parseInt((accumulate / totalDefects) * 100),
             })
         })

         return result
     }

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
                                    onChange={(e) =>
                                        updateStation(e.target.value)
                                    }
                                    onBlur={(e) =>
                                        updateStation(e.target.value)
                                    }
                                >
                                    {dStations
                                        ? dStations.map((station) => (
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
                                    onChange={(e) =>
                                        updateTimeUnit(e.target.value)
                                    }
                                    onBlur={(e) =>
                                        updateTimeUnit(e.target.value)
                                    }
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
                    <SectionTitle>
                        <h6>Defect Symptom Analysis:</h6>
                    </SectionTitle>

                    <Row style={{width:"100%"}}>
                        <Col>
                           <PlatoContainer>
                           <h5 className="subtitle-text">
                                {' '}
                                {`${station} station ${outputDate(dStartDate)} ~ ${outputDate(
                                    dEndDate
                                )}`}
                            </h5>
                             <Plato data={sortFailure} /> 
                            </PlatoContainer>
              
                        </Col>
                     
                        <Col>
                        <PlatoContainer>
                            <h5 className="subtitle-text">
                                {station}
                                -LAST 14 DAYS DEFECT SYMPTOM
                            </h5>
                             <Plato data={fourteenDaysFailure} /> 
                            </PlatoContainer>
                        </Col>
                        
                    </Row>
                </DataWrapper>
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
