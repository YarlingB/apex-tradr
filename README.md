# Stock Watchlist App

A React Native application for real-time stock tracking and price alerts.

## 🚀 Features

- Real-time Data: Live stock prices updates using WebSockets (Finnhub API).

- Watchlist: Manage your favorite stocks with persistent storage.

- Price Alerts: Configure custom price thresholds for specific stocks.

- Push Notifications: Receive local notifications immediately when a stock crosses your target price (even in background/quit state depending on implementation).

- State Management: Optimized global state using Zustand.

## Tech stack

- Core: React Native (CLI), TypeScript.
- Navigation: React Navigation.
- State Management: Zustand (w/ Persistence).
- Networking: Native WebSocket API.
- Notifications: Notifee

# Architecture & Conventions

This project follows a **Feature-Based** architecture to maximize scalability and code co-location. Each feature encapsulates its own UI, logic, etc.

### 📂 Directory Structure

src/
├── app/ # Global configuration (Nav, Theme, Config)
├── features/ # Functional modules (Auth, Watchlist, Graph, etc.)
│ └── [feature-name]/
│ ├── components/ # Feature-specific UI
│ ├── hooks/ # Feature-specific logic
│ └── \*.store.ts # Local state (Zustand)
├── shared/ # Reusable UI Kit and utilities

## Naming conventions

In this project the naming convention stablished to use is Kebab Case (kebab-case) in the whole application, it means that this rule applies to:

- Folders and files: kebab-case (Mandatory)
- React Components: PascalCase
- Interfaces and Types: PascalCase
- Functions / Hooks: camelCase
- Constants: UPPER_SNAKE_CASE

## 📝 Notes for Reviewers

- The app uses the Finnhub Sandbox/Free API tier.
- Ensure you grant notification permissions when prompted to test the alert functionality.

# Getting started

## Prerequisites

- Node.js > 18
- Android Studio / Xcode

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:
