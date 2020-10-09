import styled from 'styled-components'
import React from 'react'
import { separateString } from '../ParsingData/ParsingHelpFunction'

const ModelContainer = styled.div`
    width: 100%;
    height: 82px;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    grid-gap: 12px;
    margin: 3px;
    border: 1px solid rgba(0, 0, 0, 0.0975);
    border-radius: 5px;
`

const ModelBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
`

export default function ModelCard({ model, onCardClick }) {
    return (
        <ModelContainer
            onClick={() => {
                onCardClick(model)
            }}
        >
            <ModelBlock FTY={100}>
                <div>{`${separateString(model)[0]}`}</div>
                <div>{`(${separateString(model)[1]}`}</div>
            </ModelBlock>
            <ModelBlock
                style={{ color: FE.Yield < 97.5 ? '#d00213' : '#003aff' }}
            >{`${FE.Yield || 'NA'} ${FE.Yield ? '%' : ''} (${FE.Pass}/ ${
                FE.Pass + FE.Fail
            }) `}</ModelBlock>
            <ModelBlock
                style={{ color: BE.Yield < 92 ? '#d00213' : '#003aff' }}
            >{`${BE.Yield || 'NA'} ${BE.Yield ? '%' : ''}  (${BE.Pass}/ ${
                BE.Pass + BE.Fail
            })`}</ModelBlock>
            <ModelBlock style={{ color: FTY < 90 ? '#d00213' : '#003aff' }}>{`${
                FTY || 'NA'
            } ${FTY ? '%' : ''}`}</ModelBlock>
        </ModelContainer>
    )
}
