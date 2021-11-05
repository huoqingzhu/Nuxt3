/**
 * 时间戳转 yyyy-mm-dd?HH:mm:ss
 * @param timestamp 时间戳 13位
 * @param size 返回几位
 * @returns yyyy-mm-dd?HH:mm:ss
 */
export function timestampToTime(timestamp?:number, size:number=5) {

  let date = timestamp?new Date(timestamp):new Date();
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1)+'';
  let D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate())+ '';
  let h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
  let m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes())+":";
  let s = date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds();
  // return time?Y+M+D+h+m+s:Y+M;
  let str='';
  switch(size){
    case 2:
      str=Y+M
    break;
    case 3:
      str=Y+M+'-'+D
    break;
    case 5:
      str=Y+M+'-'+D+':'+h+m+s
    break;
  }
  return str
}