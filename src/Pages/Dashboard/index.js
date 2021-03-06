import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import TrendContainer from '../../Components/TrendContainer'
import PieContainer from '../../Components/PieContainer'
import InfoContainer from '../../Components/InfoContainer'
import PrimaryModelContainer from '../../Components/PrimaryModelContainer'
import WeeklyRankContainer from '../../Components/WeeklyRankContainer'

function App() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Header />
            <section className="main-section">
                <Container>
                    <Col>
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
                                    <PrimaryModelContainer />
                                </div>

                                <div className="component component-5">
                                    <WeeklyRankContainer />
                                </div>
                            </div>
                        </Row>
                    </Col>
                </Container>
            </section>
            <Footer />
        </>
    )
}

export default App
