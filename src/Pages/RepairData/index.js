import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BsSearch } from 'react-icons/bs'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import { Container } from 'react-bootstrap'
import connect from './connect'
import { outputDate } from '../../ParsingData/ParsingHelpFunction'
import { parsingRepairList } from '../../ParsingData/ParsingCMData'

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
    align-content: center;
    justify-content: center;
    width: 80%;
    margin: 0 auto;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const CategoryButton = styled.button`
    font-size: 12px;
    margin-left: 20px;
    background-color: transparent;
    border: none;
    outline: none;
    transition: all 0.5s;
    border-bottom: 1px solid #ccc;
    &:active,
    &:focus {
        color: blue;
        border-bottom: 1px solid #123abc;
        outline: none;
    }
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

function App({ repairData }) {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [value, setValue] = useState('')

    const onValueChanged = () => {}

    const handleSevenDaysBtnOnClicked = () => {}

    const handleThirtyDaysBtnOnClicked = () => {}
    const handleOneYearBtnOnClicked = () => {}

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
        console.log(parsingRepairList(repairData))
    }, [repairData])

    //     startDate:
    //     updatedJson.YieldRate.reduce((a, b) => (a.Date > b.Date ? b : a))
    //         .Date || new Date(),
    // endDate:
    //     updatedJson.YieldRate.reduce((a, b) => (a.Date > b.Date ? a : b))
    //         .Date || new Date(),
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
                                    <CategoryButton
                                        onClick={() =>
                                            handleSevenDaysBtnOnClicked()
                                        }
                                    >
                                        7 days
                                    </CategoryButton>
                                    <CategoryButton
                                        onClick={() =>
                                            handleThirtyDaysBtnOnClicked()
                                        }
                                    >
                                        30 days
                                    </CategoryButton>
                                    <CategoryButton
                                        onClick={() =>
                                            handleOneYearBtnOnClicked()
                                        }
                                    >
                                        1 year
                                    </CategoryButton>
                                </ButtonContainer>
                            </HeaderContainer>
                            <ContentContainer>
                                Repair data render here...
                            </ContentContainer>
                        </MainContainer>
                    </DataWrapper>
                </Container>
            </div>
            <Footer />
        </>
    )
}

export default connect(App)
