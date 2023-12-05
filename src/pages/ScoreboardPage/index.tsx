import { styled } from 'styled-components';
import ButtonImportScore from './widgets/ButtonImport';
import ScoreboardDataTable from './widgets/ScoreboardDataTable';
import InputSelect from '../../component/atom/Input/InputSelect';
import apisScoreboard, { Evalution } from './service/apis';
import { useEffect } from 'react';
import scoreboardActions from './service/actions';
import { BORDER_STYLED } from '../../utils/unit';
import scoreboardSelectors from './service/selectors';
import { Button } from 'antd';
import uiActions from '../../services/UI/actions';
import { useAppDispatch } from '../../store/hooks';

const ScoreboardPage = () => {
  const dispatch = useAppDispatch();

  const options = Object.keys(Evalution).map((key) => ({
    value: key,
    label: Evalution[key as keyof typeof Evalution]
  }));

  const params = scoreboardSelectors.getParams();


  useEffect(() => {
    dispatch(scoreboardActions.getScoreboard.fetch({
      typeEvalution: params.evaluation
    }));
  }, []);

  const onChange = (val: keyof typeof Evalution) => {
    dispatch(scoreboardActions.setParam({
      evaluation: val
    }));
    dispatch(scoreboardActions.getScoreboard.fetch({
      typeEvalution: val
    }));
    
  };
  
  const scoreReq = scoreboardSelectors.getScoreboard();

  console.log(JSON.stringify(scoreReq));
  

  return (
    <ScoreboardPageStyled>
      <FilterStyled>
        <div></div>
        <div>
          <ButtonImportScore/>
          <InputSelect onChange={onChange} defaultValue={params.evaluation} style={{width: '150px'}} options={options} />
          <Button size='large' type='primary' onClick={async () => {
            dispatch(uiActions.setLoadingPage(true));
            await apisScoreboard.importScoreboard({requestBody: {
              ...scoreReq
            }}); 
            dispatch(uiActions.setLoadingPage(false));
          }}>Lưu bảng điểm</Button>
        </div>
      </FilterStyled>
      <ScoreboardDataTable/>
    </ScoreboardPageStyled>
  );
};

export default ScoreboardPage;

const FilterStyled = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: ${BORDER_STYLED} !important;
  padding-bottom: 8px;
  & > div {
    display: flex;
    gap: 8px;
  }
  /* background-color: red; */
`;

const ScoreboardPageStyled = styled.div`
  background-color: white;
  padding: 16px;

`;

