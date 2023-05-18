import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import MaximaWoff from './maximacyrtcyligcom.woff';
import MaximaWoff2 from './maximacyrtcyligcom.woff2';
import InterRegularWoff from './Inter-Regular.woff';
import InterRegularWoff2 from './Inter-Regular.woff2';
import InterLightWoff from './Inter-LightBETA.woff';
import InterLightWoff2 from './Inter-LightBETA.woff2';
import InterSemiBoldWoff from './Inter-SemiBold.woff';
import InterSemiBoldWoff2 from './Inter-SemiBold.woff2';

export const MaximaFonts = createGlobalStyle`
  @font-face {
    font-family: 'Maxima';
    src: local('Maxima'),
      url(${MaximaWoff}) format('woff'),
      url(${MaximaWoff2}) format('woff2');
    font-weight: 400;
    font-style: normal;
  }
`;

export const InterRegular = createGlobalStyle`
    @font-face {
        font-family: 'Inter';
        src: local('Inter'),
            url(${InterSemiBoldWoff}) format('woff'),
            url(${InterSemiBoldWoff2}) format('woff2');
            font-weight: 600;
            font-style: normal;
    }
    @font-face {
        font-family: 'Inter';
        src: local('Inter'),
            url(${InterRegularWoff}) format('woff'),
            url(${InterRegularWoff2}) format('woff2');
            font-weight: 400;
            font-style: normal;
    }
    @font-face {
        font-family: 'Inter';
        src: local('Inter'),
            url(${InterLightWoff}) format('woff'),
            url(${InterLightWoff2}) format('woff2');
            font-weight: 300;
            font-style: normal
    }
`;

export const GlobalStyles = createGlobalStyle`
  ${normalize}
`;
