import electron, { isElectron } from '@/plugins/electron';

export default (err: string) => {
  if (isElectron) {
    electron.remote.dialog.showErrorBox(
      'Bei einer Abfrage ist ein Fehler aufgetreten!',
      err
    );
  } else {
    throw err;
  }
};
