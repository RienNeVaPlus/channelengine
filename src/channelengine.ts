import {fetch, toQueryString, sleep} from './utils'

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export class ChannelEngine {
  static url = 'https://%tenant%.channelengine.net/api/%version%/'

  url: string
  apiKey: string
  maxRetries = 10

  constructor(tenant: string, apiKey: string, opt: {
    maxRetries?: number,
    version?: string
  } = {}){
    const {maxRetries = 10, version = 2} = opt

    this.maxRetries = maxRetries
    this.url = ChannelEngine.url
      .replace('%tenant%', tenant)
      .replace('%version%', 'v'+String(version))
    this.apiKey = apiKey
  }

  /**
   * Fetch request
   *
   * @param method
   * @param path
   * @param [opt]
   */
  async fetch(
    method: RequestMethod,
    path: string | { endpoint: string, [key: string]: string | number },
    opt: Partial<{body: any, retries: number}> = {}
  ) {
    let {body, retries = 0} = opt
    const {apiKey} = this
    const query = typeof path === 'string' ? {endpoint:path} : path
    const {endpoint, ...param} = query
    const url = this.url + endpoint + toQueryString({...param, apiKey})

    try {
      const res = await fetch(url, {...(body||{}), method})
      return  await res.json()
    } catch(e) {
      retries++
      const wait = retries * 10

      if(retries > this.maxRetries)
        throw new Error(`Max retries (${this.maxRetries}) exceeded with: ${e.message}`)

      await sleep(wait)

      return await this.fetch(method, query, {body, retries})
    }
  }

  /**
   * Api call with pagination
   *
   * @param method
   * @param path
   * @param [opt]
   */
  async json(
    method: RequestMethod,
    path: string | { endpoint: string, [key: string]: string | number },
    opt: Partial<{body: any, log: any}> = {}
  ) {
    const query = typeof path === 'string' ? {endpoint:path} : path
    const json = await this.fetch(method, query, opt)

    const {ItemsPerPage, TotalCount, Content} = json

    if(ItemsPerPage){
      const pages = Math.ceil(TotalCount / ItemsPerPage)
      let page = 1

      while(page < pages){
        page++
        const next = await this.fetch(method, {...query, page}, opt)
        Content.push(...next.Content)
      }

      return Content
    }

    return json
  }

  /**
   * GET Request
   *
   * @param endpoint
   * @param [query]
   */
  async GET(endpoint: string, query: any = {}){
    return await this.json('GET', {endpoint, ...query})
  }

  /**
   * POST Request
   *
   * @param endpoint
   * @param [query]
   * @param [body]
   */
  async POST(endpoint: string, query: any = {}, body: any = {}){
    return await this.json('POST', {endpoint, ...query}, body)
  }

  /**
   * PUT Request
   *
   * @param endpoint
   * @param [query]
   * @param [body]
   */
  async PUT(endpoint: string, query: any = {}, body: any = {}){
    return await this.json('PUT', {endpoint, ...query}, body)
  }

  /**
   * PATCH Request
   *
   * @param endpoint
   * @param [query]
   * @param [body]
   */
  async PATCH(endpoint: string, query: any = {}, body: any = {}){
    return await this.json('PATCH', {endpoint, ...query}, body)
  }

  /**
   * DELETE Request
   *
   * @param endpoint
   * @param [query]
   */
  async DELETE(endpoint: string, query: any = {}){
    return await this.json('DELETE', {endpoint, ...query})
  }
}