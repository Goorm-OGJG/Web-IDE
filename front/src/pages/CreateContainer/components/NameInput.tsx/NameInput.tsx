import { useCreateContainerAPI } from "../../../../api/useCreateContainerAPI";
import useDebounce from "../../../../hooks/useDebounce";
import * as S from "./NameInput.style";
import { useState, forwardRef, useEffect } from "react";

interface Props {
  isNameValid: React.MutableRefObject<boolean>;
}

const NameInput = forwardRef(function NameInput(
  { isNameValid }: Props,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const [value, setValue] = useState("");
  const [isOk, setIsOk] = useState(false);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const { requestDuplicateContainerName } = useCreateContainerAPI();

  const debounceHandler = () => {
    if (value) {
      requestDuplicateContainerName(value, setIsOk, isNameValid);
    } else {
      setIsOk(false);
      isNameValid.current = false;
    }
  };
  const debouncedSearchTerm = useDebounce(debounceHandler, value, 500);

  useEffect(() => {
    debouncedSearchTerm;
  }, []);

  return (
    <S.Wrapper>
      <S.Input
        placeholder="알파벳, 숫자, 하이픈(-), 언더스코어(_)만 포함해야 합니다."
        value={value}
        onChange={changeHandler}
        maxLength={20}
        ref={ref}
      />
      <S.Count>{`${value.length}/20`}</S.Count>
      {isOk && <S.CorrectP>사용가능한 컨테이너 이름입니다.</S.CorrectP>}
      {isOk || <S.AlertP>이미 존재하거나 올바르지 않은 컨테이너 이름입니다.</S.AlertP>}
    </S.Wrapper>
  );
});

export default NameInput;
