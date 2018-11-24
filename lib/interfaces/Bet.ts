interface Bet {
    id: string
    position: {
        lat: number
        lon: number
    }
    userId: string
    rangeFactor: number,
    distanceFactor: number
    reflink: string
    area: Area
    areaId: number
}
