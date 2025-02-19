import { format, formatDistanceToNow, isToday } from "date-fns"
import { id } from "date-fns/locale"

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  if (isToday(date)) {
    return formatDistanceToNow(date, { addSuffix: false, locale: id })
  } else {
    return format(date, "d MMM", { locale: id })
  }
}
