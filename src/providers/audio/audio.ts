import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Http, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';


declare var AudioContext;
declare var webkitAudioContext;

/*
  Generated class for the AudioProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AudioProvider {


   /**
    * Object for handling user feedback with
    * Ionic's LoadingController API methods
    */
   private _PRELOADER           : any;



   /**
    * Object for decoded audio data
    */
   private _TRACK               : any    = null;



   /**
    * Object for decoded audio data
    */
   private _AUDIO               : any;



   /**
    * Object for handling audio buffer data
    */
   private _SOURCE              : any;



   /**
    * Object for handling audio context
    */
   private _CONTEXT             : any    = new (AudioContext || webkitAudioContext)();



   /**
    * Object for handling audio volume changes
    */
   private _GAIN                : any    = null;



   constructor(public http      : Http,
               private _LOADER  : LoadingController)
   { }




   /**
    *
    * Load the requested track
    *
    * @method loadSound
    * @param track {String} The file path of the audio track to be loaded
    * @return {none}
    */
   loadSound(track : string) : void
   {
      this.displayPreloader('Loading track...');

      this.http.get(track, { responseType: ResponseContentType.ArrayBuffer })
      .map(res => res.arrayBuffer())
      .subscribe((arrayBufferContent : any) =>
      {
         this.setUpAudio(arrayBufferContent);
      });
   }




   /**
    *
    * Decode the downloaded audio data / set up playback
    *
    * @method setUpAudio
    * @param bufferedContent {object} The downloaded audio data
    * @return {none}
    */
   setUpAudio(bufferedContent : any) : void
   {
      this._CONTEXT.decodeAudioData(bufferedContent, (buffer : any) =>
      {
         this._AUDIO         = buffer;
         this._TRACK         = this._AUDIO;
         this.playSound(this._TRACK);
      });
   }




   /**
    *
    * Play the decoded audio data
    *
    * @method playSound
    * @param track {object} The decoded audio data
    * @return {none}
    */
   playSound(track : any) : void
   {
      if (!this._CONTEXT.createGain)
      {
         this._CONTEXT.createGain   = this._CONTEXT.createGainNode;
      }
      this._GAIN                    = this._CONTEXT.createGain();
      this._SOURCE                  = this._CONTEXT.createBufferSource();
      this._SOURCE.buffer           = track;
      this._SOURCE.connect(this._GAIN);
      this._GAIN.connect(this._CONTEXT.destination);

      this._SOURCE.start(0);
      this.hidePreloader();
   }




   /**
    *
    * Stop playback of audio data
    *
    * @method stopSound
    * @return {none}
    */
   stopSound() : void
   {
      if (!this._SOURCE.stop)
      {
         this._SOURCE.stop = this._SOURCE.noteOff;
      }
      this._SOURCE.stop(0);
   }




   /**
    *
    * Handle user feedback while data is being loaded
    * and parsed
    *
    * @method displayPreloader
    * @param message {String} Message for user feedback
    * @return {none}
    */
   displayPreloader(message : string) : void
   {
      this._PRELOADER = this._LOADER.create({
         content: message
      });
      this._PRELOADER.present();
   }




   /**
    *
    * Remove user feedback after data has been loaded
    * and parsed
    *
    * @method hidePreloader
    * @return {none}
    */
   hidePreloader() : void
   {
      this._PRELOADER.dismiss();
   }




   /**
    *
    * Handle volume control
    *
    * @method changeVolume
    * @param value {Object}      Audio Volume values
    * @return {none}
    */
   changeVolume(volume : any) : void
   {
      let percentile : number    = parseInt(volume.value) / parseInt(volume.max);
      // A straightforward use of the supplied value sounds awful
      // so we're using a fraction of the supplied value to
      // handle this situation
      this._GAIN.gain.value      = percentile * percentile;
   }

}