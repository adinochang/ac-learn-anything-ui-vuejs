# Learn Anything UI (VueJS)

An AI-powered web application that generates personalized learning paths and summarizes complex content, built with VueJS. Connects to a back-end application which uses OpenAI API.

## Author

Adino Chang - [GitHub Profile](https://github.com/adinochang) | [LinkedIn Profile](https://www.linkedin.com/in/adinochang)

## Table of Contents

* [Technologies Used](#technologies-used)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installing and Running the Application](#installing-and-running-the-application)
* [Project Structure](#project-structure)


## Technologies Used

* **Vue.js**

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

* Docker Desktop
* The back-end API project. [Repository]() 
2
Additional pre-requisites without docker:

* Node.js (LTS version recommended)
* npm (comes with Node.js) or Yarn

### Installing and Running the Application

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/adinochang/ac-learn-anything-ui_vuejs.git
    ```

2.  **Set up Environment Variables:**

    Create a `.env` file in the root of your project. You may copy it from `sample.env`. This file will contain sensitive information and configuration.
    

3. Installing and Running the Application **with Docker**

    Build and start the docker container:

    ```bash
    docker compose build
    docker compose up
    ```

4. Installing and Running the Application **without Docker**

    **Install dependencies:**
    ```bash
    cd ac-learn-anything-ui-vuejs
    npm install
    # or
    yarn install
    ```

    **Start the development server:**
    ```bash
    cd ac-learn-anything-ui-vuejs
    npm run dev
    # or
    yarn dev
    ```
    The API should now be running, typically on `http://localhost:5173` 
