// @ts-ignore
import createReport from 'docx-templates';
import { saveByteArray } from './tnList';

export async function genReport(reportName: string, data: any, baseFileName: string) {
  const url = `https://verwaltung.tmp.ec-nordbund.de/templates/${reportName}.docx`;
  const template =  await fetch(url).then((v) => v.arrayBuffer());

  const report: ArrayBuffer = await createReport({
    data,
    template
  });

  saveByteArray(baseFileName, report, true);
}

export async function existsReport(reportName: string) {
  const url = `https://verwaltung.tmp.ec-nordbund.de/templates/${reportName}.docx`;
  const _ = await fetch(url).then((res) => res.text()).then((v) => v.substr(0, 5)).then((v) => v !== '<!DOC');
  return _;
}
