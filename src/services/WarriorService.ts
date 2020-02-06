import Warrior from '@/schema/Warrior'
import Repository, { IRepository } from '@/database/Repository'
import { corewar } from 'corewar'
import uuid from 'uuid/v1'

export interface IWarriorService {
    getById(id: string): Promise<Warrior>
    getAll(): Promise<Warrior[]>
    saveWarrior(redcode: string, id?: string): Promise<Warrior>
    deleteWarrior(id: string): Promise<string>
}

export default class WarriorService implements IWarriorService {

    private repo: IRepository

    constructor(repo: IRepository) {
        this.repo = repo
    }

    public async getById(id: string): Promise<Warrior> {
        return this.repo.getById<Warrior>(id)
    }
    
    public async getAll(): Promise<Warrior[]> {
        return this.repo.getAll<Warrior>()
    }
    
    public async saveWarrior(redcode: string, id?: string): Promise<Warrior> {
        let result = {
            id,
            redcode,
            parseResult: corewar.parse(redcode)
        } as Warrior

        if (!result.parseResult.success) {
            return result
        }

        if (!result.id) {
            result.id = uuid()
        }

        await this.repo.upsert(result as Warrior)

        return result
    }
    
    public async deleteWarrior(id: string): Promise<string> {
        await this.repo.delete(id)

        return id
    }
}