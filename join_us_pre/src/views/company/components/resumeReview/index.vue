<template>
    <div>
        <a-table :scroll="{ x: 1700 }" :pagination="false" :data-source="deliveryRecordList" :columns="columns" bordered>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'avatar'">
                    <img style="width: 50px; height: 50px; border-radius: 50%;" :src="record.avatar" alt="">
                </template>
                <template v-if="column.key === 'sendTime'">
                  <a-tooltip>
                    <template #title>{{ getTime(record.sendTime,'time') }}</template>
                  <span>{{ getTimeBefore(record.sendTime) }}</span>
                  </a-tooltip>
                </template>
                <template v-if="column.key === 'types'">
                    <a-tag v-show="record.types === '1'" color="success">约面试</a-tag>
                    <a-tag v-show="record.types === '0'" color="warning">待回复</a-tag>
                    <a-tag v-show="record.types === '2'" color="error">不合适</a-tag>
                </template>
                <template v-if="column.key === 'oprate'" >
                    <a-button size="small" style="margin: 0 5px;" type="primary" @click="openModal(record.userId)">查看简历</a-button>
                    <a-button size="small" :disabled="record.types === '1'" style="margin: 0 5px;" type="primary"
                        @click="updateState(record.sendId, 'interview')">约面试</a-button>
                    <a-button  size="small" :disabled="record.types === '2'" style="margin: 0 5px; "  type="danger"
                        @click="updateState(record.sendId, 'inappropriate')">不合适</a-button>
                </template>
            </template>
        </a-table>
        <a-pagination style="margin: 10px auto;" @change="changePage" :pageSize="pageSize" v-model:current="pageIndex" :total="total" show-less-items />
    </div>
    <a-modal width="1000px" v-model:visible="visible" title="在线简历" ok-text="确认" @ok="visible = false">
        <template #footer>
            <a-button key="submit" type="primary" @click="visible = false">确认</a-button>
        </template>
        <onlineResume :userId="userIdVar" />
    </a-modal>
</template>

<script setup lang="ts">
import { deliveryRecord, updateDeliveryState } from '@/api'
import { message } from 'ant-design-vue'
import {getTime,getTimeBefore} from "@/utils/formatTime"
import onlineResume from '@/components/common/onlineResume/index.vue'
import { useCompanyState } from "@/hooks/useCompanyState";
import { useHrState } from "@/hooks/useHrState";
interface deliveryRecordType {
    userId: string,
    advantage: string,
    age: number,
    apply_state: string,
    avatar: string,
    born: string,
    degree: string,
    email: string,
    enter_schoolTime: string,
    gender: string,
    hope_city: string,
    hope_job: string,
    hope_job_type: string,
    hope_salary: string,
    leave_schoolTime: string,
    major: string,
    name: string,
    phone: string,
    position_name: string,
    school: string,
    school_exp: string,
    school_type: string
}
const propertyMap: Record<string, string> = {
  avatar: '头像',
  name: '姓名',
    position_name: '投递职位名称',
    phone: '手机号',
    email: '邮箱',
    school: '学校',
    degree: '学历',
    leave_schoolTime: '毕业时间',
    sendTime: '投递时间',
    types: '投递状态',
    oprate: '操作'
}
const columns = ref<any[]>([])
const deliveryRecordList = ref<Array<deliveryRecordType>>([])
const company_id = localStorage.getItem('company_id') as string
const telephone = JSON.parse(localStorage.getItem('loginInfo') as string)?.telephone
const pageIndex = ref(1)
const pageSize = ref(15)
const total = ref(0)
let visible = ref(false)
let userIdVar = ref('')
const getDeliveryRecord = () => {
    deliveryRecord(company_id, telephone, pageIndex.value, pageSize.value).then((res: any) => {
        if (res.code === 200) {
            deliveryRecordList.value = res.data
            total.value = res.total
            columns.value = Object.keys(propertyMap).map((item) => {
              if(item=='oprate'){
                return {
                    title: propertyMap[item],
                    dataIndex: item,
                    key: item,
                    align: 'center',
                    fixed: 'right' ,
                    width:250
                }
              }else if(item=='types'){
                return {
                    title: propertyMap[item],
                    dataIndex: item,
                    key: item,
                    align: 'center',
                    fixed: 'right' ,
                    width:90
                }
              }
              else{
                return {
                    title: propertyMap[item],
                    dataIndex: item,
                    key: item,
                    align: 'center',
                    width:160
                }
              }
               
            })
        } else {
            message.error('数据查询失败!')
        }
    })
}
getDeliveryRecord()
const updateState =async (sendId: string, type: string) => {
  if (!(await useCompanyState()).state) return;
  if (!(await useHrState()).state) return;
    updateDeliveryState(sendId, type).then((res: any) => {
        if (res.code === 200) {
            message.success('状态更新成功！')
        } else {
            message.error('状态更新失败！')
        }
        getDeliveryRecord()
    })
}
const changePage = (page: number) => {
    pageIndex.value = page
    getDeliveryRecord()
}
const openModal = (userId: string) => {
    visible.value = true
    userIdVar.value = userId
}
</script>

<style scoped></style>