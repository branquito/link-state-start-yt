import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import Repository from './Repository'
import { STARRED_REPOS_QUERY } from './queries'

export default function StarredRepos() {
  const { data } = useQuery(STARRED_REPOS_QUERY, {
    variables: { numRepos: 25 }
  })

  return data.viewer.starredRepositories.nodes.map(node => <Repository data={node} key={node.id} />)
}
