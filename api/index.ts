import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  useQuery,
  gql,
} from "@apollo/client";
// const http = HttpLink.create({
//   uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clwgotgv601wx08w7ut7herqx/master",

// });

const httpLink = new HttpLink({
  uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clwgotgv601wx08w7ut7herqx/master",
});
export const client = new ApolloClient({
  uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clwz61zqu014w06uvmes0c3nr/master",
  cache: new InMemoryCache(),
});
export const citiesQuery = gql`
  query MyQuery {
    cities {
      name
      images {
        url(
          transformation: {
            validateOptions: false
            image: { blur: { amount: 0 } }
          }
        )
        mimeType
        width
      }
    }
  }
`;
export const getCities = () => {
  try {
    const { data, error, loading } = useQuery(citiesQuery);
    return data.cities;
  } catch (error) {
    console.log(error);
  }
};
export const getArticles = () => {
  const query = gql`
    query Articles {
      articles {
        slug
        createdAt
        createdBy {
          name
          picture
        }
        category {
          name
        }
        excerpt
        id
        title
        coverUrl
        content {
          raw
        }
      }
    }
  `;
  try {
    const { data, error, loading } = useQuery(query);
    return data.articles;
  } catch (error) {
    console.log(error);
  }
};

type SearchOptions = {
  caseSensitive?: boolean; // Optional flag for case-sensitive search (default: false)
};

function fullTextSearch(
  text: string,
  query: string,
  options?: SearchOptions
): boolean {
  // Normalize text and query based on options
  const normalizedText = options?.caseSensitive ? text : text.toLowerCase();
  const normalizedQuery = options?.caseSensitive ? query : query.toLowerCase();

  // Split the query into individual words
  const queryWords = normalizedQuery.split(/\s(?=(?:[^"]*"[^"]*")*(?![^"]*))/);

  // Check if all query words (or the entire phrase) are found in the text (using regular expressions)
  // options?.wholeWords ? '\\b' : ''
  const regex = new RegExp(queryWords.join("|"));
  return regex.test(normalizedText);
}

// Example usage
// const text = "This is a plain text example for full text search.";
// const query = "full text search";
// const isFoundCaseSensitive = fullTextSearch(text, query); // false (default: case-insensitive)
// const isFoundCaseInsensitive = fullTextSearch(text, query, { caseSensitive: false }); // true
// const isFoundCaseSensitiveExplicit = fullTextSearch(text, query, { caseSensitive: true }); // true

export const fullSearch = (articles: any[], searchTerm: string) => {
  return articles.filter((article) => {
    const textToSearch = `${article.title} ${article.excerpt} ${article.content.text}`;
    return fullTextSearch(textToSearch, searchTerm);
  });
};
export const getArticle = (slug: string) => {
  const query = gql`
    query Article($slug: String!) {
      article(where: { slug: $slug }) {
        createdAt
        excerpt
        id
        title
        coverUrl
        createdBy {
          name
          picture
        }
        category {
          name
        }
        slug
        content {
          json
        }
      }
    }
  `;

  try {
    const { data, error, loading } = useQuery(query, { variables: { slug } });
    const article = data.article;
    return {
      article,
      loading,
    };
  } catch (error) {
    console.log(error);
  }
};
export const getHeadlines = () => {
  const query = gql`
    query Headlines {
      articles(where: { isHeadline: true }) {
        id
        title
        coverUrl
        slug
        createdAt
        category {
          name
        }
        excerpt
        createdBy {
          name
          picture
        }
        content {
          raw
        }
      }
      # articles {
      #   slug
      #   createdAt
      #   createdBy {
      #     name
      #     picture
      #   }
      #   category {
      #     name
      #   }
      #   excerpt
      #   id
      #   title
      #   coverUrl
      #   content {
      #     raw
      #   }
      # }
      # categories {
      #   id
      #   name
      #   imgUrl
      # }
    }
  `;
  try {
    const { data, error, loading } = useQuery(query);
    return data.articles;
  } catch (error) {}
};
export const getCategories = () => {
  const query = gql`
    query MyQuery {
      categories {
        id
        name
        imgUrl
      }
    }
  `;

  try {
    const { data, error, loading } = useQuery(query);
    return data.categories;
  } catch (error) {}
};
export const getArticlesByCategory = (categoryId: string) => {
  const query = gql`
    query ArticlesByCategory($categoryId: ID!) {
      articles(where: { category: { id: $categoryId } }) {
        id
        title
        isHeadline
        coverUrl
        excerpt

        content {
          raw
        }
      }
    }
  `;
  try {
    const { data, error, loading } = useQuery(query, {
      variables: { categoryId },
    });
    return data.articles;
  } catch (error) {}
};
export const getSearchedArticles = (searchTerm: string) => {
  const query = gql`
    query SearchArticles($searchTerm: String!) {
      articles(where: { _search: $searchTerm }) {
        slug
        createdAt
        createdBy {
          name
          picture
        }
        category {
          name
        }
        excerpt
        id
        title
        coverUrl
        content {
          raw
          text
        }
      }
    }
  `;

  try {
    const { data, error, loading } = useQuery(query, {
      variables: { searchTerm },
    });

    return data.articles;
  } catch (error) {
    // console.error(error);
    // return []; // Handle unexpected errors (optional)
  }
};
export const combineSearchResults = (searchTerm: string) => {
  const data = getSearchedArticles(searchTerm);
  const articles: any[] = getArticles(); // GraphQL results

  // Perform client-side search only if data is available (avoids unnecessary processing)
  // const clientSideResults = data?.length
  //   ? fullSearch(articles, searchTerm)
  //   : [];
  const clientSideResults: any[] = fullSearch(articles, searchTerm);

  // Combine results from both sources (handle potential null values)
  const combinedResults: any[] = clientSideResults;

  return { combinedResults }; // Return combined results, error, and loading state
};
