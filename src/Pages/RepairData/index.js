import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BsSearch } from 'react-icons/bs'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import { Container, Row, Col } from 'react-bootstrap'
import connect from './connect'
import {
    outputDate,
    getSevenDayBoundary,
} from '../../ParsingData/ParsingHelpFunction'
import {
    parsingRepairList,
    parsingRepairListForModels,
    parsingRepairListForReason,
} from '../../ParsingData/ParsingCMData'
import FilterLink from '../../Components/FilterLink'
import { VisibilityFilters } from '../../Data/SetVisiblityFilter'
import RepairCard from '../../Components/RepairCard'
import RepairTable from '../../Components/RepairTabel'

const DataWrapper = styled.div`
    width: 100%;
    height: 100vh;
    margin-top: 80px;

    background-color: #fefefe;
    border-radius: 20px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
    overflow: auto;
    padding: 20px 20px;
`

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    margin: 0 auto;
    & > h6 {
        text-align: left;
        width: 60%;
        color: #123abc;
    }
`

const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`
const ButtonContainer = styled.div`
    padding: 1rem 1rem 1rem 3.5rem;
    margin-top: 25px;
`

const ContentContainer = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;
    margin: 0 auto;
`

const Search = styled.div`
    padding: 10px;
    position: relative;
    display: flex;
    align-items: center;
    width: 40%;
    border: 1px solid transparent;
    outline: none;
`

const SearchBar = styled.input`
    padding: 1rem 1rem 0 3.5rem;
    border: 1px solid transparent;
    outline: none;
    border-bottom: 1px solid #ccc;
    width: 100%;
`

const SearchBarView = ({ value, onValueChanged }) => {
    return (
        <Search>
            <BsSearch
                style={{
                    marginLeft: '1rem',
                    position: 'absolute',
                    marginTop: '1rem',
                }}
                size="1rem"
            />
            <SearchBar
                type={value}
                onChange={(e) => onValueChanged(e.target.value)}
                placeholder="Part number search"
            ></SearchBar>
        </Search>
    )
}

const HeaderForWrapper = styled.div`
    width: 100%;
    height: 30px;
    display: grid;
    grid-template-columns: 18% 40% 36%;
    grid-gap: 10px;
    margin: 10px auto;
    padding: 0;
    border-bottom: 1px solid #eee;
`

const HeaderBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;

    & p {
        color: #1d0332;
        font-weight: 400;
        font-size: 12px;
        font-style: italic;
    }
`

const getNElement = (arr) => (arr.length > 10 ? 10 : arr.length)

const getUpdateRepairData = (repairData, dateRange, eDate) => {
    let updateRepairData = null

    switch (dateRange) {
        case VisibilityFilters.SHOW_SEVEM_DAYS:
            updateRepairData = repairData.filter(
                (obj) => new Date(obj.Date) > getSevenDayBoundary(eDate, 7)
            )
            break
        case VisibilityFilters.SHOW_FOURTEEN_DAYS:
            updateRepairData = repairData.filter(
                (obj) => new Date(obj.Date) > getSevenDayBoundary(eDate, 30)
            )
            break

        case VisibilityFilters.SHOW_ALL:
            updateRepairData = repairData
            break
        default:
            updateRepairData = repairData
    }

    return updateRepairData
}

