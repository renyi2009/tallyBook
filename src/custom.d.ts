type RecordItem = {
  tags: string[]
  notes: string
  type: string
  amount: number,
  createdAt: Date
}

type Tag = {
  id: string
  name: string
}

type TagListModel = {
  data: Tag[],
  fetch: () => Tag[]
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
  save: () => void
  create: (name: string) => 'success' | 'duplicated'  //联合类型
  remove: (id: string) => boolean
}
