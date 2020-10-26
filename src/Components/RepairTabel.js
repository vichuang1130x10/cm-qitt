import React from 'react'
import { Table } from 'react-bootstrap'

export default function RepairTable({ data }) {
    return (
        <Table
            striped
            bordered
            hover
            size="sm"
            style={{ width: '100%', fontSize: '12px', margin: '0 auto' }}
        >
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Model</th>
                    <th>Type</th>
                    <th>Error_Description</th>
                    <th>Reason</th>
                    <th>item</th>
                    <th>Cust_PN</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, i) => (
                    <tr key={i}>
                        <td>{item.Date}</td>
                        <td>{item.Model}</td>
                        <td>{item.Type}</td>
                        <td>{item.Error_Description}</td>
                        <td>{item.Reason}</td>
                        <td>{item.item}</td>
                        <td>{item.Cust_PN}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
