import React, { useState, useEffect } from 'react'
import HeaderWithSearchBar from '../Component/HeaderWithSearchBar'
import { Container, Row } from 'react-bootstrap'
import { outputDate } from '../Utils/helperFunction'
import ModelCards from '../Component/ModelCard'
import { navigate } from '@reach/router'

export default function ResultPresent(props) {
    console.log('result page start')

    const [yieldRate, setYieldRate] = useState([])
    const [errorAnalysis, setErrorAnalysis] = useState({})
    const [sortModelNameFlag, setSortModelNameFlag] = useState(false)
    const [sortFEFlag, setSortFEFlag] = useState(false)
    const [sortBEFlag, setSortBEFlag] = useState(false)
    const [sortFTYFlag, setSortFTYFlag] = useState(false)

    const YieldRate = props.location.state.YieldRate
    console.log(YieldRate)
    useEffect(() => {
        const ErrorAnalysis = props.location.state.ErrorAnalysis
        // const YieldRate = props.location.state.YieldRate;
        console.log(ErrorAnalysis)
        setYieldRate(YieldRate.models)
        setErrorAnalysis(ErrorAnalysis)
    }, [
        YieldRate.models,
        props.location.state.ErrorAnalysis,
        props.location.state.YieldRate,
    ])

    const keywordSearch = (value) => {
        const searchList = YieldRate.models.filter((model) =>
            model.model.toLowerCase().includes(value.toLowerCase())
        )
        setYieldRate(searchList)
    }

    const sortByModelName = () => {
        let sortList = []
        if (sortModelNameFlag) {
            sortList = yieldRate.sort((a, b) => {
                if (a.model > b.model) {
                    return 1
                } else {
                    return -1
                }
            })
        } else {
            sortList = yieldRate.sort((a, b) => {
                if (a.model < b.model) {
                    return 1
                } else {
                    return -1
                }
            })
        }
        setYieldRate(sortList)
        const reverse = !sortModelNameFlag
        setSortModelNameFlag(reverse)
    }

    const sortByFE = () => {
        let sortList = []
        if (sortFEFlag) {
            sortList = yieldRate.sort((a, b) => {
                return a.FE.Yield - b.FE.Yield
            })
        } else {
            sortList = yieldRate.sort((a, b) => {
                return b.FE.Yield - a.FE.Yield
            })
        }
        setYieldRate(sortList)
        setSortFEFlag(!sortFEFlag)
    }

    const sortByBE = () => {
        let sortList = []
        if (sortBEFlag) {
            sortList = yieldRate.sort((a, b) => {
                return a.BE.Yield - b.BE.Yield
            })
        } else {
            sortList = yieldRate.sort((a, b) => {
                return b.BE.Yield - a.BE.Yield
            })
        }
        setYieldRate(sortList)
        setSortBEFlag(!sortBEFlag)
    }

    const sortByFTY = () => {
        let sortList = []
        if (sortFTYFlag) {
            sortList = yieldRate.sort((a, b) => {
                return a.FTY - b.FTY
            })
        } else {
            sortList = yieldRate.sort((a, b) => {
                return b.FTY - a.FTY
            })
        }
        setYieldRate(sortList)
        setSortFTYFlag(!sortFTYFlag)
    }

    const goToDetailByCard = (modelName) => {
        const modelDetail =
            yieldRate.filter((model) => model.model === modelName)[0] || {}
        navigate(`/detail`, {
            state: {
                modelName,
                modelDetail,
                startDate: outputDate(YieldRate.startDate),
                endDate: outputDate(YieldRate.endDate),
                errorAnalysis: errorAnalysis[modelName],
            },
        })
    }
    // console.log(ErrorAnalysis);
    // console.log(YieldRate);

    return YieldRate.startDate ? (
        <>
            <HeaderWithSearchBar
                sortModelName={() => sortByModelName()}
                sortFE={() => sortByFE()}
                sortBE={() => sortByBE()}
                sortFTY={() => sortByFTY()}
                searchBarOnchanged={(v) => keywordSearch(v)}
                date={`${outputDate(YieldRate.startDate)} ~ ${outputDate(
                    YieldRate.endDate
                )}`}
            />
            <Container>
                <Row>
                    <div className="model-list-container">
                        {yieldRate
                            .filter(
                                (model) =>
                                    model.FE.Pass !== 0 && model.BE.Pass !== 0
                            )
                            .map((model) => (
                                <ModelCards
                                    key={model.model}
                                    model={model.model}
                                    FE={model.FE}
                                    BE={model.BE}
                                    FTY={model.FTY}
                                    onCardClick={(modelName) =>
                                        goToDetailByCard(modelName)
                                    }
                                />
                            ))}
                    </div>
                </Row>
            </Container>
        </>
    ) : null
}
