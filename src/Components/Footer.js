import React from 'react'
import styled from 'styled-components'

const Footer = styled.footer`
    bottom: 0;
    right: 0;
    left: 0;
    position: relative;
    height: 70px;
    margin-top: 500px;

    padding: 30px 110px;
    border: 1px solid #e9e9eb;
    border-bottom: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & .footer-copy-right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 10px;
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        color: #4c4c4c;
    }
`
export default function () {
    return (
        <div>
            <Footer>
                <div> </div>
                <div className="footer-copy-right">© 2020 SMC QA</div>
            </Footer>
        </div>
    )
}
