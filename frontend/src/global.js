export default {
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
  urls: {
    // front: '/root/back/public',
    front: '/back/public',
    add (str) { return this.front + str },
    init () { return this.add('/api/init') },
    login () { return this.add('/api/login') },
    signout () { return this.add('/api/signout') },
    publishV () { return this.add('/api/manager/publish/volunteer') },
    publishA () { return this.add('/api/manager/publish/award') },
    image (id) { return this.add('/api/publisher/modify/image/' + id) },
    queryA () { return this.add('/api/user/query/activity') },
    queryD (id) { return this.add('/api/manager/query/' + id + '/department') },
    queryU (id) { return this.add('/api/manager/query/' + id + '/userinfo') },
    download (id) { return this.add('/api/manager/download/' + id) },
    register (id) { return this.add('/api/user/register/' + id) },
    unregister (id) { return this.add('/api/user/unregister/' + id) },
    editV (id) { return this.add('/api/publisher/modify/volunteer/' + id) },
    editA (id) { return this.add('/api/publisher/modify/award/' + id) },
    delete (id) { return this.add('/api/publisher/delete/' + id) },
    imageSrc (shortSrc) { return this.add(shortSrc) }
  },
  getCookie (str) {
    var pattern = new RegExp('(?:(?:^|.*;\\s*)' + str + '\\s*=\\s*([^;]*).*$)|^.*$')
    return document.cookie.replace(pattern, '$1')
  },
  removeCookie (str) {
    var now = new Date()
    now.setTime(now.getTime() - 1)
    document.cookie = str + '=;expires=' + now.toUTCString()
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
