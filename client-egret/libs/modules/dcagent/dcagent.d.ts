/**
 * DataEye SDK for HTML5 2.0
 *
 * 更多信息请前往 http://wiki.dataeye.com/h5/document/html5/guide.html
 *
 * Copyright@2013 DataEye
 */
declare class DCAgent {
    static init(config: DCAgentConfig): void;
    static login(username: string): void;
    /**
     * 上报自定义事件
     * @param eventID 事件ID
     * @param data 事件属性，支持key和value为string或number的对象
     */
    static onEvent(eventID: string, data?: DCAgentConfig): void;
    static onPayment(options: DCAgentPaymentConfig): void;
    static setAccountType(accountType: string): void;
    static setAge(age: number): void;
    static setGender(gender: DCAgentGender): void;
    /**
     * 设置区服
     * @param serverID
     */
    static setGameServer(serverID: string): void;
    /**
     * 设置角色信息
     * @param roleID 角色ID(String)
     * @param roleRace 角色种族(String)
     * @param roleClass 角色职业(String)
     * @param roleLevel 角色等级(Number)
     */
    static setRoleInfo(roleID: string, roleRace: string, roleClass: string, roleLevel: number): void;
    /**
     * 获取虚拟币
     * @param getNum 获取数量
     * @param balanceNum 留存总量
     * @param coinType 虚拟币类型
     * @param reason 获取原因
     */
    static onCoinGet(getNum: number, balanceNum: number, coinType: string, reason: string): void;
    /**
     * 消耗虚拟币
     * @param useNum 消耗数量
     * @param balanceNum 留存总量
     * @param coinType 虚拟币类型
     * @param reason 消耗原因
     */
    static onCoinUse(useNum: number, balanceNum: number, coinType: string, reason: string): void;
    /**
     * 关卡内使用虚拟币购买道具
     * @param itemID 道具ID
     * @param itemNum 道具数目
     * @param coinType 虚拟币类型
     * @param coinNum 虚拟币数目
     * @param missonID 关卡ID
     */
    static onItemBuy(itemID: string, itemNum: number, coinType: string, coinNum: number, missonID: string): void;
    /**
     * 关卡内道具产出以及原因
     * @param itemID 道具ID
     * @param itemNum 道具数目
     * @param missonID 关卡ID
     * @param reason 产出原因
     */
    static onItemProduce(itemID: string, itemNum: number, missonID: string, reason: string): void;
    /**
     * 关卡内道具消耗以及原因
     * @param itemID 道具ID
     * @param itemNum 道具数目
     * @param missonID 关卡ID
     * @param reason 消耗原因
     */
    static onItemUse(itemID: string, itemNum: number, missonID: string, reason: string): void;
    /**
     * 通关成功耗时
     * @param missionID 关卡ID
     * @param elapsed 通关耗时(秒)
     */
    static onMissionFinished(missionID: string, elapsed: number): void;
    /**
     * 通关失败耗时
     * @param missionID 关卡ID
     * @param elapsed 通关耗时(秒)
     */
    static onMissionUnfinished(missionID: string, elapsed: number): void;
    /**
     * 完成任务耗时
     * @param taskID 任务ID
     * @param elapsed 耗时(秒)
     */
    static onTaskFinished(taskID: string, elapsed: number): void;
    /**
     * 执行任务失败耗时
     * @param taskID 任务ID
     * @param elapsed 耗时(秒)
     */
    static onTaskUnfinished(taskID: string, elapsed: number): void;
    /**
     * 升级耗时
     * @param startLevel 开始等级
     * @param endLevel 目标等级
     * @param elapsed 耗时（秒）
     */
    static onLevelUp(startLevel: number, endLevel: number, elapsed: number): void;
}
interface DCAgentConfig {
}
/**
 * amount必填，其它可选
 */
declare class DCAgentPaymentConfig {
    amount: number;
    currencyType: string;
    payType: string;
    iapid: string;
    orderId: string;
}
declare enum DCAgentGender {
    male = 1,
    female = 2,
}
