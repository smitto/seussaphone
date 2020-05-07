var note = Vue.component('note-item', {
  template: '#note',
  data: function () {
    return {
      nowPlaying: false
    }
  },
  props: {
    note: Object,
    isRecording: Boolean
  },
  computed: {
    getPosition: function () {
      if (this.note.id % 2 != 0) {
        return (((this.note.id - 1) / 2) * 10) + 7
      } else {
        return null;
      }
    }
  },
  methods: {
    playNote: function (recording) {
      if (this.isRecording) {
        this.$emit('clicked', this.note.id)
      }
      var file = 'sounds/' + this.note.instrument + '-' + this.note.pitch + '.wav'
      var sound = new Howl({ src: [file], html5: true });
      this.nowPlaying = true;
      sound.play();
    }
  }
})

var seussaphone = new Vue({
  el: '#seussaphone',
  data: {
    isRecording: false,
    isPlaying: false,
    currentlyPlaying: null,
    recordedNotes: [],
    startTime: null,
    totalTime: null,
    loopTimeouts: [],
    noteList: [
      { id: 0, instrument: 'Bonkulon', pitch: 'C' },
      { id: 1, sharp: true, instrument: 'Bonkulon', pitch: 'Cs', left: 10 },
      { id: 2, instrument: 'Bonkulon', pitch: 'D' },
      { id: 3, sharp: true, instrument: 'Bonkulon', pitch: 'Ds', left: 24 },
      { id: 4, instrument: 'Bonkulon', pitch: 'E' },
      { id: 5, instrument: 'Bonkulon', pitch: 'F' },
      { id: 6, sharp: true, instrument: 'Bonkulon', pitch: 'Fs', left: 52 },
      { id: 7, instrument: 'Bonkulon', pitch: 'G' },
      { id: 8, sharp: true, instrument: 'Bonkulon', pitch: 'Gs', left: 66 },
      { id: 9, instrument: 'Bonkulon', pitch: 'A' },
      { id: 10, sharp: true, instrument: 'Bonkulon', pitch: 'As', left: 80 },
      { id: 11, instrument: 'Bonkulon', pitch: 'B' }
    ],
  },
  computed: {
    recordedNotesPrintout: function () {
      return JSON.stringify(this.recordedNotes);
    }
  },
  methods: {
    addToRecording: function (noteId) {
      this.recordedNotes.push({ note: noteId, time: new Date().getTime() });
    },
    startRecording: function () {
      this.isRecording = true;
      this.startTime = new Date().getTime();

      // stop old loop
      window.clearInterval(this.loopInterval);
      $.each(this.loopTimeouts, function(i, x) {
        window.clearTimeout(x);
      });
    },
    stopRecording: function () {
      this.isRecording = false;
      this.totalTime = new Date().getTime() - this.startTime;
      for (var i=0, len=this.recordedNotes.length; i<len; i++) {
        this.recordedNotes[i].time = this.recordedNotes[i].time - this.startTime;
      }
    },
    clearRecording: function () {
      this.isRecording = false;
      this.recordedNotes = [];
    },
    playRecording: function () {
      this.isRecording = false;
      let loopTimeouts = [];
      let refNotes = this.$refs.notes;
      $.each(this.recordedNotes, function(i, x) {
        loopTimeouts.push(window.setTimeout(function() {
          refNotes[x.note].playNote();
        }, x.time));
      });
    }
  }
})
