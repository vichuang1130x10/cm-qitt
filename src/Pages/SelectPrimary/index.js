import React, { useState, useEffect } from 'react'
import SearchHeader from '../../Components/SearchHeader'
import { Container, Row } from 'react-bootstrap'
import {
    outputDate,
    pickUpStationByCMVendor,
} from '../../ParsingData/ParsingHelpFunction'
import ModelCards from '../../Components/ModelCard'
import { navigate } from '@reach/router'
import connect from './connect'

function App(props) {
    console.log('primary selection page start')
    const { models, vendor, startDate, endDate } = props.appState
    const stations = pickUpStationByCMVendor(vendor)
    const [modelList, setModelList] = useState([])
    const [sortModelNameFlag, setSortModelNameFlag] = useState(false)
    const [sortStation0, setSortStation0] = useState(false)
    const [sortStation1, setSortStation1] = useState(false)
    const [sortStation2, setSortStation2] = useState(false)
    const [sortStation3, setSortStation3] = useState(false)

    const keywordSearch = (value) => {
        const searchList = models.filter((model) =>
            model.model.toLowerCase().includes(value.toLowerCase())
        )
        setModelList(searchList)
    }

    const sortByModelName = () => {
        let sortList = []
        if (sortModelNameFlag) {
            sortList = modelList.sort((a, b) => {
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

    const setSortStation0 = () => {
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

    const setSortStation1 = () => {
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

    const setSortStation2 = () => {
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
            <SearchHeader
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
export default connect(App)
