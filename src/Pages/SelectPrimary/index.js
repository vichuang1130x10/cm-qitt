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
    const [sortStation0Flag, setSortStation0Flag] = useState(false)
    const [sortStation1Flag, setSortStation1Flag] = useState(false)
    const [sortStation2Flag, setSortStation2Flag] = useState(false)
    const [sortStation3Flag, setSortStation3Flag] = useState(false)

    //productType: "MB"
    // station0FTY: 99.7
    // station1FTY: 100
    // station2FTY: 99.7
    // station3FTY: 96.8

    useEffect(() => {
        const mBModelList = models.filter((model) => model.productType === 'MB')
        setModelList(mBModelList)
    })

    const keywordSearch = (value) => {
        const searchList = modelList.filter((model) =>
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
            sortList = modelList.sort((a, b) => {
                if (a.model < b.model) {
                    return 1
                } else {
                    return -1
                }
            })
        }
        setModelList(sortList)
        setSortModelNameFlag(!sortModelNameFlag)
    }

    /* Below repeat code is the worst coding, must be refactor if have time*/

    const setSortStation0 = () => {
        let sortList = []
        if (sortStation0Flag) {
            sortList = modelList.sort((a, b) => {
                return a.station0FTY - b.station0FTY
            })
        } else {
            sortList = modelList.sort((a, b) => {
                return b.station0FTY - a.station0FTY
            })
        }
        setModelList(sortList)
        setSortStation0Flag(!sortStation0Flag)
    }

    const setSortStation1 = () => {
        let sortList = []
        if (sortStation1Flag) {
            sortList = modelList.sort((a, b) => {
                return a.station1FTY - b.station1FTY
            })
        } else {
            sortList = modelList.sort((a, b) => {
                return b.station1FTY - a.station1FTY
            })
        }
        setModelList(sortList)
        setSortStation1Flag(!sortStation1Flag)
    }

    const setSortStation2 = () => {
        let sortList = []
        if (sortStation2Flag) {
            sortList = modelList.sort((a, b) => {
                return a.station2FTY - b.station2FTY
            })
        } else {
            sortList = modelList.sort((a, b) => {
                return b.station2FTY - a.station2FTY
            })
        }
        setModelList(sortList)
        setSortStation0Flag(!sortStation2Flag)
    }

    const setSortStation3 = () => {
        let sortList = []
        if (sortStation3Flag) {
            sortList = modelList.sort((a, b) => {
                return a.station3FTY - b, station3FTY
            })
        } else {
            sortList = modelList.sort((a, b) => {
                return b.station3FTY - a.station3FTY
            })
        }
        setModelList(sortList)
        setSortStation0Flag(!sortStation3Flag)
    }

    // const goToDetailByCard = (modelName) => {
    //     const modelDetail =
    //         yieldRate.filter((model) => model.model === modelName)[0] || {}
    //     navigate(`/detail`, {
    //         state: {
    //             modelName,
    //             modelDetail,
    //             startDate: outputDate(YieldRate.startDate),
    //             endDate: outputDate(YieldRate.endDate),
    //             errorAnalysis: errorAnalysis[modelName],
    //         },
    //     })
    // }
    // console.log(ErrorAnalysis);
    // console.log(YieldRate);

    return modelList.length ? (
        <>
            <SearchHeader
                stations={stations}
                sortModelName={() => sortByModelName()}
                sortStation0Flag={() => sortStation0Flag()}
                sortStation1Flag={() => sortStation1Flag()}
                sortStation2Flag={() => sortStation2Flag()}
                sortStation3Flag={() => sortStation3Flag()}
                searchBarOnchanged={(v) => keywordSearch(v)}
                date={`${outputDate(startDate)} ~ ${outputDate(endDate)}`}
            />
            <Container>
                <Row>
                    <div className="model-list-container">
                        {modelList
                            // .filter(
                            //     (model) =>
                            //         model.FE.Pass !== 0 && model.BE.Pass !== 0
                            // )
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
