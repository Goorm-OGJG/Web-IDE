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

interface Props {
  language: React.MutableRefObject<string>;
}

function LanguageStacks({ language }: Props) {
  const index = languages.findIndex((lang) => lang.src === language.current);
  const [idx, setIdx] = useState(index);
  const [lang, setLang] = useState(languages[index]);
  const [isOpen, setOpen] = useState(false);
  const optionHandler = (src: string, title: string) => {
    const newLang = { src: src, title: title };
    const newIndex = languages.findIndex((lang) => lang.src === src);
    setLang(newLang);
    setOpen(false);
    setIdx(newIndex);
    language.current = newLang.src;
  };

  return (
    <S.Wrapper>
      <Desktop>
        {languages.map(({ src, title }, i) => (
          <React.Fragment>
            <S.Input
              checked={idx === i}
              type="radio"
              name="language"
              id={`${src}`}
              key={src}
            />
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
                <React.Fragment>
                  <S.Input type="radio" name="language" id={`${src}`} key={src} />
                  <S.MOption onClick={() => optionHandler(src, title)} key={src}>
                    <S.MImg src={`/images/languages/${src}.png`} />
                    {title}
                  </S.MOption>
                </React.Fragment>
              ))}
            </S.MOptionBox>
          )}
        </S.MSelect>
      </Mobile>
    </S.Wrapper>
  );
}

export default LanguageStacks;
