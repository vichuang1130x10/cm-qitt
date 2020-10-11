import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { navigate } from '@reach/router'
import { FaHourglass } from 'react-icons/fa'
/* From Helper & Components */
import { parsingErrorList } from '../../ParsingData/ParsingCMData'
import { mappingErrorListAndRepairList } from '../../ParsingData/MappingErrorListAndRepairList'
import Footer from '../../Components/Footer'
import SubmitButton from '../../Components/SubmitButton'
import DragCard from '../../Components/DragCard'
import connect from './connect'

function App(props) {
    const [yieldRate, setYieldRate] = useState({})
    const [errorList, setErrorList] = useState({})
    const [repairList, setRepairList] = useState({})
    const [yieldRateFlag, setYieldRateFlag] = useState(false)
    const [errorListFlag, setErrorListFlag] = useState(false)
    const [repairListFlag, setRepairListFlag] = useState(false)

    const receivedYieldRate = (obj) => {
        setYieldRate(obj)
    }

    const receivedErrorList = (obj) => {
        setErrorList(obj)
    }

    const receivedRepairList = (obj) => setRepairList(obj)

    const transferData = (e) => {
        let parsedErrorList = null
        if (
            repairList.RepairList[0].Vendor === 'USI' ||
            repairList.RepairList[0].Vendor === 'USISZ'
        ) {
            mappingErrorListAndRepairList(errorList, repairList)
            const udpatedErrorList = errorList.ErrorList.map((ele) => {
                if (ele['Reason'] === null || ele['Reason'] === undefined) {
                    ele['Reason'] = '待修'
                }
                return ele
            })
            parsedErrorList = parsingErrorList(udpatedErrorList)
        } else {
            parsedErrorList = parsingErrorList(repairList.RepairList)
        }

        // mappingErrorListAndRepairList(errorList, repairList)
        // const udpatedErrorList = errorList.ErrorList.map((ele) => {
        //     if (ele['Reason'] === null || ele['Reason'] === undefined) {
        //         ele['Reason'] = '待修'
        //     }
        //     return ele
        // })
        // console.log('repair list', repairList.RepairList)
        // console.log('updateErrorList', udpatedErrorList)
        // const parsedErrorList = parsingErrorList(udpatedErrorList)
        // let parsedErrorList
        // if (
        //     repairList.RepairList[0].Vendor === 'USI' ||
        //     repairList.RepairList[0].Vendor === 'USISZ'
        // ) {
        //     parsedErrorList = parsingErrorList(udpatedErrorList)
        // } else {
        //     parsedErrorList = repairList
        // }
        props.saveAppState({ yieldRate, parsedErrorList })
        props.resetPrimaryModel()

        // const parsedErrorList = parsingErrorList(udpatedErrorList);
        navigate(`/selectPrimary`)
    }

    return (
        <div>
            <Container>
                <h6 className="text-center main-section">
                    <p className="p-4 font-weight-bold">
                        Pick The Files For Generating The Quality Data
                    </p>
                </h6>
                <Row>
                    <Col>
                        <DragCard
                            title="Yield Rate"
                            fileType="YieldRate"
                            callback={(obj) => receivedYieldRate(obj)}
                            setFlag={(bool) => setYieldRateFlag(bool)}
                        />
                    </Col>
                    <Col>
                        <DragCard
                            title="Error List"
                            fileType="ErrorList"
                            callback={(obj) => receivedErrorList(obj)}
                            setFlag={(bool) => setErrorListFlag(bool)}
                        />
                    </Col>
                    <Col>
                        <DragCard
                            title="Repair List"
                            fileType="RepairList"
                            callback={(obj) => receivedRepairList(obj)}
                            setFlag={(bool) => setRepairListFlag(bool)}
                        />
                    </Col>
                </Row>
                <div style={{ height: '50px' }} />
                <Row className="d-flex justify-content-center">
                    <SubmitButton
                        disabled={
                            !yieldRateFlag || !errorListFlag || !repairListFlag
                        }
                        style={{ width: '50%' }}
                        onClick={transferData}
                    >
                        <span className="m-1">
                            <FaHourglass color="white" />
                        </span>{' '}
                        Generate Report
                    </SubmitButton>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default connect(App)
