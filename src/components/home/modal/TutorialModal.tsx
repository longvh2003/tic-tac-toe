import { CloseCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

export const TutorialModal = ({
  isOpenTutorial,
  setOpenTutorial,
}: {
  isOpenTutorial: boolean;
  setOpenTutorial: (v: boolean) => void;
}) => {
  return (
    <>
      {isOpenTutorial && (
        <Modal>
          <CloseCircleOutlined onClick={() => setOpenTutorial(false)} />
          <div className="container">
            <div className="tutorial-title">Tutorial</div>
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
        </Modal>
      )}
    </>
  );
};

const Modal = styled.div`
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
    .tutorial-title {
      text-align: center;
      font-weight: 500;
      font-size: 24px;
    }
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
      margin-top: 30px;
    }
  }
`;
