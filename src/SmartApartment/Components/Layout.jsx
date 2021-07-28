import styled from "styled-components";

const Layout = styled.div`
  user-select: none;
  margin:0 auto;
  background:#ECEFF1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  position: ${props => (props.fixed ? 'fixed' : 'absolute')};
  top: ${props => (props.fixed ? '0' : 'auto')};
  z-index: ${props => props.index || 'auto'};
  overflow-y: auto;
  height: ${props => (props.isFullHeight ? '100%' : 'auto')};
  `

const LayoutWhite = styled(Layout)`
  padding-top: 42px;
  background: white;
`;

export { LayoutWhite }
export default Layout
