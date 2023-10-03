import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "../About/AboutContainer";
import { Text, TextBox } from "../About/AboutText";
import { useRecoilState } from "recoil";
import { GoalCheckState, GoalMoneyState } from "../../../states/GoalMoneyState";

interface DetailReportProp {
  title: string;
  content: string;
}

function DetailReport(props: DetailReportProp) {
  const { title, content } = props;

  return (
    <Container height="33%">
      <Container height="100%" width="60%">
        <TextBox
          marginL="0%"
          height="100%"
          fontSize="1.3em"
          justifyContent="center"
        >
          {title}
        </TextBox>
      </Container>
      <Container height="100%" width="40%">
        <Text fontsize="1.1rem" marginL="0%">
          {content}
        </Text>
      </Container>
    </Container>
  );
}

const InputInfo = styled.input`
  background-color: transparent;
  border: none;
  // border: 1px solid red;
  border-bottom: 1px solid #969696;
  width: 85%;
  height: 50px;
  font-size: 1em;
  outline: none;
  margin: 5% 0% 5% 0%; /* 각 Input 사이의 간격을 조절할 수 있는 margin 설정 */
  padding-left: 5%;
`;

interface BtnProps {
  width?: string;
  height?: string;
  backcolor?: string;
  fontSize?: string;
}

const Btn = styled.button<BtnProps>`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "70%")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.7em")};
  background-color: ${(props) =>
    props.backcolor ? props.backcolor : "#fbd56e"};
  border-radius: 10px;
  font-weight: bold;
  margin: 5%;
  border: 0;
  padding: 5px;
`;

interface InputListProps {
  title: string;
  placeholder: string;
  type: string;
  id: string;
}

function InputList(props: InputListProps) {
  const [inputValue, setInputValue] = useState("");
  const [goalMoney, setGoalMoney] = useRecoilState(GoalMoneyState);
  const [goalCheck, setGoalCheck] = useRecoilState(GoalCheckState);
  const { title, placeholder, type, id } = props; // props를 디스트럭처링하여 사용
  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };
  const HandleSave = () => {
    setGoalMoney((goalMoney: any) => ({
      ...goalMoney,
      [id]: inputValue,
    }));
    console.log(goalMoney);
    setGoalCheck((prevGoalCheck) => ({
      ...prevGoalCheck,
      [`${id}Check`]: true, // Update the specific property you want
    }));
  };

  return (
    <Container height="33%" flexDirection="column">
      <Container height="50%">
        <TextBox height="">{title}</TextBox>
      </Container>
      <Container height="50%" overflowy="hidden">
        <Container height="100%" width="75%" overflowy="hidden">
          <InputInfo
            type={type}
            placeholder={placeholder}
            id={id}
            onChange={handleInputChange}
          />
        </Container>
        <Container height="100%" width="25%">
          <Btn fontSize="1.2em" onClick={HandleSave}>
            저장
          </Btn>
        </Container>
      </Container>
    </Container>
  );
}

export { DetailReport, InputList, Btn };
