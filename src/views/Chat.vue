<script setup>
import { ref } from 'vue'
import { FilterMatchMode } from 'primevue/api';

const value1 = ref("")
const chats = ref([
    {
        id: 1,
        username: 'marc',
        name: 'Marc',
        lastMessage: 'Hello!',
        unreadMessages: 2
    },
    {
        id: 2,
        username: 'espuga',
        name: 'Espuga',
        lastMessage: 'Hello! asdfasdfasdfasdfasdfsa hola',
        unreadMessages: 0
    }
])
const filterChats = ref(chats.value)
const messages = ref([
    /* {
        id: 3,
        date: "2024-01-02",
        hour: "14:01:52",
        text: "Button component renders a native button element that implicitly includes any passed prop. Text to describe the button is defined with the aria-label prop, if not present label prop is used as the value. If the button is icon only or custom templating is used, it is recommended to use aria-label so that screen readers would be able to read the element properly.",
        userId: 1
    }, */
    {
        id: 4,
        date: "2024-01-02",
        hour: "14:00:32",
        text: "Hola em dic Marc!",
        userId: 3
    },
    {
        id: 3,
        date: "2024-01-02",
        hour: "14:00:32",
        text: "Hola em dic Marc!",
        userId: 3
    },
    {
        id: 2,
        date: "2024-01-02",
        hour: "14:01:12",
        text: "Hola!",
        userId: 1
    },
    {
        id: 1,
        date: "2024-01-01",
        hour: "14:00:32",
        text: "Hola em dic Marc!",
        userId: 3
    }
])
const message = ref("")

const userId = ref(3)


const searchChat = (text) => {
    console.log(text)
    console.log(value1.value)
    if(value1.value==""){
        console.log("si")
        filterChats.value = chats.value
    }else{
        console.log("no")
        filterChats.value = []
        chats.value.forEach((chat) => {
            if(chat.name.toLowerCase().includes(value1.value.toLowerCase())){
                filterChats.value.push(chat)
            }
        })
    }
}

const changeChat = (id) => {
    console.log(id)
}

const sendMessage = () => {
    if(message.value!=""){
        messages.value = [{
            id: messages.value[0].id+1,
            date: "2024-01-02",
            hour: "15:44:31",
            text: message.value,
            userId: userId.value
        }, ...messages.value]
    
        message.value = ""
    }

}

</script>

