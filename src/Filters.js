import React from 'react'
import { STARRED_REPOS_QUERY } from './queries'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

const SET_LANGUAGE_FILTER = gql`
  mutation SetLanguageFilter($language: String) {
    setLanguageFilter(language: $language) @client
  }
`
const extractLanguages = data => {
  const allLangs = data.viewer.starredRepositories.nodes
    .map(repoNode => {
      return repoNode.languages.nodes.map(langNode => langNode.name)
    })
    .flat()
  return [...new Set(allLangs)]
}

const Filters = () => {
  const setLanguageFilter = useMutation(SET_LANGUAGE_FILTER)
  const { data } = useQuery(STARRED_REPOS_QUERY, {
    variables: {
      numRepos: 25
    }
  })
  const selectedLanguage = data.filters.language
  const languages = extractLanguages(data)
  return (
    <div>
      {languages.map(lang => {
        return (
          <button
            key={lang}
            onClick={() => {
              setLanguageFilter({ variables: { language: lang } })
            }}>
            {lang === selectedLanguage ? <strong>{lang}</strong> : lang}
          </button>
        )
      })}
      {selectedLanguage && (
        <button
          onClick={() => {
            setLanguageFilter({ variables: { language: null } })
          }}>
          Clear filters
        </button>
      )}
    </div>
  )
}

export default Filters
