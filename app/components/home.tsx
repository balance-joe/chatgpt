"use client";

import { jsapiLogin } from "@/app/request/myRequest";

require("../polyfill");

import { useState, useEffect } from "react";

import styles from "./home.module.scss";
import BotIcon from "../icons/bot.svg";
import LoadingIcon from "../icons/three-dots.svg";

import { getCSSVar, useMobileScreen } from "../utils";
import { getToken } from "@/app/utils/utils";

import dynamic from "next/dynamic";
import { Path, SlotID } from "../constant";
import { ErrorBoundary } from "./error";

import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { SideBar } from "./sidebar";
import { useAppConfig } from "../store/config";
import { getClientConfig } from "../config/client";
import { AuthPage } from "./auth";
import { setToken } from "@/app/utils/utils";

export function Loading(props: { noLogo?: boolean }) {
  return (
    <div className={styles["loading-content"] + " no-dark"}>
      {!props.noLogo && <BotIcon />}
      <LoadingIcon />
    </div>
  );
}

const Settings = dynamic(async () => (await import("./settings")).Settings, {
  loading: () => <Loading noLogo />,
});

const Chat = dynamic(async () => (await import("./chat")).Chat, {
  loading: () => <Loading noLogo />,
});

const NewChat = dynamic(async () => (await import("./new-chat")).NewChat, {
  loading: () => <Loading noLogo />,
});

const MaskPage = dynamic(async () => (await import("./mask")).MaskPage, {
  loading: () => <Loading noLogo />,
});

// const Login = dynamic(async () => (await import("./login")).Login, {
//   loading: () => <Loading noLogo />,
// });
//
// const Register = dynamic(async () => (await import("./register")).Register, {
//   loading: () => <Loading noLogo />,
// });
//
// const Package = dynamic(async () => (await import("./package")).Package, {
//   loading: () => <Loading noLogo />,
// });

// const Pay = dynamic(async () => (await import("./pay")).Pay, {
//   loading: () => <Loading noLogo />,
// });
//
// const User = dynamic(async () => (await import("./user")).User, {
//   loading: () => <Loading noLogo />,
// });
//
// const ResidueLog = dynamic(
//     async () => (await import("./user/residue-log")).ResidueLog,
//     {
//       loading: () => <Loading noLogo />,
//     },
// );
// const System = dynamic(async () => (await import("./system/system")).System, {
//   loading: () => <Loading noLogo />,
// });
//
// const AboutUs = dynamic(
//     async () => (await import("./system/about_us")).AboutUs,
//     {
//       loading: () => <Loading noLogo />,
//     },
// );
//
// const PrivacyAgreement = dynamic(
//     async () => (await import("./system/privacy_agreement")).PrivacyAgreement,
//     {
//       loading: () => <Loading noLogo />,
//     },
// );
//
// const UserAgreement = dynamic(
//     async () => (await import("./system/user_agreement")).UserAgreement,
//     {
//       loading: () => <Loading noLogo />,
//     },
// );
//
// const Help = dynamic(async () => (await import("./system/help")).Help, {
//   loading: () => <Loading noLogo />,
// });

export function useSwitchTheme() {
  const config = useAppConfig();

  useEffect(() => {
    document.body.classList.remove("light");
    document.body.classList.remove("dark");

    if (config.theme === "dark") {
      document.body.classList.add("dark");
    } else if (config.theme === "light") {
      document.body.classList.add("light");
    }

    const metaDescriptionDark = document.querySelector(
      'meta[name="theme-color"][media*="dark"]',
    );
    const metaDescriptionLight = document.querySelector(
      'meta[name="theme-color"][media*="light"]',
    );

    if (config.theme === "auto") {
      metaDescriptionDark?.setAttribute("content", "#151515");
      metaDescriptionLight?.setAttribute("content", "#fafafa");
    } else {
      const themeColor = getCSSVar("--theme-color");
      metaDescriptionDark?.setAttribute("content", themeColor);
      metaDescriptionLight?.setAttribute("content", themeColor);
    }
  }, [config.theme]);
}

