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
  years: [
    'ปี 2563',
    'ปี 2562'
  ],
  month: [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม'
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
