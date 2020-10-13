import React from 'react'
import styled from 'styled-components'
import connect from './connect'
import {
    getCurrentMonth,
    getCurrentYear,
    outputDate,
    shrinkDateString,
    pickUpStationByCMVendor,
} from '../../ParsingData/ParsingHelpFunction'

const InfoContainer = styled.div`
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;

    & .dummy-line {
        width: 95%;
        margin: 0 auto;
        height: 2px;
        background-color: #ccc;
        margin-top: 5px;
    }
`
const BoxContainer = styled.div`
    padding: 5px;
    height: 150px;
    & .box-title-content {
        display: flex;
    }

    & .box-title-date {
        font-size: 12px;
        margin: 5px 10px;
    }

    & .small-tag {
        display: inline-block;
        background-color: #bada55;
        padding: 2px 6px;
        font-size: 12px;
        border-radius: 5px;
        color: #fff;
    }
`

const BoxTitle = styled.div`
    display: flex;
    justify-content: space-between;
    & h4 {
        color: #6fa4e3;
        font-weight: 700;
    }

    & h6 {
        padding-top: 6px;
    }
`

const BoxContent = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: 700;
    justify-content: center;
    align-content: center;
    color: #1d0332;
    & h2,
    & h6 {
        text-align: center;
    }

    & h6 {
        color: #50c683;
    }
`

function App({ appData }) {
    const { vendor, startDate, endDate, MBData } = appData
    const stations = pickUpStationByCMVendor(vendor)
    const monthlyMBData = MBData[stations[3]].monthly
    const latestMonthData = monthlyMBData[monthlyMBData.length - 1]
    const latestMonthFty = (
        (latestMonthData.Pass / latestMonthData.Total) *
        100
    ).toFixed(1)
    const fullYearPass = monthlyMBData.reduce((accu, ele) => accu + ele.Pass, 0)
    const fullYearTotal = monthlyMBData.reduce(
        (accu, ele) => accu + ele.Total,
        0
    )
    const fullYearFty = ((fullYearPass / fullYearTotal) * 100).toFixed(1)

    return (
        <div>
            <InfoContainer>
                <BoxContainer>
                    <BoxTitle>
                        <div className="box-title-content">
                            <h4>{vendor}</h4>
                            <p className="box-title-date">
                                {`${shrinkDateString(
                                    outputDate(startDate)
                                )}~${shrinkDateString(outputDate(endDate))}`}
                            </p>
                        </div>

                        <h6>{getCurrentMonth(new Date(endDate))}</h6>
                    </BoxTitle>
                    <div className="small-tag">MB</div>
                    <BoxContent>
                        <h2>{`${latestMonthFty}%`}</h2>
                        <h6>{`${latestMonthData.Pass}/${latestMonthData.Total}`}</h6>
                    </BoxContent>
                </BoxContainer>
                <div className="dummy-line"></div>
                <BoxContainer>
                    <BoxTitle>
                        <h6>{getCurrentYear()}</h6>
                    </BoxTitle>
                    <div className="small-tag">MB</div>
                    <BoxContent>
                        <h2>{`${fullYearFty}%`}</h2>
                        <h6>{`${fullYearPass}/${fullYearTotal}`}</h6>
                    </BoxContent>
                </BoxContainer>
            </InfoContainer>
        </div>
    )
}

export default connect(App)
