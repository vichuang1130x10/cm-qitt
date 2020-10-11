import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, Col } from 'react-bootstrap'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import connect from './connect'
import { outputDate } from '../../ParsingData/ParsingHelpFunction'

const ModelWrapper = styled.div`
    width: 100%;
    height: 100vh;
    margin: 10px;
    margin-top: 80px;
    padding: 10px;
    background-color: #fefefe;
    border-radius: 20px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
`
const Input = styled.input`
    font-size: 16px;
    border: solid 1px #dbdbdb;
    border-radius: 3px;
    color: #262626;
    padding: 7px 33px;
    border-radius: 3px;
    color: #999;
    cursor: text;
    font-size: 14px;
    font-weight: 300;
    text-align: center;
    transition: all 0.5s;
    width: 40%;
    margin: 0px 128px 10px 128px;
    outline: none;

    &:active,
    &:focus {
        text-align: left;
    }
`

const SearchBarWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
    border-bottom: 1px solid #ccc;
`
const CategoryButton = styled.button`
    padding: 6px 12px;
    margin-left: 10px;
    background-color: transparent;
    border: none;
    outline: none;
    transition: all 0.5s;
    &:active,
    &:focus {
        color: blue;
    }

    &:hover {
        transform: translateY(-5px);
    }
`

function App({ appState }) {
    const [value, setValue] = useState('')
    const { startDate, endDate, models } = appState

    const onValueChanged = (v) => setValue(v)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Header />
            <section className="main-section">
                <Container>
                    <Col>
                        <ModelWrapper>
                            <Container>
                                <Col>
                                    <h3>Models:</h3>
                                    <h6>
                                        Date Range:{' '}
                                        {`${outputDate(startDate)}~${outputDate(
                                            endDate
                                        )}`}
                                    </h6>
                                </Col>
                                <Col>
                                    <SearchBarWrapper>
                                        <Input
                                            type={value}
                                            onChange={(e) =>
                                                onValueChanged(e.target.value)
                                            }
                                            placeholder="Model Search"
                                        />
                                        <div>
                                            <CategoryButton>All</CategoryButton>
                                            <CategoryButton>MB</CategoryButton>
                                            <CategoryButton>BPN</CategoryButton>
                                            <CategoryButton>
                                                OTHER
                                            </CategoryButton>
                                        </div>
                                    </SearchBarWrapper>
                                </Col>
                            </Container>
                        </ModelWrapper>
                    </Col>
                </Container>
            </section>

            <Footer />
        </>
    )
}

export default connect(App)
