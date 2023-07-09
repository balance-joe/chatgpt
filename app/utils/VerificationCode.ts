class VerificationCode {
  private handler: { now: number; time: null; canSend: boolean };
  private config: any;

  constructor(config: any) {
    this.handler = {
      time: null,
      canSend: true,
      now: 0,
    };

    this.config = Object.assign(
      {
        maxTime: 60,

        // 更新的时候
        onUpdate() {},

        // 当从倒计时到0的时候，激活验证的时候
        onActive() {},

        // 发送信息事件
        onSendMessage() {},
      },
      config,
    );
  }

  sendMessage() {
    if (this.handler.canSend) {
      this.handler.canSend = false;
      this.config.onSendMessage();
      this.config.onUpdate((this.handler.now = this.config.maxTime));

      // @ts-ignore
      this.handler.time = setInterval(() => {
        this.handler.now--;
        this.config.onUpdate(this.handler.now);

        if (this.handler.now <= 0) {
          // @ts-ignore
          clearInterval(this.handler.time);
          this.config.onActive();
          this.handler.canSend = true;
        }
      }, 1000);
    }
  }
}

export default VerificationCode;
