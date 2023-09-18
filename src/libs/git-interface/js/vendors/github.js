import { Octokit } from "@octokit/rest"
import { decode } from 'js-base64'
import { marked } from 'marked'
import * as DOMPurify from 'dompurify'


export class GithubRepository {
  constructor(repositoryUrl, debug = false) {
    this.url = repositoryUrl
    const parsedUrl = new URL(this.url)

    const isDebug = debug ? debug : false

    // Allow HTTPS only
    if (!isDebug) {
      if (parsedUrl.protocol !== 'https:') {
        throw new Error('Repository must use HTTPS')
      }
    }

    if (parsedUrl) {
      this.namespace = parsedUrl.hostname

      this.host = parsedUrl.origin

      this.repositoryOwner = parsedUrl.pathname.split('/')[1]
      this.repositoryName = parsedUrl.pathname.split('/')[2]
    }


    this.hostInstance = new Octokit()

    // this.repositoryInstance =
    // (async () => {
    //   const result = await this.hostInstance.rest.repos.get({
    //     owner: this.repositoryOwner,
    //     repo: this.repositoryName,
    //   })
    //   return result
    // })
    this.repositoryInstance = this.hostInstance.rest.repos.get({
      owner: this.repositoryOwner,
      repo: this.repositoryName,
    })

    console.log('::::::::::::::')
    console.log(this.repositoryInstance)
    console.log('::::::::::::::')
  }

  async init() {
    if (this.hostInstance && this.repositoryOwner && this.repositoryName) {
      if (this.hostInstance.rest) {
        const result = await this.hostInstance.request("GET /users")
        // const result = await this.hostInstance.rest.repos.get({
        //   owner: this.repositoryOwner,
        //   repo: this.repositoryName,
        // })
        console.log(result.data)
        // this.repositoryInstance = result.data
      }
    }
  }

  async getUser () {
    const user = await this.repositoryInstance
    // console.log(user.data)
    return user
  }

  async getReleases () {
    const { data: releases } = await this.hostInstance.rest.listReleases({
      owner: this.repositoryOwner,
      repo: this.repositoryName
    })
    console.log(releases)
    return releases
  }
}

export async function fetchGithubRepositoryReadme (repositoryUrl) {
  if (repositoryUrl && repositoryUrl.includes('github')) {
    const repoAuthor = repositoryUrl.split('/')[3]
    const repoName = repositoryUrl.split('/')[4]
    let url = 'https://api.github.com/repos/' + repoAuthor + '/' + repoName + '/readme'

    const response = await fetch(url)
    const body = await response.json()
    const content = DOMPurify.sanitize(marked.parse((decode(body.content))))
    const gitRepositoryReadme = content
    // console.log('README: ', gitRepositoryReadme)

    return gitRepositoryReadme
  }
}
