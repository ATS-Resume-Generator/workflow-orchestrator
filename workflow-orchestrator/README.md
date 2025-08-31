# Workflow Orchestrator

## Overview
The Workflow Orchestrator is a Node.js microservice designed for workflow orchestration and pipeline management. It provides a REST API for creating, managing, and executing workflows and pipelines, with features such as error handling, state management, and GitHub Actions integration.

## Features
- Create and manage workflows and pipelines
- Multi-step pipeline execution with error handling and retry logic
- Parallel and sequential step execution
- Webhook notifications for workflow events
- Scheduled workflow execution using cron jobs
- Input validation with Joi
- Health check endpoint
- Docker containerization

## Project Structure
```
workflow-orchestrator
├── server.js
├── package.json
├── Dockerfile
├── .env
├── README.md
├── config
│   ├── database.js
│   └── github.js
├── routes
│   ├── workflows.js
│   └── pipelines.js
├── services
│   ├── orchestratorService.js
│   ├── githubActionsService.js
│   ├── stepExecutor.js
│   └── stateManager.js
├── middleware
│   └── validation.js
├── models
│   ├── Workflow.js
│   └── Pipeline.js
├── pipelines
│   └── jobSearchPipeline.js
├── utils
│   └── workflowEngine.js
```

## API Endpoints

### Workflows
- **POST /workflows**: Create a new workflow execution.
- **GET /workflows**: List all workflows with their status.
- **GET /workflows/:id**: Get details of a specific workflow.
- **POST /workflows/:id/trigger**: Manually trigger a workflow.
- **POST /workflows/:id/cancel**: Cancel a running workflow.
- **GET /workflows/:id/status**: Get real-time status of a workflow.

### Pipelines
- **POST /pipelines**: Define new pipeline templates.
- **GET /pipelines**: List available pipeline templates.

### Health Check
- **GET /health**: Check the health status of the service.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd workflow-orchestrator
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables in the `.env` file.

4. Start the server:
   ```
   node server.js
   ```

5. Access the API at `http://localhost:3000`.

## Docker
To build and run the application in a Docker container, use the following commands:
```
docker build -t workflow-orchestrator .
docker run -p 3000:3000 --env-file .env workflow-orchestrator
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.