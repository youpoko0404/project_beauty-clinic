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
  month: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  positionStaffSum: [
    'พนักงานเคาเคอร์',
    'แพทย์',
    'ผู้จัดการ'
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
