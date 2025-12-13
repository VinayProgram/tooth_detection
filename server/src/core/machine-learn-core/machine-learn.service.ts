import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as fs from 'fs'
import * as path from 'path';
@Injectable()
export class YoloService {
  async runYOLO(imagePath: string): Promise<any> {
    return await new Promise((resolve, reject) => {

      const python = spawn('python', ['src/core/machine-learn-core/yolo_seg.py', imagePath]);

      let output = '';
      let error = '';

      python.stdout.on('data', data => {
        output += data.toString();
      });

      python.stderr.on('data', data => {
        error += data.toString();
      });

      python.on('close', code => {
        if (code !== 0) {
          reject({ error, code });
        } else {
          try {
            console.log(output)
            const jsonPath ="result.json"
            const data = fs.readFileSync(jsonPath, "utf-8");
            const parsed = JSON.parse(data);

            resolve(parsed);  // return JSON
          } catch (jsonErr) {
            console.log(jsonErr)
            return jsonErr
          }
        }
      });
    });
  }
}
