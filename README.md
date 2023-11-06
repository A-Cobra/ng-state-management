# StateManagementApp

## Overview

This is a full-stack application built with NestJS and Angular. `Please note that I have zero experience with NestJS and Docker`. My involvement in the project was focused solely on the frontend using Angular and a component library called Clapp, which is an in-house tool developed by the company.

The project is part of my work assignment, and I have received permission from the project manager to upload it. However, it should be noted that the application is incomplete as I got laid off during the ongoing development process.

The project follows an NX monorepo structure and involves a team of 20 individuals. Throughout the development, we followed a test-driven approach, where the presence of tests was a requirement for pull request approvals.

The purpose of the application is to build an API that offers new trainees a superior alternative to the existing API. The application includes various modules such as products, authentication, branches, business, classification, etc.

## Screenshots

<img src="./packages/state-management-frontend/src/assets/images/businesses.PNG" width="600px">
<img src="./packages/state-management-frontend/src/assets/images/branches.PNG" width="600px">
<img src="./packages/state-management-frontend/src/assets/images/businesses_create.PNG" width="600px">
<img src="./packages/state-management-frontend/src/assets/images/customers.PNG" width="600px">

## Repository Structure

The repository consists of the following branches:

- **master**: The main branch that should represent the stable and deployable version of the application.
- **develop**: The branch used for ongoing development and integration of new features.
- **feature/STAT-114**: The branch I was working on before getting laid off. The code in this branch represents the specific changes I made.

Please note that the files within the repository have been left in their original state. As a result, some tests and functionalities may work partially or not at all.

## Backend Requirements

- Docker Desktop: Install Docker Desktop from the official website: https://www.docker.com/products/docker-desktop
- Postman: Download and install Postman from the official website: https://www.postman.com/downloads/
- PostgreSQL: If you do not use docker, you might use this

## Installation and Setup

To set up the application locally, please follow the steps below:

1. Clone the repository:

   ```bash
   git clone https://github.com/A-Cobra/ng-state-management
   ```

2. Enter the main project folder by typiong the following command:
   ```
   cd ng-state-management
   ```
3. Run the following code to install all the dependencies:

   ```
   npm install --force
   ```

4. Run the following code to serve frontend angular app in dev mode.

   ```
   nx serve state-management-frontend
   ```

5. The front end application will be open in port 4200
6. Access a browser with the following link to review the front end app

   ```
   localhost:4200
   ```

## Backend usage

I sadly do not have enough knowledge to completely guide you on how to accomplish this. However, I have a general idea on how to do it. If I ever understand how to completely do it and test that it works, I will update this.

1.  Run steps 1-3 from [Installation and Setup](#installation-and-setup)

2.  Create a PostgreSQL database with the following parameters

    - Host: localhost
    - Port: 5432
    - Username: your-username
    - Password: your-password
    - Database Name: your-database-name

3.  Add a .env file in the `/packages/state-management-backend/` folder with the following keys and values:

    ```
    API_PORT=3000
    DATABASE_URL=postgresql://your-username:your-password@localhost:5432/your-database-name
    JWT_SECRET=your-jwt-secret
    JWT_REFRESH_SECRET=your-jwt-refresh-secret
    ```

    Replace `your-username`, `your-password`, `your-database-name`, `your-jwt-secret`, and `your-jwt-refresh-secret` with the appropriate values.

4.  Skip steps 6-9 if you have completed the previous steps successfully.
5.  Skip steps 2-3 if you are using Docker for setup.
6.  Install docker desktop
7.  Start the Docker engine (by opening Docker Desktop)
8.  Create a docker-compose.yaml document with the following parameters

    ```
    version: '3'
    services:
    backend:
        build:
        context: .
        dockerfile: Dockerfile
        ports:
        - '3000:3000'
        environment:
        - API_PORT=3000
        - DATABASE_URL=postgresql://your-username:your-password@localhost:5432/your-database-name
        - JWT_SECRET=your-jwt-secret
        - JWT_REFRESH_SECRET=your-jwt-refresh-secret
        depends_on:
        - database

    database:
        image: postgres
        environment:
        - POSTGRES_USER=your-username
        - POSTGRES_PASSWORD=your-password
        - POSTGRES_DB=your-database-name
        ports:
        - '5432:5432'
    ```

9.  Open a terminal and run the following command to start the application using Docker Compose:

    ```
    docker compose up
    ```

10. Run the following to serve backend nestJs api in dev mode.

        ```
        nx serve state-management-backend
        ```

    This will build and run the application containers.

11. The API should now be running on the specified port in the .env file.
12. Use Postman or other API testing tools to test the endpoints.

## Nx Information

### First

- Run `npm install` to download all dependencies.

- Run `nx serve state-management-frontend` to serve frontend angular app in dev mode.

- Run `nx serve state-management-backend` to serve backend nestJs api in dev mode.

### If you want to use Docker

After installing docker make sure the .env.development file is created and setup at the root level as per .env.example

the run

```bash
docker compose up
```

this will build and download any required images and start 2 containers, one for the API and one for postgres.

### Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

### Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.

### Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
