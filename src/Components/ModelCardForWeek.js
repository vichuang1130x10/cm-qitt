import React from 'react'
import styled from 'styled-components'
import {navigate} from '@reach/router'

const ModelContainer = styled.div`
    width: 100%;
    height: 36px;
    display: grid;
    grid-template-columns: 18% 40% 36%;
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
        font-size: 10px;
        font-weight: 400;
        font-style: italic;
    }
`
export default function App({ index, modelName, fty, pass, total,stations }) {
    const handleOnClick = () => {
        navigate(`/detail`, {
            state: { modelName, stations },
        })
    }

    return (
        <ModelContainer onClick={() => handleOnClick()}>
            <ModelBlock>{index + 1}</ModelBlock>
            <ModelBlock>
                <h6>{modelName}</h6>
            </ModelBlock>
            <ModelBlock>{`${fty} (${pass}/${total})`}</ModelBlock>
        </ModelContainer>
    )
}
