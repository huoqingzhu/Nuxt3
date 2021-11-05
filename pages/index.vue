<template>
    <header>
      <section>
        <div class="flex" style="height:50px;color:#DDD;font-size: 24px;">
          <span>DreamList</span>
          <input type="text"  placeholder="添加ToDo" autocomplete="off" @keyup.enter="enter">
        </div>
      </section>
    </header>
    <section>
      <div v-for="(item,index) in state.list" class="item">
        <div>{{item.name}}</div>
        <div class="flex box">
          <span> {{item.dream}}</span> <span>{{item.time}}</span>
        </div>
      </div>
    </section>
</template>
<script  lang="ts" setup>
import axios from 'axios'
export interface list{
  name: string
  id:number
  dream:string
  time:string
}
interface state {
  list: list[]
}
const state:state=reactive({ 
      list:[]
  })
const { data } = await useAsyncData('list', () => $fetch('/api/list'))
state.list=(JSON.parse(data.value as string) as [])
    const enter=(e:any)=>{
      const dream=localStorage.getItem('dream')
    if(!dream){
      axios.post('/api/count',{dream:e.target.value})
      .then(res=>{
        localStorage.setItem('dream',e.target.value)
        e.target.value=''
        getList()
      })
    }else{
      e.target.value=''
      alert("你的梦想太多了")
    }

    }
    const getList=()=>{
      $fetch('/api/list',{params:{id:123}})
      .then((res:any)=>{
        state.list=JSON.parse(res)
      })
    }
    // getList()
</script>
<style lang="less">
body{
    margin: 0;
    padding: 0;
    font-size: 16px;
    background: #CDCDCD;
}
header{     
    height: 50px;
    background: #333;
    background: rgba(47,47,47,0.98);
    }
section {
    margin: 0 auto;
}
@media screen and (min-width: 620px){
  section {
    width: 600px;
    padding:0 10px;
}
}

.flex{
  display: flex;
  justify-content:space-between;
  align-items: center;
  cursor: pointer;
}
.box{
  margin-top: 2px;
}
.item{
  margin-top: 5px;
}
input {
    width: 60%;
    height: 24px;
    text-indent: 10px;
    border-radius: 5px;
    box-shadow: 0 1px 0 rgb(255 255 255 / 24%), 0 1px 6px rgb(0 0 0 / 45%) inset;
    border: none;
}
input:focus{ outline: 1px solid #AFECAB;}
</style>