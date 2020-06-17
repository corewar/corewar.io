declare module '*.graphql' {
    import { DocumentNode } from 'graphql'
    const MyQuery: DocumentNode

    export { MyQuery }

    /* eslint-disable-next-line */
    export default defaultDocument
}
