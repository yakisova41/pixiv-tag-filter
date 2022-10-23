import {join, dirname} from 'path'
import { fileURLToPath } from 'url';

export const __dirname = (url)=>{
    const __filename = fileURLToPath(url);
    return dirname(__filename);
}