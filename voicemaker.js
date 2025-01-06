// voicemaker.js - Voicemaker NPM Module

const axios = require('axios');
const fs = require('fs');
const path = require('path');

class Voicemaker {
  constructor() {
    this.apiKey = '';
    this.baseURL = 'https://developer.voicemaker.in/voice/api';
    this.listURL = 'https://developer.voicemaker.in/voice/list';
    
    // Default parameters
    this.params = {
      voice_id: 'ai3-Jony',
      language_code: 'en-US',
      text: '',
      output_format: 'mp3',
      sample_rate: 48000,
      effect: 'default',
      master_volume: 0,
      master_speed: 0,
      master_pitch: 0
    };
  }

  // Set the API key for authentication
  api_key(key) {
    this.apiKey = key;
  }

  // // Set parameters using an object (bulk input)
  // set_params(params) {
  //   this.params = { ...this.params, ...params }; // Merge default and provided params
  // }

  // Direct setters for individual parameters (can be called one-by-one)
  voice_id(voiceId) {
    this.params.voice_id = voiceId;
  }

  language_code(languageCode) {
    this.params.language_code = languageCode;
  }

  text(text) {
    this.params.text = text;
  }

  output_format(format) {
    this.params.output_format = format;
  }

  sample_rate(rate) {
    const allowedRates = [48000, 44100, 24000, 22050, 16000, 8000];
    if (!allowedRates.includes(rate)) {
      throw new Error(`Invalid sample rate: ${rate}. Allowed rates are: ${allowedRates.join(", ")}`);
    }
    this.params.sample_rate = rate;
  }

  effect(effect) {
    if (speed < -100 || speed > 100) {
      throw new Error("Master speed must be between -100 and 100.");
    }
    this.params.effect = effect;
  }

  master_volume(volume) {
     if (volume < -100 || volume > 100) {
      throw new Error("Master volume must be between -100 and 100.");
    }
    this.params.master_volume = volume;
  }

  master_speed(speed) {
     if (speed < -100 || speed > 100) {
      throw new Error("Master speed must be between -100 and 100.");
    }
    this.params.master_speed = speed;
  }

  master_pitch(pitch) {
    if (pitch < -100 || pitch > 100) {
      throw new Error("Master pitch must be between -100 and 100.");
    }
    this.params.master_pitch = pitch;
  }

  // Get the list of voices available
  async get_voices(languageCode = this.params.language_code) {
    try {
      const response = await axios.post(this.listURL, {
        language: languageCode, // Send the desired languagCode....(e.g: 'mr-IN' || 'gu-IN'  || 'ml-IN',)
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching voices:', error.message);
      throw error;
    }
  }

  // Method to save the voice list to a file
  async save_voice_list(fileName = './Voice_list.json', languageCode = this.params.language_code) {
    try {
      const voices = await this.get_voices();
      fs.writeFileSync(fileName, JSON.stringify(voices, null, 2)); // Pretty-print JSON
      // console.log('Voice list saved successfully to', fileName);
  } catch (error) {
    console.error('Error saving voice list:', error.message);
    throw error;
  }
}



  // Generate a TTS file
  async tts_file(fileName) {
    if (!this.params.text) {
      throw new Error('Text for TTS is required.');
    }

    const data = {
      ResponseType: 'stream',
      Engine: 'neural',
      VoiceId: this.params.voice_id,
      LanguageCode: this.params.language_code,
      Text: this.params.text,
      OutputFormat: this.params.output_format,
      SampleRate: this.params.sample_rate,
      Effect: this.params.effect,
      MasterVolume: this.params.master_volume,
      MasterSpeed: this.params.master_speed,
      MasterPitch: this.params.master_pitch,
    };

    try {
      const response = await axios.post(this.baseURL, data, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer', // To handle binary data (mp3)
      });

      const filePath = path.resolve(__dirname, fileName);
      fs.writeFileSync(filePath, response.data);
      // console.log(`TTS file downloaded successfully as ${fileName}`);
    } catch (error) {
      console.error('Error generating TTS file:', error.message);
      throw error;
    }
   }
}

module.exports = new Voicemaker();
