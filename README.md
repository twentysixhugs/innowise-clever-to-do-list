# innowise-clever-to-do-list

### Task
- [Requirements](https://docs.google.com/document/d/1heFuihWrsw14bCpUdr6fla9ysqE6IrsobSMKAOpBiKA)
- [Deployment](https://todo-twentysixhugs.netlify.app/)

### How to run the app
1. Clone the repository on your local machine
2. Run `cd innowise-clever-to-do-list` to move into the directory
3. Run `npm i` to install all dependencies
4. Switch to `dev` branch if you plan to perform modifications 
5. Run `npm start`. You'll see a new tab in the browser with the app running.

#### Additional scripts
- Linter (Simply checks the code for linting errors, doesn't fix anything): `npm run lint`

#### How to create git hooks
- Run `npm run prepare`
- Add a hook, e.g. `npx husky add .husky/pre-commit "npm lint"` (Will run `npm test` before making a commit)
- For more information, visit [husky npm page](https://www.npmjs.com/package/husky)

### Database snapshot
- Tasks are stored in Firestore inside **tasks** collection as an array of documents.
- Each task has the following structure:
  - `description: string`
  - `isCompleted: boolean`
  - `name: string`
  - `timestamp: timestamp`
  - `uid: string`
- When you want to access tasks, you must provide uid to the query. Otherwise, firestore security rules will block any access.
- Users are stored in a separate storage designed for authentication only. New users are stored there, so there are no changes to firestore on new user signup.

### Folder structure/Project information
- Project boilerplate was generated via `create-react-app --template typescript`
- You can find HTML and initial CRA setup in `public` folder
- React router pages can be found in `src/pages`
- Regular components which are not pages themselves can be found in `src/components`.
- Helper calendar functions can be found in `src/helpers`.
- In `src/services`, there are classes for creating db services and their instances that proxy interaction with DB.
- Custom hooks used across the app can be found in `src/hooks`
- `src/init` contains functions that must be called before app is rendered, i.e. in `index.ts` file.

### Application stack
- React, React Router
- Firebase
- TypeScript
- MUI
