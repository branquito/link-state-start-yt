import React from 'react'
import { STARRED_REPOS_QUERY } from './queries'
import { useQuery } from 'react-apollo-hooks'

const extractLanguages = data => {
  const allLangs = data.viewer.starredRepositories.nodes
    .map(repoNode => {
      return repoNode.languages.nodes.map(langNode => langNode.name)
    })
    .flat()
  return [...new Set(allLangs)]
}

const Filters = () => {
  const { data } = useQuery(STARRED_REPOS_QUERY, {
    variables: {
      numRepos: 25
    }
  })
  const languages = extractLanguages(data)
  return (
    <div>
      {languages.map(lang => {
        return (
          <button
            key={lang}
            onClick={() => {
              console.log(lang)
            }}>
            {lang}
          </button>
        )
      })}
    </div>
  )
}

export default Filters
