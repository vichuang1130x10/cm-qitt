import React, { Component } from 'react'
import * as d3 from 'd3'
const width = 180
const height = 60
const margin = { top: 10, right: 10, bottom: 10, left: 10 }

const sortWeek = (a, b) => {
    if (a.weekNumber > b.weekNumber) {
        return 1
    } else {
        return -1
    }
}

class CardTrend extends Component {
    state = {
        bars: [],
    }

    static getDerivedStateFromProps(nextProps) {
        const { data } = nextProps

        if (!data) return {}

        const updateData = data
            .filter((d) => d.Pass > 50 && d.Total > 50)
            .sort(sortWeek)
            .map((d) => ({
                weekNumber: d.weekNumber,
                total: d.Total,
                yield: parseFloat(((d.Pass / d.Total) * 100).toFixed(1)),
            }))

        const x = updateData.map((d) => d.weekNumber)

        const xScale = d3
            .scaleBand()
            .domain(x)
            .range([margin.left, width - margin.left])
        const [min] = d3.extent(updateData, (d) => d.yield)
        const yScale = d3
            .scaleLinear()
            .domain([Math.min(min, 80), 100])
            .range([height - margin.bottom, margin.top])

        const trend = d3
            .line()
            .x((d) => xScale(d.weekNumber))
            .y((d) => yScale(d.yield))

        const line = trend(updateData)
        const passedLineHight = yScale(98)

        return { xScale, yScale, line, passedLineHight }
    }

    render() {
        return this.state.line ? (
            <svg width={width} height={height}>
                <path
                    d={this.state.line}
                    fill={'none'}
                    stroke={'#e58582'}
                    strokeWidth={'1px'}
                />
                {/* 98% yield line */}
                <g>
                    <line
                        x1={margin.right}
                        y1={this.state.passedLineHight}
                        x2={width - margin.left}
                        y2={this.state.passedLineHight}
                        stroke={'#1029dd'}
                        strokeWidth={1}
                        strokeDasharray={(5, 5)}
                    />
                </g>
            </svg>
        ) : (
            <h6
                style={{ marginTop: '30px', marginLeft: '30px', color: '#ccc' }}
            >
                No FCT DATA
            </h6>
        )
    }
}

export default CardTrend
