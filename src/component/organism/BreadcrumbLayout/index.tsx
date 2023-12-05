import { Breadcrumb } from 'antd';
import { styled } from 'styled-components';
import { textCapitalize } from '../../../utils/unit';
import { NavLink } from 'react-router-dom';

const OBreadcrumb = () => {

  const urlCurr = window.location.pathname;
  const paths: string[] = urlCurr.split('/').slice(2);

  const generatePath = (value: string) => {
    return '/' + value;
  };

  const getFullPath = (value: string): string => {
    let fullPath = '';
    for(const path in paths) {
      if(path !== value)
        break;
      fullPath += generatePath(path);
    }
    return `${fullPath}/${value}`;
  };

  return (
    <>
      <BreadcrumbStyled separator='>'>
        {paths.map((s, index) => index !== paths.length - 1 ? (
          <Breadcrumb.Item key={index}>
            <NavLink to={getFullPath(s)}>{textCapitalize(s.replaceAll('-', ' '))}</NavLink>
          </Breadcrumb.Item>

        ) : (
        <>
          <Breadcrumb.Item key={index}>
            {textCapitalize(s.replaceAll('-', ' '))}
          </Breadcrumb.Item>
        </>)
        )}
      </BreadcrumbStyled>
    </>
  );
};

export default OBreadcrumb;

const BreadcrumbStyled = styled(Breadcrumb)`
  font-size: 24px;
  font-weight: bold;
`;