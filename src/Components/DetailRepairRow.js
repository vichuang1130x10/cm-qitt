import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap'
import Plato from '../Visualization/Plato'
import DefectTable from './DefectTable'
import { outputDate } from '../ParsingData/ParsingHelpFunction'

const PlatoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    text-align: center;
    margin-top: 10px;
`

export default function App({
    station,
    dStartDate,
    dEndDate,
    sortFailure,
    fourteenDaysFailure,
    description,
    failureName,
    fourteenfailureName
}) {
    return (
        <>
            <Row style={{ width: '100%' }}>
                <Col>
                    <PlatoContainer>
                        <h5 className="subtitle-text">
                            {' '}
                            {`${station} station ${outputDate(
                                dStartDate
                            )} ~ ${outputDate(dEndDate)}`}
                        </h5>
                        <h6>{failureName}</h6>
                        <Plato data={sortFailure} />
                    </PlatoContainer>
                </Col>

                <Col>
                    <PlatoContainer>
                        <h5 className="subtitle-text">
                            {`${station} ${description}`}
                        </h5>
                        <h6>{fourteenfailureName}</h6>
                        <Plato data={fourteenDaysFailure} />
                    </PlatoContainer>
                </Col>
            </Row>
            <Row style={{ width: '100%', marginBottom: '20px' }}>
                <Col>
                    <div>
                        <DefectTable sortFailure={sortFailure} />
                    </div>
                </Col>
                <Col>
                    <div>
                        <DefectTable sortFailure={fourteenDaysFailure} />
                    </div>
                </Col>
            </Row>
        </>
    )
}
