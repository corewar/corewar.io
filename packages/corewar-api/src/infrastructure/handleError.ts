export const handleError = (error: Error) => {
    console.error(error)
    throw new Error('An unexpected error occurred')
}
