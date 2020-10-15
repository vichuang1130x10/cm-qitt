import React, { Component } from 'react'
import * as d3 from 'd3'
const width = 500
const height = 300
const margin = { top: 20, right: 5, bottom: 80, left: 35 }

class Plato extends Component {
    state = {
        bars: [],
    }

    xAxis = React.createRef()
    yAxis = React.createRef()
    yAxisVolume = React.createRef()

    static getDerivedStateFromProps(nextProps, prevState) {
        const { data } = nextProps
        if (!data) return {}
        const trimNameData = data.map(d => {
            const updateName =
                d.defectName.length <= 28
                    ? d.defectName
                    : d.defectName.substr(0, 28)
            return {
                defectName: d.defectName,
                qty: d.qty,
                indiv: d.indiv,
                accu: d.accu,
            }
        })
        const updateData =
            trimNameData.length > 10 ? trimNameData.slice(0, 10) : trimNameData

        console.log('plato chart start')
        console.log(updateData)
        const x = updateData.map(d => d.defectName)
        // console.log(x);
        const xScale = d3
            .scaleBand()
            .domain(x)
            .range([margin.left, width - margin.left])

        const yScale = d3
            .scaleLinear()
            .domain([0, 100])
            .range([height - margin.bottom, margin.top])

        const [yMin, yMax] = d3.extent(updateData, d => d.qty)
        const yScaleRight = d3
            .scaleLinear()
            .domain([0, yMax + 5])
            .range([height - margin.bottom, margin.top])

        const trend = d3
            .line()
            .x(d => xScale(d.defectName) + 20)
            .y(d => yScale(d.accu))

        const line = trend(updateData)

        const labels = updateData.map(d => ({
            x: xScale(d.defectName) + 20,
            y: yScale(d.accu),
            fill: '#4372c4',
            text: `${d.accu}%`,
        }))

        const bars = updateData.map(d => {
            return {
                x: xScale(d.defectName) + 7,
                y: yScaleRight(d.qty),
                height: height - yScaleRight(d.qty) - margin.bottom,
                width:
                    updateData.length > 5
                        ? width / updateData.length - 25
                        : width / updateData.length - 80,
                fill: '#319966',
                // text: `${d.yield}%`,
            }
        })

        const textLabels = updateData.map(d => ({
            x: xScale(d.defectName),
            y: yScaleRight(d.qty),
            stroke: '#4372c4',
            text: d.qty,
        }))

        console.log(bars)
        return { bars, xScale, yScale, yScaleRight, line, labels, textLabels }
    }

    componentDidMount() {
        this.createAxis()
    }

    componentDidUpdate() {
        this.createAxis()
    }

    createAxis = () => {
        let xAxisD3 = d3.axisBottom()
        let yAxisD3 = d3
            .axisLeft()
            .tickFormat(d => d)
            .ticks(5)
        let yAxisRight = d3
            .axisRight()
            .tickFormat(d => `${d}%`)
            .ticks(5)
        xAxisD3.scale(this.state.xScale)
        if (this.xAxis.current) {
            d3.select(this.xAxis.current).call(xAxisD3)
        }
        yAxisD3.scale(this.state.yScaleRight)
        if (this.yAxis.current) {
            d3.select(this.yAxis.current).call(yAxisD3)
        }
        yAxisRight.scale(this.state.yScale)
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
                        x={d.x + 15}
                        y={d.y - 5}
                        stroke="#bc3518"
                        style={{ fontSize: '12px' }}
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
                            fill={'#4372c4'}
                        />
                    ))}
                </g>
                <path
                    d={this.state.line}
                    fill={'none'}
                    stroke={'#4372c4'}
                    strokeWidth={'3px'}
                />

                <g
                    className="plato-axis_bottom"
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
        ) : (
            <h3
                style={{ marginTop: '70px', marginLeft: '40px', color: '#ccc' }}
            >
                No Data
            </h3>
        )
    }
}

export default Plato
