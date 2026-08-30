import dayjs from 'dayjs'

export function formatDate(date: string | Date | null | undefined, format = 'DD/MM/YYYY'): string {
  if (!date) {
    return '-'
  }

  return dayjs(date).format(format)
}
