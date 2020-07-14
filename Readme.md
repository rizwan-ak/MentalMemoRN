Completed Tasks:-
1- Cognito Registeration (Done)
2- Record Audio (Done)
3- Preview Recording (Done)
4- Save Recorded file on S3 (Done)
5- Delete Recorded file on S3 (Done)
6- Store Data file on DynamoDB (Done, Need to store sentiment)
7- Delete Data file on DynamoDB (Done)
8- Sentiment Analysis (Tested, but need text from audio)

Missing Tasks:-
1- Context API (I plan on doing this to do this after completing all the other requirments)
2- Audio to Text using usnig AWS Prediction (Not completed, Expecting Text or Error but getting nothing)
3- Some minor Ui changes.

Flow:-
After login on recordingScreen, after recording audio we click on save recording. this calls a function from utils/index.js named saveRecording(). I plan on doing all the major work in this function and store data at the end after adding sentimant.
