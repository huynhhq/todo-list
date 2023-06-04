# TODO LIST APPLICATION

The todo list project is a simple application that allows users to create, manage, and track their tasks or to-do items. It provides a user-friendly interface where users can add tasks, mark them as completed, and delete them when necessary.

## Prerequisites

- [Node.js > 16](https://nodejs.org) and yarn (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 12](https://developer.apple.com/xcode)
- [Cocoapods 1.10.1](https://cocoapods.org)
- [JDK > 17](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Base dependencies

- [recoil](https://github.com/facebookexperimental/Recoil)
- [react-native-calendars](https://github.com/wix/react-native-calendars)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
- [react-navigation](https://reactnavigation.org/) navigation library.
- [jest](https://facebook.github.io/jest/) and [react-native-testing-library](https://callstack.github.io/react-native-testing-library/) for testing.

## Getting Started

### Installation

1. Clone the repository:
    ```shell 
        git clone git@github.com:huynhhq/todo-list.git
    ```
2. Navigate to the project directory:
    ```shell 
        cd todo-list
    ```
3. Install dependencies using Yarn:
    ```shell
        yarn install
    ```
    
### Running the App

- iOS:
    - Ensure you have Xcode installed and configured.
    - If you are using Xcode 12.5 or higher got to /ios and execute `pod install --`repo-update`
    - Run the following command to start the iOS simulator:
        ```shell
            yarn ios
        ```
        
- Android:
    - Ensure you have Android Studio and Android SDK installed and configured.
    - Start an Android emulator or connect an Android device.
        ```shell
            yarn android
        ```

### Additional Scripts

- Running Tests:
    - To run the test suite, use the following command:
        ```shell
            yarn test
        ```
## Folder structure

- `src`: This folder is the main container of all the code inside your application.
  - `@types`: declare module type for `custom-ui-kit` and define `root-stack-params`.
  - `assets`: Asset folder to store all images, vectors, etc.
  - `components`: Folder to store any common component that you use through your app (such as a generic button).
  - `containers`: Folder that contains all your application screens/features.
    - `Screen`: Each screen should be stored inside its folder and inside it a file for its code and a separate one for the styles and tests.
      - `Screen.tsx`
      - `Screen.styles.ts`
      - `Screen.test.ts`
  - `helpers`: Folder that contains utility functions for whole application that you have.
  - `models`: Folder that contains all defined models.
  - `navigators`: Folder to store the navigators.
  - `states`: Using Recoil for managing states in app, folder that contains `atom` and `selector`.
  - `values`: Folder to store any kind of constant that you have.
  - `App.tsx`: Main component that starts your whole app.
  - `index.js`: Entry point of your application as per React-Native standards.

## Authors
  - Hoang Quoc Huynh (Jax) - [@Jax](https://www.linkedin.com/in/huynh-hoang-57a03a17a/)

## License
TODO LIST APPLICATION is MIT licensed.