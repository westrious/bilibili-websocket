import writeInt from "./writeInt";

const textEncoder = new TextEncoder('utf-8');

export default function (str, options) {
  const data = textEncoder.encode(str);
  const packetLen = 16 + data.byteLength;
  /**
   * 数据包长度（Packet Length）：4B
   * 数据包头部长度（固定为16）（Header Length）：2B
   * 协议版本（Protocol Version）：2B
   * 操作类型（Operation）：4B
   * 序列号（固定为1）（Sequence Id）：4B
   */
  const header = [0, 0, 0, 0, 0, 16, 0, 1, 0, 0, 0, options, 0, 0, 0, 1];
  // 向操作类型字段中写入
  writeInt(header, 9, 4, packetLen);

  return (new Uint8Array(header.concat(...data))).buffer;
}