This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

[App Link](https://react-recycle.firebaseapp.com/)

React Recycle is a web app that tracks materials that a user recycles, and how much energy and resources they save. It is made with React and Redux, with Firebase/Firestore on the backend. This app was made for people who are interested in protecting our planet, who want to their part in reducing waste and **actually see** the impact that their contributions are making.

## How It Works

First, create an account using the Register page or login with a pre-existing account with the corresponding Login page, which also has an option for resetting your password. Keep in Mind that Password Reset emails are adminstered by the Google's Firebase and resetting process is conducted by that service.

The Dashboard shows you the most recent items you have recycled in the sidebar, and an overall summary of much Energy you saved in total. Following that, a series of cards describe a more detailed breakdown of resources you saved depending on the materials you recycled. Resources range from oil, landfill space, trees, etc.

Click "Add" to describe an item(s) you recycled with the avaiable form. Materials that are avaiable for tracking are:

- Aluminum
- Cardboard
- Glass
- Paper
- Plastic
- Steel

Input the quantity you recycled and the item weight per quantity. You may select a weight unit of your preference, with options in the customary system as well as the metric system. A fast way to create another item that is similar to the first one is to hit "Duplicate" after making the first item, and then click the pencil icon on the copy to edit it with the new information.

The Statistics page shows you a pictorial representation of the materials you recycled via pie or bar graph. The Pie chart qualitatively emphasizes the percentage of materials recycled with respect to the total. The bar graph quantitatively emphasizes the total amount recycled for each material. You can also feed the graphs items that were recycled last week, month, year, or for your account's lifetime.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
