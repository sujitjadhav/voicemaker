//main file of Npm module

const vm = require('./voicemaker');

// Set API key
vm.api_key('53802a30-a644-11ef-8a48-450997130e03');

// // Define parameters for the TTS request using the parameter object approach
// const myParams = {
//   voice_id: 'ai3-Jony',
//   language_code: 'en-US',
//   text: 'This is a test for parameter-based input.',
//   output_format: 'mp3',
//   sample_rate: 44100,
//   effect: 'default',
//   master_speed: 5,
//   master_volume: 10,
//   master_pitch: 0
// };

// // Set parameters dynamically using the `set_params` method
// vm.set_params(myParams);

// Alternatively, set individual parameters directly
vm.text('Voice maker test npm and Voice_list :- “सपने वो नहीं जो हम सोते समय देखते हैं, सपने वो हैं जो हमें सोने नहीं देते।”');
vm.voice_id('ai3-hi-IN-AdityaV2'); // Override voice_id
vm.master_speed(3); // Override master speed

// Generate the TTS file and save it as 'test.mp3'
vm.tts_file('test6.mp3').then(() => {
  console.log('TTS file downloaded successfully as test4.mp3');
}).catch(error => {
  console.error('Error:', error.message);
});

// Get the list of voices (optional)
vm.save_voice_list('./Voice_list.json').then(() => {
  console.log('Voice list saved successfully!');
}).catch(error => {
  console.error('Error:', error.message);
});

// // Save the voice list for a specific language (e.g., Hindi)
// vm.save_voice_list('./Voice_list_User_defined.json', 'gu-IN').then(() => {
//   console.log('Voice list for accepted Language is saved successfully!');
// }).catch(error => {
//   console.error('Error saving voice list for Hindi:', error.message);
// });