<template>
    <div class="w-full h-screen p-8">
        <div class="h-full w-full border-2 border-400 border-round-lg flex flex-row">
            <!-- Chats -->
            <div class="col-3 bg-bluegray-50 h-full border-round-left-lg px-4 py-6">
                <div class="flex flex-row justify-content-between">
                    <h2 class="text-3xl text-600 m-0">Chats</h2>
                    <div class="flex align-items-center mr-2">
                        <i class="pi pi-plus cursor-pointer hover:bg-bluegray-100 p-2 border-round-xl" v-tooltip.bottom="'New Chat'"></i>
                    </div>
                </div>
                <div class="w-full mt-3">
                    <IconField iconPosition="left" class="w-full">
                        <InputIcon class="pi pi-search"> </InputIcon>
                        <InputText @update:modelValue="searchChat(value1)" v-model="value1" placeholder="Search" class="w-full py-2"/>
                    </IconField>
                </div>
                <div class="h-full w-full mt-2 pb-8">
                    <DataView :value="filterChats" :pt="{
                        root: {class: 'h-full overflow-hidden'},
                        content: {class: 'border-round-2xl overflow-y-scroll h-full overflow-hidden'}
                    }">
                        <template #list="slotProps">
                            <div class="grid grid-nogutter py-3 px-3">
                                <div v-for="(chat, index) in slotProps.items" :key="index" @click="changeChat(chat.id)"
                                    class="col-12 border-round-2xl px-3 py-2 hover:bg-bluegray-100 cursor-pointer white-space-nowrap overflow-hidden">

                                    <div class="flex flex-row align-items-center justify-content-between">
                                        <div class="flex align-items-center">
                                            <i class="pi pi-user" style="font-size: 2rem;"></i>
                                            <div class="mx-3 ">
                                                <p class="m-0 text-lg font-bold">{{ chat.name }}</p>
                                                <p class="m-0 text-sm w-full ">{{ chat.lastMessage }}</p>
                                            </div>
                                        </div>
                                        <div v-if="chat.unreadMessages>0" class="bg-bluegray-100 border-circle px-1 text-600">
                                            {{ chat.unreadMessages }}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </template>
                    </DataView>
                </div>
            </div>
            <!-- Chat -->
            <div class="col-7 h-full relative px-0 pb-7">
                <!-- Chat info -->
                <div class="w-full absolute top-0 border-bottom-2 border-200 px-4 py-2 flex flex-row align-items-center justify-content-between z-50 bg-white">
                    <div class="flex flex-row align-items-center gap-3">
                        <i class="pi pi-user" style="font-size: 2rem;"></i>
                        <div class="flex flex-column">
                            <p class="m-0 text-xl">Marc</p>
                            <p class="m-0 text-sm">Online</p>
                        </div>
                    </div>
                    <div class="flex flex-row align-items-center gap-3 text-600">
                        <i class="pi pi-phone hover:text-800 cursor-pointer" style="font-size: 1.5rem;"></i>
                        <i class="pi pi-video hover:text-800 cursor-pointer" style="font-size: 1.5rem;"></i>
                        <i class="pi pi-ellipsis-h hover:text-800 cursor-pointer" style="font-size: 1.5rem;"></i>
                    </div>
                </div>

                <div class="mb-8 pt-6 w-full h-full flex flex-column-reverse align-items-end overflow-y-scroll">

                    <!-- Messages -->
                     <div v-for="(message, index) in messages" class="my-1 w-full">
                        <!-- Date -->
                         <div v-if="index===messages.length-1 || index<messages.length-1 && messages[index].date!=messages[index+1].date" 
                            class="flex justify-content-center align-items-center my-2">
                            <div class="bg-bluegray-50 border-round-xl px-2 py-1 text-500 border-1 border-300">{{ message.date }}</div>
                         </div>
    
                        <!-- My Messages -->
                        <div v-if="message.userId==userId" class="w-full flex flex-row justify-content-end align-items-center pr-4 pl-8 gap-2" >
                            <div class="bg-bluegray-100 px-2 py-1 border-round-xl">{{ message.text }}</div>
                            <i v-if="message.id==messages.length || messages[index].userId!=messages[index-1].userId" class="pi pi-user" style="font-size: 1.5rem;"></i>
                            <i v-else class="pi pi-user text-white" style="font-size: 1.5rem;"></i>
                        </div>
    
                        <!-- Other Messages -->
                        <div v-else class="w-full flex flex-row justify-content-start align-items-center pl-4 pr-8 gap-2">
                            <i v-if="message.id==messages.length || messages[index].userId!=messages[index-1].userId" class="pi pi-user" style="font-size: 1.5rem;"></i>
                            <div class="bg-bluegray-100 px-2 py-1 border-round-xl">{{ message.text }}</div>
                        </div>
    
                     </div>
                </div>


                <!-- Send message -->
                <div class="w-full absolute bottom-0 border-top-2 border-200 px-4 py-2 flex flex-row gap-3">
                    <InputText @update:modelValue="" v-model="message" placeholder="Write your message..." class="w-full py-2 border-round-2xl"
                        @keyup.enter="sendMessage"/>
                    <Button type="button" @click="sendMessage"
                        class="pi pi-send p-button-icon-only bg-bluegray-200 border-500 border-round-2xl text-700 flex justify-content-center hover:bg-bluegray-300"/>
                </div>
            </div>

            <div class="col-2 bg-bluegray-50 h-full border-round-right-lg">
            </div>
        </div>
    </div>
</template>

<style>
body ::-webkit-scrollbar {
    width: 10px;
}
body ::-webkit-scrollbar-track {
    display: none;
}
body ::-webkit-scrollbar-thumb {
    background: #e5e7eb; 
}
body ::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
    background: #d1d5db; 
}
</style>