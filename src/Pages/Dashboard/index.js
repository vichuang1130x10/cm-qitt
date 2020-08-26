import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import connect from './connect'
import TrendContainer from '../../Components/TrendContainer'

function App(props) {
    return (
        <>
            <Header />
            <section className="main-section">
                <Container>
                    <Row>
                        <div className="first-row-container">
                            <div className="component component-1">
                                Component-1
                            </div>

                            <div className="component component-2">
                                <TrendContainer />
                            </div>

                            <div className="component component-3">
                                Component-3
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <div className="second-row-container">
                            <div>Component-4</div>

                            <div>Component-5</div>
                        </div>
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    )
}

export default connect(App)
