import { useRef, useState } from "react";
import * as S from "./Ref.style";
import { Section } from "../../components/Section/Section.style";
import CountRef from "../../components/CountRef/CountRef";
import Input from "../../components/Input";

export default function Ref() {
  const ref = useRef(0);
  const [state, setState] = useState(0);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    ref.current = ref.current + 1;
    alert("You clicked " + ref.current + " times!");
  }

  function handleClickState() {
    setState(state + 1);
    alert("You clicked " + state + " times!");
  }

  function showRefValue() {
    alert(inputRef.current!.value);
  }

  return (
    <>
      <S.Main>
        <S.MainWrapper>
          <S.Wrapper>
            <S.Button onClick={handleClick}>Click me!</S.Button>
            <S.Button onClick={handleClickState}>State Click me!</S.Button>
            <Section title="Ref 카운트">
              <CountRef />
            </Section>

            <Section>
              <div>
                <span>input 컴포넌트를 분리x </span>
                <input value={value} onChange={(e) => setValue(e.target.value)} />
              </div>
              <div>
                {/* <span>input 컴포넌트 분리 </span> */}
                {/* <Input inputRef={inputRef} /> */}
                <Input label="input 컴포넌트  분리" ref={inputRef} />
              </div>
              <div>
                <S.Button onClick={showRefValue}>refValue보기</S.Button>
              </div>
            </Section>
          </S.Wrapper>
        </S.MainWrapper>
      </S.Main>
    </>
  );
}
