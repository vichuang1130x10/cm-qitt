import React from 'react'
import { Table } from 'react-bootstrap'
import { outputDate } from '../ParsingData/ParsingHelpFunction'

export default function RepairTable({ data }) {
    console.log('repair table data', data)
    return data.length ? (
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
                {data && data.length
                    ? data.map((item, i) => (
                          <tr key={i}>
                              <td>{item.Date ? outputDate(item.Date) : ''}</td>
                              <td>{item.Model ? item.Model : ''}</td>
                              <td>{item.Type ? item.Type : ''}</td>
                              <td>
                                  {item.Error_Description
                                      ? item.Error_Description
                                      : ''}
                              </td>
                              <td>{item.Reason ? item.Reason : ''}</td>
                              <td>{item.item ? item.item : ''}</td>
                              <td>{item.Cust_PN ? item.Cust_PN : ''}</td>
                          </tr>
                      ))
                    : null}
            </tbody>
        </Table>
    ) : null
}
