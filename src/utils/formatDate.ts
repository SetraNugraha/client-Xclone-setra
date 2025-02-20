import { format, formatDistanceToNow, isToday } from "date-fns"
import { enUS } from "date-fns/locale"

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  if (isToday(date)) {
    const distanceDate = formatDistanceToNow(date, { addSuffix: true, locale: enUS })

    return distanceDate.replace("about", "")
  } else {
    return format(date, "d MMM", { locale: enUS })
  }
}
