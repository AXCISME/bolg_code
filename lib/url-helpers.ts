/**
 * URL处理工具函数
 * 用于安全地处理中文字符和特殊字符的URL编码
 */

/**
 * 创建分类链接
 * 对于包含中文字符的分类，Next.js会自动处理URL编码
 */
export function createCategoryLink(category: string): string {
  return `/category/${category}`
}

/**
 * 创建标签链接
 * 对于包含中文字符的标签，Next.js会自动处理URL编码
 */
export function createTagLink(tag: string): string {
  return `/tag/${tag}`
}

/**
 * 验证分类名称是否有效
 */
export function isValidCategory(category: string): boolean {
  return Boolean(category && category.trim().length > 0)
}

/**
 * 验证标签名称是否有效
 */
export function isValidTag(tag: string): boolean {
  return Boolean(tag && tag.trim().length > 0)
}