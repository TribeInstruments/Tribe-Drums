const var MIDIPlayer1 = Synth.getMidiPlayer("MIDI Player1");function onNoteOn()
{
	if(Message.getNoteNumber() == 24)
	MIDIPlayer1.play(1);

}
 function onNoteOff()
{
	if(Message.getNoteNumber() == 24)
	MIDIPlayer1.stop(1);
}
 function onController()
{
	
}
 function onTimer()
{
	
}
 function onControl(number, value)
{
	
}
 