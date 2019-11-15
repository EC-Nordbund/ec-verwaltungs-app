if(process.argv.length > 3) {
    const fs = require('fs');

    const source = process.argv[2];
    const dest = process.argv[3];
    const dest_path = dest.split('/').slice(0,-1).join('/');
    const source_exists = fs.existsSync(source);
    const dest_exists = fs.existsSync(dest_path);
    
    if(!source_exists) {
        console.error("Source operand: file " + source + " not found.");
    }

    if(!dest_exists) {
        console.error("Desination operand: directory " + dest_path + " not found.");
    }

    if(source_exists && dest_exists) {
        fs.copyFile(source, dest, (err) => {
            if(err) throw err;
            console.log("File " + source + " was copied to " + dest + "");
        });
    }

} else if(process.argv.length > 2) {
    if(process.argv[2] === '--help') {
        console.log("Usage: node a.js SOURCE DEST");
        console.log("Copies SOURCE to DEST");
        
    } else {
        console.log("Missing destination file operand after '" + process.argv[2] + "'");
        console.log("Try: 'node a.js --help' for more information.");
    }
} else {
    console.log("Missing file operand");
    console.log("Try: 'node a.js --help' for more information.");
}

