import React, { Component } from 'react'
import * as d3 from 'd3'

const width = 360
const height = 240

class DashboardPieChart extends Component {
    state = {
        slices: [], // array of svg path commands, each representing a day
        labelData: [],
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { data } = nextProps
        if (!data) return {}

        const updateData = Object.values(data)

        const total = updateData.reduce((acc, ele) => acc + ele, 0)
        const labelData = []
        updateData.forEach((data, i) => {
            let title = ''
            switch (i) {
                case 0:
                    title = 'BPN'
                    break
                case 1:
                    title = 'MB'
                    break
                default:
                    title = 'OTHER'
            }
            const percentage =
                parseFloat(((data / total) * 100).toFixed(1)) || 0
            labelData.push(`${title} ${data} (${percentage}%)`)
        })

        const colors = d3.scaleOrdinal(['#7fa396', '#4a8ddc', '#ebbd9f'])

        const arcGenerator = d3.arc()
        const pieGenerator = d3.pie()

        const pie = pieGenerator(updateData)
        const slices = pie.map((d, i) => {
            const path = arcGenerator({
                startAngle: d.startAngle,
                endAngle: d.endAngle,
                innerRadius: 50,
                outerRadius: height / 3,
            })
            return { path, fill: colors(i) }
        })
        return { slices, labelData }
    }

    render() {
        return (
            <svg width={width} height={height}>
                <g transform={`translate(${width / 2}, ${height / 2})`}>
                    {this.state.slices.map((d, i) => (
                        <path key={i} d={d.path} fill={d.fill} />
                    ))}
                </g>
                <text x="50" y="50" style={{ fontSize: '11px' }}>
                    {this.state.labelData[0]}
                </text>
                <text x="50" y="240" style={{ fontSize: '11px' }}>
                    {this.state.labelData[1]}
                </text>
                <text x="370" y="150" style={{ fontSize: '11px' }}>
                    {this.state.labelData[2]}
                </text>
            </svg>
        )
    }
}

export default DashboardPieChart
