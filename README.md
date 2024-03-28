# pill-reminder

## About the App

PillReminder is a mobile application designed to help users manage their medication intake. It enables users to store entries about the medications they are taking, track the dosage required, and make notes about these medications.

## Prerequisites
Before you start, make sure you have the following installed on your system:

- Node.js (version 18 or later)
- JDK 17 (required for Android development)
- Android SDK Platform 34 and Android SDK Build-Tools 34 (required for Android development)

## Setup Instructions

1) First, clone the project repository to your local machine using Git: `git clone git@github.com:trusasha/pill-reminder.git`
2) Navigate to the project directory and install the required dependencies: `cd pill-reminder` and `yarn`
3) Setting up the **Android environment**
    - Make sure you have JDK 17 installed on your machine. You can download it from the official Oracle website or OpenJDK.
    - Ensure Android SDK Platform 34 and Android SDK Build-Tools 34 are installed. These can be installed via the Android SDK Manager in Android Studio.
    - Set your `JAVA_HOME` environment variable to point to the JDK 17 installation directory.
4) Running the app
    - For Android: `yarn run android`
    - For iOS: `yarn run ios`

## Notes
- Ensure your Android development environment is properly set up by running `npx react-native doctor`. This command will check your environment and display any issues with the setup.
- For detailed setup instructions for React Native development, refer to the [React Native environment setup](https://reactnative.dev/)

