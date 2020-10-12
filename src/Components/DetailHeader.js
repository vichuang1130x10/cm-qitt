import React from 'react'
import styled from 'styled-components'
import { outputDate } from '../ParsingData/ParsingHelpFunction'
import { Table } from 'react-bootstrap'

const Nav = styled.div`
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`

const NavHeader = styled.div`
    max-width: 1200px;
    padding: 20px 20px 5px 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
`

const NavTitle = styled.div`
    margin: 20px 0 10px 0;
    padding: 0 64px;
    font-family: 'Oswald', sans-serif;
`

const DataRange = styled.div`
    padding: 20px 64px;
`

const ModelName = styled.div`
    padding: 0 64px;
`

const TableContainer = styled.div`
    padding: 12px 64px;
`

export default function App({ dStartDate, dEndDate, dModel, dStations }) {
    return (
        <Nav>
            <NavHeader>
                <NavTitle>
                    <h3>PRODUCT DETAIL</h3>
                </NavTitle>
                <DataRange>
                    <h6>
                        Date Range :
                        {`${outputDate(dStartDate)} ~ ${outputDate(dEndDate)}`}
                    </h6>
                </DataRange>
                <ModelName>
                    <h4>Model: {dModel.model}</h4>
                </ModelName>

                <TableContainer>
                    <Table
                        striped
                        bordered
                        hover
                        size="sm"
                        style={{ fontSize: '16px' }}
                    >
                        <thead>
                            <tr>
                                <th>Station</th>
                                <th>{dStations[0]}</th>
                                <th>{dStations[1]}</th>
                                <th>{dStations[2]}</th>
                                <th>{dStations[3]}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>YIELD</th>
                                <td>{dModel.station0FTY}%</td>
                                <td>{dModel.station1FTY}%</td>
                                <td>{dModel.station2FTY}%</td>
                                <td>{dModel.station3FTY}%</td>
                            </tr>
                            <tr>
                                <th>INPUT</th>
                                <td>{dModel[dStations[0]].Total}</td>
                                <td>{dModel[dStations[1]].Total}</td>
                                <td>{dModel[dStations[2]].Total}</td>
                                <td>{dModel[dStations[3]].Total}</td>
                            </tr>
                            <tr>
                                <th>PASS</th>
                                <td>{dModel[dStations[0]].Pass}</td>
                                <td>{dModel[dStations[1]].Pass}</td>
                                <td>{dModel[dStations[2]].Pass}</td>
                                <td>{dModel[dStations[3]].Pass}</td>
                            </tr>
                            <tr>
                                <th>FAIL</th>
                                <td>{dModel[dStations[0]].Fail}</td>
                                <td>{dModel[dStations[1]].Fail}</td>
                                <td>{dModel[dStations[2]].Fail}</td>
                                <td>{dModel[dStations[3]].Fail}</td>
                            </tr>
                        </tbody>
                    </Table>
                </TableContainer>
            </NavHeader>
        </Nav>
    )
}
