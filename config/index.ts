export const port: number = parseInt(process.env.MC_PORT || '4114', 10);
export const db: string = process.env.MCDB_URI || 'mongodb://localhost:27017/mcinventory';
export const token: string = 'mctoken'
