export default {
  logined: false,
  studengId: '',
  name: '',
  isManager: false,
  departmentList: [
    '编辑部',
    '综合管理部',
    '综合新闻部',
    '外联部',
    '策划推广部',
    '节目部',
    '人力资源部',
    '技术部',
    '视频部',
    '视觉设计部'
  ],
  defaultImg: 'http://localhost/api/assets/img/default.png',
  getCookie (str) {
    var pattern = new RegExp('(?:(?:^|.*;\\s*)' + str + '\\s*=\\s*([^;]*).*$)|^.*$')
    return document.cookie.replace(pattern, '$1')
  },
  compareDatetime (datetime) {
    var now = new Date()
    var comparison = [
      [datetime.slice(0, 4), now.getFullYear()],
      [datetime.slice(5, 7), now.getMonth() + 1],
      [datetime.slice(8, 10), now.getDate()],
      [datetime.slice(11, 13), now.getHours()],
      [datetime.slice(14, 16), now.getMinutes()],
      [datetime.slice(17, 19), now.getSeconds()]
    ]
    for (let i = 0; i < 6; i++) {
      comparison[i][0] = Number(comparison[i][0])
      if (comparison[i][0] !== comparison[i][1]) {
        return comparison[i][0] - comparison[i][1]
      }
    }
    return 0
  },
  datetimeToInput (datetime) {
    return datetime.replace(/^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}):\d{2}$/, '$1T$2')
  },
  inputToDatetime (input) {
    return input.slice(0, 10) + ' ' + input.slice(11) + ':00'
  }
}
