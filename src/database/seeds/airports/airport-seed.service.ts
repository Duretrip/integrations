import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import * as fs from 'fs';  // Import fs using '* as fs'
import * as path from 'path';

@Injectable()
export class AirportSeedService {
  constructor(private readonly entityManager: EntityManager) {}

  async run() {
    try {
      // Read the SQL script from the file
      const sqlScriptPath = path.resolve(__dirname, 'airports.sql');
      const sqlScript = fs.readFileSync(sqlScriptPath, 'utf8');

      // Execute the SQL script
      await this.entityManager.query(sqlScript);

      console.log('Airport seed script executed successfully.');
    } catch (error) {
      console.error('Error executing airport seed script:', error);
    }
  }

}
