
import type { IncomingMessage, ServerResponse} from 'http'
import fs from 'fs'

export default  (req: IncomingMessage, res: ServerResponse) => {
  fs.readFile('list.json','utf-8', function(err: any,data: any){
    if(err){
      fs.writeFile('list.json',JSON.stringify([]),function(err: any){
        if(err){
            console.error(err);
            res.end('写入失败')
        }
            res.end(JSON.stringify([]))
      })
    }
    else{
        res.end(JSON.stringify(data));
    }
  });
}