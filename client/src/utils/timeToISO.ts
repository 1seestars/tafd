import { DateTime } from 'luxon'

const timeToISO = (time: string, format: string = 'HH:mm'): string =>
  DateTime.fromFormat(time, format).toUTC().toISO()

export default timeToISO
