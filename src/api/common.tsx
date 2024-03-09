import axios from 'axios'
// import Cookies from 'js-cookie';

// import { JwtAccessTokenError, JwtRefreshTokenError } from '@/constants/common';

// 백엔드 코드 협의
export type ResponseCodeType =
  | 1000
  | '2000'
  | '2004'
  | '2005'
  | '2009'
  | '9001'
  | 3000

/**
 * 현재 구조는 {code, message, data}로 받는다
 */
export interface Response<T> {
  code: ResponseCodeType
  message: string
  data?: T
}

export const instance = axios.create()

instance.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL_BASE

// instance.interceptors.request.use(
//   async (config) => {
//     const accessToken = Cookies.get('accessToken');
//     if (accessToken) {
//       config.headers['Authorization'] = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   function (error) {
//     // 요청 오류가 있는 작업 수행
//     return Promise.reject(error);
//   },
// );

// instance.interceptors.response.use(
//   (res) => {
//     //2003 권한이 없습니다.
//     if (res?.data?.code === 2003) {
//       window.location.href = '/admin/unauthorized';

//       return Promise.reject('Unauthorized: 권한이 없습니다');
//     }
//     return res;
//   },
//   async (err) => {
//     const errorCode = err?.response?.data?.code;

//     //인증정보 변경(2303 refreshToken토큰 조작)
//     if (JwtRefreshTokenError.includes(errorCode)) {
//       window.location.href = 'https://dwp.lotte.net/';
//       return;
//     }

//     if (JwtAccessTokenError.includes(errorCode)) {
//       try {
//         const {
//           data: { accessToken },
//         } = await instance.post(`/token/refresh`).then((response) => response.data);

//         if (accessToken) {
//           Cookies.set('accessToken', accessToken, { path: '/', httpOnly: false });
//           const newAccessToken = Cookies.get('accessToken');
//           err.config.headers.Authorization = `Bearer ${newAccessToken}`;

//           return instance(err.config);
//         } else {
//           return Promise.reject(err);
//         }
//       } catch (refreshError) {
//         //400, 500 api error(서버 api 문제 발생 시)
//         console.log(`error 발생 : ${err?.response}`);
//       }
//     } else {
//       // 토큰 에러가 아닌 경우 넘김
//       return Promise.reject(err);
//     }
//   },
// );
