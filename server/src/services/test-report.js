import generateInterviewReport from './ai.service.js'

// Sample test data for generating an interview report
const sampleResume = `
Senior Frontend Developer with 5+ years of experience building scalable web applications.
- Proficient in React.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
- Experience with state management (Redux, Zustand), REST APIs, GraphQL
- Worked on e-commerce platforms, SaaS dashboards, and real-time collaborative tools
- Strong understanding of responsive design, accessibility (a11y), and performance optimization
- Experience with CI/CD pipelines, Docker, and AWS (S3, CloudFront)
- Led a team of 3 junior developers and conducted code reviews
- B.Tech in Computer Science from NIT (2018-2022)
`

const sampleSelfDescription = `
I am a passionate frontend developer who enjoys building clean, performant user interfaces.
I have strong problem-solving skills and I'm always eager to learn new technologies.
I believe in writing clean, maintainable code and following best practices.
I work well in teams and have experience mentoring junior developers.
I'm looking for a role where I can contribute to impactful products and grow as an engineer.
`

const sampleJobDescription = `
Job Title: Senior Frontend Engineer
Company: TechCorp Inc.

We are looking for a Senior Frontend Engineer to join our growing team.

Responsibilities:
- Build and maintain reusable, testable UI components using React.js
- Collaborate with designers and backend engineers to deliver seamless user experiences
- Optimize applications for maximum speed and scalability
- Write unit and integration tests (Jest, React Testing Library)
- Participate in code reviews and mentor junior team members
- Contribute to architecture decisions and technical planning

Requirements:
- 4+ years of experience in frontend development
- Strong proficiency in React.js, TypeScript, and modern JavaScript (ES6+)
- Experience with Next.js and server-side rendering
- Familiarity with state management libraries (Redux, Zustand, or similar)
- Experience with Tailwind CSS or similar utility-first CSS frameworks
- Understanding of CI/CD pipelines and version control (Git)
- Excellent communication and teamwork skills

Nice to have:
- Experience with Node.js or backend technologies
- Knowledge of GraphQL
- Experience with monorepo setups (Turborepo, Nx)
- Contributions to open source projects
`

console.log("🚀 Testing generateInterviewReport function...\n")

try {
    const response = await generateInterviewReport({
        resume: sampleResume,
        selfDescription: sampleSelfDescription,
        jobDescription: sampleJobDescription,
    })

    console.log("\n✅ Test completed successfully!")
    console.log("📄 Generated Report:")
    console.log(JSON.stringify(response, null, 2))
} catch (error) {
    console.error("❌ Test failed:", error.message)
    process.exit(1)
}

