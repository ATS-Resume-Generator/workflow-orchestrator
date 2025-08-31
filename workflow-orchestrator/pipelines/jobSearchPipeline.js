const jobSearchPipeline = {
    name: "Job Search Pipeline",
    description: "A pipeline for managing job search processes.",
    steps: [
        {
            id: "resume-analysis",
            name: "Resume Analysis",
            type: "task",
            action: "analyzeResume",
            next: "job-search"
        },
        {
            id: "job-search",
            name: "Job Search",
            type: "task",
            action: "searchJobs",
            next: "generation"
        },
        {
            id: "generation",
            name: "Job Application Generation",
            type: "task",
            action: "generateApplication",
            next: "audit"
        },
        {
            id: "audit",
            name: "Application Audit",
            type: "task",
            action: "auditApplication",
            next: null
        }
    ],
    dependencies: {
        "job-search": ["resume-analysis"],
        "generation": ["job-search"],
        "audit": ["generation"]
    },
    onError: (stepId, error) => {
        console.error(`Error in step ${stepId}:`, error);
        // Implement retry logic or error handling here
    },
    onComplete: () => {
        console.log("Job Search Pipeline completed successfully.");
    }
};

module.exports = jobSearchPipeline;