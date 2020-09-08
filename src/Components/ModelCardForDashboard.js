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
`

const ModelBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 6px;
`
export default function ModelCard({
    Model,
    SMT1,
    SMT2,
    DIP,
    FCT,
    OnCardClick,
}) {
    return (
        <ModelContainer
            onClick={() => {
                OnCardClick(Model)
            }}
        >
            <ModelBlock>{'X11QPH+'}</ModelBlock>
            <ModelBlock
            // style={{ color: FE.Yield < 97.5 ? '#d00213' : '#003aff' }}
            >
                <h6>{'98%'}</h6>
                <h6>{'144/211'}</h6>
            </ModelBlock>
            <ModelBlock
            //     style={{ color: BE.Yield < 92 ? '#d00213' : '#003aff' }}
            >
                <h6>{'98%'}</h6>
                <h6>{'144/211'}</h6>
            </ModelBlock>
            <ModelBlock
            //     style={{ color: BE.Yield < 92 ? '#d00213' : '#003aff' }}
            >
                <h6>{'98%'}</h6>
                <h6>{'144/211'}</h6>
            </ModelBlock>
            <ModelBlock
            //     style={{ color: BE.Yield < 92 ? '#d00213' : '#003aff' }}
            >
                <h6>{'98%'}</h6>
                <h6>{'144/211'}</h6>
            </ModelBlock>
        </ModelContainer>
    )
}
