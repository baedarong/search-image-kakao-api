import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export const userState = atom({
  key: 'user',
  default: {
    userId: '',
    roleId: [],
    groupId: '',
    groupName: '',
    initMenu: { firstPageUrl: '', menus: [] },
  },
  effects_UNSTABLE: [persistAtom],
})