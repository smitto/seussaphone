var note = Vue.component('note-item', {
  data: function () {
    return {
      nowPlaying: false
    }
  },
  props: ['note'],
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
    playNote: function () {
      var file = 'sounds/' + this.note.instrument + '-' + this.note.pitch + '.wav'
      var sound = new Howl({ src: [file], html5: true });
      this.nowPlaying = true;
      sound.play();
    }
  },
  template: 
    '<div v-bind:class="{ key: true, sharp: note.sharp, playing: nowPlaying }" \
    v-bind:style="{ left: note.left + \'%\' }" \
    v-bind:data-note="note.pitch" \
    @click="playNote" \
    @transitionend="nowPlaying = false"></div>'
})

var seussaphone = new Vue({
  el: '#seussaphone',
  data: {
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
  }
})
