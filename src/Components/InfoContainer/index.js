import React from 'react'
import styled from 'styled-components'
import connect from './connect'
import {
    getCurrentMonth,
    getCurrentYear,
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
        font-size: 8px;
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

function App(props) {
    return (
        <div>
            <InfoContainer>
                <BoxContainer>
                    <BoxTitle>
                        <div className="box-title-content">
                            <h4>{props.appData.vendor}</h4>
                            <p className="box-title-date">1/1~9/7</p>
                        </div>

                        <h6>{getCurrentMonth()}</h6>
                    </BoxTitle>
                    <div className="small-tag">MB</div>
                    <BoxContent>
                        <h2>98.2%</h2>
                        <h6>290/399</h6>
                    </BoxContent>
                </BoxContainer>
                <div className="dummy-line"></div>
                <BoxContainer>
                    <BoxTitle>
                        <h6>{getCurrentYear()}</h6>
                    </BoxTitle>
                    <div className="small-tag">MB</div>
                    <BoxContent>
                        <h2>98.2%</h2>
                        <h6>29000/39900</h6>
                    </BoxContent>
                </BoxContainer>
            </InfoContainer>
        </div>
    )
}

export default connect(App)
