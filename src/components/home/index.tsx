import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { listParagraph } from "../common";
import {
  QuestionCircleOutlined,
  SettingOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Slider } from "antd";
import "antd/dist/antd.css";
import { GameOverModal } from "./modal/GameOver";
import { TutorialModal } from "./modal/TutorialModal";
import { SettingModal } from "./modal/SettingModal";

const music = require("../../shared/music/KissMeMore.mp3");

const randomInterger = (maxNumber: number) => {
  return Math.floor(Math.random() * maxNumber);
};

const innitValue = {
  index: 0,
  misTakes: 0,
};
let intervalTimer;

export interface StateProps {
  index: number;
  misTakes: number;
}

export const Home = () => {
  const [state, setState] = useState<StateProps>(innitValue);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [characterPerMin, setCharacterPerMin] = useState<number>(0);
  const [wordPerMin, setWordPerMin] = useState<number>(0);
  const [isStart, setStart] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [isOpenTutorial, setOpenTutorial] = useState<boolean>(false);
  const [isOpenSettings, setOpenSettings] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [volume, setVolume] = useState<number>(5);
  const audioRef = useRef<HTMLAudioElement>(null);

  useLayoutEffect(() => {
    setState({ ...innitValue, index: randomInterger(listParagraph.length) });
  }, []);

  const handlerKeyDown = (event) => {
    if (
      !isOpenSettings &&
      !isOpenTutorial &&
      ((event.keyCode >= 65 && event.keyCode <= 105) ||
        (event.keyCode >= 186 && event.keyCode <= 192) ||
        event.keyCode === 32 ||
        event.keyCode === 220 ||
        event.keyCode === 222 ||
        event.keyCode === 231)
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

  return (
    <Backgroud>
      {isStart && (
        <WrapperAudio>
          <audio id="audio" controls autoPlay ref={audioRef}>
            <source src={music.default} type="audio/mpeg" />
          </audio>
        </WrapperAudio>
      )}
      <Tutorial>
        <div
          className="question"
          onClick={() => {
            setOpenTutorial(true);
            setOpenSettings(false);
          }}
        >
          <QuestionCircleOutlined style={{ fontSize: 32 }} />
        </div>
        <div
          className="setting"
          onClick={() => {
            setOpenSettings(true);
            setOpenTutorial(false);
          }}
        >
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
      <GameOverModal
        state={state}
        wordPerMin={wordPerMin}
        characterPerMin={characterPerMin}
        score={score}
        isOpenModal={isOpenModal}
        setOpenModal={setOpenModal}
      />
      <TutorialModal
        isOpenTutorial={isOpenTutorial}
        setOpenTutorial={setOpenTutorial}
      />
      <SettingModal
        isOpenSettings={isOpenSettings}
        setOpenSettings={setOpenSettings}
        audioRef={audioRef}
        volume={volume}
        setVolume={setVolume}
      />
    </Backgroud>
  );
};

const Backgroud = styled.div`
  height: 100vh;
  background-color: #d7dbc1;
`;

const WrapperAudio = styled.div`
  opacity: 0;
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
  min-width: 900px;
  with: 70%;
  height: 450px;
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
    height: 72%;

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