function App({ repairData, dateRange }) {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [value, setValue] = useState('')

    const [sRepairList, setRepairList] = useState([])
    const [sRepairListByModel, setsRepairListByModel] = useState([])
    const [sRepairListByReason, setsRepairListByReason] = useState([])
    const [detailRawData, setDetailRawData] = useState([])
    const [selectPn, setSelectPn] = useState('')
    const onValueChanged = (v) => {
        const updateRepairData = getUpdateRepairData(
            repairData,
            dateRange,
            endDate
        )
        if (v.trim().length !== 0) {
            setValue(v)

            const sortedRepairList = parsingRepairList(
                updateRepairData
            ).filter((obj) => obj.pn.toUpperCase().includes(v.toUpperCase()))
            setRepairList(sortedRepairList)
        } else {
            setRepairList(parsingRepairList(updateRepairData))
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        const sDate =
            repairData.reduce((a, b) => (a.Date > b.Date ? b : a)).Date ||
            new Date()
        const eDate =
            repairData.reduce((a, b) => (a.Date > b.Date ? a : b)).Date ||
            new Date()

        setStartDate(sDate)
        setEndDate(eDate)
        console.log(repairData)
        console.log(dateRange)

        const updateRepairData = getUpdateRepairData(
            repairData,
            dateRange,
            eDate
        )
        const parsedRepairList = parsingRepairList(updateRepairData)
        console.log(parsedRepairList)
        setRepairList(parsedRepairList)
    }, [repairData, dateRange])

    const handleRepairCardClick = (index) => {
        const reparListForModel = parsingRepairListForModels(sRepairList[index])
        const reparListForReason = parsingRepairListForReason(
            sRepairList[index]
        )
        console.log(reparListForModel)
        console.log(reparListForReason)
        setSelectPn(sRepairList[index].pn)
        setsRepairListByModel(reparListForModel)
        setsRepairListByReason(reparListForReason)
        window.scrollTo({
            top: 400,
            behavior: 'smooth',
        })
    }

    const handleModelClick = (index) => {
        setDetailRawData(sRepairListByModel[index].data)
        window.scrollTo({
            top: 600,
            behavior: 'smooth',
        })
    }

    const handleReasonClick = (index) => {
        setDetailRawData(sRepairListByReason[index].data)
        window.scrollTo({
            top: 600,
            behavior: 'smooth',
        })
    }

    return (
        <>
            <Header />
            <div className="main-section">
                <Container>
                    <DataWrapper>
                        <h3>Repair Data:</h3>
                        <h6>
                            Date Range:
                            {`${outputDate(startDate)}~${outputDate(endDate)}`}
                        </h6>

                        <MainContainer>
                            <HeaderContainer>
                                <SearchBarView
                                    value={value}
                                    onValueChanged={onValueChanged}
                                />

                                <ButtonContainer>
                                    <FilterLink
                                        filter={
                                            VisibilityFilters.SHOW_SEVEM_DAYS
                                        }
                                    >
                                        7 days
                                    </FilterLink>
                                    <FilterLink
                                        filter={
                                            VisibilityFilters.SHOW_FOURTEEN_DAYS
                                        }
                                    >
                                        30 days
                                    </FilterLink>
                                    <FilterLink
                                        filter={VisibilityFilters.SHOW_ALL}
                                    >
                                        All-Data
                                    </FilterLink>
                                </ButtonContainer>
                            </HeaderContainer>
                            <h6>Top 10 Failures:</h6>
                            <ContentContainer>
                                <HeaderForWrapper>
                                    <HeaderBlock>
                                        <p>RANK</p>
                                    </HeaderBlock>
                                    <HeaderBlock>
                                        <p>Part Number</p>
                                    </HeaderBlock>
                                    <HeaderBlock>
                                        <p>Failed QTY</p>
                                    </HeaderBlock>
                                </HeaderForWrapper>
                                {sRepairList
                                    .slice(0, getNElement(sRepairList))
                                    .map((obj, i) => (
                                        <RepairCard
                                            index={i}
                                            handleRepairCardClick={
                                                handleRepairCardClick
                                            }
                                            key={obj.pn}
                                            partNumber={obj.pn}
                                            qty={obj.qty}
                                        />
                                    ))}
                            </ContentContainer>
                            <h3
                                style={{ marginTop: '20px' }}
                            >{` Selected PN: ${selectPn}`}</h3>
                            <Row
                                style={{
                                    width: '100%',
                                    marginTop: '40px',
                                    textAlign: 'center',
                                }}
                            >
                                <Col>
                                    <h6
                                        style={{
                                            backgroundColor: '#ccc',
                                            color: '#FFF',
                                            padding: '6px 10px',
                                        }}
                                    >
                                        By Model
                                    </h6>
                                    <HeaderForWrapper>
                                        <HeaderBlock>
                                            <p>RANK</p>
                                        </HeaderBlock>
                                        <HeaderBlock>
                                            <p>Part Number</p>
                                        </HeaderBlock>
                                        <HeaderBlock>
                                            <p>Failed QTY</p>
                                        </HeaderBlock>
                                    </HeaderForWrapper>
                                    {sRepairListByModel
                                        .slice(
                                            0,
                                            getNElement(sRepairListByModel)
                                        )
                                        .map((obj, i) => (
                                            <RepairCard
                                                index={i}
                                                handleRepairCardClick={
                                                    handleModelClick
                                                }
                                                key={obj.model}
                                                partNumber={obj.model}
                                                qty={obj.qty}
                                            />
                                        ))}
                                </Col>
                                <Col>
                                    <h6
                                        style={{
                                            backgroundColor: '#ccc',
                                            color: '#FFF',
                                            padding: '6px 10px',
                                        }}
                                    >
                                        By Reason
                                    </h6>
                                    <HeaderForWrapper>
                                        <HeaderBlock>
                                            <p>RANK</p>
                                        </HeaderBlock>
                                        <HeaderBlock>
                                            <p>Part Number</p>
                                        </HeaderBlock>
                                        <HeaderBlock>
                                            <p>Failed QTY</p>
                                        </HeaderBlock>
                                    </HeaderForWrapper>
                                    {sRepairListByReason
                                        .slice(
                                            0,
                                            getNElement(sRepairListByReason)
                                        )
                                        .map((obj, i) => (
                                            <RepairCard
                                                index={i}
                                                handleRepairCardClick={
                                                    handleReasonClick
                                                }
                                                key={obj.reason}
                                                partNumber={obj.reason}
                                                qty={obj.qty}
                                            />
                                        ))}
                                </Col>
                            </Row>
                            <Row
                                style={{
                                    width: '97%',
                                    marginTop: '40px',
                                    textAlign: 'center',
                                }}
                            >
                                <h6
                                    style={{
                                        backgroundColor: '#ccc',
                                        color: '#FFF',
                                        padding: '6px 10px',
                                        width: '100%',
                                        textAlign: 'left',
                                    }}
                                >
                                    Detail:
                                </h6>
                                {detailRawData.length ? (
                                    <RepairTable data={detailRawData} />
                                ) : null}
                            </Row>
                        </MainContainer>
                    </DataWrapper>
                </Container>
            </div>
            <Footer />
        </>
    )
}

export default connect(App)
