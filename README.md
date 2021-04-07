# Seach Github Repository

The <a href="https://darshanmaradiya.github.io/search-github-repository/">app</a> is basically using <a href="https://docs.github.com/en/rest/reference/search#search-repositories">Github Search API</a> to search the repositories of your interest. While fetching the data it is showing the loader with extra 5 sec time to clearly see the loading as this small implemented searching functionality is the demonstration of the <a href="https://github.com/DarshanMaradiya/useLoader-custom-hook">useLoader()</a> custom hook that I have created to display the loader on the page while data is being fetched.

## Redux Store
Along with ReactJS, the app is also utilizing ReduxJS to create its own mentained redux store. Since it is composed with <a href="https://github.com/zalmoxisus/redux-devtools-extension">Redux DevTools Extension</a>, you will be able to explore the store using store also.

## Middlewares
1) Redux Thunk: To call action creators that return a function instead of an action object.
2) Redux Logger: To display the actions being dispatched by the useLoader() custom-hook (only) in the console. You can edit in useLoader.js to get rid of it.
