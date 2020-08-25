import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import connect from './connect'
// import Footer from '../Components/Footer'

function App(props) {
    return (
        <>
            <Header />
            <section className="main-section">
                <Container>
                    <Row></Row>
                    <Row>Row 2, this row will be have 2 cols</Row>
                </Container>
            </section>
            <Footer />
        </>
    )
}

export default connect(App)
