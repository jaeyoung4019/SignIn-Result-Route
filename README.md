# 로그인 결과 값에 따라 라우트 경로 지정하기

## 개발 상황

KeyCloak 과 연동해서 로그인을 구현하는데 KeyCloak 에 연동된 상태여도 회원가입로직을 통해서 우리 DB 에 필수 값으로 받아야하는 것들이 있었습니다.
그래서 추가적인 회원가입 폼을 통해 받는 로직을 넣어야 했습니다.
플로우는 Open ID Connect 후 처리 후 리다이렉션 받은 페이지에서 처리 후 우리 DB 에 있는 멤버인지 아닌지 분별하여 라우팅을 다르게 하는 것입니다.

## 생각한 구조

Lazy 와 useEffect 를 활용해서 Guard 처럼 먼저 인식되는 Component 를 생성하도록 하여 리다이렉션 시키거나 노출하도록 하겠습니다.

login Button 클릭 -> 키클락 로그인 페이지 -> 로그인 후 리다이렉션 /signUp/step1 -> Guard Component 선 처리 후 -> SignUp Compoent 렌더링 or navigate 
