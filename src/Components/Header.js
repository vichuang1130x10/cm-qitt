/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styled from "styled-components";
// import logo from '../logo.svg'

const Header = styled.nav`
  background: #fff;
  box-shadow: 0 0 1px rgba(0, 65, 94, 0.2);
  z-index: 102;
  transition: height 600ms 0s ease;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  @media (min-width: 680px) {
    height: 70px;
  }

  @media (max-width: 679px) {
    height: 50px;
  }

  & .nav-container {
    padding-top: 0;
    padding-bottom: 0;
    width: 100%;
    position: relative;
    max-width: 1260px;
    margin: 0 auto;
  }

  & .nav-list {
    list-style: none;
    position: relative;
    width: 100%;
    margin: 0 auto;
    text-align: right;
    padding-left: 0;
  }

  & .nav-item {
    margin: 0 30px;
    font-weight: 700;
    font-size: 14px;
    display: inline-block;
    color: #387bab;

    @media (min-width: 680px) {
      line-height: 70px;
    }
  }

  & .nav-item-logo {
    position: absolute;
    left: 0;
    top: 26px;
  }

  & .nav-item-logo-container {
    margin: 0;
    padding: 0;

    a {
      display: inline-block;
      position: relative;
      text-decoration: none;
      img {
        display: block;
        width: 132px;
        height: 32px;
      }
    }

    & .app-logo {
      color: #3e474f;
      font-weight: 700;
      cursor: pointer;
    }
  }

  & .nav-block {
    display: inline-block;
    margin-right: 120px;
  }
`;

export default function App() {
  return (
    <Header>
      <div className="nav-container">
        <ul className="nav-list">
          <li className="nav-item nav-item-logo">
            <h6 className="nav-item-logo-container">
              <a className="app-logo">SMC-QA DASHBOARD</a>
            </h6>
          </li>
          <div className="nav-block">
            <li className="nav-item nav-item-second current">Dashboard</li>
            <li className="nav-item nav-item-second">Models</li>
            <li className="nav-item nav-item-second">Data</li>
          </div>
        </ul>
      </div>
    </Header>
  );
}
