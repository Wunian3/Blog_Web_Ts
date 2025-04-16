import {defineComponent, h, createApp, ref} from "vue";
import Blog_message_record_modal from "./blog_message_record_modal.vue";


const visible = ref<undefined|boolean>(undefined)
// const visible = ref<boolean>(true);
const userIDRef = ref<number>(0)
const nickNameRef = ref<string>("")
const messageRecordRef = ref()

export function showMessageRecord(userID:number,nickName:string) {

    if (visible.value === undefined){
        const component = defineComponent({
            setup() {
                const onClose = () => {
                    visible.value = false
                }

                return {
                    visible,
                    userIDRef,
                    nickNameRef,
                    onClose,
                }
            },
            render() {
                return h(Blog_message_record_modal,{
                    visible: this.visible?? false,
                    userID:this.userIDRef,
                    nickName:this.nickNameRef,
                    onClose: this.onClose,
                    ref:messageRecordRef,

                })
            }
        })

        const app = createApp(component)
        const div = document.createElement("div")
        app.mount(div)
        document.body.appendChild(div)
    }

    if(userID === userIDRef.value){
        messageRecordRef.value.getData()
    }
    visible.value = true
    userIDRef.value = userID
    nickNameRef.value = nickName
}