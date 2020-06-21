import Warrior from '@/schema/Warrior'
import Repository, { IRepository } from '@/database/Repository'
import { corewar } from 'corewar'
import UuidFactory, { IUuidFactory } from './UuidFactory'
import { WARRIOR_COLLECTION } from '@/constants'

export interface IWarriorService {
    getById(id: string): Promise<Warrior>
    getAll(): Promise<Warrior[]>
    saveWarrior(redcode: string, id?: string): Promise<Warrior>
    deleteWarrior(id: string): Promise<string>
}

export default class WarriorService implements IWarriorService {
    private repo: IRepository
    private uuid: IUuidFactory

    constructor(repo: IRepository, uuid: IUuidFactory) {
        this.repo = repo
        this.uuid = uuid
    }

    public async getById(id: string): Promise<Warrior> {
        return this.repo.getById<Warrior>(id)
    }

    public async getAll(): Promise<Warrior[]> {
        return this.repo.getAll<Warrior>()
    }

    public async saveWarrior(redcode: string, id?: string): Promise<Warrior> {
        const result = {
            id,
            redcode,
            source: corewar.parse(redcode)
        } as Warrior

        if (!result.source.success) {
            return result
        }

        if (!result.id) {
            result.id = this.uuid.get()
        }

        await this.repo.upsert(result as Warrior)

        return result
    }

    public async deleteWarrior(id: string): Promise<string> {
        await this.repo.delete(id)

        return id
    }
}

export const buildWarriorService: () => IWarriorService = () =>
    new WarriorService(new Repository(WARRIOR_COLLECTION), new UuidFactory())
