import request from '@/utils/request.ts'

// 获取用户简历列表 /api/resume/?page=1&limit=10
export function getResumeList(page: number, limit: number ) {
  return request.get('/api/resume/', {
    params:{
      page,
      limit
    }
  })
}

// 获取用户简历详情 /api/resume/1/
export function getResumeDetail(id: string) {
  return request.get(`/api/resume/${id}/`)
}

// 删除用户简历 /api/resume/1/
export function deleteResume(id: string) {
  return request.delete(`/api/resume/${id}`)
}
