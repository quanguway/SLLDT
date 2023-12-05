import lesionActions from '../../pages/ReportLesionPage/services/actions';
import lesionSelectors from '../../pages/ReportLesionPage/services/selectors';
import { ParentReportDetail } from '../../pages/ReportLesionPage/services/types/reportLession';
import { generateHookStore } from './generateHook/generateHookStore';

export const useLessonParentReportDetail = (initialValue = []): [ ParentReportDetail[], (e: ParentReportDetail[]) => void ] => {
  return generateHookStore<ParentReportDetail[]>(lesionSelectors.getLessonParentDetail() ?? initialValue, lesionActions.setDetailParentReportLesion);
};