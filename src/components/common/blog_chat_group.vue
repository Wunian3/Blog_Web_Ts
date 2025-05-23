<template>
  <div class="blog_chat_group_components">
    <a-spin :loading="loading">
      <div class="head">
        <div class="title">
          {{ config.welcomeTitle }}
        </div>
        <div class="outline">在线人数：{{ config.isOnlinePeople ? chatData.onlineCount: 'ovo'}}</div>

        <div class="manage">
          <IconRefresh style="cursor: pointer" @click="flush"></IconRefresh>
          <a-checkbox v-model="isManage">管理模式</a-checkbox>
          <a-button v-if="isManage && selectIDList.length" size="mini" style="margin-left: 10px" type="primary"
                    status="danger"
                    @click="removeChatGroup">删除
          </a-button>
        </div>
      </div>
      <div class="record_list">
        <a-checkbox-group v-model="selectIDList">
          <template v-for="item in chatRecordData.list">
            <div :class="{msg: true, isManage: isManage}">
              <a-checkbox :value="item.id" v-if="isManage"></a-checkbox>
              <div class="date" v-if="config.isShowTime">
                {{dataTimeFormat(item.created_at)}}

              </div>
              <div v-if="item.msg_type === 2" :class="{message: true, isMe: item.isMe}">
                <img class="avatar" :src="'/'+item.avatar" alt="">
                <div class="message-main">
                  <div class="message-user">{{ item.nick_name }}</div>
                  <div class="message-content">
                    <div class="content">
                      <div :class="{'txt-message': true, isMd: config.isMd}">
                        <template v-if="!config.isMd">
                          {{ item.content }}
                        </template>
                        <template v-else>
                          <MdPreview :theme="store.themeString" v-model="item.content" :editorId="'md__'+item.id"></MdPreview>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="item.msg_type === 1 || item.msg_type === 7"
                   :class="'system '+'system_'+item.msg_type.toString() ">
                <div class="txt-message">{{ item.content }}</div>
              </div>
            </div>
          </template>
        </a-checkbox-group>

      </div>
      <div class="footer">
        <div class="menu">
          <div class="icon" v-if="config.isSendImage" @click="sendImageEvent">
            <IconImage></IconImage>
          </div>
          <div class="icon" v-if="config.isSendFile" @click="sendFileEvent">
            <IconFile></IconFile>
          </div>
        </div>
        <div class="inRoom" v-if="!socket">
          <a-button type="primary" @click="websocketConnect">进入聊天室</a-button>
        </div>
        <a-textarea v-if="!config.isMd"
                    show-word-limit
                    :max-length="config.contentLength"
                    @keydown.enter.ctrl="sendData"
                    v-model="content"
                    auto-size
                    placeholder="聊天内容"
                    style="height: 100%"></a-textarea>
        <MdEditor v-else v-model="content" :theme="store.themeString" placeholder="聊天内容" :max-length="config.contentLength" :toolbars="[]"
                  :footers="[]" :on-upload-img="config.isSendImage ? onUploadImg : undefined" :preview="false"/>
        <a-button type="primary" class="send_button" @click="sendData">发送</a-button>
      </div>
    </a-spin>

  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import type {listDataType} from "@/api";
import {chatRecordApi, chatDeleteApi} from "@/api/chat_api";
import type {chatType} from "@/api/chat_api";
import type {paramsType} from "@/api";
import {Message} from "@arco-design/web-vue";
import {settingsInfoApi} from "@/api/settings_api";
import type {chatGroupConfigType,chatMessageType} from "@/api/chat_api";
import type {baseResponse} from "@/api";
import {IconImage, IconFile,IconRefresh} from "@arco-design/web-vue/es/icon";
import {nextTick} from "vue";
import {dataTimeFormat} from "../../utils/date.ts";
import {useStore} from "@/stores";
import {onUploadImg} from "@/api/image_api.ts";
import {MdEditor} from "md-editor-v3";
import {MdPreview} from "md-editor-v3";
import {onUnmounted} from "vue";

const store=useStore();
const params = reactive<paramsType>({
  page: 1,
  limit: 50,
})

const chatRecordData = reactive<listDataType<chatType>>({
  list: [],
  count: 0
})

const loading = ref(true)

const config = reactive<chatGroupConfigType>({
  isAnonymous: true,
  isShowTime: false,
  defaultLimit: 50,
  welcomeTitle: "【雾念】在线学习空间",
  isOnlinePeople: true,
  isSendImage: false,
  isSendFile: false,
  contentLength:100,
  isMd:false,
})

async function getConfig() {
  let res = await settingsInfoApi("chat_group") as baseResponse<chatGroupConfigType>
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Object.assign(config, res.data)

  params.limit = config.defaultLimit

  getData()
  loading.value = false
}

getConfig()

async function getData() {
  let res = await chatRecordApi(params)
  chatRecordData.list = res.data.list
  chatRecordData.list.reverse()
  chatRecordData.count = res.data.count
}

async function flush(){
  await getConfig()
  await getData()
  Message.success("刷新成功")
}


const isManage = ref(false)
const selectIDList = ref<number[]>([])

async function removeChatGroup() {
  let res = await chatDeleteApi(selectIDList.value)
  if (res.code) {
    Message.error(res.msg)
    return
  }
  Message.success(res.msg)
  selectIDList.value = []
  getData()
}

function sendFileEvent(){
  Message.warning("后续更新")

}
function sendImageEvent(){
  Message.warning("后续更新")

}

let socket = ref<WebSocket>()
let index = 0

