import React, {  Component } from 'react'
import * as d3 from 'd3'
import { translateToMonthCharater } from '../ParsingData/ParsingHelpFunction'
const width = 600
const height = 340
const margin = { top: 20, right: 5, bottom: 50, left: 35 }
const barPadding = 1

// const SVGGroup = styled.g`

//         > text {
//             font-family: Optima, Futura, sans-serif;
//             font-weight: bold;
//             font-size: 8px;
//             transform: rotate(45deg) translate(30px, -10px);
//         }
//     }
// `
//    <g
// ref={this.xAxis}
// transform={`translate(0, ${height - margin.bottom})`}

const sortMo = (a, b) => {
    if (a.Start_date > b.Start_date) {
        return 1
    } else {
        return -1
    }
}

const sortWeek = (a, b) => {
    if (a.weekNumber > b.weekNumber) {
        return 1
    } else {
        return -1
    }
}

const sortMonth = (a, b) => {
    if (a.Month > b.Month) {
        return 1
    } else {
        return -1
    }
}

const mappingUnit = (d, unit) => {
    switch (unit) {
        case 'weekly':
            return d.weekNumber
        case 'monthly':
            return translateToMonthCharater(d.Month - 1)
        case 'mo':
            return d.MO
        default:
            return {}
    }
}

class ModelTrendChart extends Component {
    state = {}

    /* set the react ref DOM control for axis */
    xAxis = React.createRef()
    yAxis = React.createRef()
    yAxisVolume = React.createRef()

    static getDerivedStateFromProps(nextProps) {
        /* <DashboardTrend data={whatever data is}/>*/
        const { data, unit } = nextProps
        if (!data) return {}
        /* trimming for last 10 weeks/months */
        const trimData =
            data.length > 13 ? data.slice(data.length - 13, data.length) : data
        /* parsing & update for plotting */
        let sortUnit = null
        if (unit === 'weekly') {
            sortUnit = sortWeek
        } else if (unit === 'monthly') {
            sortUnit = sortMonth
        } else {
            sortUnit = sortMo
        }
        const updateData = trimData
            .filter(d => d.Pass > 5 && d.Total > 5)
            .sort(sortUnit)
            .map(d => ({
                unit: mappingUnit(d, unit),
                total: d.Total,
                yield: parseFloat(((d.Pass / d.Total) * 100).toFixed(1)),
            }))

        /* find the x axis scale */
        const x = updateData.map(d => d.unit)
        const xScale = d3
            .scaleBand()
            .domain(x)
            .range([margin.left, width - margin.left])
        /* find the y axis scale */
        const [min] = d3.extent(updateData, d => d.yield)
        const yScale = d3
            .scaleLinear()
            .domain([Math.min(min, 90), 100])
            .range([height - margin.bottom, margin.top])
        /* find the right y axis scale */
        const [yMin, yMax] = d3.extent(updateData, d => d.total)
        const yScaleRight = d3
            .scaleLinear()
            .domain([Math.min(100, yMin), yMax + 200])
            .range([height - margin.bottom, margin.top])
        /* calculate the path data by using d3 line() */
        const trend = d3
            .line()
            .x(d => xScale(d.unit) + 20)
            .y(d => yScale(d.yield))

        const line = trend(updateData)

        /* calculate yield rate text */
        const labels = updateData.map(d => ({
            x: xScale(d.unit) + 20,
            y: yScale(d.yield),
            fill: '#6eae3e',
            text: `${d.yield}%`,
        }))

        /* calculate production output total text */
        const textLabels = updateData.map(d => ({
            x: xScale(d.unit) + 7 - barPadding,
            y: yScaleRight(d.total),
            text: d.total,
        }))

        /* calculate the bar for plotting*/
        const bars = updateData.map(d => {
            return {
                x: xScale(d.unit) + 7,
                y: yScaleRight(d.total),
                height: height - yScaleRight(d.total) - margin.bottom,
                width: width / updateData.length - 18, // the width could be optimized a bit
                fill: '#6FA4E3',
            }
        })

        const passedLineHight = yScale(98)

        return {
            bars,
            xScale,
            yScale,
            yScaleRight,
            line,
            labels,
            textLabels,
            passedLineHight,
            unit,
        }
    }

    componentDidMount() {
        this.createAxis()
    }

    componentDidUpdate() {
        this.createAxis()
    }

    /* generate axis by using react ref() */
    createAxis = () => {
        let xAxisD3 = d3.axisBottom()
        let yAxisD3 = d3
            .axisLeft()
            .tickFormat(d => `${d}%`)
            .ticks(5)
        let yAxisRight = d3
            .axisRight()
            .tickFormat(d => d)
            .ticks(5)

        xAxisD3.scale(this.state.xScale)

        if (this.xAxis.current) {
            d3.select(this.xAxis.current).call(xAxisD3)
        }
        yAxisD3.scale(this.state.yScale)
        if (this.yAxis.current) {
            d3.select(this.yAxis.current).call(yAxisD3)
        }

        yAxisRight.scale(this.state.yScaleRight)
        if (this.yAxisVolume.current) {
            d3.select(this.yAxisVolume.current)
                .style('font-size', '8px')
                .call(yAxisRight)
        }
    }

    render() {
        return this.state.bars.length ? (
            <svg width={width} height={height}>
                {/* bar */}
                {this.state.bars.map((d, i) => (
                    <rect
                        key={i}
                        width={d.width}
                        height={d.height}
                        x={d.x}
                        y={d.y}
                        fill={d.fill}
                    />
                ))}
                {/* bar text */}
                {this.state.textLabels.map((d, i) => (
                    <text
                        key={i}
                        x={d.x + 4}
                        y={d.y + 8}
                        stroke="#fff"
                        fontSize="8px"
                        fontFamily="sans-serif"
                    >
                        {d.text}
                    </text>
                ))}
                {/* trend path */}
                <path
                    d={this.state.line}
                    fill={'none'}
                    stroke={'#ACC5DA'}
                    strokeWidth={'3px'}
                />
                {/* text and node */}
                <g>
                    {this.state.labels.map((d, i) => (
                        <circle
                            key={i}
                            cx={d.x}
                            cy={d.y}
                            r={4}
                            fill={'#fff'}
                            stroke={'#ACC5DA'}
                            strokeWidth={'3px'}
                        />
                    ))}
                    {this.state.labels.map((d, i) => (
                        <text key={i} x={d.x + 2} y={d.y - 5} fontSize="8px">
                            {d.text}
                        </text>
                    ))}
                </g>
                {/* 98% yield line */}
                <g>
                    <line
                        x1={margin.right * 7}
                        y1={this.state.passedLineHight}
                        x2={width - margin.left}
                        y2={this.state.passedLineHight}
                        stroke={'#1029dd'}
                        strokeWidth={1}
                        strokeDasharray={(5, 5)}
                    />
                </g>

                {/* axis: */}
                <g
                    className="axis_bottom"
                    ref={this.xAxis}
                    transform={`translate(0, ${height - margin.bottom})`}
                />
                <g
                    ref={this.yAxis}
                    transform={`translate(${margin.left}, 0)`}
                />
                <g
                    ref={this.yAxisVolume}
                    transform={`translate(${width - margin.right * 7}, 0)`}
                />
            </svg>
        ) : null
    }
}

export default ModelTrendChart
