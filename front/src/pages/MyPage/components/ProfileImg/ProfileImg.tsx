import { useState } from "react";
import * as S from "./ProfileImg.style";

function ProfileImg() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxSize = 1024 ** 2;
    const files = e.target.files;
    if (files) {
      const uploadFile = files[0];
      const size = uploadFile.size;
      if (size > maxSize) {
        alert("최대 1MB까지 업로드 가능합니다.");
        setFile(null);
      } else {
        setFile(uploadFile);
        setPreview(URL.createObjectURL(uploadFile));
      }
    }
  };

  const saveHandler = () => {
    if (file) {
      alert("프로필 이미지 저장");

      console.log(file);
    }
  };

  return (
    <S.Wrapper>
      <S.ImgBox>
        <S.Img src={preview} />
      </S.ImgBox>
      <S.ProfileDesc>
        <S.Buttons>
          <S.Label htmlFor="image">프로필 사진 업로드</S.Label>
          <S.InputFile type="file" id="image" accept="image/*" onChange={fileHandler} />

          <S.Button onClick={saveHandler} file={file}>
            저장
          </S.Button>
        </S.Buttons>
        <S.Li>※ 최대 1MB까지 업로드 가능합니다.</S.Li>
        <S.Li>※ 프로필 사진은 원형으로 출력됩니다.</S.Li>
      </S.ProfileDesc>
    </S.Wrapper>
  );
}

export default ProfileImg;
