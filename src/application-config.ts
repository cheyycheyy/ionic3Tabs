/**
 * 配置文件：这里存放应用启动的各种初始化配置参数
 */

export const CONFIGURATION = {
    REMOTE_IP: '192.168.93.98',
    REMOTE_PORT: '8080',
    HEART_PORT: '8080',
    SHA: 'Sha1',
    GISPATH: "58.246.38.68:3999",
    PROXY: "2",
    MENHU_IP: '192.168.1.37',
    MENHU_PORT: '80',
}

export const Key: string[] = [
    "REMOTE_IP",
    "REMOTE_PORT",
    "HEART_PORT",
    "PROXY"];

export class Configuration {

    public static getConfig(key: string) {
        let text = "CONFIGURATION." + key.toUpperCase();
        let value = eval(text);
        return value;
    }

}
