
###  **Project Management Tool**

**Tech Stack**: Next.js, TypeScript, Ant Design, MongoDB, Apollo Client

**Roles**:

-   **Next.js**: Framework for building the app
-   **TypeScript**: Adds static typing
-   **Ant Design**: For UI components
-   **MongoDB**: Database for storing projects and tasks
-   **Apollo Client**: Handles GraphQL queries

**MVP Features**:

-   Task management
-   Project creation
-   User roles
-   Basic dashboard

**Time Management**:

-   **Week 1**: Task management
-   **Week 2**: Project creation
-   **Week 3**: User roles and permissions
-   **Week 4**: Dashboard and testing

https://dribbble.com/shots/24261482-TaskTrek-Project-Management-Tool

**Task Management**
- Create project
- Projects have 3 states
    -Todo
    -In progress
    -Done
- Each state can have different tasks
- Each state has a 3 priority (low medium and high)
- Create a new task
- ability to move task fron each state
    - a simple option tray should suffice (option to drag and drop later)
    - new task as a default state of todo

**Bankend Design**

-- Build apollo server
-- create mongodb instance
-- create schemas

**App work flow for new users**

-- User loads webapp
-- user creates new projects
    -- Definition of a new project (schema)
        -- project name
        -- project id (auto from mongodb)
        -- project description
        -- task array
        -- users that have access to projects (coming soon)
        -- date created
        -- last updated
    -- Definition of a new task (schema)
        -- Task id (auto)
        -- Task title
        -- Task description
        -- Task status
        -- Task creation date
        -- Task update date
        -- Task priority
-- adds new task to project
-- changes task status from todo -> in progress -> done
-- user can also edit project details
-- user can also edit task details
-- user can delete project
-- user can delete task
-- users can add multiple projects and tasks

