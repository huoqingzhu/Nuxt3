import type { IncomingMessage, ServerResponse } from 'http'
// 解析application/x-www-form-urlencoded 数据
import {parse} from 'querystring'
import url from 'url'
export default async (req: IncomingMessage, res: ServerResponse) => {
    const path = url.parse(req.url,true).query
    //@ts-ignore
	req.params=path
    function analysisBody(){
      return new Promise((resolve) => {
        let postParams = ''
        req.on('data',(parmas)=>{
          postParams += parmas
        })
        req.on('end',()=>{
          const parmasObj=parse(postParams)
          console.log(req.headers['content-type'])
          if(req.headers['content-type']!.indexOf('application/json')!=-1){
            //@ts-ignore
            req.body=JSON.parse(postParams)
          }
          if(req.headers['content-type']!.indexOf('application/x-www-form-urlencoded')!=-1){
            //@ts-ignore
            req.body=parmasObj
          }
          resolve(true)
        })
      });
    }
      if(req.method=='POST'){
        await analysisBody();
      }
}