const chatData = reactive({
  nickName: "",
  onlineCount: 0
})

onUnmounted(()=>{
  socket.value?.close()
})

function websocketConnect() {
  // 建立websocket连接
  socket.value = new WebSocket(`ws://${location.host}/ws/api/chat_groups`)
  // 接收消息
  socket.value.onmessage = function (event) {
    let _data = event.data
    let jsonData = JSON.parse(_data) as chatMessageType
    if (index === 0) {
      // 第一条消息  区分我发的还是别人发的
      chatData.nickName = jsonData.nick_name
      chatData.onlineCount = jsonData.online_count
      index++
      return
    }
    chatData.onlineCount = jsonData.online_count
    chatRecordData.list.push({
      avatar: jsonData.avatar,
      content: jsonData.content,
      created_at: jsonData.created_at,
      msg_type: jsonData.msg_type,
      nick_name: jsonData.nick_name,
      isMe: chatData.nickName === jsonData.nick_name,
    })
    index++

    nextTick(() => {
      let dom = document.querySelector(".record_list") as HTMLDivElement
      dom.scrollTo({
        top: dom.scrollHeight,
        behavior: "smooth" // 平滑
      })
    })
  }

  // 连接成功之后的回调
  // socket.value.onopen = function (ev) {
  //   Message.success("成功进入聊天室")
  // }
  socket.value.onopen = function (ev) {
    Message.success("成功进入聊天室");
    // 新增：发送进入聊天室消息（msg_type: 1）
    socket.value?.send(JSON.stringify({
      content: "", // 内容可为空，后端会自动填充
      msg_type: 1, // 对应 InRoomMsg
    }));
  }
  // 错误
  socket.value.onerror = function (ev) {
    Message.error("进入聊天室失败")
  }
  // 服务端关闭
  socket.value.onclose = function (ev) {
    // Message.error("连接断开")
    socket.value = undefined;
  }
}

const content = ref("")

function sendData() {
  socket.value?.send(JSON.stringify({
    content: content.value,
    msg_type: 2,
  }))
  content.value = ""
}




</script>
<style lang="scss">
.blog_chat_group_components {
  width: 100%;
  height: 100%;
  background-color: var(--color-bg-1);
  border-radius: 5px;

  .arco-spin{
    width: 100%;
  }

  .head {
    border-bottom: 1px solid var(--bg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70px;
    position: relative;

    .title {
      font-size: 16px;
      font-weight: 600;
    }

    .outline {
      margin-top: 5px;
      color: var(--color-text-2);
    }

    .manage {
      position: absolute;
      right: 10px;
      display: flex;
      align-items: center;
    }
  }

  .record_list {
    overflow-y: auto;
    padding: 20px;
    height: calc(100vh - 410px);

    .message {
      display: flex;
      margin-bottom: 20px;

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      .message-main {
        margin-left: 10px;

        .message-content {
          margin-top: 5px;

          .content {
            display: flex;
            margin-left: 5px;
          }
        }

        .txt-message {
          background-color: var(--color-fill-2);
          border-radius: 5px;
          padding: 10px;
          position: relative;
          width: fit-content;
          min-height: 41px;
          white-space: break-spaces;
          word-break: break-all;

          &.isMd{
            white-space: inherit;
            word-break: inherit;
          }

          &:before {
            content: "";
            display: block;
            position: absolute;
            left: -20px;
            top: 6px;
            border-width: 5px 10px;
            border-style: solid;
            border-color: transparent var(--color-fill-2) transparent transparent;
          }

          .md-editor{
            background-color: inherit;
            .md-editor-preview-wrapper{
              padding: 0;

              img{
                border: none;
              }
            }

          }
        }
      }


      &.isMe {
        justify-content: right;
        flex-direction: row-reverse;

        .message-main {
          margin-left: 0;
          margin-right: 10px;

          .message-user {
            text-align: right;
          }

          .txt-message {
            &:before {
              content: "";
              display: block;
              position: absolute;
              right: -20px;
              left: inherit;
              top: 6px;
              border-width: 5px 10px;
              border-style: solid;
              border-color: transparent transparent transparent var(--color-fill-2);
            }
          }
        }
      }
    }

    .system {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;

      .txt-message {
        padding: 5px 10px;
        background-color: var(--color-fill-2);
        border-radius: 5px;
        color: var(--color-text-2);
      }
    }

    .msg {
      position: relative;

      &.isManage {
        background-color: var(--color-fill-1);
        border-radius: 5px;
      }

      .arco-checkbox {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .arco-checkbox-group {
      width: 100%;
    }

    .date{
      position: absolute;
      right: 0;
      top: 0;
      color: var(--color-text-3);
      font-size: 12px;
      transform: scale(0.8);
      transform-origin: top  right;
    }
  }

  .footer {
    height: 210px;
    border-top: 1px solid var(--bg);
    padding: 20px;
    position: relative;

    .menu {
      display: flex;
      align-items: center;
      position: absolute;
      top: -32px;
      border-top: 1px solid var(--bg);
      border-right: 1px solid var(--bg);
      left: 0;
      background-color: var(--color-bg-1);

      .icon {
        font-size: 18px;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }

    .inRoom{
      position: absolute;
      width: calc(100% - 40px);
      height: calc(100% - 40px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index:2;
      background-color: var(--login_bg);
    }

    .send_button {
      position: absolute;
      left: 30px;
      bottom: 30px;
      z-index: 1;
    }

    .md-editor{
      height: 100% ;
    }
  }


}
</style>