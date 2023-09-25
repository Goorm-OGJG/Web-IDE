import { memo, SVGProps } from 'react';
import * as S from "./ServeBackground.style";

const ServeBackground = (props: SVGProps<SVGSVGElement>) => (
  <S.ServeBackground preserveAspectRatio='none' viewBox='0 0 830 930' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M0 0H830V930H0V0Z' fill='url(#paint0_linear_272_104)' />
    <path d='M0 0H830V930H0V0Z' fill='url(#paint1_linear_272_104)' />
    <path
      d='M186.5 438C151.5 425.5 29.6667 341.333 0 333.5V0H444.5C451.833 14.1667 473.5 49.6 501.5 78C536.5 113.5 599.5 169 613 218.5C640.452 319.156 592.5 441.5 492 476.5C391.898 511.362 232.706 454.503 187.039 438.192L186.5 438Z'
      fill='url(#paint2_linear_272_104)'
    />
    <path
      d='M394.948 839.275C268.24 888.708 78.8542 806.719 0 759.545V929.968C209.827 929.137 643.694 927.975 700.55 929.968C757.407 931.961 810.54 841.102 830 795.423V330C808.848 332.492 753.346 368.071 700.55 490.456C634.557 643.438 553.333 777.484 394.948 839.275Z'
      fill='url(#paint3_linear_272_104)'
    />
    <defs>
      <linearGradient
        id='paint0_linear_272_104'
        x1={522.41}
        y1={15.8445}
        x2={257.246}
        y2={899.041}
        gradientUnits='userSpaceOnUse'
      >
        <stop offset={0.17} stopColor='#DE8FFF' stopOpacity={0.8} />
        <stop offset={0.94} stopColor='#3D73EB' stopOpacity={0.8} />
      </linearGradient>
      <linearGradient
        id='paint1_linear_272_104'
        x1={522.41}
        y1={15.8445}
        x2={257.246}
        y2={899.041}
        gradientUnits='userSpaceOnUse'
      >
        <stop offset={0.17} stopColor='#DE8FFF' stopOpacity={0.8} />
        <stop offset={0.94} stopColor='#3D73EB' stopOpacity={0.8} />
      </linearGradient>
      <linearGradient
        id='paint2_linear_272_104'
        x1={465.48}
        y1={32.6636}
        x2={253.665}
        y2={499.628}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#3D73EB' />
        <stop offset={0.703265} stopColor='#DE8FFF' />
      </linearGradient>
      <linearGradient
        id='paint3_linear_272_104'
        x1={523.5}
        y1={583.5}
        x2={710.111}
        y2={860.133}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#3D73EB' />
        <stop offset={0.473368} stopColor='#DE8FFF' />
      </linearGradient>
    </defs>
  </S.ServeBackground>
  // <S.StyledTitle1>WELCOME</S.StyledTitle1>
  // <S.StyledTitle2>OGJG</S.StyledTitle2>
  // <S.StyledTitle3>IDE</S.StyledTitle3>
);
const Memo = memo(ServeBackground);
export { Memo as ServeBackground };