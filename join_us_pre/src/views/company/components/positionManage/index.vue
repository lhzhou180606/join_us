<template>
  <a-button
    @click="editOrAddPosition()"
    type="primary"
    style="margin: 10px 0; width: 250px; font-weight: bold"
  >
    <template #icon>
      <PlusSquareOutlined />
    </template>
    发布职位
  </a-button>
  <div class="position-manage-container">
    <a-table
      :scroll="{ x: 1700 }"
      bordered
      :data-source="positionList"
      :pagination="false"
      :columns="columns"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'position_state'">
          <span>
            <a-tag color="warning" v-if="record.position_state === '0'"
              >待审核</a-tag
            >
            <a-tag color="success" v-else-if="record.position_state === '1'"
              >正常</a-tag
            >
            <a-tag color="error" v-else>已关闭</a-tag>
          </span>
        </template>
        <template v-if="column.key === 'pos_addTime'">
          <a-tooltip>
            <template #title>{{
              getTime(record.pos_addTime, "time")
            }}</template>
            <span>{{ getTimeBefore(record.pos_addTime) }}</span>
          </a-tooltip>
        </template>
        <template v-if="column.key === 'updateTime'">
          <a-tooltip>
            <template #title>{{ getTime(record.updateTime, "time") }}</template>
            <span>{{ getTimeBefore(record.updateTime) }}</span>
          </a-tooltip>
        </template>
        <template v-if="column.key === 'oprate'">
          <a-button
            @click="lookDetail(record.position_id)"
            style="font-size: 14px; margin-bottom: 5px"
            type="primary"
            size="small"
          >
            <template #icon>
              <EyeOutlined />
            </template>
            查看
          </a-button>

          <a-button
            :disabled="record.position_state == '0'"
            @click="
              editOrAddPosition(record.position_id, record.position_state)
            "
            style="font-size: 14px; margin: 0 10px"
            type="primary"
            size="small"
          >
            <template #icon>
              <EditOutlined />
            </template>
            编辑
          </a-button>

          <a-button
            @click="delPosition(record.position_id)"
            style="font-size: 14px; margin-bottom: 5px"
            type="primary"
            size="small"
          >
            <template #icon>
              <DeleteOutlined />
            </template>
            删除
          </a-button>
        </template>
      </template>
    </a-table>
    <a-pagination
      style="margin-top: 20px"
      @change="changePage"
      :pageSize="pageSize"
      v-model:current="pageIndex"
      :total="total"
      show-less-items
    />
  </div>
  <a-modal
    style="width: 1200px"
    ok-text="确认"
    cancel-text="关闭"
    v-model:visible="detailVisible"
    title="职位详情"
    @ok="detailVisible = false"
  >
    <a-descriptions bordered title="职位详情">
      <a-descriptions-item label="职位名称">{{
        positionDetailObj.position_name
      }}</a-descriptions-item>
      <a-descriptions-item label="职位薪资">{{
        positionDetailObj.salary
      }}</a-descriptions-item>
      <a-descriptions-item label="发布城市">{{
        positionDetailObj.cityName
      }}</a-descriptions-item>
      <a-descriptions-item label="经验要求">{{
        positionDetailObj.experiences
      }}</a-descriptions-item>
      <a-descriptions-item label="学历要求">{{
        positionDetailObj.degrees
      }}</a-descriptions-item>
      <a-descriptions-item label="招聘类型">{{
        positionDetailObj.job_type
      }}</a-descriptions-item>
      <a-descriptions-item label="所属公司">{{
        positionDetailObj.company_name
      }}</a-descriptions-item>
      <a-descriptions-item label="所属公司">{{
        positionDetailObj.company_name
      }}</a-descriptions-item>
      <a-descriptions-item label="发布hr">{{
        positionDetailObj.name
      }}</a-descriptions-item>
      <a-descriptions-item label="hr联系方式">{{
        positionDetailObj.telephone
      }}</a-descriptions-item>
      <a-descriptions-item label="职位标签">
        <a-tag
          color="#7546C9"
          v-for="(item, index) in positionDetailObj.position_tag"
          :key="index"
          >{{ item }}</a-tag
        >
      </a-descriptions-item>
      <a-descriptions-item label="福利标签">
        <a-tag
          color="#7546C9"
          v-for="(item, index) in positionDetailObj.welfare_tag"
          :key="index"
          >{{ item }}</a-tag
        >
      </a-descriptions-item>
      <a-descriptions-item label="职位状态">
        <a-tag color="warning" v-if="positionDetailObj.position_state === '0'"
          >待审核</a-tag
        >
        <a-tag
          color="success"
          v-else-if="positionDetailObj.position_state === '1'"
          >正常</a-tag
        >
        <a-tag color="error" v-else>已关闭</a-tag>
      </a-descriptions-item>
    </a-descriptions>
  </a-modal>
  <a-modal
    style="width: 900px"
    ok-text="确认"
    cancel-text="关闭"
    v-model:visible="addVisible"
    title="职位信息填写"
    @ok="addPositionHandle"
    @cancel="cancel"
  >
    <a-form
      ref="formRef"
      :rules="rulesRef"
      :model="formState"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="职位名称" name="position_name">
        <a-input
          placeholder="请填写职位名称"
          v-model:value="formState.position_name"
        />
      </a-form-item>
      <a-form-item label="招聘类型" name="job_type">
        <a-select
          placeholder="请填写招聘类型"
          v-model:value="formState.job_type"
        >
          <a-select-option
            v-for="(item, index) in job_typeArr"
            :key="index"
            :value="item.value"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item label="职位薪资" name="salary">
        <a-select v-model:value="formState.salary" placeholder="请选择职位薪资">
          <a-select-option
            v-for="(item, index) in salaryArr"
            :key="index"
            :value="item.value"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item label="工作地点" name="city">
        <a-cascader
          expandTrigger="hover"
          v-model:value="formState.cityArr"
          :options="cityList"
          :field-names="{
            label: 'name',
            value: 'name',
            children: 'subLevelModelList',
          }"
          placeholder="请选择职位发布城市"
        />
      </a-form-item>
      <a-form-item label="职位分类" name="position_type">
        <a-cascader
          v-model:value="formState.position_type"
          :options="positionTypeListCom"
          :field-names="{
            label: 'position_type_name',
            value: 'position_type_id',
            children: 'children',
          }"
          placeholder="请选择职位分类"
        />
      </a-form-item>
      <a-form-item label="工作经验" name="experiences">
        <a-select
          v-model:value="formState.experiences"
          placeholder="请选择经验要求"
        >
          <a-select-option
            v-for="(item, index) in experiencesArr"
            :key="index"
            :value="item.value"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item label="学历要求" name="position_name">
        <a-select
          placeholder="请选择学历要求"
          v-model:value="formState.degrees"
        >
          <a-select-option
            v-for="(item, index) in degreesArr"
            :key="index"
            :value="item.value"
            >{{ item.name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item label="福利待遇" name="welfare_tag">
        <a-select
          v-model:value="formState.welfare_tag"
          mode="tags"
          style="width: 100%"
          placeholder="请填写福利待遇"
        ></a-select>
      </a-form-item>
      <a-form-item label="职位描述" name="position_desc">
        <a-textarea
          v-model:value="formState.position_desc"
          showCount
          :rows="4"
          placeholder="请填写职位描述"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import {
  hrPositionManage,
  hrPositionDetail,
  hrAddPosition,
  hrDelPosition,
  hrEditPosition,
  hrEditPosition2,
} from "@/api";
import { createVNode } from "vue";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import { Form, message, Modal } from "ant-design-vue";
import type { FormInstance } from "ant-design-vue";
import { useGetConditionData } from "@/store/condition";
import { getTime, getTimeBefore } from "@/utils/formatTime";
import { useCompanyState } from "@/hooks/useCompanyState";
import { useHrState } from "@/hooks/useHrState";
import {useCity} from "@/store/city"
import {useCompanyInfo} from "@/store/company_hr"
const { conditionData } = useGetConditionData();
const {company_id}  =useCompanyInfo()
//删除数组中为不限的一项
type TConditionData = {
  code: number;
  name: string;
};
const dealWithData = (data: TConditionData[]) => {
  return data.filter((item) => item.name !== "不限");
};
// const s = dealWithData(conditionData[0] as TConditionData[])
interface position {
  id: number;
  position_id: string;
  position_name: string;
  salary: string;
  cityName: string;
  pos_region: string;
  experiences: string;
  degrees: string;
  position_tag: string;
  welfare_tag: string;
  company_id: string;
  hr_id: string;
  position_desc: string;
  pos_addTime: string;
  updateTime: string;
  position_state: string;
  position_type1: string;
  position_type2: string;
  job_type: string;
}
interface formType {
  position_name: string;
  salary: string | undefined;
  cityArr: string[];
  experiences: string | undefined;
  degrees: string | undefined;
  welfare_tag: [];
  position_desc: string;
  job_type: string | undefined;
  position_type: [];
}
const formRef = ref<FormInstance>();
const propertyMap: Record<string, string> = {
  position_name: "职位名称",
  job_type: "职位招聘类型",
  cityName: "发布城市",
  pos_region: "发布区域",
  experiences: "经验要求",
  degrees: "学历要求",
  salary: "薪资",
  pos_addTime: "发布时间",
  updateTime: "最近更新时间",
  position_state: "职位状态",
  oprate: "操作",
};
const columns = ref<any[]>([]);
const positionList = ref<position[]>([]);
const pageIndex = ref(1);
const pageSize = ref(15);
const total = ref(0);
const positionDetailObj: any = ref({});
const cityList = ref(useCity().allCityList);
const degreesArr = ref([
  {
    name: "中专/中技",
    value: "中专/中技",
  },
  {
    name: "高中",
    value: "高中",
  },
  {
    name: "本科",
    value: "本科",
  },
  {
    name: "大专",
    value: "大专",
  },
  {
    name: "硕士",
    value: "硕士",
  },
  {
    name: "博士",
    value: "博士",
  },
  {
    name: "初中及以下",
    value: "初中及以下",
  },
  {
    name: "学历不限",
    value: "学历不限",
  },
]);
const job_typeArr = ref([
  {
    name: "全职",
    value: "全职",
  },
  {
    name: "兼职",
    value: "兼职",
  },
  {
    name: "实习",
    value: "实习",
  },
  {
    name: "校招",
    value: "校招",
  },
]);
const salaryArr = ref([
  {
    value: "3K以下",
    name: "3K以下",
  },
  {
    value: "3-5K",
    name: "3-5K",
  },
  {
    value: "5-10K",
    name: "5-10K",
  },
  {
    value: "10-20K",
    name: "10-20K",
  },
  {
    value: "20-50K",
    name: "20-50K",
  },
  {
    value: "50K以上",
    name: "50K以上",
  },
]);

const positionTypeList = ref(
  JSON.parse(localStorage.getItem("positionType") as string).positionTypeList
);
const positionTypeListCom = computed<[]>(() => {
  const resultArr = positionTypeList.value.map((item: any) => {
    return {
      position_type_name: item.position_type_name,
      position_type_id: item.position_type_id,
      children: [],
    };
  });
  const secondArr: [] = positionTypeList.value
    .map((item: any) => item.children)
    .flat(Infinity)
    .map((item: any) => {
      return {
        position_type_id: item.position_type_id,
        position_type_name: item.type_name,
        parent: item.parent,
      };
    });
  secondArr.forEach((item: any) => {
    if (
      resultArr.findIndex(
        (item2: any) => item2.position_type_id === item.parent
      ) !== -1
    ) {
      resultArr[
        resultArr.findIndex(
          (item2: any) => item2.position_type_id === item.parent
        )
      ].children.push(item);
    }
  });
  return resultArr;
});
const useForm = Form.useForm;
const experiencesArr = ref([
  {
    name: "不限",
    value: "不限",
  },
  {
    name: "在校生",
    value: "在校生",
  },
  {
    name: "应届生",
    value: "应届生",
  },
  {
    name: "经验不限",
    value: "经验不限",
  },
  {
    name: "1年以内",
    value: "1年以内",
  },
  {
    name: "1-3年",
    value: "1-3年",
  },
  {
    name: "3-5年",
    value: "3-5年",
  },
  {
    name: "5-10年",
    value: "5-10年",
  },
  {
    name: "10年以上",
    value: "10年以上",
  },
]);
const formState = reactive<formType>({
  position_name: "",
  salary: undefined,
  cityArr: [],
  experiences: undefined,
  degrees: undefined,
  welfare_tag: [],
  position_desc: "",
  job_type: undefined,
  position_type: [],
});
const rulesRef = reactive({
  position_name: [
    { required: true, message: "该字段不能为空", trigger: "blur" },
  ],
  salary: [{ required: true, message: "该字段不能为空", trigger: "blur" }],
  cityArr: [{ required: true, message: "该字段不能为空", trigger: "blur" }],
  experiences: [{ required: true, message: "该字段不能为空", trigger: "blur" }],
  degrees: [{ required: true, message: "该字段不能为空", trigger: "blur" }],
  welfare_tag: [{ required: true, message: "该字段不能为空", trigger: "blur" }],
  position_desc: [
    { required: true, message: "该字段不能为空", trigger: "blur" },
  ],
  job_type: [{ required: true, message: "该字段不能为空", trigger: "blur" }],
  position_type1: [
    { required: true, message: "该字段不能为空", trigger: "blur" },
  ],
  position_type2: [
    { required: true, message: "该字段不能为空", trigger: "blur" },
  ],
});
const router = useRouter();

const { validate } = useForm(formState, rulesRef);
const getDetail = () => {
  hrPositionManage(
    company_id,
    pageIndex.value,
    pageSize.value
  ).then((res: any) => {
    columns.value = Object.keys(propertyMap).map((item, index) => {
      if (item == "oprate") {
        return {
          title: propertyMap[item],
          dataIndex: item,
          key: item,
          fixed: "right",
          width: 260,
        };
      } else if (item == "position_state") {
        return {
          title: propertyMap[item],
          dataIndex: item,
          key: item,
          fixed: "right",
          width: 90,
        };
      } else {
        return {
          title: propertyMap[item],
          dataIndex: item,
          key: item,
        };
      }
    });
    const tmpArr = res.data?.map((item: position) => {
      return {
        position_name: item.position_name,
        salary: item.salary,
        cityName: item.cityName,
        pos_region: item.pos_region,
        experiences: item.experiences,
        degrees: item.degrees,
        pos_addTime: item.pos_addTime,
        updateTime: item.updateTime,
        position_state: item.position_state,
        job_type: item.job_type,
        oprate: "",
        position_id: item.position_id,
      };
    });
    positionList.value = tmpArr;
    total.value = res.total;
  });
};
getDetail();
const detailVisible = ref(false);
const addVisible = ref(false);
const btnText = ref("");
const position_id_variable = ref("");
// 切换页数
const changePage = (page: number) => {
  pageIndex.value = page;
  getDetail();
};
// 查看详情
const lookDetail = (position_id: string) => {
  detailVisible.value = true;
  hrPositionDetail(position_id).then((res: any) => {
    if (res.code === 200) {
      positionDetailObj.value = res.data;
    }
  });
};

// 发布/编辑职位
const addPositionHandle = async () => {
  if (!(await useCompanyState()).state) return;
  if (!(await useHrState()).state) return;
  if (btnText.value === "edit") {
    await formRef.value?.validateFields();
    if (!formState.position_type.length)
      return message.warning("职位分类必须填写");
    if (!formState.cityArr.length) return message.warning("发布城市必须填写");
    hrEditPosition2({
      position_id: position_id_variable.value,
      formData: formState,
    }).then((res: any) => {
      if (res.code === 200) {
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
      getDetail();
      let i: keyof formType;
      for (i in formState) {
        if (Array.isArray(formState[i])) {
          formState[i] = <string | any>[];
        } else {
          formState[i] = "" as any;
        }
      }
      addVisible.value = false;
    });
  } else {
    await formRef.value?.validateFields();
    if (!formState.position_type.length)
      return message.warning("职位分类必须填写");
    if (!formState.cityArr.length) return message.warning("发布城市必须填写");
    const company_id = localStorage.getItem("company_id") as string;
    const telephone = JSON.parse(
      localStorage.getItem("loginInfo") as string
    ).telephone;
    hrAddPosition({
      company_id: company_id,
      telephone: telephone,
      formData: formState,
    }).then((res: any) => {
      if (res.code === 200) {
        message.success(res.msg);
        addVisible.value = false;
        getDetail();
      } else {
        message.warn(res.msg);
        addVisible.value = false;
        getDetail();
      }
      let i: keyof formType;
      for (i in formState) {
        if (Array.isArray(formState[i])) {
          formState[i] = <string | any>[];
        } else {
          formState[i] = "" as any;
        }
      }
      addVisible.value = false;
    });
  }
};
const editOrAddPosition = async (
  position_id?: string,
  position_state?: string
) => {
  if (!(await useCompanyState()).state) return;
  if (!(await useHrState()).state) return;
  addVisible.value = true;
  if (position_id) {
    position_id_variable.value = position_id;
    hrEditPosition(position_id).then((res: any) => {
      const data = res.data;
      formState.position_name = data.position_name;
      formState.position_desc = data.position_desc;
      formState.salary = data.salary;
      formState.experiences = data.experiences;
      formState.degrees = data.degrees;
      formState.welfare_tag = JSON.parse(data.welfare_tag);
      formState.job_type = job_typeArr.value.filter(
        (item) => item.value === data.job_type
      )[0].value;
      formState.position_type.push(data.position_type1 as never);
      formState.position_type.push(data.position_type2 as never);
      formState.cityArr.push(data.cityName, data.cityName, data.pos_region);
      btnText.value = "edit";
    });
  } else {
    btnText.value = "add";
  }
};

// 删除职位
const delPosition = (position_id: string) => {
  Modal.confirm({
    title: "温馨提示",
    okText: "确认删除",
    cancelText: "取消",
    centered: true,
    icon: createVNode(ExclamationCircleOutlined),
    content: createVNode(
      "div",
      { style: "color:red;" },
      "您确定要删除该职位吗?"
    ),
    onOk: async () => {
      if (!(await useCompanyState()).state) return;
      if (!(await useHrState()).state) return;
      hrDelPosition(position_id).then((res: any) => {
        if (res.code === 200) {
          message.success(res.msg);
          getDetail();
        } else {
          message.error(res.msg);
          getDetail();
        }
      });
    },
    onCancel() {},
    class: "test",
  });
};
const cancel = () => {
  formRef.value?.resetFields();
  formState.degrees = undefined;
  formState.cityArr = [];
  formState.position_type = [];
  addVisible.value = false;
};
</script>

<style lang="less" scoped></style>
