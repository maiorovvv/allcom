# create new branch

```sh
feature/new-branch
```

example for task: «create product list page as Wishlist»
```sh
feature/create-product-list-page or
feature/user-products_wishlist
```

# FRONTEND import rules:
library -> components -> style

add empty line between imports

```sh
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { loadProducts } from './productsSlice';

import './Products.module.scss';

const Products = (): JSX.Element => {… 
```

# path with react-router 

[http://localhost:5173/allcom/#/](http://localhost:5173/allcom/#/)

```sh
http://localhost:5173/allcom/#/
```

# import svg files 

We use [vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr#readme)

1) Create file in /img/svg/heart.svg

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

```sh
import HeartIcon from '../../img/svg/heart.svg?react';
```

# scss 

[video about scss](https://www.youtube.com/watch?v=yzCJwpJrmb4)


# vite-template-redux

Uses [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/), and [React Testing Library](https://github.com/testing-library/react-testing-library) to create a modern [React](https://react.dev/) app compatible with [Create React App](https://create-react-app.dev/)

```sh
npx degit reduxjs/redux-templates/packages/vite-template-redux my-app
```

## Goals

- Easy migration from Create React App or Vite
- As beginner friendly as Create React App
- Optimized performance compared to Create React App
- Customizable without ejecting

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## Inspiration

- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)
