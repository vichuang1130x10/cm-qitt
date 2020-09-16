import React from 'react'
import styled from 'styled-components'
import connect from './connect'
import ModelCardForDashboard from '../ModelCardForDashboard'
import direction from '../../images/direction.png'

const CardContainer = styled.div`
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
`
const Header = styled.div`
    width: 100%;
    height: 30px;
    display: grid;
    grid-template-columns: 20% 18% 18% 18% 18%;
    grid-gap: 10px;
    margin: 10px auto;

    padding: 0;
    border-bottom: 1px solid #ccc;
`

const HeaderBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    & img {
        width: 15px;
        margin-left: 6px;
    }
    & p {
        color: #6fa4e3;
        font-weight: 700;
    }
`

function App(props) {
    return (
        <CardContainer>
            <Header>
                <HeaderBlock>
                    <p>Model</p>
                </HeaderBlock>
                <HeaderBlock>
                    <p>SMT1</p>
                </HeaderBlock>

                <HeaderBlock>
                    <p>SMT2</p>
                </HeaderBlock>

                <HeaderBlock>
                    <p>ASM</p>
                </HeaderBlock>
                <HeaderBlock>
                    <p>FCT</p>
                </HeaderBlock>
            </Header>
            <ModelCardForDashboard OnCardClick={() => {}} />
            <ModelCardForDashboard OnCardClick={() => {}} />
            <ModelCardForDashboard OnCardClick={() => {}} />
            <ModelCardForDashboard OnCardClick={() => {}} />
        </CardContainer>
    )
}

export default connect(App)
