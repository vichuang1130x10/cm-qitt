import React, { Component } from 'react'
import * as d3 from 'd3'

/* set the svg size to 500 * 300 and the margin for drawing beauty */
const width = 500
const height = 300
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
        const updateData = trimData
            .filter((d) => d.Pass > 5 && d.Total > 5)
            .map((d) => ({
                week: d.Week,
                total: d.Total,
                yield: parseFloat(((d.Pass / d.Total) * 100).toFixed(1)),
            }))

        // console.log("dash trend chart start");
        // console.log(updateData);
        const x = updateData.map((d) => d.week)
        // console.log(x);
        const xScale = d3
            .scaleBand()
            .domain(x)
            .range([margin.left, width - margin.left])
        const [min, max] = d3.extent(updateData, (d) => d.yield)
        const yScale = d3
            .scaleLinear()
            .domain([Math.min(min, 90), max])
            .range([height - margin.bottom, margin.top])

        const [yMin, yMax] = d3.extent(updateData, (d) => d.total)
        const yScaleRight = d3
            .scaleLinear()
            .domain([Math.min(100, yMin), yMax + 1000])
            .range([height - margin.bottom, margin.top])

        const trend = d3
            .line()
            .x((d) => xScale(d.week) + 20)
            .y((d) => yScale(d.yield))

        const line = trend(updateData)

        const labels = updateData.map((d) => ({
            x: xScale(d.week) + 20,
            y: yScale(d.yield),
            fill: '#6eae3e',
            text: `${d.yield}%`,
        }))

        const textLabels = updateData.map((d) => ({
            x: xScale(d.week) + 7,
            y: yScaleRight(d.total),
            fill: '#6eae3e',
            text: d.total,
        }))

        const bars = updateData.map((d) => {
            return {
                x: xScale(d.week) + 7,
                y: yScaleRight(d.total),
                height: height - yScaleRight(d.total) - margin.bottom,
                width: width / updateData.length - 25,
                fill: '#6FA4E3',
                // text: `${d.yield}%`,
            }
        })

        console.log(bars)
        return { bars, xScale, yScale, yScaleRight, line, labels, textLabels }
    }

    render() {
        return <div>render chart here</div>
    }
}
