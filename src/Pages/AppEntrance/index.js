import React, { useState } from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import { navigate } from '@reach/router'
import axios from 'axios'
import RotateLoader from 'react-spinners/RotateLoader'
/* From Helper & Components */
import {
    parsingErrorList,
    parseForYieldRateFromDB,
} from '../../ParsingData/ParsingCMData'
import { mappingErrorListAndRepairListVersion2 } from '../../ParsingData/MappingErrorListAndRepairList'
import {
    VENDOR_NAME,
    outputDate,
    PRIMARY_MODEL,
} from '../../ParsingData/ParsingHelpFunction'
import Footer from '../../Components/Footer'
import connect from './connect'

import { SetFilters } from '../../Data/SetHeaderLink'
import { VisibilityFilters } from '../../Data/SetVisiblityFilter'
import { setPrimaryModels } from '../../Data/PrimaryState'

const MainSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 85vh;
`

const CountWrapper = styled.div`
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    color: #123abc;

    & button {
        cursor: pointer;
        padding: 4px 8px;
        width: 100%;
        background-color: #6fa4e3;
        color: white;
        border-radius: 5px;
        border: 1px solid transparent;
        transition: 0.3s all;
        outline: none;
        &:hover {
            background-color: white;
            color: #6fa4e3;
            border: 1px solid #ccc;
        }
    }
`

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Form = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;

    margin-top: 20px;

    & select {
        margin-left: 20px;
    }

    & button {
        padding: 4px 8px;
        width: 160px;
        background-color: #6fa4e3;
        color: white;
        border-radius: 5px;
        border: 1px solid transparent;
        outline: none;
        cursor: pointer;
        transition: 0.3s all;
        &:hover {
            background-color: white;
            color: #6fa4e3;
            border: 1px solid #ccc;
        }
    }
`

const SpinnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    > h3 {
        color: #123abc;
    }
`

const CardWrapper = styled.div`
    /* background-color: white;
    padding: 20px 40px;
    border-radius: 12px;
    width: 60%;
    margin: 0 auto;
    height: 400px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3); */
`

function App(props) {
    const [isLoading, setLoadingProgress] = useState(false)
    const [isFetchedData, setFetchedData] = useState(false)
    const [vendor, setVendor] = useState('')
    const [dataCount, setDataCount] = useState({
        yCount: 0,
        eCount: 0,
        rCount: 0,
        stardDate: '',
        endDate: '',
    })

    const fetchData = () => {
        if (!vendor.length) {
            return
        }
        setLoadingProgress(true)
        props.resetPrimaryModel()
        props.resetAppState()
        console.log('start loading', isLoading)
        axios
            .get(`http://10.163.56.143:5050/api/${vendor}`)
            .then((response) => response.data)
            .then((data) => parsingData(data))
            .catch((err) => {
                console.error(err)
                setLoadingProgress(false)
            })
    }

    const handleGoNextButton = () => {
        navigate(`/dashboard`)
    }

    const handleClicked = () => {
        console.log('fetch')
        fetchData()
    }

    const parsingData = (data) => {
        //   const errorList = parsingErrorList(data.errorList.recordset)
        //   const repairList = parsingRepairList(data.repairList.recordset)

        let parsedErrorList = null
        const rawErrorList = data.errorList.recordset
        const rawRepairList = data.repairList.recordset
        const rawYieldRate = data.yieldRate.recordset
        const yieldRate = parseForYieldRateFromDB(rawYieldRate)
        setDataCount({
            yCount: rawYieldRate.length,
            eCount: rawErrorList.length,
            rCount: rawRepairList.length,
            stardDate: outputDate(yieldRate.startDate),
            endDate: outputDate(yieldRate.endDate),
        })

        if (
            rawRepairList[0].Vendor === 'USI' ||
            rawRepairList[0].Vendor === 'USISZ'
        ) {
            mappingErrorListAndRepairListVersion2(rawErrorList, rawRepairList)
            const udpatedErrorList = rawErrorList.map((ele) => {
                if (ele['Reason'] === null || ele['Reason'] === undefined) {
                    ele['Reason'] = '待修'
                }
                return ele
            })
            parsedErrorList = parsingErrorList(udpatedErrorList)
        } else {
            parsedErrorList = parsingErrorList(rawErrorList)
        }

        switch (yieldRate.vendor) {
            case 'USI':
                props.setPrimaryModels(PRIMARY_MODEL.USI)
                break
            case 'OSE':
                props.setPrimaryModels(PRIMARY_MODEL.OSE)
                break
            case 'WIH':
                props.setPrimaryModels(PRIMARY_MODEL.WIH)
                break
            default:
                break
        }

        props.setHeaderLinkFilters(SetFilters.SELECT_DASHBOARD)
        props.setLinkFilters(VisibilityFilters.SHOW_SEVEM_DAYS)
        props.saveAppState({ yieldRate, parsedErrorList, rawRepairList })

        setFetchedData(true)
        setLoadingProgress(false)
        console.log('end loading', isLoading)

        // navigate(`/dashboard`)
    }

    return (
        <>
            <MainSection>
                <Container>
                    <CardWrapper>
                        <FormWrapper>
                            <h2>Select One CM </h2>
                            <h2>To Entry The QA-DASHBOARD</h2>
                            <Form>
                                <label htmlFor="vendor">
                                    CM:
                                    <select
                                        id="vendor"
                                        value={vendor}
                                        onChange={(e) => {
                                            setVendor(e.target.value)
                                            setFetchedData(false)
                                        }}
                                        onBlur={(e) => {
                                            setVendor(e.target.value)
                                            setFetchedData(false)
                                        }}
                                    >
                                        <option />

                                        {VENDOR_NAME.map((v) => (
                                            <option key={v} value={v}>
                                                {v}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <button onClick={() => handleClicked()}>
                                    Fetch Data
                                </button>
                            </Form>

                            {isFetchedData ? (
                                <CountWrapper>
                                    <h6>{`Date Range: ${dataCount.stardDate} ~ ${dataCount.endDate}`}</h6>
                                    <h6>{`Yield Rate Record: ${dataCount.yCount}`}</h6>
                                    <h6>{`Error List Record: ${dataCount.eCount}`}</h6>
                                    <h6>{`Repair List Record :${dataCount.rCount}`}</h6>
                                    <button
                                        onClick={() => handleGoNextButton()}
                                    >
                                        Go To DASHBOARD
                                    </button>
                                </CountWrapper>
                            ) : null}
                        </FormWrapper>

                        {isLoading ? (
                            <SpinnerWrapper>
                                <RotateLoader
                                    size={25}
                                    color={'#123abc'}
                                    loading={isLoading}
                                />
                                <h3 style={{ marginTop: '40px' }}>
                                    Loading...
                                </h3>
                            </SpinnerWrapper>
                        ) : null}
                    </CardWrapper>
                </Container>
            </MainSection>
            <Footer />
        </>
    )
}

export default connect(App)
