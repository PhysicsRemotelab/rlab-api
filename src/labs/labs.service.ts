import { Injectable } from '@nestjs/common';
import { Lab } from './lab.entity';

@Injectable()
export class LabsService {

    private readonly labs: Lab[] = [
        {
            "id": 1,
            "name": "hello"
        },
        {
            "id": 2,
            "name": "lab"
        }
    ];

    findAll(): Lab[] {
        return this.labs;
    }

    create(newLab: Lab): void {
        const id = new Date().valueOf();
        this.labs[id] = {
            ...newLab,
            id,
        };
    }

    find(id: number): Lab {
        const record: Lab = this.labs[id];
    
        if (record) {
          return record;
        }
        throw new Error('No record found');
    }

    update(updatedLab: Lab): void {
        if (this.labs[updatedLab.id]) {
          this.labs[updatedLab.id] = updatedLab;
          return;
        }
        throw new Error('No record found to update');
    }

    delete(id: number):void {
        const record: Lab = this.labs[id];
        if (record) {
          delete this.labs[id];
          return;
        }
        throw new Error('No record found to delete');
    }

}