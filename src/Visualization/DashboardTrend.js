import React, { Component } from 'react'
import * as d3 from 'd3'

/* set the svg size to 360 * 240 and the margin for drawing beauty */
const width = 360
const height = 240
const margin = { top: 20, right: 5, bottom: 20, left: 35 }

class DashboardTrend extends Component {
    /* state must be initialized at least once due to getDerivedStateFromProps() needs */
    state = {}

    /* set the react ref DOM control for axis */
    xAxis = React.createRef()
    yAxis = React.createRef()
    yAxisVolume = React.createRef()

    static getDerivedStateFromProps(nextProps, prevState) {
        /* <DashboardTrend data={whatever data is}/>*/
        const { data } = nextProps
        if (!data) return {}
        /* trimming for last 10 weeks/months */
        const trimData =
            data.length > 10 ? data.slice(data.length - 10, data.length) : data
        /* parsing & update for plotting */
        const updateData = trimData
            .filter((d) => d.Pass > 5 && d.Total > 5)
            .map((d) => ({
                week: d.Week,
                total: d.Total,
                yield: parseFloat(((d.Pass / d.Total) * 100).toFixed(1)),
            }))

        /* find the x axis scale */
        const x = updateData.map((d) => d.week)
        const xScale = d3
            .scaleBand()
            .domain(x)
            .range([margin.left, width - margin.left])
        /* find the y axis scale */
        const [min, max] = d3.extent(updateData, (d) => d.yield)
        const yScale = d3
            .scaleLinear()
            .domain([Math.min(min, 90), max])
            .range([height - margin.bottom, margin.top])
        /* find the right y axis scale */
        const [yMin, yMax] = d3.extent(updateData, (d) => d.total)
        const yScaleRight = d3
            .scaleLinear()
            .domain([Math.min(100, yMin), yMax + 1000])
            .range([height - margin.bottom, margin.top])
        /* calculate the path data by using d3 line() */
        const trend = d3
            .line()
            .x((d) => xScale(d.week) + 20)
            .y((d) => yScale(d.yield))

        const line = trend(updateData)

        /* calculate yield rate text */
        const labels = updateData.map((d) => ({
            x: xScale(d.week) + 20,
            y: yScale(d.yield),
            fill: '#6eae3e',
            text: `${d.yield}%`,
        }))

        /* calculate production output total text */
        const textLabels = updateData.map((d) => ({
            x: xScale(d.week) + 7,
            y: yScaleRight(d.total),
            text: d.total,
        }))

        /* calculate the bar for plotting*/
        const bars = updateData.map((d) => {
            return {
                x: xScale(d.week) + 7,
                y: yScaleRight(d.total),
                height: height - yScaleRight(d.total) - margin.bottom,
                width: width / updateData.length - 20, // the width could be optimized a bit
                fill: '#6FA4E3',
            }
        })

        console.log(bars)
        return { bars, xScale, yScale, yScaleRight, line, labels, textLabels }
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
        let yAxisD3 = d3.axisLeft().tickFormat((d) => `${d}%`)
        let yAxisRight = d3.axisRight().tickFormat((d) => d)

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
            d3.select(this.yAxisVolume.current).call(yAxisRight)
        }
    }

    render() {
        return this.state.bars.length ? (
            <svg width={width} height={height}>
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
                {this.state.textLabels.map((d, i) => (
                    <text
                        key={i}
                        x={d.x + 4}
                        y={d.y + 8}
                        stroke="#fff"
                        fontSize="8px"
                    >
                        {d.text}
                    </text>
                ))}

                <g>
                    {this.state.labels.map((d, i) => (
                        <text key={i} x={d.x + 2} y={d.y - 5} fontSize="8px">
                            {d.text}
                        </text>
                    ))}
                    {this.state.labels.map((d, i) => (
                        <circle
                            key={i}
                            cx={d.x}
                            cy={d.y}
                            r={4}
                            fill={'#e58582'}
                        />
                    ))}
                </g>
                <path
                    d={this.state.line}
                    fill={'none'}
                    stroke={'#e58582'}
                    strokeWidth={'3px'}
                />

                <g
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

export default DashboardTrend
