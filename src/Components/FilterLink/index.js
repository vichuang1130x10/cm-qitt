import React from 'react'
import connect from './connect'
import styled, { css } from 'styled-components'

const CategoryButton = styled.button`
    font-size: 12px;
    margin-left: 20px;
    background-color: transparent;
    border: none;
    outline: none;
    transition: all 0.5s;
    border-bottom: 1px solid #ccc;
    ${(props) =>
        (props.isActive &&
            css`
                color: #123abc;
                border-bottom: 2px solid #b7c0c7;
                font-weight: bold;
            `) ||
        (!props.isActive &&
            css`
                color: inherit;
                border-bottom: none;
                font-weight: 400;
            `)}
`

const Link = ({ active, children, onClick }) => (
    <CategoryButton
        isActive={active}
        onClick={onClick}
        style={{
            marginLeft: '4px',
        }}
    >
        {children}
    </CategoryButton>
)

export default connect(Link)
