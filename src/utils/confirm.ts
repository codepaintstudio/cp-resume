import { createVNode, render } from 'vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

interface ConfirmOptions {
  message: string
}

export function showConfirm({ message }: ConfirmOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const vnode = createVNode(ConfirmDialog, {
      message,
      onConfirm: () => {
        render(null, container)
        document.body.removeChild(container)
        resolve()
      },
      onCancel: () => {
        render(null, container)
        document.body.removeChild(container)
        reject()
      }
    })

    render(vnode, container)
  })
}
