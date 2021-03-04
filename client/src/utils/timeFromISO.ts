import { DateTime } from 'luxon'

const timeFromISO = (dateTime: string): string =>
  DateTime.fromISO(dateTime).toLocaleString(DateTime.TIME_SIMPLE)

export default timeFromISO
