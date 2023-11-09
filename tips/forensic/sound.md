# Sound

- Open file and listen
- Run `file`
- Run `strings`
- Run `binwalk`, if anything extract it using `binwalk -e`
- Check metadata
- Check LSB
- Check for multiple channels
- Open in Audacity and check spectogram
- Slow down file
- Analyze waveform to see if it's binary

**Interesting CTF Challenges**

- https://shrikantadhikarla.wordpress.com/2016/03/08/lily-flac-writeup-boston-key-party-ctf/ (Found executable in .wav)
- https://ethackal.github.io/2015/10/05/derbycon-ctf-wav-steganography/ (LSB with .wav)
- https://ctfcrew.org/writeup/91 (Flag hidden in channel differences of .wav)
