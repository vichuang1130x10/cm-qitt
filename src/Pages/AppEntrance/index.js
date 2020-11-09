import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { navigate } from '@reach/router'
import axios from 'axios'
/* From Helper & Components */
import { parsingErrorList } from '../../ParsingData/ParsingCMData'
import { mappingErrorListAndRepairList } from '../../ParsingData/MappingErrorListAndRepairList'
import Footer from '../../Components/Footer'
import connect from './connect'
import { SetFilters } from '../../Data/SetHeaderLink'
import { VisibilityFilters } from '../../Data/SetVisiblityFilter'

function App(props) {
    useEffect(() => {
        axios
            .get('http://10.163.56.143:5050/api/OSE')
            .then((response) => console.log(response))
            .catch((err) => console.error(err))
    })

    // const transferData = (e) => {
    //     let parsedErrorList = null
    //     const rawRepairList = repairList.RepairList
    //     if (
    //         repairList.RepairList[0].Vendor === 'USI' ||
    //         repairList.RepairList[0].Vendor === 'USISZ'
    //     ) {
    //         mappingErrorListAndRepairList(errorList, repairList)
    //         const udpatedErrorList = errorList.ErrorList.map((ele) => {
    //             if (ele['Reason'] === null || ele['Reason'] === undefined) {
    //                 ele['Reason'] = '待修'
    //             }
    //             return ele
    //         })
    //         parsedErrorList = parsingErrorList(udpatedErrorList)
    //     } else {
    //         parsedErrorList = parsingErrorList(repairList.RepairList)
    //     }

    //     props.setHeaderLinkFilters(SetFilters.SELECT_DASHBOARD)
    //     props.setLinkFilters(VisibilityFilters.SHOW_SEVEM_DAYS)
    //     props.saveAppState({ yieldRate, parsedErrorList, rawRepairList })
    //     props.resetPrimaryModel()

    //     navigate(`/selectPrimary`)
    // }

    return (
        <div>
            <Container>
                <h6 style={{ marginTop: '60px' }}>App Entrance</h6>
            </Container>
            <Footer />
        </div>
    )
}

export default connect(App)
