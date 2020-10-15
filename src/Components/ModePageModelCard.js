import React from 'react'
import styled from 'styled-components'
import CardTrend from '../Visualization/CardTrend'
import { navigate } from '@reach/router'

const Card = styled.div`
    height: 180px;
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 10px;
    color: #1d0332;

    display: flex;
    flex-direction: column;
    flex: 0 0 30%;
    margin: 10px;
    transition: all 0.3s;
    > h5 {
        margin-left: 10px;
        color: #93c0a4;
        font-weight: 700;
        font-style: italic;
        font-size: 12px;
    }
    > .dummy {
        height: 1px;
        width: 90%;
        margin: 0 auto;
        background-color: #ccc;
        margin-bottom: 10px;
    }

    &:hover {
        color: #fff;
        background-color: #fee4c4;
    }
`
const StationInfo = styled.div`
    width: 100%;
    height: 20px;
    display: grid;
    grid-template-columns: 23% 23% 23% 23%;

    margin: 4px auto;
    padding: 0;
    > p {
        font-size: 9px;
    }
`

const CardTendContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    svg {
        border: 1px solid #ccc;
    }
`

const FTYNumber = styled.p`
    color: ${props => (props.fty < 98 ? '#d00213' : '#6fa4e3')};
`

const App = ({ model, stations }) => {
    const handleOnClick = () => {
        navigate(`/detail`, {
            state: { modelName: model.model, stations },
        })
    }
    return (
        <Card onClick={() => handleOnClick()}>
            <h5>{model.model}+</h5>
            <div className="dummy"></div>
            <StationInfo>
                <p>{stations[0]}</p>
                <p>{stations[1]}</p>
                <p>{stations[2]}</p>
                <p>{stations[3]}</p>
            </StationInfo>
            <StationInfo>
                <FTYNumber fty={model.station0FTY}>
                    {model.station0FTY || 'NA'}%
                </FTYNumber>
                <FTYNumber fty={model.station1FTY}>
                    {model.station1FTY || 'NA'}%
                </FTYNumber>
                <FTYNumber fty={model.station2FTY}>
                    {model.station2FTY || 'NA'}%
                </FTYNumber>
                <FTYNumber fty={model.station3FTY}>
                    {model.station3FTY || 'NA'}%
                </FTYNumber>
            </StationInfo>
            <CardTendContainer>
                <h6>FCT Trend</h6>
                <CardTrend data={model[stations[3]].weekly} />
            </CardTendContainer>
        </Card>
    )
}

export default App
