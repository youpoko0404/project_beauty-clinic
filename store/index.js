export const state = () => ({
  login: '',
  type: [
    'การเสริมจมูก',
    'การเสริมคาง',
    'การตกแต่งริมฝีปาก',
    'การทำตา',
    'การเสริมหน้าอก',
    'ฉีดโบท๊อก'
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
  }
}
