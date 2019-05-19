import { getApp } from './express';
import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';

https
  .createServer(
    {
      key: fs.readFileSync(
        path.join(__dirname, '/../ssl/ec-cert.key')
      ),
      cert: fs.readFileSync(
        path.join(__dirname, '/../ssl/ec-cert.pem')
      )
    },
    getApp(true)
  )
  .listen(443)
