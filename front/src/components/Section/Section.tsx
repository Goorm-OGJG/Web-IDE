import * as S from "./Section.style";

interface Props {
  children: React.ReactElement;
  title: string;
}

function Section({ children, title }: Props) {
  return (
    <S.Section>
      {/* 예약 페이지 섹션 이름 입력 */}
      <S.SectionTitle>{title}</S.SectionTitle>
      <S.Content>{children}</S.Content>
    </S.Section>
  );
}

export default Section;
