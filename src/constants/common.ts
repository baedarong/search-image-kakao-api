export type SelectBoxDataType = {
  id: string
  name: string
}

export const isForbiddenList: SelectBoxDataType[] = [
  {
    id: 'true',
    name: '등록',
  },
  {
    id: 'false',
    name: '미등록',
  },
]
