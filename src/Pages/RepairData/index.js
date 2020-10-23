import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import { Container } from 'react-bootstrap'

const DataWrapper = styled.div`
    width: 100%;
    height: 100vh;
    margin-top: 80px;

    background-color: #fefefe;
    border-radius: 20px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
    overflow: auto;
`

export default function App() {
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    return (
        <>
            <Header />
            <div className="main-section">
                <Container>
                    <DataWrapper>Repair</DataWrapper>
                </Container>
            </div>
            <Footer />
        </>
    )
}
