export interface ILeaveBalance {
    shortName: string,
    description: string,
    maximumNoForMale: number,
    maximumNoForFemale: number,
    maximumLimitForMale: number,
    maximumLimitForFemale: number,
    maximumLimitPeriod: boolean,
    count: number,
    userId: number,
    availableForMarriedOnly: boolean,
    availableForMale: boolean,
    availableForFemale: boolean
}