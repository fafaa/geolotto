interface Result {
    id: string,
    time: number,
    winners: Array<{
        userId: string
        prize: number
    }>
}