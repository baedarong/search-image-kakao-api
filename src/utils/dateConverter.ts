export function formatDate(datetimeString: string | number | Date) {
  const date = new Date(datetimeString)

  // 연도, 월, 일을 가져옵니다.
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 1을 더합니다.
  const day = String(date.getDate()).padStart(2, '0')

  // 시간, 분, 초를 가져옵니다.
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  // 연-월-일 시:분:초 형식으로 반환합니다.
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

  return formattedDateTime
}
