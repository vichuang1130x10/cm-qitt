import React, { useState } from 'react'
import styled from 'styled-components'
import direction from '../../images/direction.png'
import connect from './connect'

const Nav = styled.div`
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
    z-index: 10;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    > button {
        padding: 10px 20px;
        outline: none;
        background-color: transparent;
        border-radius: 5px;
        border: 1px solid black;
        transition: all 0.5s;
        &:hover {
            background-color: #123abc;
            color: #fff;
            transform: translateY(-5px);
            border: 1px solid transparent;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        &:active {
            transform: translateY(2px);
        }
    }
`

const NavSubTitle = styled.div`
    color: #606060;
    padding: 0 64px;
    margin-bottom: 40px;
    > .models {
        display: flex;
        justify-content: flex-start;

        > p {
            margin-left: 15px;
            color: #123abc;
        }
    }
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

function App({
    completeSelection,
    stations,
    sortModelName,
    setSortStation0,
    setSortStation1,
    setSortStation2,
    setSortStation3,
    searchBarOnchanged,
    date,
    primaryState,
}) {
    const [value, setValue] = useState('')
    // const {
    //     stations,
    //     sortModelName,
    //     setSortStation0,
    //     setSortStation1,
    //     setSortStation2,
    //     setSortStation3,
    //     searchBarOnchanged,
    //     date,
    // } = props

    const onValueChanged = (v) => {
        setValue(v)
        searchBarOnchanged(v)
    }

    return (
        <Nav>
            <NavHeader>
                <NavTitle>
                    <h3>Select Primary Model</h3>
                    <button onClick={() => completeSelection()}>
                        {' '}
                        Complete Primary Selection
                    </button>
                </NavTitle>
                <DataRange>
                    <h6>Date Range : {date}</h6>
                </DataRange>
                <NavSubTitle>
                    <div className="models">
                        <h6>models: </h6>
                        {primaryState.map((model) => (
                            <p key={model}>{model}</p>
                        ))}
                    </div>
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
                            onClick={() => setSortStation0()}
                        />
                    </ModelBlock>

                    <ModelBlock>
                        {stations[1]}
                        <img
                            src={direction}
                            alt="direction"
                            width="15px"
                            onClick={() => setSortStation1()}
                        />
                    </ModelBlock>
                    <ModelBlock>
                        {stations[2]}
                        <img
                            src={direction}
                            alt="direction"
                            width="15px"
                            onClick={() => setSortStation2()}
                        />
                    </ModelBlock>
                    <ModelBlock>
                        {stations[3]}
                        <img
                            src={direction}
                            alt="direction"
                            width="15px"
                            onClick={() => setSortStation3()}
                        />
                    </ModelBlock>
                </ModelContainer>
            </NavHeader>
        </Nav>
    )
}

export default connect(App)
