export const formatDate = (inputDate, format = 'yyyy-MM-dd hh:mm:ss') => {
  if (typeof inputDate === 'number') {
    // 如果输入值为时间戳，判断是否合法，并转换成13位时间戳
    switch ((inputDate + '').length) {
      case 10:
        inputDate *= 1000
        break
      case 13:
        break
      default:
        // 时间戳不合法，结束
        return
    }
  }
  const date = new Date(inputDate)
  if (date.toString() === 'Invalid Date') {
    // Date不合法，结束
    return
  }
  const o = {
    'M+': date.getMonth() + 1,                    // 月份
    'd+': date.getDate(),                         // 日
    'h+': date.getHours(),                        // 小时
    'm+': date.getMinutes(),                      // 分
    's+': date.getSeconds(),                      // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3),  // 季度
    'S': date.getMilliseconds()                   // 毫秒
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return format
}
