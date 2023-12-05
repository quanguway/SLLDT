import { styled } from 'styled-components';
import moment from 'moment';
import { COLOR_PRIMARY } from '../../../utils/variables/colors';


const Footer = () => {
   return (
    <FooterStyled >
      {/* <Logo/> */}
      <div className='footer-content' >
        <div>
          <p></p>
          <div className='footer-content-copyright'>
            <p>Copyright © {moment().get('year')} {}</p> 
            {/* <div className={'footer-content-copyright-link'}>
              <p>{t?.('footer.link_1')}</p>
              <p>{t?.('footer.link_2')}</p>
              <p>{t?.('footer.link_3')}</p>
            </div> */}
          </div>
        </div>
        <div>
          {/* <ListSocial size={25} gap={1}/> */}
          <p>contact@gmail.com</p>
        </div>
      </div>
      {/* <p className='footer-bottom' >dasdasd<p> */}
    </FooterStyled>
   );
};

export default Footer;

const FooterStyled = styled.div`
  background: ${COLOR_PRIMARY};
  color: #fff;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  bottom: 0px;
  margin-top: 20px;

  & > svg {
    display: none;
  }

    justify-content: center;
    align-items: center ;
    & > svg {
      display: block;
    }
    .footer-content {
      flex-direction: column-reverse;
      align-items: center;
      text-align: center;

      &-copyright {
        text-align: center;
        flex-direction: column;
        align-items: center;
      }
    }
    .footer-bottom {
      text-align: center;
    }
`;  