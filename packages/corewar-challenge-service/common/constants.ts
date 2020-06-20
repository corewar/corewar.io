export const SERVICE_NAME = 'challenge-service'
export const DATABASE_NAME = 'hills-db'
export const COLLECTION_NAME = 'challenges'
export const Topics = {
    challengeHill: 'challenge-hill',
    hillCreated: 'hill-created',
    hillDeleted: 'hill-deleted',
    hillUpdated: 'hill-updated',
    startChallenge: 'start-challenge',
    startChallengeFailed: 'start-challenge-failed',
    challengeResult: 'challenge-result'
}
export const Queues = {
    challengeQueue: 'challenge-queue',
    startChallengeQueue: 'start-challenge-queue'
}
