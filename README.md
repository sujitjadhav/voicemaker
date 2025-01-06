# voiceMaker _npm

//Voicemaker.js  is an NPM module that offers a simple interface for creating Text-to-Speech (TTS) audio files with the Voicemaker API. 
//You may create TTS files in different formats, set up voice settings, and retrieve the list of possible voices with this library.



Featurees :
Generate TTS files in various formats like MP3 with adjustable parameters.


Support for multiple languages and voices.


Fetch and save the list of available voices for reference.


Customize voice parameters such as speed, pitch, volume, and more.


//Installation (install dependencies)
    
npm install voicemaker

//Usage

//Import the Module
    const vm = require('./voicemaker');

// Set API Key

// Obtain your API key from Voicemaker and set it:
     vm.api_key('YOUR_API_KEY');

//Generate TTS File

//Customize the parameters and generate a TTS file:
     vm.text('Hello, this is a sample text-to-speech conversion!');
     vm.voice_id('ai3-en-US-Mike');
     vm.master_speed(0);   // Speed range: -100 to 100
     vm.master_volume(5);   //Volume range:- 100 to 100

//Generate and save the audio file:
     vm.tts_file('output.mp3').then(() => { 
console.log('TTS file created successfully!');
}.catch(error => {
console.error('Error:', error.message);
});

//Fetch and Save Voice List

//Fetch the list of voices available for a specific language and save it as a JSON file:
vm.save_voice_list('./Voice_list.json').then(() => {
console.log('Voice list saved successfully!');
}).catch(error => {
console.error('Error fetching voice list:', error.message);
});

// ======= Customize Parameters
===============
//Customize Parameters

//You can customize parameters individually:
vm.text('Customize your TTS parameters.');

vm.language_code('en-US');
vm.output_format('mp3');

vm.sample_rate(44100);
vm.master_pitch(5);

// Or use the parameter object approach:
const params = {
 
 voice_id: 'ai3-Jony',
  l
anguage_code: 'en-US',
  
text: 'This is a test for parameter-based input.',
 
 output_format: 'mp3',
  
sample_rate: 48000,
 
 master_speed: 5,
  
master_volume: 10,
  
master_pitch: 0

};

vm.set_params(params);
//==========================================


//API Reference

//Methods

api_key(key)
    //Sets the API key for authentication.


//Parameters:

key (string):     //Your Voicemaker API key.

text(content)
      //Sets the text content for the TTS request.
//Parameters:

content (string):   // The text to convert to speech.

voice_id(id)    //
Sets the voice for TTS.


//Parameters:

id (string): 'Voice ID' (e.g., ai3-en-US-Mike).

output_format(format)    //
Sets the output format for the TTS file.


//Parameters:

format (string): File format (e.g., mp3, wav).

sample_rate(rate)
     //Sets the sample rate for the audio file.
//

Parameters:

rate (number): Sample rate in Hz (e.g., 48000, 44100).


master_volume(volume)    //
Sets the master volume of the audio.
//

Parameters:

volume (number): Volume level (-100 to 100).

master_speed(speed)     //
Sets the playback speed.


//Parameters:

speed (number): Speed level (-100 to 100).

master_pitch(pitch)   ///
Sets the pitch of the audio.


//Parameters:

pitch (number): Pitch level (-100 to 100).

get_voices(languageCode)
   //Fetches the list of available voices for a specific language.


//Parameters:

languageCode (string): Language code (default: en-US).

save_voice_list(fileName, languageCode)      //
Fetches and saves the list of voices to a file.


//Parameters:

fileName (string): Path to save the JSON file.
languageCode (string): Language code for filtering voices.

tts_file(fileName)    //
Generates a TTS audio file.


//Parameters:

fileName (string): Name of the output file.


Error Handling

The module provides error handling for:


Missing API key.

Invalid parameter values (e.g., unsupported sample rates or out-of-range settings).

API errors (e.g., network issues or invalid API responses).

try {

  await Voicemaker.tts_file('output.mp3');

} catch (error) {
  
console.error('An error occurred:', error.message);

}

//========  Example ========
const vm = require('voicemaker');

// Set API key
vm.api_key('your-api-key');

// Configure parameters
vm.text('This is a Voicemaker test.');
vm.voice_id('ai3-Jony');
vm.language_code('en-US');
vm.master_speed(2);

// Generate TTS file
vm.tts_file('output.mp3')
  .then(() => {
console.log('TTS file downloaded successfully!');}
).catch(error => {
console.error('Error:', error.message)
});

// Save voice list
vm.save_voice_list('./Voice_list.json')
  .then(() => {
console.log('Voice list saved successfully!'):
}).catch(error =>{
 console.error('Error:', error.message);
});


// Notes :


Ensure you have a valid API key from Voicemaker.in.


Use supported sample rates and format values as per the API documentation.


Check language and voice compatibility based on your requirements.

//License

MIT License. 
//See LICENSE for details.


//
Support

For issues or feature requests, please open an issue on the GitHub repository.