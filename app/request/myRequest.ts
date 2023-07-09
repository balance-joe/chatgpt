// @ts-ignore
import axios from "axios";
import { getToken } from "@/app/utils/utils";
import { showToast } from "@/app/components/ui-lib";

const api = axios.create({
  baseURL: "https://chat.zheisin.cn/api",
  // baseURL: "http://chat.test/api",
  timeout: 5000,
});

// 请求拦截器
api.interceptors.request.use(
  (config: { headers: any }) => {
    const common = {};
    if (getToken() !== false) {
      // @ts-ignore
      common["token"] = getToken();
    }
    // @ts-ignore
    common["Content-Type"] = "application/json";
    config.headers = {
      ...config.headers,
      ...common,
    };

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
api.interceptors.response.use(
  (response: any) => {
    const { data } = response;
    if (data.code === 1) {
      return data;
    } else if (data.code === 0) {
      showToast(data.msg);
      return;
    } else if (data.code === 401) {
      window.location.href = "#/login";
    } else {
      throw new Error("请求失败");
    }
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

//登录
export async function login(data: object) {
  return await api.post("user/login", data);
}

//手机号登录
export async function mobileLogin(data: object) {
  return await api.post("user/mobilelogin", data);
}

//手机号登录
export async function jsapiLogin(data: object) {
  return await api.post("user/jsapi_login", data);
}

//登录
export async function register(data: object) {
  return await api.post("user/register", data);
}

//发送短信
export async function sendSms(data: object) {
  return await api.post("sms/send", data);
}

//发送邮件
export async function sendEms(data: object) {
  return await api.post("ems/send", data);
}

//用户详情
export async function userInfo(params: object) {
  return await api.get("user/userInfo", {
    params,
  });
}

//退出登录
export async function logout(params: object) {
  return await api.post("user/logout", {
    params,
  });
}

//用户团队
export async function userTeam(params: object) {
  return await api.get("user/team", {
    params,
  });
}

//修改账号信息
export async function profile(data: object) {
  return await api.post("user/profile", data);
}

//获取配置
export async function getConfig(params: object) {
  return await api.get("index/get_config", {
    params,
  });
}

//套餐列表
export async function packagesList(params: object) {
  return await api.get("packages/list", {
    params,
  });
}

//套餐详情
export async function packagesDetail(params: object) {
  return await api.get("packages/detail", {
    params,
  });
}

//套餐详情
export async function orderSubmit(data: object) {
  return await api.post("order/submit", data);
}

//微信支付
export async function wechatPay(data: object) {
  return await api.post("order/wechat", data);
}

//支付
export async function pay(data: object) {
  return await api.post("order/pay", data);
}

//网页端支付回调
export async function orderState(data: object) {
  return await api.post("order/state", data);
}

//订单列表
export async function orderList(params: object) {
  return await api.get("order/list", {
    params,
  });
}

//订单详情
export async function orderDetail(params: object) {
  return await api.get("order/detail", {
    params,
  });
}

//网页端支付回调
export async function openaiChat(data: object) {
  return await api.post("openai/completions", data);
}

//用户签到
export async function userSign(params: object) {
  return await api.get("user/sign", {
    params,
  });
}

//用户次数消耗
export async function residueLog(params: object) {
  return await api.get("user/residue_log", {
    params,
  });
}

//获取微信认证参数
export async function getTicket(params: object) {
  return await api.get("wechat/getTicket", {
    params,
  });
}

//使用激活码
export async function useKey(data: object) {
  return await api.post("user/useKey", data);
}
