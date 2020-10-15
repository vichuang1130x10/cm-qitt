import React from 'react'
import { Table } from 'react-bootstrap'

export default function DefectTable({ sortFailure }) {
    return (
        <Table striped bordered hover size="sm" style={{ width:'100%',fontSize: '12px',margin:'0 auto' }}>
            <thead>
                <tr>
                    <th>Defect Item </th>
                    <th>Q'ty(pcs)</th>
                    <th>Individual%</th>
                    <th>Comulated%</th>
                </tr>
            </thead>
            <tbody>
                {sortFailure.map((item) => (
                    <tr key={item.defectName}>
                        <td>{item.defectName}</td>
                        <td>{item.qty}</td>
                        <td>{item.indiv !== 0 ? item.indiv : 1}</td>
                        <td>{item.accu}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
