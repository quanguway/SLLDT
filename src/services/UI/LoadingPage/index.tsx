import React from 'react';
import styled from 'styled-components';
import uiSelector from '../selectors';
import actions from '../actions';
import { useAppDispatch } from '../../../store/hooks';
import loadingIcon from '../../../asset/json/loading.json';
import { useLottie } from 'lottie-react';

export const useSetLoadingPage = () => {
  const dispatch = useAppDispatch();
  return (result: boolean) => dispatch(actions.setLoadingPage(result));
};

function LoadingPage() {
  const loading = uiSelector.getLoadingPage();
  if (!loading) return null;

  return (
    <LoadingPageStyled>
      <div className="box">
        <LoadingIcon />
        <p>Xin hãy chờ trong giây lát...</p>
      </div>
    </LoadingPageStyled>
  );
}

export default LoadingPage;

const LoadingPageStyled = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content:center;
  z-index: 9999;
  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px 32px;
    background: #FFFFFF;
    border-radius: 6px;
    p {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      color: #363565;
    }
  }
`;

const LoadingIcon = () => {
  const options = {
    animationData: loadingIcon,
    loop: true
  };

  const { View } = useLottie(options);


  return (
    <div style={{width: '200px', height: '200px'}}>
      {View}
    </div>
  );
};
