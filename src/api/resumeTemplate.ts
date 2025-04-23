import request from '@/utils/request.ts'

// 创建模板 /api/resumetemplate/
export const createTemplate = (resumeTemplateName: string, resumeTemplateContent:any) => {
  return request.post('/api/resumetemplate/', {
    resumeTemplateName,
    resumeTemplateContent
  })
}

// 修改简历模板 /api/resumetemplate/:id
export const updateTemplate = (id: string, resumeTemplateName: string, resumeTemplateContent:any) => {
  return request.patch(`/api/resumetemplate/${id}`, {
    resumeTemplateName,
    resumeTemplateContent
  })
}

// 删除简历模板 /api/resumetemplate/:id
export const deleteTemplate = (id: string) => {
  return request.delete(`/api/resumetemplate/${id}`)
}

// 查询简历模板列表/api/resumetemplate/?page=1&limit=10
export const getTemplateList = (page: number, limit: number) => {
  return request.get('/api/resumetemplate/',{
    params: {
      page,
      limit
    }
  })
}

// 查询简历模板详情 /api/resumetemplate/:id
export const getTemplateDetail = (id: string) => {
  return request.get(`/api/resumetemplate/${id}`)
}
