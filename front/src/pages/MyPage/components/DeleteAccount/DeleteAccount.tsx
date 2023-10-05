import React, { useRef, useState } from "react";
import * as S from "./DeleteAccount.style";
import PasswordInput from "../PasswordInput/PasswordInput";
import { useMyAPI } from "../../../../api/useMyAPI";

function DeleteAccount() {
  const [isOpen, setOpen] = useState(false);

  const ref = useRef<HTMLInputElement>(null);
  const { requestDeleteUser } = useMyAPI();

  const cancelHandler = () => {
    setOpen(!isOpen);
  };
  const deleteUserHandler = () => {
    requestDeleteUser(ref.current!.value);
  };
  return (
    <React.Fragment>
      <S.Button onClick={() => setOpen(true)}>회원 탈퇴</S.Button>
      {isOpen && (
        <S.Overlay>
          <S.Modal>
            <S.Title>회원 탈퇴</S.Title>
            <S.Content>
              <S.InfoWrapper>
                <S.Text>
                  삭제되는 주요 데이터는 아래와 같으며, 7일 후에 처리됩니다.
                </S.Text>
                <S.Text>
                  계정 복구를 원하신다면, 그 이전에 contact@ogjg.io로 연락해주시기
                  바랍니다.
                </S.Text>
              </S.InfoWrapper>
              <S.InfoWrapper>
                <S.Text>서비스 공통</S.Text>
                <S.Li>이메일, 학생 인증, 정기 결제 정보, 이용 내역 등</S.Li>
                <S.Text>OGJG IDE</S.Text>
                <S.Li>프로젝트, 컨테이너 정보, 채팅, 편집 이력 등</S.Li>
              </S.InfoWrapper>
              <S.InfoWrapper>
                <PasswordInput placeholder="비밀번호" ref={ref} />
              </S.InfoWrapper>
              <S.EndWrapper>
                <S.CancelButton onClick={cancelHandler}>취소</S.CancelButton>
                <S.DeleteButton onClick={deleteUserHandler}>탈퇴하기</S.DeleteButton>
              </S.EndWrapper>
            </S.Content>
          </S.Modal>
        </S.Overlay>
      )}
    </React.Fragment>
  );
}

export default DeleteAccount;
