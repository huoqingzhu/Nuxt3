
import type { IncomingMessage, ServerResponse } from 'http'
import fs from 'fs'
import {parse} from 'querystring'
import {timestampToTime} from "../../utils/time"
interface Request extends IncomingMessage{
  body:any;
}
export default (req: Request, res: ServerResponse) => {
	
  fs.readFile('list.json','utf-8', function(err: any,data: any){
    if(err){
        console.error(err);
        res.end('写入失败')
    }
    else{
        const list=JSON.parse(data)
        const dream=req.body
        console.log(dream)
        const obj={time:timestampToTime(Number(new Date()),3),name:'匿名',dream:dream.dream}
        if(!dream.dream){
          res.end(data)
        }else{
          list.push(obj)
          fs.writeFile('list.json',JSON.stringify(list),function(err: any){
            if(err){
                res.end(JSON.stringify([]))
            }
                res.end('ok')
          })
        }
    }
  });
}