import Repository, { IRepository } from '@/database/Repository'
import Hill from '@/schema/Hill'
import Rules from '@/schema/HillRules'
import UuidFactory, { IUuidFactory } from '@/services/UuidFactory'
import { HILL_COLLECTION, WARRIOR_COLLECTION } from '@/constants'
import { corewar } from 'corewar'
import WarriorService, { IWarriorService } from './WarriorService'

export interface IHillService {
    getById(id: string): Promise<Hill>
    getAll(): Promise<Hill[]>
    createHill(rules: Rules): Promise<Hill>
    deleteHill(id: string): Promise<string>
    challengeHill(hillId: string, warriorId: string): Promise<Hill>
}

export default class HillService implements IHillService {
    private repo: IRepository
    private warriorService: IWarriorService
    private uuid: IUuidFactory

    constructor(
        hillRepo: IRepository,
        warriorService: IWarriorService,
        uuid: IUuidFactory
    ) {
        this.repo = hillRepo
        this.warriorService = warriorService
        this.uuid = uuid
    }

    public async getById(id: string): Promise<Hill> {
        return this.repo.getById<Hill>(id)
    }

    public async getAll(): Promise<Hill[]> {
        return this.repo.getAll<Hill>()
    }

    public async createHill(rules: Rules): Promise<Hill> {
        const result = {
            id: this.uuid.get(),
            rules,
            warriors: []
        }

        await this.repo.upsert(result)

        return result
    }

    public async deleteHill(id: string): Promise<string> {
        await this.repo.delete(id)

        return id
    }

    public async challengeHill(
        hillId: string,
        warriorId: string
    ): Promise<Hill> {
        // TODO handle missing hill
        // TODO handle missing warriors
        // TODO store results in db
        // TODO increase age of warriors
        const hill = await this.repo.getById<Hill>(hillId)
        if (!hill) {
            throw Error(`No hill found with id '${hillId}'`)
        }
        const challenger = await this.warriorService.getById(warriorId)

        const warriors = hill.warriors
            .sort((a, b) => a.rank - b.rank)
            .slice(0, hill.rules.size)
            .map(warrior => ({
                source: warrior.result.source
            }))
        warriors.push({ source: challenger.parseResult })

        corewar.runHill({
            rules: hill.rules,
            warriors
        })

        return hill
    }
}

export const buildHillService: () => IHillService = () =>
    new HillService(
        new Repository(HILL_COLLECTION),
        new WarriorService(
            new Repository(WARRIOR_COLLECTION),
            new UuidFactory()
        ),
        new UuidFactory()
    )
