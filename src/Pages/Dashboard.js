import React from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

export default function App(){
    return (
        <>
        <Header/>
        <section className="main-section">
            <Container>
                <Row>Row 1, this row will be have 3 cols</Row>
                <Row>Row 2, this row will be have 2 cols</Row>
            </Container>
        </section>
        {/* <Footer /> */}
        </>
    )
}