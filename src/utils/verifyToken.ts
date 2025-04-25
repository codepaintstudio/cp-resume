import { verifyToken } from '@/api/user.ts'

export const hasToken = async (): Promise<boolean> => {
  try {
    await verifyToken()
    console.log('Token 验证成功')
    return true
  } catch (error) {
    console.error('Token 验证失败', error)
    return false
  }
}
