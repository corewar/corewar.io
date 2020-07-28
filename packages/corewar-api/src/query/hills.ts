import repo from 'mongo-repo'

export const getHills = async (id?: string): Promise<Hill[]> => {
    const db = await repo.connectDB(process.env.DB_CONNECTION_STRING)

    if (!!id) {
        return [await db.repo('hills').get(id)]
    } else {
        return await db.repo('hills').getAll({})
    }
}
