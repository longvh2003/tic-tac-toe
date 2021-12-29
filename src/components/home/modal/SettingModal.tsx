import { CloseCircleOutlined } from "@ant-design/icons";
import { Slider } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";

export const SettingModal = ({
  isOpenSettings,
  setOpenSettings,
  audioRef,
  volume,
  setVolume,
}: {
  isOpenSettings: boolean;
  setOpenSettings: (v: boolean) => void;
  audioRef: any;
  volume: number;
  setVolume: (v: number) => void;
}) => {
  const handleChangeVolume = (value: number) => {
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value / 10;
  };

  return (
    <>
      {isOpenSettings && (
        <Modal>
          <CloseCircleOutlined onClick={() => setOpenSettings(false)} />
          <div className="wrapper-setting">
            <div className="setting-title">Setting</div>
            <div className="setting-component">
              <div>Volumn</div>
              <Slider
                min={0}
                max={10}
                value={volume}
                onChange={(value) => handleChangeVolume(value)}
              />
              <div className="volume">{volume}</div>
            </div>
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
  .wrapper-setting {
    padding: 40px 40px 30px;
    .setting-title {
      text-align: center;
      font-weight: 500;
      font-size: 24px;
    }
    .setting-component {
      margin-top: 40px;
      display: flex;
      .ant-slider {
        width: 50%;
        margin: 7px 0px 0 20px;
      }
      .volume {
        margin-left: 20px;
      }
    }
  }
`;
