const { exec } = require('child_process');

const buildDocumentation = () => {
    exec('npm run build', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error during build: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Build stderr: ${stderr}`);
            return;
        }
        console.log(`Build stdout: ${stdout}`);
    });
};

const main = () => {
    console.log('Starting the build process...');
    buildDocumentation();
};

main();