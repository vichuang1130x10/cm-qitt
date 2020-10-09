import React, { useState } from 'react'
import styled from 'styled-components'
import direction from '../images/direction.png'

const Nav = styled.div`
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`

const NavHeader = styled.div`
    max-width: 1200px;
    padding: 20px 20px 5px 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
`

const NavTitle = styled.div`
    margin: 20px 0 10px 0;
    padding: 0 64px;
    font-family: 'Oswald', sans-serif;
`

const NavSubTitle = styled.div`
    color: #606060;
    padding: 0 64px;
`

const DataRange = styled.div`
    padding: 20px 64px;
`

const Input = styled.input`
    font-size: 16px;
    border: solid 1px #dbdbdb;
    border-radius: 3px;
    color: #262626;
    padding: 7px 33px;
    border-radius: 3px;
    color: #999;
    cursor: text;
    font-size: 14px;
    font-weight: 300;
    text-align: center;

    width: 20%;
    margin: 0px 128px 10px 128px;

    &:active,
    &:focus {
        text-align: left;
    }
`

const ModelContainer = styled.div`
    max-width: 1000px;
    height: 62px;
    display: grid;
    grid-template-columns: 20% 18% 18% 18% 18%;
    grid-gap: 10px;
    margin-left: 80px;
    border-radius: 5px;
`
// border: 1px solid rgba(0, 0, 0, 0.0975);
const ModelBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 6px;
    > img {
        width: 15px;
        margin-left: 6px;
    }
`

export default function SearchHeader(props) {
    const [value, setValue] = useState('')
    const {
        stations,
        sortModelName,
        sortStation0Flag,
        sortStation1Flag,
        sortStation2Flag,
        sortStation3Flag,
        searchBarOnchanged,
        date,
    } = props

    const onValueChanged = (v) => {
        setValue(v)
        searchBarOnchanged(v)
    }

    return (
        <Nav>
            <NavHeader>
                <NavTitle>
                    <h3>Select Primary Model</h3>
                </NavTitle>
                <DataRange>
                    <h6>Date Range : {date}</h6>
                </DataRange>
                <NavSubTitle>
                    <h6>models: </h6>
                </NavSubTitle>
                <Input
                    Input
                    type={value}
                    onChange={(e) => onValueChanged(e.target.value)}
                    placeholder="Model Search"
                />
                <ModelContainer>
                    <ModelBlock>
                        Model
                        <img
                            src={direction}
                            alt="direction"
                            width="15px"
                            onClick={() => sortModelName()}
                        />
                    </ModelBlock>

                    <ModelBlock>
                        {stations[0]}
                        <img
                            src={direction}
                            alt="direction"
                            width="15px"
                            onClick={() => sortStation0Flag}
                        />
                    </ModelBlock>

                    <ModelBlock>
                        {stations[1]}
                        <img
                            src={direction}
                            alt="direction"
                            width="15px"
                            onClick={() => sortStation1Flag}
                        />
                    </ModelBlock>
                    <ModelBlock>
                        {stations[2]}
                        <img
                            src={direction}
                            alt="direction"
                            width="15px"
                            onClick={() => sortStation2Flag}
                        />
                    </ModelBlock>
                    <ModelBlock>
                        {stations[3]}
                        <img
                            src={direction}
                            alt="direction"
                            width="15px"
                            onClick={() => sortStation3Flag}
                        />
                    </ModelBlock>
                </ModelContainer>
            </NavHeader>
        </Nav>
    )
}
