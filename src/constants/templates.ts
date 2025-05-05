export const templates = [
        {
                id: 'blank',
                label: 'Blank Document',
                imageUrl: '/blank-document.svg',
                initialContent: '<p></p>',
        },
        {
                id: 'business-letter',
                label: 'Business Letter',
                imageUrl: '/business-letter.svg',
                initialContent: `
            <p>[Your Name]</p>
            <p>[Your Address]</p>
            <p>[City, State, Zip]</p>
            <p>[Email]</p>
            <p>[Phone]</p>

            <p>[Date]</p>

            <p>[Recipient Name]</p>
            <p>[Recipient Title]</p>
            <p>[Company Name]</p>
            <p>[Company Address]</p>

            <p>Dear [Recipient Name],</p>
            <p>I am writing to express my interest in ...</p>
            <p>Please contact me if you have any questions.</p>

            <p>Sincerely,</p>
            <p>[Your Name]</p>
        `,
        },
        {
                id: 'cover-letter',
                label: 'Cover Letter',
                imageUrl: '/cover-letter.svg',
                initialContent: `
            <h1>Cover Letter</h1>
            <p>Dear [Hiring Manager],</p>
            <p>I am excited to apply for the [Position] at [Company]. With my background in [field], I am confident I can contribute to your team.</p>
            <p>During my previous role at [Previous Company], I [key achievement or responsibility].</p>
            <p>I look forward to the opportunity to discuss how my skills align with your needs.</p>

            <p>Sincerely,</p>
            <p>[Your Name]</p>
        `,
        },
        {
                id: 'letter',
                label: 'Letter',
                imageUrl: '/letter.svg',
                initialContent: `
            <p>[Sender's Address]</p>
            <p>[City, State ZIP]</p>
            <p>[Date]</p>

            <p>[Recipient's Name]</p>
            <p>[Recipient's Address]</p>

            <p>Dear [Recipient],</p>
            <p>I hope this letter finds you well. I am writing to inform you that ...</p>
            <p>Thank you for your time and attention to this matter.</p>

            <p>Best regards,</p>
            <p>[Your Name]</p>
        `,
        },
        {
                id: 'project-proposal',
                label: 'Project Proposal',
                imageUrl: '/project-proposal.svg',
                initialContent: `
            <h1>Project Proposal</h1>
            <h2>1. Executive Summary</h2>
            <p>This proposal outlines the goals, objectives, and expected outcomes of the [Project Name] project.</p>

            <h2>2. Objectives</h2>
            <ul>
                <li>Objective 1: [Describe objective]</li>
                <li>Objective 2: [Describe objective]</li>
            </ul>

            <h2>3. Timeline</h2>
            <p>The project will follow the timeline outlined below:</p>
            <ul>
                <li>Phase 1: [Date] - [Task]</li>
                <li>Phase 2: [Date] - [Task]</li>
            </ul>

            <h2>4. Budget</h2>
            <p>The estimated budget for the project is [Amount].</p>

            <h2>5. Conclusion</h2>
            <p>Thank you for considering this proposal.</p>
        `,
        },
        {
                id: 'software-proposal',
                label: 'Software Proposal',
                imageUrl: '/software-proposal.svg',
                initialContent: `
            <h1>Software Proposal</h1>
            <h2>1. Project Overview</h2>
            <p>The goal of this software project is to develop [Software Name], which will address [problem or need].</p>

            <h2>2. Features</h2>
            <ul>
                <li>Feature 1: [Description]</li>
                <li>Feature 2: [Description]</li>
                <li>Feature 3: [Description]</li>
            </ul>

            <h2>3. Technical Requirements</h2>
            <p>The software will require the following technical environment:</p>
            <ul>
                <li>Platform: [Platform]</li>
                <li>Database: [Database]</li>
                <li>Language: [Programming Language]</li>
            </ul>

            <h2>4. Budget & Timeline</h2>
            <p>The project budget is estimated at [Amount], and the timeline is as follows:</p>
            <ul>
                <li>Phase 1: [Date] - [Task]</li>
                <li>Phase 2: [Date] - [Task]</li>
            </ul>

            <h2>5. Conclusion</h2>
            <p>We appreciate your time and consideration of this proposal.</p>
        `,
        },
        {
                id: 'resume',
                label: 'Resume',
                imageUrl: '/resume.svg',
                initialContent: `
            <h1>[Your Name]</h1>
            <p>Email: [email@example.com] | Phone: [123-456-7890]</p>

            <h2>Objective</h2>
            <p>A brief summary of your career goals and skills.</p>

            <h2>Experience</h2>
            <h3>Job Title - Company Name</h3>
            <p><em>Start Date - End Date</em></p>
            <ul>
                <li>Responsibility or achievement 1</li>
                <li>Responsibility or achievement 2</li>
            </ul>

            <h2>Education</h2>
            <h3>Degree - School Name</h3>
            <p><em>Graduation Year</em></p>

            <h2>Skills</h2>
            <ul>
                <li>Skill 1</li>
                <li>Skill 2</li>
                <li>Skill 3</li>
            </ul>
        `,
        },
];
