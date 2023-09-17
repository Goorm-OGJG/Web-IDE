import * as S from "./LanguageStacks.style";
import * as Icon from "../../../../components/Icon";
import React, { useState } from "react";
import { Desktop, Mobile } from "../../../../components/Responsive";

interface Language {
  src: string;
  title: string;
}

const languages: Language[] = [
  { src: "java", title: "Java" },
  { src: "js", title: "JavaScript" },
  { src: "python", title: "Python" },
  { src: "c++", title: "C/C++" },
];

function LanguageStacks() {
  const [lang, setLang] = useState(languages[0]);
  const [isOpen, setOpen] = useState(false);
  const optionHandler = (src: string, title: string) => {
    const newLang = { src: src, title: title };
    setLang(newLang);
    setOpen(false);
  };

  return (
    <S.Wrapper>
      <Desktop>
        {languages.map(({ src, title }) => (
          <React.Fragment>
            <S.Input type="radio" name="language" id={`${src}`} />
            <S.Grid htmlFor={`${src}`} onClick={() => optionHandler(src, title)}>
              <S.Img src={`/images/languages/${src}.png`} />
              <S.Title>{`${title}`}</S.Title>
            </S.Grid>
          </React.Fragment>
        ))}
      </Desktop>
      <Mobile>
        <S.MSelect>
          <S.MSelectResult onClick={() => setOpen((prev) => !prev)}>
            <S.MImg src={`/images/languages/${lang.src}.png`} />
            {lang.title}
            <S.IconBox>
              <Icon.DownArrow2 />
            </S.IconBox>
          </S.MSelectResult>
          {isOpen && (
            <S.MOptionBox>
              {languages.map(({ src, title }) => (
                <S.MOption onClick={() => optionHandler(src, title)} key={src}>
                  <S.MImg src={`/public/images/languages/${src}.png`} />
                  {title}
                </S.MOption>
              ))}
            </S.MOptionBox>
          )}
        </S.MSelect>
      </Mobile>
    </S.Wrapper>
  );
}

export default LanguageStacks;
