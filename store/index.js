export const state = () => ({
  login: '',
  name: '',
  id: '',
  type: [
    'การเสริมจมูก',
    'การเสริมคาง',
    'การตกแต่งริมฝีปาก',
    'การทำตา',
    'การเสริมหน้าอก',
    'การฉีดโบท็อก'
  ],
  positionStaff: [
    'พนักงานเคาเคอร์',
    'แพทย์',
    'ผู้จัดการ',
    'admin'
  ],
  sex: [
    'ชาย',
    'หญิง'
  ]
})
export const mutations = {
  login (state, val) {
    state.login = val
  },
  name (state, val) {
    state.name = val
  },
  id (state, val) {
    state.id = val
  }
}
