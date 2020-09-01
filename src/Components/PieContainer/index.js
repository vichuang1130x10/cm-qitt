import React from 'react'
import styled from 'styled-components'
import connect from './connect'
import PieChart from '../../Visualization/PieChart'
import blue from '../../images/blue.png'
import green from '../../images/green.png'
import orange from '../../images/orange.png'

const PieContainerTitle = styled.div`
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`
const ColorCircle = styled.img`
    display: inline-block;
    margin: 5px;
    padding-bottom: 2px;
`

const PieContainerContent = styled.div`
    margin: 0 auto;
    padding: 0;
    width: 240px;
    height: 240px;
`

function App(props) {
    return (
        <div>
            <PieContainerTitle>
                <h6>Category %</h6>
                <div>
                    <span>
                        <ColorCircle src={blue} alt="blue" width="10px" />
                    </span>
                    MB
                    <span>
                        <ColorCircle src={orange} alt="orange" width="10px" />
                    </span>
                    Other
                    <span style={{ marginLeft: '4px' }}>
                        <ColorCircle src={green} alt="green" width="10px" />
                    </span>
                    BPN
                </div>
            </PieContainerTitle>
            <PieContainerContent>
                <PieChart data={props.pieData} />
            </PieContainerContent>
        </div>
    )
}

export default connect(App)
