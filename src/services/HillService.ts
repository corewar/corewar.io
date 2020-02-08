import { IRepository } from '@/database/Repository'
import uuid from 'uuid/v1'
import Hill from '@/schema/Hill'
import Rules from '@/schema/Rules'

export interface IHillService {
    getById(id: string): Promise<Hill>
    getAll(): Promise<Hill[]>
    createHill(rules: Rules): Promise<Hill>
    deleteHill(id: string): Promise<string>
}

export default class HillService implements IHillService {
    private repo: IRepository

    constructor(repo: IRepository) {
        this.repo = repo
    }

    public async getById(id: string): Promise<Hill> {
        return this.repo.getById<Hill>(id)
    }

    public async getAll(): Promise<Hill[]> {
        return this.repo.getAll<Hill>()
    }

    public async createHill(rules: Rules): Promise<Hill> {
        const result = {
            id: uuid(),
            rules
        }

        await this.repo.upsert(result)

        return result
    }

    public async deleteHill(id: string): Promise<string> {
        await this.repo.delete(id)

        return id
    }
}
