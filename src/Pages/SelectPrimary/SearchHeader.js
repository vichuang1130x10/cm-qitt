import React, { useState } from "react";
import styled from "styled-components";
import direction from "../images/direction.png";
import { Link } from "@reach/router";

const Nav = styled.div`
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;

const NavHeader = styled.div`
  max-width: 1200px;
  padding: 20px 20px 5px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const NavTitle = styled.div`
  margin: 20px 0 10px 0;
  padding: 0 64px;
  font-family: "Oswald", sans-serif;
`;

const NavSubTitle = styled.div`
  color: #606060;
  padding: 0 64px;
`;

const DataRange = styled.div`
  padding: 20px 64px;
`;

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
`;

export default function HeaderWithSearchBar(props) {
  const [value, setValue] = useState("");

  const onValueChanged = (v) => {
    setValue(v);
    props.searchBarOnchanged(v);
  };

  return (
    <Nav>
      <NavHeader>
        <NavTitle>
          <Link to="/" style={{ color: "#000" }}>
            <h3>SUPERMICRO ME</h3>
          </Link>
        </NavTitle>
        <NavSubTitle>
          <h2>Quality Improvement Tracking Tool For EMS</h2>
        </NavSubTitle>
        <DataRange>
          <h6>Date Range : {props.date}</h6>
        </DataRange>
        <Input
          Input
          type={value}
          onChange={(e) => onValueChanged(e.target.value)}
          placeholder="Model Search"
        />
        <div className="progress-control">
          <div className="progress-control-div">
            Model{" "}
            <img
              src={direction}
              alt="direction"
              width="15px"
              onClick={() => props.sortModelName()}
            />
          </div>
          <div className="progress-control-outer">
            <div className="progress-control-div">
              F/E Yield
              <img
                src={direction}
                alt="direction"
                width="15px"
                onClick={() => props.sortFE()}
              />
            </div>
            <p>(SMT1 + SMT2)</p>
          </div>
          <div className="progress-control-outer">
            <div className="progress-control-div">
              B/E Yield
              <img
                src={direction}
                alt="direction"
                width="15px"
                onClick={() => props.sortBE()}
              />
            </div>
            <p>(ASM + CPLD + VCL + FCT + DAOI)</p>
          </div>
          <div className="progress-control-div">
            FTY{" "}
            <img
              src={direction}
              alt="direction"
              width="15px"
              onClick={() => props.sortFTY()}
            />
          </div>
        </div>
      </NavHeader>
    </Nav>
  );
}
