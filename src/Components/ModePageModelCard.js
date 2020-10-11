import React from 'react'
import styled from 'styled-components'

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
    }
`
const StationInfo = styled.div`
    width: 100%;
    height: 20px;
    display: grid;
    grid-template-columns: 23% 23% 23% 23%;

    margin: 6px auto;
    padding: 0;
    > p {
        font-size: 9px;
    }
`
// station0FTY: 99.4
// station1FTY: 99
// station2FTY: 99.9
// station3FTY: 97.7

const App = ({ model, stations }) => {
    return (
        <Card>
            <h5>{model.model}+</h5>
            <div className="dummy"></div>
            <StationInfo>
                <p>{stations[0]}</p>
                <p>{stations[1]}</p>
                <p>{stations[2]}</p>
                <p>{stations[3]}</p>
            </StationInfo>
            <StationInfo>
                <p>{model.station0FTY}%</p>
                <p>{model.station1FTY}%</p>
                <p>{model.station2FTY}%</p>
                <p>{model.station3FTY}%</p>
            </StationInfo>
        </Card>
    )
}

export default App
