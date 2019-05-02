import createReport from 'docx-templates';
import { saveByteArray } from './tnList';

export async function genReport(reportName: string, data: any, baseFileName: string) {
  const url = `https://verwaltung.ec-nordbund.de/templates/${reportName}.docx`;
  const template =  await fetch(url).then((v) => v.arrayBuffer());

  const report: ArrayBuffer = await createReport({
    data,
    template
  });

  saveByteArray(baseFileName, report, true);
}