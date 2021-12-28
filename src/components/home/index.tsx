import { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { listParagraph } from "../common";
import {
  QuestionCircleOutlined,
  SettingOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

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
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [isOpenTutorial, setOpenTutorial] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

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
    if (index === listParagraph[state.index].length - 1 || timeLeft === 0)
      setOpenModal(true);
    setScore(wordPerMin * 2 - state.misTakes);
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
    setWordPerMin(0);
    setCharacterPerMin(0);
    clearInterval(intervalTimer);
  };

  const paragraphs = listParagraph[state.index].split("").map((c, i) => {
    if (i === index) return <span className="underline">{c}</span>;
    return <span className={i < index ? "active" : ""}>{c}</span>;
  });

  const messageTitle = () => {
    if (score < 70) {
      return "u fuking bad bro(sis)!!!!";
    } else if (wordPerMin > 170) {
      return "ur parent proud of u!!";
    } else {
      return "well done my friend!";
    }
  };

  return (
    <Backgroud>
      <Tutorial>
        <div
          className="question"
          id="question"
          onClick={() => setOpenTutorial(true)}
        >
          <QuestionCircleOutlined style={{ fontSize: 32 }} />
        </div>
        <div className="setting">
          <SettingOutlined style={{ fontSize: 32 }} />
        </div>
      </Tutorial>
      <WrapperContainer>
        <div className="wrapper-content">
          <div className="content-info">{paragraphs}</div>
          <div className="content-result">
            <div>Time Left: {timeLeft}</div>
            <div>Mistakes: {state.misTakes}</div>
            <div>WPM: {wordPerMin}</div>
            <div>CPM: {characterPerMin}</div>
            <button onClick={() => tryAgain()}>Try Again</button>
          </div>
        </div>
      </WrapperContainer>
      {isOpenModal && (
        <Modal>
          <div className="title-popup">congrats! {messageTitle()}</div>
          <div className="result">
            <div>Here is ur result:</div>
            <div>Mistakes: {state.misTakes}</div>
            <div>Words per minute: {wordPerMin}</div>
            <div>Characters per minute: {characterPerMin}</div>
            <div className="score">Ur score: {score}</div>
          </div>
          <div className="action">
            <button onClick={() => setOpenModal(false)}>OK</button>
          </div>
        </Modal>
      )}
      {isOpenTutorial && (
        <TutorialModal>
          <CloseCircleOutlined onClick={() => setOpenTutorial(false)} />
          <div className="container">
            <div className="title-tutorial">What is a typing test?</div>
            <div className="content-tutorial">
              A typing test is a practical test that measures your typing speed
              and accuracy while working with an actual passage of text. While
              tests vary, you're typically given a set piece of writing and a
              set time to complete it within. Your test results look at four
              scores, the number of character you can type per minute, known as
              CPM or chracters-per-minute, the number of words you can type per
              minute, known as WPM or words-per-minute, the number of errors you
              have made in the text, and finally your score.
            </div>
            <div className="title-tutorial">How to calculate ur score?</div>
            <div className="content-tutorial">
              <ul>
                <li>2 points for per word u finished.</li>
                <li>-1 point for per mistake u made.</li>
              </ul>
            </div>
            <div className="footer-tutorial">Good Luck!!!</div>
          </div>
        </TutorialModal>
      )}
    </Backgroud>
  );
};

const Backgroud = styled.div`
  height: 100vh;
  background-color: #d7dbc1;
`;

const Tutorial = styled.div`
  display: flex;
  position: absolute;
  top: 15px;
  right: 15px;
  gap: 15px;
  .question,
  .setting {
    cursor: pointer;
  }
`;

const WrapperContainer = styled.div`
  background-color: white;
  min-width: 800px;
  with: 70%;
  height: 350px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgb(0 0 0 / 25%);
  border-radius: 10px;
  padding: 20px;
  font-size: 22px;
  z-index: 9;
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
  .content-result {
    display: flex;
    justify-content: space-around;
    padding: 36px 0;
    div {
      border-right: 1px solid rgb(0 0 0 / 25%);
      padding-right: 36px;
    }
    button {
      outline: none;
      border: none;
      background-color: #d7dbc1;
      border-radius: 5px;
      padding: 10px;
      cursor: pointer;
    }
  }
`;

const Modal = styled.div`
  width: 500px;
  height: 250px;
  position: absolute;
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgb(0 0 0 / 25%);
  background-color: white;
  border-radius: 10px;
  .title-popup {
    text-transform: uppercase;
    font-weight: 500;
    margin: 30px 0 0 105px;
  }
  .result {
    margin: 30px 0 0 105px;
    .score {
      color: #e14f4f;
      font-weight: 500;
    }
  }
  .action {
    text-align: center;
    margin-top: 25px;
    button {
      width: 100px;
      height: 30px;
      border: none;
      outline: none;
      border-radius: 5px;
      background-color: #d7dbc1;
      cursor: pointer;
    }
  }
`;

const TutorialModal = styled.div`
  width: 500px;
  height: 500px;
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgb(0 0 0 / 25%);
  background-color: white;
  border-radius: 10px;
  .anticon-close-circle {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 22px;
    cursor: pointer;
  }
  .container {
    padding: 30px 40px 30px;
    .title-tutorial,
    .footer-tutorial {
      text-align: center;
      font-weight: 500;
    }
    .title-tutorial {
      margin-top: 20px;
    }
    .content-tutorial {
      margin-top: 20px;
      ul {
        margin-left: -20px;
      }
    }
    .footer-tutorial {
      margin-top: 40px;
    }
  }
`;
