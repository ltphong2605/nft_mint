import React, { ReactNode, useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Footer } from '../../../components/shared/layout/footer/Footer'
import Header from '../../../components/shared/layout/header/Header';
export type DefaultTemplatePageProps = {
  alertWallet?: boolean
  alertBscNetwork?: boolean
  children: ReactNode
  bgGray?: boolean
  noMargin?: boolean
  fullWidth?: boolean
  sidebar? : boolean
}

export function DefaultPageTemplate({ alertWallet, alertBscNetwork, children, bgGray, noMargin, fullWidth, sidebar }: DefaultTemplatePageProps) {
  const [isSidebar, setIsSidebar] = useState(false);
  useEffect(()=>{
    if(sidebar !== undefined) setIsSidebar(true);
  },[])
  return (
    <>
      <Header />
      <S.Main bgGray={!!bgGray} noMargin={!!noMargin} sidebar={sidebar} isSidebar={isSidebar}>
        <S.Container fullWidth={!!fullWidth}>{children}</S.Container>
      </S.Main>
      <Footer />
    </>
  )
}
export const S = {
  Main: styled.main<{ bgGray?: boolean; noMargin: boolean; sidebar:boolean; isSidebar: boolean; }>`
    width: 100%;
    min-height: calc(100vh - 72px);
    background: ${props => props.theme.white};
    display: block;
    align-items: center;
    padding-top: 97px !important;

    ${props =>
      props.bgGray &&
      css`
        background: ${props.theme.black};
      `}

    ${props =>
      css`
        padding: ${props.noMargin ? 0 : props.theme.margin.small};
      `}
    ${props => (props.isSidebar && !props.sidebar) && 'padding-left: 74px !important;'}
    
    @media (min-width: ${props => props.theme.viewport.mobile}) {
      min-height: calc(100vh - 48.2px);
    }
    @media (min-width: ${props => props.theme.viewport.tablet}) {
      min-height: calc(100vh - 102px);
      padding: ${props => props.theme.margin.small};
      ${props =>
        css`
          padding: ${props.noMargin ? 0 : props.theme.margin.small}};
        `}
      ${props => (props.isSidebar && !props.sidebar) && 'padding-left: 74px !important;'}
    }

    @media (min-width: ${props => props.theme.viewport.desktop}) {
      min-height: calc(100vh - 47px);
      padding: ${props => props.theme.margin.small};
      ${props =>
        css`
          padding: ${props.noMargin ? 0 : props.theme.margin.small};
        `}
      ${props => props.sidebar && 'padding-left: 324px !important;'}
      ${props => (props.isSidebar && !props.sidebar) && 'padding-left: 74px !important;'}
    }
    @media (min-width: ${props => props.theme.viewport.desktopl}) {
      min-height: calc(100vh - 47px);
    }
    .infinite-scroll-component {
      vertical-align: top !important;
    }
  `,
  Container: styled.div<{ fullWidth?: boolean }>`
    width: 100%;
    margin: 0 auto;
    ${props =>
      !props.fullWidth &&
      css`
        max-width: ${props.theme.viewport.desktopXl};
      `}
  `
}
