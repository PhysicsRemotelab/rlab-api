import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync, existsSync, mkdirSync, appendFileSync } from 'fs';
import { parse } from 'node-xlsx';
import { EOL } from 'os';

@Injectable()
export class FileService {
    public readJsonFileFromDisk(path: string): [] {
        try {
            return JSON.parse(readFileSync('./' + path, 'utf8'));
        } catch (ex) {
            return [];
        }
    }

    public writeJsonFileToDisk(data: { name: string; data: unknown[] }[], path: string): boolean {
        try {
            writeFileSync('./' + path, JSON.stringify(data));
            return true;
        } catch (ex) {
            return false;
        }
    }

    public readExcelFileFromDisk(path: string): { name: string; data: unknown[] }[] {
        try {
            return parse('./' + path);
        } catch (ex) {
            return [{ name: '', data: [] }];
        }
    }

    public createFolder(path: string): void {
        if (!existsSync('./' + path)) {
            mkdirSync('./' + path);
        }
    }

    public writeResponseFileToDisk(data: string, path: string): boolean {
        try {
            console.log(data);
            appendFileSync('./' + path, JSON.stringify(data) + EOL);
            return true;
        } catch (ex) {
            console.log(ex);
            return false;
        }
    }
}
