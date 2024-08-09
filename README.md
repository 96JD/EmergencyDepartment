# Emergency Department

.NET, SignalR, React, TypeScript and Material UI web application that enables patients to interact with the emergency department in Norway.

## Getting started

1. Clone the repository to your local machine: `git clone https://github.com/96JD/EmergencyDepartment.git`.
2. Run the MySQL database script: [development.sql](databases/development.sql).
3. Add your own JWT token credentials to [appsettings.Development.json](Backend/appsettings.Development.json).
4. Navigate to the [Src](Backend/Src) folder inside the [Backend](Backend) folder.
5. Start the Backend: `dotnet watch`.
6. Navigate to the [Frontend](Frontend) folder.
7. Install the dependencies: `pnpm i`.
8. Start the Frontend: `pnpm dev`.
9. Log in to the system with one of the following users:

### Admin

-   Person Number: `12345678910`
-   Password: `EmergencyDepartment#96`

### Nurse

-   Person Number: `12345678911`
-   Password: `EmergencyDepartment#96`

### Patient

-   Person Number: `12345678915`
-   Password: `EmergencyDepartment#96`

## Deployment

Frontend: [https://jacob-dolorzo-emergency-department.vercel.app](https://jacob-dolorzo-emergency-department.vercel.app)

Backend: [https://jacob-dolorzo-emergency-department.onrender.com/swagger/index.html](https://jacob-dolorzo-emergency-department.onrender.com/swagger/index.html)
