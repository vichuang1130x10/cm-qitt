import styled from 'styled-components'
import React from 'react'
import connect from './connect'
// import { separateString } from '../ParsingData/ParsingHelpFunction'

const ModelContainer = styled.div`

    width: 100%;
    height: 62px;
    display: grid;
    grid-template-columns: 20% 18% 18% 18% 18%;
    grid-gap: 10px;
    margin: 3px;
    border: 1px solid rgba(0, 0, 0, 0.0975);
    border-radius: 5px;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
    &:hover {
        background-color: #123abc;
        color: #fff;
    }
    &:active {
        background-color: #bada55;
    }

    background-color: ${(props) => (props.isSelected ? '#ccc' : '#fff')};
`

const ModelBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 6px;
    font-size: 12px;
`

function App({ modelObj, stations, primaryState, togglePrimaryModel }) {
    const {
        model,
        station0FTY,
        station1FTY,
        station2FTY,
        station3FTY,
    } = modelObj
    const station0 = modelObj[stations[0]]
    const station1 = modelObj[stations[1]]
    const station2 = modelObj[stations[2]]
    const station3 = modelObj[stations[3]]
    return (
        <ModelContainer
            isSelected={primaryState.includes(model)}
            onClick={() => {
                togglePrimaryModel(model)
            }}
        >
            <ModelBlock>
                {model}
                {/* <div>{`${separateString(model)[0]}`}</div>
                <div>{`(${separateString(model)[1]}`}</div> */}
            </ModelBlock>
            <ModelBlock
                style={{
                    color: station0FTY < 97.5 ? '#d00213' : '#003aff',
                }}
            >{`${station0FTY || 'NA'} ${station0FTY ? '%' : ''} (${
                station0.Pass
            }/ ${station0.Pass + station0.Fail}) `}</ModelBlock>
            <ModelBlock
                style={{
                    color: station0FTY < 97.5 ? '#d00213' : '#003aff',
                }}
            >{`${station1FTY || 'NA'} ${station1FTY ? '%' : ''} (${
                station1.Pass
            }/ ${station1.Pass + station1.Fail}) `}</ModelBlock>
            <ModelBlock
                style={{
                    color: station2FTY < 97.5 ? '#d00213' : '#003aff',
                }}
            >{`${station2FTY || 'NA'} ${station2FTY ? '%' : ''} (${
                station2.Pass
            }/ ${station2.Pass + station2.Fail}) `}</ModelBlock>
            <ModelBlock
                style={{
                    color: station3FTY < 97.5 ? '#d00213' : '#003aff',
                }}
            >{`${station3FTY || 'NA'} ${station3FTY ? '%' : ''} (${
                station3.Pass
            }/ ${station3.Pass + station3.Fail}) `}</ModelBlock>
        </ModelContainer>
    )
}

export default connect(App)
