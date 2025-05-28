# Psyches-Of-Color-App

This project is a mobile application for nonprofit organization Psyches of Color, to raise mental health awareness and provide support for Black and Latinx communities. The app is built with a React Native with a Node/Express backend, connected to a MongoDB database.

## Development Start Guide

This section describes how to get started with development work, including some set up steps and important project information.

### Required Tools

Refer to the [development resources doc](https://docs.google.com/document/d/19hy1FUDTmUsyRlYK-sMoh3Y905Ti39oQhI1LHKnF2jQ/edit?usp=sharing) for help with these tools.

- Git
- Text Editor (VS Code, Notepad, Vim, etc.)
- Node.js and NPM
- MongoDB
- Prettier VS Code extension to auto-format code (recommended)
- Postman to design/test API's (recommended)

### Environment Variables

Before running the project, you must configure environment variables for the frontend and backend. Environment variables contain information that may be different between different developers and development vs. production environments, and/or may be sensitive information we don't want to put in our public GitHub repos (e.g. Firebase keys, email account password).

The `env` files for both the frontend and backend in the project Google Drive, at Developers->Environment Variables - note that these files are different. They contain a list of the environment variables you need to configure. You can download the files and place them in the appropriate directory depending on if if is for frontend or backend, and then rename to just `.env`. The renaming is key because the code looks for a file named `.env`.

IMPORTANT: make sure you do NOT remove anything from `.gitignore`. The `.gitignore` file tells git to not track files that we don't want to push to the repo. This includes `.env`, as pushing `.env` to the repo would cause security issues.

### Directory Structure

- Psyches-Of-Color-App
  - backend
    - .env
    - ...other files/directories
  - frontend
    - .env
    - ...other files/directories
  - ...other files/directories

## Running the Project

This section describes various CLI commands to run parts of the project, such as the backend, frontend, linting, etc. In general, you will be running the backend and frontend together from two separate terminal windows while developing/testing. All of these commands assume that you are currently in the root directory of the project.

### Backend

1. `cd backend` to enter the backend directory
2. `npm install` to install any dependencies (i.e. node_modules)
3. `npm run start` to run the backend

### Frontend

1. `cd frontend` to enter the frontend directory
2. `npm install` to install any dependencies
3. There are two options to run the frontend
   1. `npm run start` to run on Expo Go, which you can think of as compiling and running the code.
   2. `npm run ios` or `npm run android` to create a build and run on a simulator. This is necessary for anything requiring custom native code, including libraries such as React Native Firebase.

Upon running the frontend (with `npm run start`), you should see a screen with a QR code and a few keyboard options below. You can scan the QR code on your phone to see the app there, or use keyboard options to open Android, iOS, the debugger, etc.

**Note:** You may have to run `npm run [ios/android]` if facing errors after making changes, even to use `npm run start`. This will regenerate the build (stored in the `/ios` and `/android` folders).

### Admin Portal

1. `cd admin-portal` to enter the admin portal directory
2. `npm install` to install any dependencies
3. `npm run dev` to run the admin portal in development mode

### Linting

This project has ESLint and Prettier set up to run linting and code formatting, respectively, whenever you run `git commit`. All of the following scripts are available for the frontend, backend, and admin portal. Make sure to `cd` into either the the correct one of those directories, depending on which you are linting.

- `npm run lint-check` runs lint checks on your code
- `npm run lint-fix` fixes any automatically fixable lint errors
- `npm run format` runs code formatting checks and fixes any formatting errors

### Testing

TODO
