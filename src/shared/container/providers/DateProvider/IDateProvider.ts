export interface IDateProvider {
  compareDateInHours(startDate: Date, endDate: Date): number
  convertToUTC(date: Date): string
  dateNow(): Date
}