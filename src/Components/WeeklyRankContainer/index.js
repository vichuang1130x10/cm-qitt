import React from 'react'
import styled from 'styled-components'
import connect from './connect'
import {
    getSevenDayBoundary,
    outputDate,
    shrinkDateString,
} from '../../ParsingData/ParsingHelpFunction'
import ModelCardForWeek from '../ModelCardForWeek'

function sortSevenDayFty(a, b) {
    if (a.sevenDayFty > b.sevenDayFty) {
        return 1
    } else {
        return -1
    }
}

const CardContainer = styled.div`
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    overflow: auto;
`

const StickHead = styled.div`
    position: sticky;
    top: 0;
    right: 0;
    left: 0;
    z-index: 102;
    background-color: #fff;
    > h4 {
        margin-top: 10px;
        color: #9b3d12;
        font-size: 16px;
        font-weight: 400;

        > span {
            font-size: 12px;
            color: #1d0332;
            text-decoration: underline;
        }
    }

    > p {
        font-size: 11px;
        margin-top: 0;
        font-style: italic;
    }
`

const Header = styled.div`
    width: 100%;
    height: 30px;
    display: grid;
    grid-template-columns: 18% 40% 36%;
    grid-gap: 10px;
    margin: 10px auto;
    padding: 0;
    border-bottom: 1px solid #eee;
`

const HeaderBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;

    & p {
        color: #1d0332;
        font-weight: 400;
        font-size: 12px;
        font-style: italic;
    }
`

const ModelWrapper = styled.div``

function App({ appData }) {
    const { endDate, models } = appData
    const dateRange = getSevenDayBoundary(endDate)
    const filterSevenDayTrackingModel = models
        .filter((model) => model.sevenDayTotal > 50)
        .sort(sortSevenDayFty)

    console.log(filterSevenDayTrackingModel)

    // sevenDayFty: 83.33
    // sevenDayPass: 20
    // sevenDayTotal: 24
    return (
        <CardContainer>
            <StickHead>
                <h4>
                    Last 7 Day Product Lower FTY Rank:
                    <span>{`(${shrinkDateString(
                        outputDate(dateRange)
                    )}~${shrinkDateString(outputDate(endDate))})`}</span>
                </h4>
                <p>sorted in ascending order</p>
                <Header>
                    <HeaderBlock>
                        <p>RANK</p>
                    </HeaderBlock>
                    <HeaderBlock>
                        <p>MODEL</p>
                    </HeaderBlock>
                    <HeaderBlock>
                        <p>FTY RESULT</p>
                    </HeaderBlock>
                </Header>
            </StickHead>
            <ModelWrapper>
                {filterSevenDayTrackingModel.map((m, i) => (
                    <ModelCardForWeek
                        key={m.model}
                        index={i}
                        modelName={m.model}
                        fty={m.sevenDayFty}
                        pass={m.sevenDayPass}
                        total={m.sevenDayTotal}
                    />
                ))}
            </ModelWrapper>
        </CardContainer>
    )
}

export default connect(App)
