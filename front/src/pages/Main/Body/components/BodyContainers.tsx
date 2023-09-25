import Container from "./Container";
import * as S from "./BodyCotainers.style";
export interface ContainerType {
  containerId: number;
  containerName: string;
  containerUrl: string;
  containerLanguage: string;
  availableStorage: string;
  containerInfo: string;
  updatedDate: string;
  createdDate: string;
  pinned: boolean;
  owner: string;
  privated: boolean;
  usersImg: Array<{
    id: number;
    imgUrl: string;
    userName: string;
  }>;
}
const containers: ContainerType[] = [
  {
    containerId: 1, // 컨테이너 아이디
    containerName: "9roomthon", // 컨테이너 이름
    containerUrl: "https://github.com/JamesJoe0830", // 컨테이너 주소
    containerLanguage: "python", // 언어 명
    availableStorage: "10GB", // 저장 용량
    containerInfo: "구름톤 챌린지 입니다.", // 컨테이너 소개
    updatedDate: "3일 전에 수정됨", // 수정된 날짜
    createdDate: "3일 전에 수정됨", // 생성 날짜
    pinned: true, // 고정 유무
    owner: "jamesjoe", //소유자 (공유, 내 컨테이너)
    privated: true, //공개 유무
    usersImg: [
      {
        id: 1,
        imgUrl:
          "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
        userName: "조재균",
      },
      {
        id: 2,
        imgUrl:
          "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
        userName: "한승재",
      },
      {
        id: 2,
        imgUrl:
          "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
        userName: "김준서",
      },
      {
        id: 4,
        imgUrl:
          "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
        userName: "김준서",
      },
      {
        id: 2,
        imgUrl:
          "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
        userName: "김준서",
      },
    ], // 컨테이너가 공유된 사용자 이미지(수정자 정보)
  },
  {
    containerId: 2, // 컨테이너 아이디
    containerName: "test2", // 컨테이너 이름
    containerUrl: "https://www.google.com", // 컨테이너 주소
    containerLanguage: "python", // 언어 명
    availableStorage: "10GB", // 저장 용량
    containerInfo: "구름톤 챌린지 입니다.", // 컨테이너 소개
    updatedDate: "3일 전에 수정됨", // 수정된 날짜
    createdDate: "3일 전에 수정됨", // 생성 날짜
    pinned: true, // 고정 유무
    owner: "jamesjoe", //소유자 (공유, 내 컨테이너)
    privated: true, //공개 유무
    usersImg: [
      {
        id: 1,
        imgUrl:
          "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
        userName: "조재균",
      },
    ], // 컨테이너가 공유된 사용자 이미지(수정자 정보)
  },
  {
    containerId: 3, // 컨테이너 아이디
    containerName: "9roomthon", // 컨테이너 이름
    containerUrl: "https://github.com/JamesJoe0830", // 컨테이너 주소
    containerLanguage: "python", // 언어 명
    availableStorage: "10GB", // 저장 용량
    containerInfo: "구름톤 챌린지 입니다.", // 컨테이너 소개
    updatedDate: "3일 전에 수정됨", // 수정된 날짜
    createdDate: "3일 전에 수정됨", // 생성 날짜
    pinned: true, // 고정 유무
    owner: "jamesjoe", //소유자 (공유, 내 컨테이너)
    privated: false, //공개 유무
    usersImg: [
      {
        id: 1,
        imgUrl:
          "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
        userName: "조재균",
      },
    ], // 컨테이너가 공유된 사용자 이미지(수정자 정보)
  },
  {
    containerId: 4, // 컨테이너 아이디
    containerName: "9roomthon", // 컨테이너 이름
    containerUrl: "https://github.com/JamesJoe0830", // 컨테이너 주소
    containerLanguage: "python", // 언어 명
    availableStorage: "10GB", // 저장 용량
    containerInfo: "구름톤 챌린지 입니다.", // 컨테이너 소개
    updatedDate: "3일 전에 수정됨", // 수정된 날짜
    createdDate: "3일 전에 수정됨", // 생성 날짜
    pinned: false, // 고정 유무
    owner: "jamesjoe", //소유자 (공유, 내 컨테이너)
    privated: false, //공개 유무
    usersImg: [
      {
        id: 1,
        imgUrl:
          "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
        userName: "조재균",
      },
    ], // 컨테이너가 공유된 사용자 이미지(수정자 정보)
  },
  {
    containerId: 5, // 컨테이너 아이디
    containerName: "9roomthon", // 컨테이너 이름
    containerUrl: "https://github.com/JamesJoe0830", // 컨테이너 주소
    containerLanguage: "python", // 언어 명
    availableStorage: "10GB", // 저장 용량
    containerInfo: "구름톤 챌린지 입니다.", // 컨테이너 소개
    updatedDate: "3일 전에 수정됨", // 수정된 날짜
    createdDate: "3일 전에 수정됨", // 생성 날짜
    pinned: false, // 고정 유무
    owner: "jamesjoe", //소유자 (공유, 내 컨테이너)
    privated: true, //공개 유무
    usersImg: [
      {
        id: 1,
        imgUrl:
          "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
        userName: "조재균",
      },
    ], // 컨테이너가 공유된 사용자 이미지(수정자 정보)
  },
  {
    containerId: 6, // 컨테이너 아이디
    containerName: "9roomthon", // 컨테이너 이름
    containerUrl: "https://github.com/JamesJoe0830", // 컨테이너 주소
    containerLanguage: "python", // 언어 명
    availableStorage: "10GB", // 저장 용량
    containerInfo: "구름톤 챌린지 입니다.", // 컨테이너 소개
    updatedDate: "3일 전에 수정됨", // 수정된 날짜
    createdDate: "3일 전에 수정됨", // 생성 날짜
    pinned: false, // 고정 유무
    owner: "jamesjoe", //소유자 (공유, 내 컨테이너)
    privated: true, //공개 유무
    usersImg: [
      {
        id: 1,
        imgUrl:
          "https://blog.kakaocdn.net/dn/AFzsZ/btqI088tZW3/HCqq10x0OG9SoMdG2Bo3YK/img.jpg",
        userName: "조재균",
      },
    ], // 컨테이너가 공유된 사용자 이미지(수정자 정보)
  },
];
function BodyContainers() {
  return (
    <>
      <S.ContainersWrapper>
        {containers.map((container) => {
          return <Container data={container} key={container.containerId} />;
        })}
      </S.ContainersWrapper>
    </>
  );
}

export default BodyContainers;
