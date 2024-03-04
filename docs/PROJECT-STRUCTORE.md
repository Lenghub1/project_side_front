# 🍺 Project Structure

## Project Structure on Flat Design

```
├── api (Network)
├── assets (static files)
├── components (Reusable component)
├── hooks (custom hook)
├── pages (view)
├── route (routing)
├── store (state management)
├── styles (style)
├── utils (constant, function ...)
-------- etc config files...
```

### Router

###### Structure

```
route/
├── index.ts
├── routes.ts
├── AppRoutes.tsx
```

### CRUD structure

```
pages/
...
├── user
    ├── index.ts
    ├── User.tsx (GET)
    ├── UpdateUser.tsx (CREATE/EDIT)

```

##### React Hooks

```
React Hooks

import useApi from 'src/hooks/useApi';

const res = useApi.user.me();
```

##### Service

```
Service

import * as userService from 'src/services/userService';
const me = userService.me();
```

## State Management

##### Recoil (v.0.7.7)

###### Structure

```
store/
├── index.ts
├── layoutStore.ts
```

###### Usage

```
import Store from "@/store";
import { useRecoilState } from "recoil";

const [lang, setLang] = useRecoilState(Store.Layout.languageState);


 setLang('ko'); //SET


 <>{lang}</> //GET
```
