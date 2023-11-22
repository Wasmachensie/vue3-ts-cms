// 重置message，防止重复点击重复弹出message弹框-只是防止重复，ElMessage属性还可以继续使用
import { ElMessage } from 'element-plus'
let messageInstance: any = null

const resetMessage: any = (options: any) => {
  if (messageInstance) {
    // 判断弹窗是否已存在,若存在则关闭
    messageInstance.close()
  }
  messageInstance = ElMessage(options)
}
// message类型
const typeArr: array<string> = ['success', 'error', 'warning', 'info']
typeArr.forEach((type: string) => {
  resetMessage[type] = (options: any) => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return resetMessage(options)
  }
})
export const message = resetMessage
