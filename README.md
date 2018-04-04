# React Native Auth Boilerplate

This is a React Native boilerplate with auth already implemented. It uses [Nativebase](https://nativebase.io) for the UI and [Hasura APIs](https://hasura.io/features/auth) for the backend.

This has been created as an open-source boilerplate by the Hasura team. There are instructions below in case you wish to use this boilerplate without the Hasura APIs.

![gif](https://raw.githubusercontent.com/hasura/react-native-auth-boilerplate/master/readme-assets/ios/ios_gif.gif)

## Who should use this?

- Fullstack React Native developers looking to start building an app with authentication already covered. You can modify both the UI and the backend logic to customize it per your own requirements.

- Developers trying to use Hasura with React Native.


## Getting Started

### Using this with the Hasura APIs

Make sure you have [hasura CLI](https://docs.hasura.io/0.15/manual/install-hasura-cli.html) installed.

- Clone the repo and `cd` into it.

  ```bash
  $ git clone https://github.com/hasura/react-native-auth-boilerplate
  ```

- `cd` into expo directory if you wish to use the expo SDK, or `cd` into the vanilla react native app directory

- Quickstart with the base Hasura project and apply the configuration of the project to the newly created [Hasura cluster](https://docs.hasura.io/0.15/manual/cluster/index.html), as per the instructions below.

  ```bash
  $ hasura quickstart base
  $ cd base
  $ git add . && git commit -m "Applying configuration"
  $ git push hasura master
  ```

> The `hasura quickstart` command clones a base Hasura project with basic configuration and creates a free tier [Hasura cluster](https://docs.hasura.io/0.15/manual/cluster/index.html). Running a `git push` to the `hasura` remote applies the configuration from the project (the base project in this case) to the cluster.



## Running the app
- You will obtain a cluster name after running `hasura quickstart`. Go back to the expo (or vanilla) directory and set this clusterName in `Hasura.js`. Also set `useHasuraApis` to true.

  ```javascript
  const clusterName = "<your cluster name>";
  const useHasuraApis = true;
  ```

- Install node modules.

  ```bash
  $ npm install
  ```
  - If you are using yarn
  ```bash
  $ yarn install
  ```

- Run the app.
  - If you are using Expo,

    ```bash
    $ npm start
    ```

  - If you are using vanilla React Native,

    ```bash
    # For Android
    $ react-native run-android

    # For iOS
    $ react-native run-ios
    ```

### Using this without the Hasura APIs

You will have to configure your own login methods if you are not using the Hasura APIs.

- For using the application with Expo SDK, [click here](https://github.com/hasura/react-native-auth-boilerplate/blob/master/expo) for more detailed instructions.


- For using this with vanilla react native, [click here](https://github.com/hasura/react-native-auth-boilerplate/blob/master/vanilla) for more detailed instructions.





## Contribute

React Native Auth boilerplate is an open source project licensed under Apache License 2.0.

Contributions are welcome.

## Gallery

### Login with Username

#### iOS

![iosusername](https://github.com/hasura/react-native-auth-boilerplate/raw/master/readme-assets/ios/iosusername.jpg)

#### Android

![androidusername](https://github.com/hasura/react-native-auth-boilerplate/raw/master/readme-assets/android/androidusername.jpg)


### Login with Email

#### iOS

![iosemail](https://github.com/hasura/react-native-auth-boilerplate/raw/master/readme-assets/ios/iosemail.jpg)

#### Android

![androidemail](https://github.com/hasura/react-native-auth-boilerplate/raw/master/readme-assets/android/androidemail.jpg)


### Login with OTP

#### iOS

![iosotp](https://github.com/hasura/react-native-auth-boilerplate/raw/master/readme-assets/ios/iosotp.jpg)

#### Android

![androidotp](https://github.com/hasura/react-native-auth-boilerplate/raw/master/readme-assets/android/androidotp.jpg)


### Google and Facebook

#### Expo

##### iOS

![iossocial](https://github.com/hasura/react-native-auth-boilerplate/raw/master/readme-assets/ios/iossocial.jpg)

##### Android

![androidsocial](https://github.com/hasura/react-native-auth-boilerplate/raw/master/readme-assets/android/androidsocial.jpg)
