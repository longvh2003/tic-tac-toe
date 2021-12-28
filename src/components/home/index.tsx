import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { listParagraph } from "../common";

const randomInterger = (maxNumber: number) => {
  return Math.floor(Math.random() * maxNumber);
};

const innitValue = {
  index: 0,
  misTakes: 0,
};
let intervalTimer;

export const Home = () => {
  const [state, setState] = useState(innitValue);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [characterPerMin, setCharacterPerMin] = useState<number>(0);
  const [wordPerMin, setWordPerMin] = useState<number>(0);
  const [isStart, setStart] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  useLayoutEffect(() => {
    setState({ ...innitValue, index: randomInterger(listParagraph.length) });
  }, []);

  const handlerKeyDown = (event) => {
    if (
      (event.keyCode >= 65 && event.keyCode <= 105) ||
      (event.keyCode >= 186 && event.keyCode <= 192) ||
      event.keyCode === 32 ||
      event.keyCode === 220 ||
      event.keyCode === 222 ||
      event.keyCode === 231
    ) {
      if (!isStart) {
        setStart(true);
        intervalTimer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev === 1) {
              clearInterval(intervalTimer);
            }
            return prev - 1;
          });
        }, 1000);
      }
      if (event.key === listParagraph[state.index].split("")[index]) {
        setIndex(index + 1);
      } else {
        setState({ ...state, misTakes: state.misTakes + 1 });
      }
    }
  };

  useEffect(() => {
    if (timeLeft < 60) {
      setCharacterPerMin(Math.floor((60 * index) / (60 - timeLeft)));
      const finishWord = listParagraph[state.index]
        .slice(0, index + 1)
        .split("")
        .filter((character) => character === " ").length;
      setWordPerMin(Math.floor((60 * finishWord) / (60 - timeLeft)));
    }
    // eslint-disable-next-line
  }, [timeLeft, index]);

  useEffect(() => {
    if (timeLeft > 0) window.addEventListener("keydown", handlerKeyDown);
    return () => {
      window.removeEventListener("keydown", handlerKeyDown);
    };
  });

  const tryAgain = () => {
    setState({ ...innitValue, index: randomInterger(listParagraph.length) });
    setTimeLeft(60);
    setStart(false);
    setIndex(0);
    clearInterval(intervalTimer);
  };

  const paragraphs = listParagraph[state.index].split("").map((c, i) => {
    if (i === index) return <span className="underline">{c}</span>;
    return <span className={i < index ? "active" : ""}>{c}</span>;
  });

  return (
    <Backgroud>
      <WrapperContainer>
        <div className="wrapper-content">
          <div className="content-info">{paragraphs}</div>
          <div className="action">
            <div>Time Left: {timeLeft}</div>
            <div>Mistakes: {state.misTakes}</div>
            <div>WPM: {wordPerMin}</div>
            <div>CPM: {characterPerMin}</div>
            <button onClick={() => tryAgain()}>Try Again</button>
          </div>
        </div>
      </WrapperContainer>
    </Backgroud>
  );
};

const Backgroud = styled.div`
  height: 100vh;
  background-color: #d7dbc1;
`;

const WrapperContainer = styled.div`
  background-color: white;
  width: 70vw;
  height: 40vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgb(0 0 0 / 25%);
  border-radius: 10px;
  padding: 20px;
  font-size: 22px;
  .wrapper-content {
    height: 94%;
    border: 1px solid rgb(0 0 0 / 25%);
    padding: 10px;
    border-radius: 10px;
  }
  .content-info {
    padding: 10px 10px 40px;
    border-bottom: 1px solid rgb(0 0 0 / 25%);
    color: rgb(0 0 0 / 25%);
    height: 56%;
    .active {
      color: black;
    }
    .underline {
      text-decoration: underline;
    }
  }
  .action {
    display: flex;
    justify-content: space-around;
    padding: 36px 0;
    div {
      border-right: 1px solid rgb(0 0 0 / 25%);
      padding-right: 40px;
    }
    button {
      outline: none;
      border: none;
      background-color: #d7dbc1;
      border-radius: 5px;
      padding: 10px;
    }
  }
`;
