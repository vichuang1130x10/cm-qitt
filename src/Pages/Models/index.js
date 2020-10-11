import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import connect from './connect'
import {
    outputDate,
    pickUpStationByCMVendor,
} from '../../ParsingData/ParsingHelpFunction'
import Card from '../../Components/ModePageModelCard'

const ModelWrapper = styled.div`
    width: 100%;
    height: 100vh;
    margin-top: 80px;

    background-color: #fefefe;
    border-radius: 20px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
    overflow: auto;
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
    margin-top: 0px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
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
const CardWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
    flex-wrap: wrap;
`

const Sticker = styled.div`
    padding: 20px 20px;
    position: sticky;
    top: 0;
    right: 0;
    left: 0;
    z-index: 102;
    background-color: #fff;
`

function App({ appState }) {
    const { startDate, endDate, models, vendor } = appState
    const [value, setValue] = useState('')
    const [modelList, setModelList] = useState([])
    const stations = pickUpStationByCMVendor(vendor)

    const keywordSearch = (value) => {
        const searchList = models.filter((model) =>
            model.model.toLowerCase().includes(value.toLowerCase())
        )
        setModelList(searchList)
    }

    const onValueChanged = (v) => {
        setValue(v)
        keywordSearch(v)
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        setModelList(models)
    }, [models])

    const handleAllBtnOnClicked = () => {
        setModelList(models)
    }

    const handleMBBtnOnClicked = () => {
        const updateList = models.filter((model) => model.productType === 'MB')
        setModelList(updateList)
    }

    const handleBPNBtnOnClicked = () => {
        const updateList = models.filter((model) => model.productType === 'BPN')
        setModelList(updateList)
    }

    const handleOtherBtnOnClicked = () => {
        const updateList = models.filter(
            (model) => model.productType === 'Other'
        )
        setModelList(updateList)
    }

    return (
        <>
            <Header />
            <section className="main-section">
                <Container>
                    <ModelWrapper>
                        <Sticker>
                            <h3>Models:</h3>
                            <h6>
                                Date Range:{' '}
                                {`${outputDate(startDate)}~${outputDate(
                                    endDate
                                )}`}
                            </h6>

                            <SearchBarWrapper>
                                <Input
                                    type={value}
                                    onChange={(e) =>
                                        onValueChanged(e.target.value)
                                    }
                                    placeholder="Model Search"
                                />
                                <div>
                                    <CategoryButton
                                        onClick={() => handleAllBtnOnClicked()}
                                    >
                                        All
                                    </CategoryButton>
                                    <CategoryButton
                                        onClick={() => handleMBBtnOnClicked()}
                                    >
                                        MB
                                    </CategoryButton>
                                    <CategoryButton
                                        onClick={() => handleBPNBtnOnClicked()}
                                    >
                                        BPN
                                    </CategoryButton>
                                    <CategoryButton
                                        onClick={() =>
                                            handleOtherBtnOnClicked()
                                        }
                                    >
                                        OTHER
                                    </CategoryButton>
                                </div>
                            </SearchBarWrapper>
                        </Sticker>

                        <CardWrapper>
                            {modelList.map((model) => (
                                <Card
                                    key={model.model}
                                    model={model}
                                    stations={stations}
                                />
                            ))}
                        </CardWrapper>
                    </ModelWrapper>
                </Container>
            </section>

            <Footer />
        </>
    )
}

export default connect(App)
