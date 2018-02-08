import { Component } from '@angular/core';
import { IonicPage,  NavController} from 'ionic-angular';
import { DataProvider } from './../../providers/data/data';
import { AudioProvider } from '../../providers/audio/audio';


@IonicPage()
@Component({
  selector: 'page-story',
  templateUrl: 'story.html'
})
export class StoryPage {
  /**
    * Define the initial volume setting for the application
    */
    public volume         : any     = 50;


    /**
     * Initial state for audio playback
     */
    public isPlaying      : boolean = false;
 
 
    /**
     * Audio data to be used by the application
     * Change these to whatever YOUR audio tracks are!
     */
    public tracks         : any     = [
                        {
                            artist  : 'Poe',
                            name    : 'Poe',
                            track   : 'assets/locations/saskatoon/audio/poe.mp3'
                        }
                      ];
  constructor(public navCtrl: NavController, public dataProvider:DataProvider, private _AUDIO:AudioProvider) {
    
  }

  /**
    *
    * Load the requested track, determine if existing audio is
    * currently playing or not
    *
    * @method loadSound
    * @param track {String} The file path of the audio track to be loaded
    * @return {none}
    */
    loadSound(track : string): void
    {
       if(!this.isPlaying)
       {
          this.triggerPlayback(track);
       }
       else
       {
          this.isPlaying  = false;
          this.stopPlayback();
          this.triggerPlayback(track);
       }
    }
 
 
 
    /**
     *
     * Load the requested track using the Audio service
     *
     * @method triggerPlayback
     * @param track {String} The file path of the audio track to be loaded
     * @return {none}
     */
    triggerPlayback(track : string): void
    {
       this._AUDIO.loadSound(track);
       this.isPlaying  = true;
    }
 
 
 
 
    /**
     *
     * Change playback volume
     *
     * @method changeVolume
     * @param volume {Any} The volume control slider value
     * @return {none}
     */
    changeVolume(volume : any) : void
    {
       console.log(volume.value);
       //this._AUDIO.changeVolume(volume.value);
       this._AUDIO.changeVolume(volume);
    }
 
 
 
 
    /**
     *
     * Stop audio playback
     *
     * @method stopPlayback
     * @return {none}
     */
    stopPlayback() : void
    {
       this.isPlaying  = false;
       this._AUDIO.stopSound();
    }
}