import React from 'react'
import connect from './connect'
import styled from 'styled-components'

const CategoryButton = styled.button`
    font-size: 12px;
    margin-left: 20px;
    background-color: transparent;
    border: none;
    outline: none;
    transition: all 0.5s;
    border-bottom: 1px solid #ccc;
    color:${(props) => (props.disabled ? '#ccc' : 'blue')}
    &:active,
    &:focus {
        color: blue;
        border-bottom: 1px solid #123abc;
        outline: none;
    }
`

const Link = ({ children, onClick }) => (
    <CategoryButton
        onClick={onClick}
        style={{
            marginLeft: '4px',
        }}
    >
        {children}
    </CategoryButton>
)

export default connect(Link)
