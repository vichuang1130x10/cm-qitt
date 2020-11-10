import React from 'react'
import styled from 'styled-components'
import { navigate } from '@reach/router'
import connect from './connect'
import ModelCardForPrimary from '../ModelCardForPrimary'
import { pickUpStationByCMVendor } from '../../ParsingData/ParsingHelpFunction'

const CardContainer = styled.div`
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    overflow: auto;
    position: relative;
    > h4 {
        text-decoration: underline;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 16px;
        padding: 10px;
    }
`

const StickHead = styled.div`
    position: sticky;
    top: 0;
    right: 0;
    left: 0;
    z-index: 102;
    background-color: #fff;
    > h4 {
        color: #1d0332;
    }
`

const Header = styled.div`
    width: 100%;
    height: 30px;
    display: grid;
    grid-template-columns: 20% 18% 18% 18% 18%;
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
        font-size: 10px;
        font-style: italic;
    }
`

const ModelWrapper = styled.div``

const HeadTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px;
    & > button {
        padding: 4px 8px;
        margin-bottom: 14px;
        outline: none;
        background-color: #6fa4e3;
        color: white;
        border: 1px solid white;
        border-radius: 5px;
        transition: 0.3s all;
        &:hover {
            background-color: white;
            color: #6fa4e3;
            border: 1px solid #333;
        }
    }
`

function App({ appData, primaryState }) {
    const { vendor, models } = appData
    const stations = pickUpStationByCMVendor(vendor)
    const selectedModels = models.filter((model) =>
        primaryState.includes(model.model)
    )

    const handleOnclick = () => {
        navigate(`/selectPrimary`)
    }

    return (
        <CardContainer>
            <StickHead>
                <HeadTitleWrapper>
                    <h4>Primary Model:</h4>
                    <button onClick={() => handleOnclick()}>
                        Customize Primary Model
                    </button>
                </HeadTitleWrapper>

                <Header>
                    <HeaderBlock>
                        <p>Model</p>
                    </HeaderBlock>
                    <HeaderBlock>
                        <p>{stations[0]}</p>
                    </HeaderBlock>
                    <HeaderBlock>
                        <p>{stations[1]}</p>
                    </HeaderBlock>
                    <HeaderBlock>
                        <p>{stations[2]}</p>
                    </HeaderBlock>
                    <HeaderBlock>
                        <p>{stations[3]}</p>
                    </HeaderBlock>
                </Header>
            </StickHead>
            <ModelWrapper>
                {selectedModels.map((m) => (
                    <ModelCardForPrimary
                        key={m.model}
                        m={m}
                        stations={stations}
                    />
                ))}
            </ModelWrapper>
        </CardContainer>
    )
}

export default connect(App)
