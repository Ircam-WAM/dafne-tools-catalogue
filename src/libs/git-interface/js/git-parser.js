
import { GithubRepository } from "./vendors/github.js"

export class Repository {
  constructor(repositoryUrl, repositoryVendor, debug = false) {
    this.url = repositoryUrl
    this.vendor = repositoryVendor ? repositoryVendor : this.getRepositoryVendor(repositoryUrl)
    this.isDebug = debug

    // supported vendors
    this.vendors = [
      { name: 'github', client: GithubRepository },
      { name: 'gitlab', client: '' }
    ]

    this.vendorClient = null
    this.vendorInstance = null

    if (this.vendor) {
      for (let i = 0; i < this.vendors.length; i++) {
        if (this.vendor === this.vendors[i].name) {
          this.vendorClient = this.vendors[i].client
          this.vendorInstance = new this.vendorClient(this.url, debug = this.isDebug)
        }
      }

      if (!this.vendorClient) {
        throw new Error('Repository vendor is not supported')
      }
    } else {
      throw new Error('Repository vendor not found')
    }
  }

  async init() {
    if (this.vendorInstance) {
      await this.vendorInstance.init()
    }
  }

  getRepositoryVendor (url) {
    if (url) {
      if (url.includes('github')) {
        return 'github'
      } else if (url.includes('gitlab')) {
        return 'gitlab'
      } else {
        return undefined
      }
    } else {
      return undefined
    }
  }

  getRepositoryInstance () {
    return this.vendorInstance.getRepositoryInstance()
  }
}
