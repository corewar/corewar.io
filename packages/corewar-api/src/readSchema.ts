import { readFile } from 'fs'
import { gql } from 'apollo-server'
import { DocumentNode } from 'graphql'
import * as path from 'path'

const readSchema = async (filename: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        readFile(path.resolve(__dirname, filename), (err, data) => {
            if (!!err) {
                reject(err)
                return
            }
            resolve(data.toString())
        })
    })
}

export const readSchemas = async (filenames: string[]): Promise<DocumentNode> => {
    try {
        const schemas = await Promise.all(filenames.map(readSchema))
        return gql`
            ${schemas.reduce((a, s) => `${a}\n${s}`, '')}
        `
    } catch (e) {
        console.error(`Error parsing graphql schema ${e.message}`)
        throw e
    }
}
