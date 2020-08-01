import { connectDB, Database } from 'mongo-repo'

export const getDatabase = (): Promise<Database> => connectDB(process.env.DB_CONNECTION_STRING)
