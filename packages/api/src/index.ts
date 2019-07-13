import { getApp } from './express';
import * as http from 'http';

http.createServer(getApp(true)).listen(4000)
