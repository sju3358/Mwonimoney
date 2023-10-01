import React, { useEffect } from "react";
import ChallengeAdd from "../Common/Challenge/ChallengeAdd";
import ChallengeCategory from "../Common/Challenge/ChallengeCategory";
import ChallengeList, {
  ChallengeListContainer,
} from "../Common/Challenge/ChallengeList";
import ChallengeTitle from "../Common/Challenge/ChallengeTitle";
import { MainContainer } from "../Common/Main/Main";

//axios
import { api } from "../../apis/Api";

//리코일
import { useRecoilState } from "recoil";
import { ChallengeStore } from "../../states/ChallengeState";
import { isProposeChallenge } from "../../states/ChallengeState";

function Challenge() {
  const status_value = 5;
  //값 어떻게 가져올지 생각하기!!
  const extramemberUuid_value = "d3a58e6c-14d7-4b3a-b58f-982aafc9836b";

  const [ChallengeData, setChallengeData] = useRecoilState(ChallengeStore);
  const [isProposeState, setisProposeState] =
    useRecoilState(isProposeChallenge);

  useEffect(() => {
    api
      .get(
        `/v1/challenges?status=${status_value}&extramemberUuid=${extramemberUuid_value}`
      )
      .then((response) => {
        // 성공적으로 요청이 완료된 경우 처리할 로직
        console.log("GET 요청 성공:", response.data);
        setChallengeData(response.data);
        setisProposeState(false);
      })
      .catch((error) => {
        // 요청이 실패한 경우 처리할 로직
        if (error.response) {
          // 서버에서 응답이 왔지만, 응답 상태 코드가 실패인 경우
          console.error("GET 요청 실패 - 응답 데이터:", error.response.data);
        } else if (error.request) {
          // 서버로 요청을 보내지 못한 경우
          console.error("GET 요청 실패 - 요청을 보낼 수 없음");
        } else {
          // 요청 준비 과정에서 에러가 발생한 경우
          console.error("GET 요청 실패 - 요청 준비 중 에러 발생");
        }
      });
  }, [isProposeState]);

  return (
    <MainContainer>
      <ChallengeTitle />
      <ChallengeCategory />
      <ChallengeAdd />
      <ChallengeListContainer>
        <>
          {ChallengeData.length > 0 ? (
            <>
              {ChallengeData.map((challenge) => (
                <ChallengeList
                  data={challenge}
                  key={challenge.memberChallengeIdx}
                />
              ))}
            </>
          ) : (
            <>챌린지를 생성해주세요!!</>
          )}
        </>
      </ChallengeListContainer>
    </MainContainer>
  );
}

export default Challenge;
