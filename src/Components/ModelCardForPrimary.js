import React from 'react'
import styled from 'styled-components'

const ModelContainer = styled.div`
    width: 100%;
    height: 62px;
    display: grid;
    grid-template-columns: 20% 18% 18% 18% 18%;
    grid-gap: 10px;
    margin: 3px;
    border: 1px solid rgba(0, 0, 0, 0.0975);
    border-radius: 5px;
    transition: all 0.5s;

    &:hover {
        color: #fff;
        background-color: #123abc;
    }
`

const ModelBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 6px;
    font-size: 12px;
    font-weight: 400;
    font-style: italic;
    > h6 {
        color: ${(props) => (props.fty < 97.5 ? '#d00213' : '#6fa4e3')};
        font-size: 12px;
        font-weight: 400;
        font-style: italic;
    }

    > p {
        font-size: 10px;
        font-weight: 400;
        font-style: italic;
    }
`
export default function App({ m, stations }) {
    const { model, station0FTY, station1FTY, station2FTY, station3FTY } = m
    const station0Pass = m[stations[0]].Pass
    const station0Total = m[stations[0]].Total
    const station1Pass = m[stations[1]].Pass
    const station1Total = m[stations[1]].Total
    const station2Pass = m[stations[2]].Pass
    const station2Total = m[stations[2]].Total
    const station3Pass = m[stations[3]].Pass
    const station3Total = m[stations[3]].Total

    const handleOnClick = () => {}

    return (
        <ModelContainer onClick={() => handleOnClick()}>
            <ModelBlock>
                <p>{model}</p>
            </ModelBlock>
            <ModelBlock fty={station0FTY}>
                <h6>{`${station0FTY}%`}</h6>
                <h6>{`${station0Pass}/${station0Total}`}</h6>
            </ModelBlock>
            <ModelBlock fty={station1FTY}>
                <h6>{`${station1FTY}%`}</h6>
                <h6>{`${station1Pass}/${station1Total}`}</h6>
            </ModelBlock>
            <ModelBlock fty={station2FTY}>
                <h6>{`${station2FTY}%`}</h6>
                <h6>{`${station2Pass}/${station2Total}`}</h6>
            </ModelBlock>
            <ModelBlock fty={station3FTY}>
                <h6>{`${station3FTY}%`}</h6>
                <h6>{`${station3Pass}/${station3Total}`}</h6>
            </ModelBlock>
        </ModelContainer>
    )
}
