// data 什么类型返回值就是什么类型
function clone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export default clone;