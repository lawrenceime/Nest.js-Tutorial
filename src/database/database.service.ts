import 'dotenv/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import * as ws from 'ws';
import { PrismaClient } from '../../generated/prisma/client';

neonConfig.webSocketConstructor = ws;

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    constructor() {
        const connectionString = process.env.DATABASE_URL as string;
        const adapter = new PrismaNeon({ connectionString });
        
        super({
            adapter,
        });
    }

    async onModuleInit() {
        await this.$connect();

    }

}

