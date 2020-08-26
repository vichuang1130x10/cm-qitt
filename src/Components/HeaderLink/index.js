import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from '@reach/router'
import connect from './connect'

const NavLink = styled.div`
    ${(props) =>
        (props.isSelected &&
            css`
                color: #4a4a4a;
            `) ||
        (!props.isSelected &&
            css`
                color: inherit;
                border-bottom: none;
            `)}
    & .link-border {
        border-bottom: ${(props) =>
            props.isSelected ? '2px solid #b7c0c7' : 'none'};
        display: inline;
    }
`

const HeaderLink = ({ active, children, onClick, to }) => (
    <Link onClick={onClick} to={to}>
        <NavLink isSelected={active}>
            <p className="link-border">{children}</p>
        </NavLink>
    </Link>
)

export default connect(HeaderLink)
