import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
// import RotateLoader from 'react-spinners/RotateLoader'
import SearchHeader from '../../Components/SearchHeader'
import { Container, Row } from 'react-bootstrap'
import {
    outputDate,
    pickUpStationByCMVendor,
} from '../../ParsingData/ParsingHelpFunction'
import ModelCards from '../../Components/ModelCard'
import { navigate } from '@reach/router'
import connect from './connect'

const Wrapper = styled.div`
    width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #fefefe;
`

const ListContainer = styled.div`
    width: 100%;
    margin: 0;
    padding: 0;
    margin-top: 340px;
    background-color: #fefefe;
`

// const SpinnerWrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     margin-top: 300px;
//     > h3 {
//         color: #123abc;
//     }
// `

function App(props) {
    const { models, vendor, startDate, endDate } = props.appState
    const stations = pickUpStationByCMVendor(vendor)
    const mBModelList = models.filter((model) => model.productType === 'MB')
    const [modelList, setModelList] = useState([])
    const [sortModelNameFlag, setSortModelNameFlag] = useState(false)
    const [sortStation0Flag, setSortStation0Flag] = useState(false)
    const [sortStation1Flag, setSortStation1Flag] = useState(false)
    const [sortStation2Flag, setSortStation2Flag] = useState(false)
    const [sortStation3Flag, setSortStation3Flag] = useState(false)
    // const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setModelList(mBModelList)
        // setIsLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [models])

    const keywordSearch = (value) => {
        const searchList = mBModelList.filter((model) =>
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
        console.log('start sort fty')
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
        setSortStation2Flag(!sortStation2Flag)
    }

    const setSortStation3 = () => {
        let sortList = []
        if (sortStation3Flag) {
            sortList = modelList.sort((a, b) => {
                return a.station3FTY - b.station3FTY
            })
        } else {
            sortList = modelList.sort((a, b) => {
                return b.station3FTY - a.station3FTY
            })
        }
        setModelList(sortList)
        setSortStation3Flag(!sortStation3Flag)
    }

    const completeSelection = () => {
        navigate(`/dashboard`)
    }

    return (
        <Wrapper>
            <SearchHeader
                completeSelection={() => completeSelection()}
                stations={stations}
                sortModelName={() => sortByModelName()}
                setSortStation0={() => setSortStation0()}
                setSortStation1={() => setSortStation1()}
                setSortStation2={() => setSortStation2()}
                setSortStation3={() => setSortStation3()}
                searchBarOnchanged={(v) => keywordSearch(v)}
                date={`${outputDate(startDate)} ~ ${outputDate(endDate)}`}
            />
            <ListContainer>
                <Container>
                    <Row>
                        <div className="model-list-container">
                            {modelList.map((model) => (
                                <ModelCards
                                    key={model.model}
                                    modelObj={model}
                                    stations={stations}
                                />
                            ))}
                        </div>
                    </Row>
                </Container>
            </ListContainer>
        </Wrapper>
    )
}
export default connect(App)
