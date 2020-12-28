This is a simple service built with Node.js
Its main goal is to detect duplicated files in a particular folder.
If we got limited SFTP access, I think this would be convenient rather than the whole server scanning.

1. Instruction for run
- npm install
- node index.js

2. Output result
It will display arrays of duplicated files.
For example:
['1.avi', 'demo.avi', '3d_demo.avi'],
['2.pdf', 'readme.pdf', 'gudide.pdf']