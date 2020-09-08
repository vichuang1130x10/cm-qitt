import React from 'react'
import styled from 'styled-components'
import connect from './connect'
import ModelCardForDashboard from '../ModelCardForDashboard'

const CardContainer = styled.div`
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
`

function App(props) {
    return (
        <div>
            <CardContainer>
                <ModelCardForDashboard OnCardClick={() => {}} />
                <ModelCardForDashboard OnCardClick={() => {}} />
                <ModelCardForDashboard OnCardClick={() => {}} />
                <ModelCardForDashboard OnCardClick={() => {}} />
            </CardContainer>
        </div>
    )
}

export default connect(App)
