Configuration Instructions:

Run following commands to install Node.js

 - sudo apt-get update
 - curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - ; sudo apt-get install -y nodejs

If the file is cloned from git repository, run following command to install all dependencies (this may take a while):
- npm install

If the file is downloaded and opened from what is submitted on Blackboard, all dependencies are already in project.

To run the server, run the following command from the command line within the root directory of project:

node index.js

Known Bugs:

- Does not do input validation for some of the GET,POST,PUT requests

To run unit tests:

- node tests.js

To generate unit test code coverage report:

- npm run coverage

To generate source class files report:

- node report.js

To generate unit test class files report:

- node test-report.js
