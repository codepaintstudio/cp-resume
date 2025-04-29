import { createVNode, render } from 'vue'
import MessageToast from '@/components/MessageToast.vue'

type MessageType = 'success' | 'error'

interface MessageOptions {
  message: string
  type: MessageType
  duration?: number
}

export function showMessage({ message, type, duration = 3000 }: MessageOptions) {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const vnode = createVNode(MessageToast, {
    type,
    message,
    onClose: () => {
      render(null, container)
      document.body.removeChild(container)
    },
  })

  render(vnode, container)

  // 自动关闭定时器
  setTimeout(() => {
    render(null, container)
    if (container.parentNode) {
      container.parentNode.removeChild(container)
    }
  }, duration)
}
