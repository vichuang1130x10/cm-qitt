import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import TrendContainer from '../../Components/TrendContainer'
import PieContainer from '../../Components/PieContainer'
import InfoContainer from '../../Components/InfoContainer'

function App() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Header />
            <section className="main-section">
                <Container>
                    <Row>
                        <div className="first-row-container">
                            <div className="component component-1">
                                <InfoContainer />
                            </div>

                            <div className="component component-2">
                                <TrendContainer />
                            </div>

                            <div className="component component-3">
                                <PieContainer />
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <div className="second-row-container">
                            <div className="component component-4">
                                component-4
                            </div>

                            <div className="component component-5">
                                component-5
                            </div>
                        </div>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    )
}

export default App