const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

const loadAsyncGoogleFont = () => {
  const linkEl = document.createElement("link");
  const proxyFontUrl = "/google-fonts";
  const remoteFontUrl = "https://fonts.googleapis.com";
  const googleFontUrl =
    getClientConfig()?.buildMode === "export" ? remoteFontUrl : proxyFontUrl;
  linkEl.rel = "stylesheet";
  linkEl.href =
    googleFontUrl +
    "/css2?family=Noto+Sans+SC:wght@300;400;700;900&display=swap";
  document.head.appendChild(linkEl);
};

function Screen() {
  const config = useAppConfig();
  const location = useLocation();
  const isHome = location.pathname === Path.Home;
  const isAuth = location.pathname === Path.Auth;
  const isMobileScreen = useMobileScreen();

  useEffect(() => {
    loadAsyncGoogleFont();
  }, []);

  //调用useWechatLogin方法获取微信code
  useWechatLogin();

  return (
    <div
      className={
        styles.container +
        ` ${
          config.tightBorder && !isMobileScreen
            ? styles["tight-container"]
            : styles.container
        }`
      }
    >
      {isAuth ? (
        <>
          <AuthPage />
        </>
      ) : (
        <>
          <SideBar className={isHome ? styles["sidebar-show"] : ""} />

          <div className={styles["window-content"]} id={SlotID.AppBody}>
            <Routes>
              <Route path={Path.Home} element={<Chat />} />
              <Route path={Path.NewChat} element={<NewChat />} />
              <Route path={Path.Masks} element={<MaskPage />} />
              <Route path={Path.Chat} element={<Chat />} />
              <Route path={Path.Settings} element={<Settings />} />
              {/*<Route path={Path.Login} element={<Login />} />*/}
              {/*<Route path={Path.Register} element={<Register />} />*/}
              {/*<Route path={Path.Package} element={<Package />} />*/}
              {/*<Route path={Path.Pay} element={<Pay />} />*/}
              {/*<Route path={Path.User} element={<User />} />*/}
              {/*<Route path={Path.ResidueLog} element={<ResidueLog />} />*/}
              {/*<Route path={Path.System} element={<System />} />*/}
              {/*<Route path={Path.AboutUs} element={<AboutUs />} />*/}
              {/*<Route path={Path.PrivacyAgreement} element={<PrivacyAgreement />} />*/}
              {/*<Route path={Path.UserAgreement} element={<UserAgreement />} />*/}
              {/*<Route path={Path.Help} element={<Help />} />*/}
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

// 微信获取code并且登录
const useWechatLogin = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const userAgent = window.navigator.userAgent;
  const isWechat = /MicroMessenger/i.test(userAgent);
  useEffect(() => {
    if (!isWechat || getToken()) {
      return;
    }
    const getCode = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      if (code) {
        setCode(code);
        jsapiLogin({ code: code }).then((res: any) => {
          const data = res.data;
          setToken(data.userinfo.token);
          window.location.href = "https://gpt.zheisin.cn/";
          // navigate(Path.User);
        });
      } else {
        // 开始跳转
        window.location.href = authorizeUrl;
      }
    };
    getCode();
  }, []);

  const getAuthorizeUrl = (redirectUri: string) => {
    const appId = "wxf3e7e8bc9fadd102";
    const scope = "snsapi_userinfo"; // 获取用户详细信息
    const state = ""; // 自定义参数
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
  };

  // 在页面中调用获取授权链接的接口
  const redirectUri = "https://gpt.zheisin.cn/"; // 授权后重定向的URL
  const authorizeUrl = getAuthorizeUrl(redirectUri);
  return { code };
};

export function Home() {
  useSwitchTheme();
  useEffect(() => {
    console.log("[Config] got config from build time", getClientConfig());
  }, []);

  if (!useHasHydrated()) {
    return <Loading />;
  }

  return (
    <ErrorBoundary>
      <Router>
        <Screen />
      </Router>
    </ErrorBoundary>
  );
}
