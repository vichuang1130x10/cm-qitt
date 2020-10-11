import React from 'react'
import styled from 'styled-components'
import connect from './connect'
import ModelCardForPrimary from '../ModelCardForPrimary'
import { pickUpStationByCMVendor } from '../../ParsingData/ParsingHelpFunction'

const CardContainer = styled.div`
    padding: 0 10px;
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
        font-size: 12px;
        font-style: italic;
    }
`

const ModelWrapper = styled.div``

function App({ appData, primaryState }) {
    const { vendor, models } = appData
    const stations = pickUpStationByCMVendor(vendor)
    const selectedModels = models.filter((model) =>
        primaryState.includes(model.model)
    )

    return (
        <CardContainer>
            <StickHead>
                <h4>Primary Model:</h4>
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
