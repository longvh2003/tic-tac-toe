import styled from "styled-components";
import { StateProps } from "..";

export const GameOverModal = ({
  state,
  wordPerMin,
  characterPerMin,
  score,
  isOpenModal,
  setOpenModal,
}: {
  state: StateProps;
  wordPerMin: number;
  characterPerMin: number;
  score: number;
  isOpenModal: boolean;
  setOpenModal: (v: boolean) => void;
}) => {
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
    <>
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
    </>
  );
};

const Modal = styled.div`
  width: 500px;
  height: 270px;
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
