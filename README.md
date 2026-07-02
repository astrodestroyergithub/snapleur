# Snapleur
## (Cross Network Advanced Portfolio Platform for Leveraged and Enhanced Utilization of Resources)
##### _Pronounced: /si.ne a.plœʁ/ ('see-nae-app-lee-oor')_
The 'Snapleur' is a customizable interface that lets users explore categories, add or remove widgets, and search for specific tools. It offers a flexible way to organize and view key information, adapting to user preferences for quick insights and a streamlined, personalized experience.

**To run the dashboard application, follow these steps:**
1. First of all clone the git repository by copying the HTTPS/SSH url of the repo, and then executing the below commmand in git bash:
```
git clone <HTTPS/SSH URL OF REPO>
```
2. Navigate to the root directory of the project in your terminal:
```
cd CNAPP-Dashboard
```
3. Install the necessary dependencies. This will read from the package.json file:
```
npm install
```
4. You can also install the dependencies by yourself (if they are not present in package.json). First, check if you have package.json file or not. If you don't have one, execute the below command:
```
npm init -y
```
Then install the dependencies which I have used in this project by executing the below command (this will install all at once):
```
npm install @fortawesome/free-solid-svg-icons@^7.0.1 @fortawesome/react-fontawesome@^3.0.2 @reduxjs/toolkit@^2.9.0 react@^18.2.0 react-dom@^18.2.0 react-redux@^9.2.0 sass@^1.92.1
```
5. Verify if the packages are installed correctly:
```
npm list --depth=0
```
6. Start the development server:
```
npm start
```
The application will open automatically in your default browser at [http://localhost:3000](http://localhost:3000)

**Notes:**
- This project was generated using create-react-app scaffolding, and it uses the same react-scripts toolchain.
- If you encounter an error about blocked ports, either close the existing process or set a different port:
```
  set PORT=3001 && npm start  (Windows)
```
```
  set PORT=3001 && npm start  (macOS/Linux)
```

**View Live Website:** [Snapleur](https://cnapplatform.netlify.app/)
