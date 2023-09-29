import React, { useEffect } from "react";
import jwt from "jwt-decode";
import { useRecoilState } from "recoil";
import { userDataState } from "../../states/UserInfoState";
import axios, { AxiosResponse } from "axios";
import { api } from "../../apis/Api";

// JWT 토큰의 형태를 정의
interface JwtToken {
  sub: string;
  exp: number;
  auth: string;
  // 다른 필드들도 필요한 경우 여기에 추가
}

// Axios 요청 전에 요청 URL을 콘솔에 출력하는 인터셉터
axios.interceptors.request.use(
  (config: any) => {
    console.log("Request URL:", config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface PostRegisterProps {
  bearerToken: string;
}

export const postRegister = (
  props: PostRegisterProps
): Promise<AxiosResponse> => {
  // axios 요청을 보낼 때 Authorization 헤더 설정
  return api.get("/v1/members", {
    headers: {
      Authorization: `Bearer ${props.bearerToken}`,
    },
  });
};

function KakaoLoginRedirect() {
  const [userInfo, setUserInfo] = useRecoilState(userDataState);

  useEffect(() => {
    // URL에서 JWT 토큰 추출 (카카오 로그인 콜백에서 전달된 토큰)
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");

    if (accessToken) {
      // JWT 토큰 디코딩
      const decodedToken = jwt<JwtToken>(accessToken);

      localStorage.setItem("accessToken", accessToken);

      // postRegister를 사용하여 데이터를 가져오기
      postRegister({ bearerToken: accessToken })
        .then((response) => {
          // 데이터를 성공적으로 받았을 때의 처리
          console.log("postRegister 응답 데이터:", response.data);

          // 사용자 정보 업데이트
          const updatedUserInfo = {
            idx: decodedToken.sub,
            uuid: response.data.idx, // 적절한 값으로 대체
            status: response.data.status, // 적절한 값으로 대체
            name: response.data.name, // 적절한 값으로 대체
            nickname: response.data.nickname, // 적절한 값으로 대체
            birthday: response.data.birthday, // 적절한 값으로 대체
            socialProvider: response.data.socialProvider, // 오타 수정
            socialId: response.data.socialId, // 오타 수정
            memberRole: response.data.memberRole, // 적절한 값으로 대체
            token: accessToken,
          };
          setUserInfo(updatedUserInfo);

          // 리디렉션 (예: 홈 페이지로)
          window.location.href = `${process.env.REACT_APP_BASE_URL}`;
        })
        .catch((error) => {
          // 에러가 발생했을 때의 처리
          console.error("postRegister 오류:", error);
        });
    }
  }, []);

  return <div>Redirecting...</div>;
}

export default KakaoLoginRedirect;
